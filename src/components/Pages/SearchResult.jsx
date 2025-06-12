import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("q") || "";

  const api =
    "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";

  const { data: products, loading, error } = useFetch(api);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products) return;

    const filtered = products.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h3>Search Results for "{searchTerm}"</h3>
      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted">Category: {product.category}</p>
                  <p className="card-text">₹{product.price}</p>
                  <p className="card-text small">
                    {product.description?.slice(0, 100) || "No description"}...
                  </p>
                  <Link to={`/product/${product.id}`} className="btn btn-success btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
