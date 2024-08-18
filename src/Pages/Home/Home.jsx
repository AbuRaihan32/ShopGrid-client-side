import { Helmet } from "react-helmet-async";
import CardContainer from "../../Copmonents/CardContainer";

const Home = () => {
  return (
    <>
    <Helmet>
      <title>ShopGrid || Home</title>
    </Helmet>
      <CardContainer></CardContainer>
    </>
  );
};

export default Home;
