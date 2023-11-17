import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="max-w-xs rounded overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <Link to={`/product/${product.slug}`} className="block">
        <img
          src={product.image}
          className="w-full h-48 object-cover"
          alt={product.name}
        />
      </Link>
      <Card.Body className="px-6 py-4">
        <Link to={`/product/${product.slug}`} className="block">
          <Card.Title className="font-bold text-xl mb-2 text-gray-800 hover:text-blue-500 h-14 overflow-hidden">
            {product.name}
          </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="py-2 text-xl font-bold text-gray-700">
          {product.price}
          <span className="text-[14px]">₫</span>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button
            variant="light"
            disabled
            className="bg-gray-300 text-gray-600 cursor-not-allowed"
          >
            Hết hàng
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product)}
            className="bg-blue-500 text-white border-none hover:bg-blue-700"
          >
            Thêm vào giỏ hàng
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
