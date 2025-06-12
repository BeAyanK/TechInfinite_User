import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch"; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName).toLowerCase().trim();

  const api = 'https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json';
  const { data, loading, error } = useFetch(api);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || typeof data !== "object") return null;

  const products = Object.values(data).filter(
    (product) =>
      product.category &&
      product.category.toLowerCase().trim() === decodedCategory
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-capitalize">{decodedCategory} Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body">
                  <h5>{product.title}</h5>
                  <p>{product.description}</p>
                  <p className="fw-bold">₹{product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
