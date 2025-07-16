import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Carousel } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../../store/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : {};
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return {};
    }
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = () => {
    setFavorites(prev => {
      const newFavorites = {
        ...prev,
        [id]: !prev[id]
      };
      return newFavorites;
    });
  };

  const { data: product, loading, error } = useFetch(
    `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`
  );

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <p className="text-center py-5 text-danger">Error: {error.message}</p>;
  if (!product) return <p className="text-center py-5 text-warning">Product not found.</p>;

  // Create array of images
  const images = [
    product.imageUrl?.trim() || "https://via.placeholder.com/600x600?text=No+Image",
    ...(product.additionalImages || []).map(img => img?.trim()).filter(Boolean)
  ];

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <div className="position-absolute end-0 top-0 p-3 z-1">
              <Button 
                variant="light" 
                className="rounded-circle p-2" 
                onClick={toggleFavorite}
                aria-label={favorites[id] ? "Remove from favorites" : "Add to favorites"}
              >
                {favorites[id] ? 
                  <HeartFill className="text-danger" size={20} /> : 
                  <Heart className="text-muted" size={20} />}
              </Button>
            </div>
            
            <Carousel 
              activeIndex={activeIndex} 
              onSelect={setActiveIndex}
              indicators={images.length > 1}
              controls={images.length > 1}
              variant="dark"
              className="bg-light rounded-top"
            >
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div className="ratio ratio-1x1">
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="d-block w-100 p-4 object-fit-contain"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            {images.length > 1 && (
              <div className="d-flex flex-wrap gap-2 p-3 bg-white rounded-bottom">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`border ${activeIndex === idx ? 'border-primary' : 'border-light'} p-0 bg-white rounded`}
                    style={{ width: '60px', height: '60px', overflow: 'hidden' }}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 h-100">
            <Card.Body className="d-flex flex-column h-100">
              <div className="mb-3">
                <Badge bg="light" text="dark" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="h3 mb-2">{product.title}</h1>
                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    ★★★★★ <span className="text-muted">(24 reviews)</span>
                  </div>
                </div>
                <h2 className="text-primary mb-3">₹{product.price}</h2>
              </div>

              <div className="mb-4">
                <h5 className="mb-2">Description</h5>
                <p className="text-muted">{product.description || "No description available."}</p>
              </div>

              {product.specifications && (
                <div className="mb-4">
                  <h5 className="mb-2">Specifications</h5>
                  <ul className="list-unstyled text-muted">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key} className="mb-1">
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-3">
                <div className="d-flex gap-3 mb-3">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="flex-grow-1"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-grow-1"
                    onClick={() => {
                      dispatch(addToCart(product));
                      dispatch(toggleCart());
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
                <div className="d-flex gap-2 text-muted small">
                  <span>Free shipping</span>
                  <span>•</span>
                  <span>30-day returns</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
