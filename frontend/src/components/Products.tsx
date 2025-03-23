import React, { useEffect, useState } from "react";
import { Grid } from "./Layout/Grid";
import { ItemsLayout } from "./Layout/ItemsLayout";
import { fetchProducts } from "../services/products";
import { ProductType } from "../types";

const Products: React.FC = () => {
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
    <section className="flex items-center justify-center">
      <Grid>
        {products.map((product) => (
          <ItemsLayout
            key={product._id}
            _id={product._id}
            title={product.title}
            category={product.category}
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Products;
