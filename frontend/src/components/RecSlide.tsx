import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ProductType } from "../types";
import { fetchProducts } from "../services/products";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./SwiperSlider.css"; // Create this file for custom styling

const RecSlide: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading recommended products...</div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={10}
      slidesPerView={3}
      centeredSlides={true}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="my-4 mx-20"
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
      }}
    >
      {products.slice(0, 6).map((product) => (
        <SwiperSlide key={product._id}>
          <Link
            to={`/details/${product._id}`}
            className="swiper-slide flex items-center hover:scale-105 active:scale-95 duration-200"
          >
            <div className="flex flex-col items-center justify-center bg-gray-100 border-2 rounded-md shadow-md h-64 w-full py-4 px-2 my-4 mx-2">
              <img
                className="h-3/4 p-2"
                src={product.image}
                alt={product.title}
              />
              <p className="p-4 text-center lg:text-base text-xs dark:text-gray-800">
                {product.title}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecSlide;
