import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { toggleCart, addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || {};
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const api = "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";
  const { data: products, loading, error } = useFetch(api);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products || typeof products !== "object") return;

    const searchTerms = searchTerm.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    if (searchTerms.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const productsArray = Object.values(products);

    // Score products based on match priority
    const scoredProducts = productsArray.map(product => {
      let score = 0;
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";

      searchTerms.forEach(term => {
        // Title matches get highest priority
        if (title.includes(term)) score += 3;
        // Category matches get medium priority
        if (category.includes(term)) score += 2;
        // Description matches get lowest priority
        if (description.includes(term)) score += 1;
      });

      return { ...product, score };
    });

    // Filter and sort products
    const filtered = scoredProducts
      .filter(product => product.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.title.localeCompare(b.title);
      });

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <p className="text-center py-5 text-danger">Error: {error.message}</p>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">Search Results for "{searchTerm}"</h2>
      
      {filteredProducts.length > 0 ? (
        <Row>
          {filteredProducts.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: 'none',
                borderRadius: '8px',
                ':hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-2px)'
                }
              }} className="h-100">
                {/* Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 2,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  aria-label={favorites[product.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24"
                    fill={favorites[product.id] ? "#ff4081" : "none"}
                    stroke={favorites[product.id] ? "#ff4081" : "#666"}
                    strokeWidth="2"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>

                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={product.imageUrl?.trim() || "https://via.placeholder.com/300"}
                      style={{
                        maxHeight: "100%",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2">
                    <Link 
                      to={`/product/${product.id}`} 
                      className="text-dark text-decoration-none"
                    >
                      {product.title || "No Title"}
                    </Link>
                  </Card.Title>
                  <div className="mb-2">
                    <span className="badge bg-light text-dark">{product.category}</span>
                  </div>
                  <h5 className="mb-3">₹{product.price || "N/A"}</h5>
                  <p className="small text-muted mb-3">
                    {product.description?.slice(0, 80) || "No description available"}...
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      className="flex-grow-1"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={() => {
                        dispatch(addToCart(product));
                        dispatch(toggleCart());
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : searchTerm ? (
        <Alert variant="warning">No products found matching "{searchTerm}"</Alert>
      ) : (
        <Alert variant="info">Please enter a search term</Alert>
      )}
    </Container>
  );
};

export default SearchResults;
