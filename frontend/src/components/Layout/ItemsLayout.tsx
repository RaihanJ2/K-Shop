import React from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";
import { motion } from "framer-motion";

export const ItemsLayout: React.FC<ProductType> = ({
  _id,
  title,
  price,
  image,
  category,
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/details/${_id}`}
        className="flex flex-col h-full rounded-lg overflow-hidden shadow-md 
            dark:bg-gray-800 dark:border-gray-700
            bg-white border border-gray-200"
      >
        <div className="relative pt-4 px-4 flex items-center justify-center bg-white">
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            {category}
          </span>
          <img
            className="h-48 object-contain"
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium line-clamp-2 h-12 text-center dark:text-gray-200 text-gray-800">
            {title}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-amber-400">
              ${Number(price).toFixed(2)}
            </span>

            <span
              className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs 
                 dark:bg-gray-700 dark:text-gray-300
                  bg-gray-100 text-gray-600"
            >
              <i className="fa-solid fa-eye mr-1"></i> View
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
