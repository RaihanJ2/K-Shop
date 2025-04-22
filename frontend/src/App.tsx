import Products from "./components/Products";
import RecSlide from "./components/RecSlide";

const App: React.FC = () => {
  return (
    <section>
      <p className="uppercase font-bold text-2xl indent-8">recommended</p>

      <div className="px-20">
        <RecSlide />
      </div>

      <p className="uppercase font-bold text-2xl indent-8 mt-8">products</p>

      <div className="flex items-center justify-center">
        <Products />
      </div>
    </section>
  );
};

export default App;
