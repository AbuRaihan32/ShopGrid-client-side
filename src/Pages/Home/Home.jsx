import useProducts from "../../Hooks/useProducts";

const Home = () => {
  const { products } = useProducts();
  console.log(products);

  return (
    <div>
      <h1 className="text-3xl">This Is Home Page</h1>
    </div>
  );
};

export default Home;
