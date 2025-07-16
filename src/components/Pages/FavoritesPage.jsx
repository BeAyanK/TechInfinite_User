import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { toggleCart, addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";

const FavoritesPage = () => {
    const dispatch = useDispatch();

    const { data: products, loading, error } = useFetch(
        "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );

    // Load favorites from localStorage on component mount
    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            return storedFavorites ? JSON.parse(storedFavorites) : {};
        } catch (error) {
            console.error("Error reading favorites from localStorage:", error);
            return {};
        }
    });

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (productId) => {
        setFavorites(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error: {error.message}</p>;

    // Filter products to only show favorited ones
    const favoriteProducts = products?.filter(product =>
        product.id && favorites[product.id]
    ) || [];

    if (favoriteProducts.length === 0) {
        return (
            <Container className="mt-5">
                <Alert variant="info">You haven't favorited any products yet.</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Favorites</h2>
            <Row>
                {favoriteProducts.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card style={{
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            ':hover': {
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                transform: 'translateY(-2px)'
                            }
                        }} className="h-100">
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: 2,
                                    backgroundColor: 'white',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product.id);
                                }}
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
                            </div>
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
                                            dispatch(addToCart(product));
                                            dispatch(toggleCart());
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

export default FavoritesPage;
