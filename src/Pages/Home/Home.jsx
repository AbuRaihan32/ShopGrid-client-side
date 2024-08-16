import { useLoaderData } from "react-router-dom";
import CardContainer from "../../Copmonents/CardContainer";

const Home = () => {
  const {count} = useLoaderData();
  return <CardContainer count={count}></CardContainer>;
};

export default Home;
