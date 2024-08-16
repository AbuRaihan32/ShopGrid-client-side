import Card from "../../Copmonents/Card";
import useProducts from "../../Hooks/useProducts";

const Home = () => {
  const { products } = useProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((pro) => (
        <Card key={pro._id} pro={pro}></Card>
      ))}
    </div>
  );
};

export default Home;
