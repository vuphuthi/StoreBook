import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sản phẩm hết hàng');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Vui lòng nhập bình luận và đánh giá');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Đã gửi đánh giá thành công');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='mx-auto w-full max-w-screen-xl'>
      <Row>
  <Col md={6}>
    <img
      className="img-large"
      src={selectedImage || product.image}
      alt={product.name}
    />
  </Col>
  <Col md={6}>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </ListGroup.Item>

      <ListGroup.Item>
        <div className="flex items-center">
          <span className="mr-2">Đánh giá:</span>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </ListGroup.Item>

      <ListGroup.Item>
        <div className="flex items-center">
          <span className="mr-2">Giá:</span>
          <span className="text-3xl font-semibold text-red-500">
            {product.price} 
          </span><span className='text-red-500'>₫</span>
        </div>
      </ListGroup.Item>

      <ListGroup.Item>
        <div className="flex items-center">
          <span className="mr-2">Tác giả:</span>
          <span className="text-blue-500">{product.brand}</span>
        </div>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row xs={1} md={2} className="g-2">
          {[product.image, ...product.images].map((x) => (
            <Col key={x}>
              <Card>
                <Button
                  className="thumbnail"
                  type="button"
                  variant="light"
                  onClick={() => setSelectedImage(x)}
                >
                  <Card.Img variant="top" src={x} alt="product" />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </ListGroup.Item>
    </ListGroup>

      <Card.Body className='mt-2'>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Trạng thái:</Col>
              <Col>
                {product.countInStock > 0 ? (
                  <Badge bg="success">Còn hàng</Badge>
                ) : (
                  <Badge bg="danger">Hết hàng</Badge>
                )}
              </Col>
            </Row>
          </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  className="border-none text-white"
                  onClick={addToCartHandler}
                  variant="primary"
                >
                  Mua ngay
                </Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
  </Col>
  <Col >
    
  </Col>
  <Col md={12}>
    <ListGroup.Item className='mt-6'>
      <p>{product.description}</p>
    </ListGroup.Item>
  </Col>
</Row>

      <div className="my-6">
  <h2 className="text-2xl font-bold mb-4" ref={reviewsRef}>
    Đánh giá
  </h2>

  <div className="mb-4">
    {product.reviews.length === 0 && (
      <MessageBox>Chưa có đánh giá nào</MessageBox>
    )}
  </div>

  <ListGroup>
    {product.reviews.map((review) => (
      <ListGroup.Item key={review._id} className="mb-4">
        <div className="flex items-center justify-between">
          <strong>{review.name}</strong>
          <div className="text-gray-500">
            <Rating rating={review.rating} caption=" " />
            <p className="text-sm">{review.createdAt.substring(0, 10)}</p>
          </div>
        </div>
        <p className="mt-2">{review.comment}</p>
      </ListGroup.Item>
    ))}
  </ListGroup>

  <div className="my-6">
    {userInfo ? (
      <form onSubmit={submitHandler}>
        <h2 className="text-2xl font-bold mb-4">Viết đánh giá</h2>

        <Form.Group className="mb-4" controlId="rating">
          <Form.Label>Xếp hạng</Form.Label>
          <Form.Select
            aria-label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Chọn đánh giá</option>
            <option value="1">1- Rất tệ</option>
            <option value="2">2- Bình thường</option>
            <option value="3">3- Tốt</option>
            <option value="4">4- Rất tốt</option>
            <option value="5">5- Xuất sắc</option>
          </Form.Select>
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Nhận xét"
          className="mb-4"
        >
          <Form.Control
            as="textarea"
            placeholder="Viết nhận xét ở đây"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FloatingLabel>

        <div className="mb-4">
          <Button className="border-none text-white" disabled={loadingCreateReview} type="submit">
            Gửi đánh giá
          </Button>
          {loadingCreateReview && <LoadingBox />}
        </div>
      </form>
    ) : (
      <MessageBox>
        Vui lòng{' '}
        <Link to={`/signin?redirect=/product/${product.slug}`}>đăng nhập</Link>{' '}
        để viết đánh giá
      </MessageBox>
    )}
  </div>
</div>

    </div>
  );
}
export default ProductScreen;
