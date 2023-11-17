import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">đang tải...</span>
    </Spinner>
  );
}
