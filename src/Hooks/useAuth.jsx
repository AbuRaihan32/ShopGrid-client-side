import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const authInfo = useContext(AuthContext);
const useAuth = () => {
  return authInfo; 
};

export default useAuth;
