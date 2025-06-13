import React, { useState } from 'react'
import ProductPage from '../Product/ProductPage'
import Category from '../Category/Category'
import HeroCarousel from './HeroCarousel';

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
      <h3 className="text-center my-4">Our Top Picks</h3>

      <HeroCarousel />
      <section className="my-5">
        <h3 className="text-center my-4">Shop by Category</h3>
        <Category onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </section>
      <section className="my-5">
        <h3 className="text-center mb-4">Featured Products</h3>
        <ProductPage />
      </section>
    </>
  )
}

export default Home
