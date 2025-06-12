// src/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../../store/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    loading,
    error,
  } = useFetch(
    `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-danger">Error: {error.message}</p>
    );
  if (!product)
    return <p className="text-center mt-4 text-warning">Product not found.</p>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img
            src={
              product.imageUrl?.trim() ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.title}
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <p className="text-muted">{product.category}</p>
            <h4>₹{product.price}</h4>
            <p>{product.description}</p>

            <Button
              variant="secondary"
              className="me-2"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
            <Button
              variant="success"
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(toggleCart());
              }}
            >
              Buy Now
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
