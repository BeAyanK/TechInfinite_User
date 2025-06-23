import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { toggleCart,addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";


const api =
  "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";

const ProductPage = () => {
  const { data, loading, error } = useFetch(api);
  const dispatch = useDispatch();

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">Error: {error.message}</p>
    );
  if (!data || data.length === 0)
    return <p className="text-center mt-5 text-warning">No products found.</p>;

  return (
    <Container className="mt-5">
      <Row>
        {data.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card>
              <Link to={`/product/${product.id}`}>
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      product.imageUrl?.trim() ||
                      "https://via.placeholder.com/150"
                    }
                    style={{
                      maxHeight: "100%",
                      width: "auto",
                      objectFit: "contain",
                    }}
                    className="mt-4"
                  />
                </div>
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {product.title || "No Title"}
                  </Link>
                </Card.Title>
                <h5>₹{product.price || "N/A"}</h5>
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
                <Link to={`/product/${product.id}`}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch(addToCart(product)); // Add product to cart
                      dispatch(toggleCart()); // Open the cart drawer
                    }}
                  >
                    Buy Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
