import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';  

const api =
  'https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json';

const getRandomItems = (arr, n) => {
  const result = [];
  const taken = new Set();

  while (result.length < n && result.length < arr.length) {
    const index = Math.floor(Math.random() * arr.length);
    if (!taken.has(index)) {
      taken.add(index);
      result.push(arr[index]);
    }
  }

  return result;
};

const HeroCarousel = () => {
  const { data: products, loading, error } = useFetch(api);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      // pick 3 random products
      const randomProducts = getRandomItems(products, 3);
      setFeaturedProducts(randomProducts);
    }
  }, [products]);

  if (loading) return <p>Loading featured products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  if (featuredProducts.length === 0) return <p>No featured products available.</p>;

  return (
    <Carousel fade interval={4000} controls={false} indicators pause={false}>
      {featuredProducts.map(({ id, title, description, imageUrl }) => (
        <Carousel.Item key={id}>
          <img
            className="d-block w-100"
            src={imageUrl}
            alt={title}
            style={{ maxHeight: '400px', objectFit: 'contain' ,padding:'20px', backgroundColor:'#fff' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>{title}</h3>
            <p>{description || 'Great product for your needs'}</p>
            <Button as={Link} to={`/product/${id}`} variant="success">
              View Product
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
