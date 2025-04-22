import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsById } from "../../services/products";
import { addToCart } from "../../services/cart";
import { ProductType } from "../../types";
import RecSlide from "../../components/RecSlide";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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
      await addToCart(product._id, quantity);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const plusQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const minQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex border border-gray-300 dark:border-gray-600 rounded">
              <button
                onClick={minQuantity}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                -
              </button>
              <span className=" cursor-default px-4 py-1 flex items-center justify-center">
                {quantity}
              </span>
              <button
                onClick={plusQuantity}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                +
              </button>
            </div>
          </div>

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
        <RecSlide />
      </div>
    </section>
  );
};

export default Details;
