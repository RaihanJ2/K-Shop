import SplideSlider from "./components/Slides";
import Products from "./components/Products";

const App: React.FC = () => {
  return (
    <section className="">
      <p className="uppercase font-bold text-2xl indent-8">recommended</p>

      <SplideSlider />
      <p className="uppercase font-bold text-2xl indent-8">products</p>

      <div className="flex items-center justify-center">
        <Products />
      </div>
    </section>
  );
};

export default App;
