import SplideSlider from "./components/Slides";
import Products from "./components/Products";

const App: React.FC = () => {
  return (
    <section>
      <p className="uppercase font-bold text-2xl indent-8">recommended</p>

      <div>
        <SplideSlider />
      </div>

      <p className="uppercase font-bold text-2xl indent-8 mt-8">products</p>

      <div className="flex items-center justify-center">
        <Products />
      </div>
    </section>
  );
};

export default App;
