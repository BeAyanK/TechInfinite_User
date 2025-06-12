
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const Category = () => {
  const api = 'https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json';
  const { data, loading, error } = useFetch(api);
  const navigate = useNavigate(); 

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error.message}</p>;
  if (!data || typeof data !== 'object') return null;

  const categories = Object.entries(data).map(([id, item]) => ({
    id,
    ...item,
  }));

  return (
    <div className="px-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div
              role="button"
              onClick={() => navigate(`/category/${encodeURIComponent(cat.title)}`)}
              className="bg-white text-dark border shadow-sm p-3 d-flex flex-column align-items-center"
              style={{
                borderRadius: "10px",
                height: "100%",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              <img
                src={cat.imageUrl?.trim() || "https://via.placeholder.com/150"}
                alt={cat.title}
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p className="mt-2 fw-semibold text-center">{cat.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
