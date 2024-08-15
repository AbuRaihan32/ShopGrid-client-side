import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Home = () => {
    const user = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <h1 className="text-3xl">This Is Home Page</h1>
        </div>
    );
};

export default Home;