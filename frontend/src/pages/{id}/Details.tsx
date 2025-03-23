import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SplideSlider from "../../components/Slides";
import { fetchProductsById } from "../../services/products";
import { addToCart } from "../../services/cart";
import { ProductType } from "../../types";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (id) {
          const data = await fetchProductsById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <section
      key={id}
      className="w-full h-full justify-center items-center py-4 px-8"
    >
      <div className=" w-full h-1/2 flex flex-row gap-4 justify-evenly rounded border-2 dark:border-white border-transparent mb-8">
        <div className="w-1/2 bg-white flex justify-center items-center">
          <img
            className="p-4 w-1/2"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <div className="flex flex-col gap-10 w-1/2 h-1/2 py-4 pr-10">
          <h1 className="lg:text-3xl md:text-xl sm:text-lg text-sm uppercase text-left">
            {product?.title}
          </h1>
          <h1 className=" md:text-sm sm:text-xs capitalize text-left">
            {product?.category}
          </h1>

          <h2 className="lg:text-xl md:text-lg sm:text-base text-sm w-1/6 text-center font-bold dark:text-white text-black ">
            ${product?.price}
          </h2>
          <button
            onClick={handleAddToCart}
            className="w-1/4 hover:scale-105 active:scale-95 duration-200 border-2 font-semibold border-black dark:border-white rounded py-2 text-center capitalize "
          >
            add to cart
          </button>
          <p className="indent-8 text-justify lg:text-lg md:text-base sm:text-sm text-xs">
            {product?.description}
          </p>
        </div>
      </div>
      <div className="mx-14 h-1/2">
        <p className="uppercase font-bold text-2xl indent-8">recommended</p>
        <SplideSlider />
      </div>
    </section>
  );
};

export default Details;
