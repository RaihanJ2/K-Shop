import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "../SplideSlider.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/products";
import { ProductType } from "../types";

const SplideSlider = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);
  return (
    <Splide
      options={{
        type: "slide",
        perPage: 3,
        focus: "center",
        arrows: true,
        rewind: true,
        autoplay: true,
      }}
      className="my-4 mx-20"
    >
      {products.slice(0, 6).map((product) => (
        <SplideSlide key={product._id}>
          <Link
            to={`/details/${product._id}`}
            className="splide__slide flex items-center hover:scale-105 active:scale-95 duration-200"
          >
            <div className="flex flex-col items-center justify-center bg-white border-2 rounded-md shadow-md h-64 w-full p-4 m-4">
              <img className="h-3/4 p-2" src={product.image} alt="" />
              <p className="p-4 text-center lg:text-base text-xs dark:text-black">
                {product.title}
              </p>
            </div>
          </Link>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideSlider;
