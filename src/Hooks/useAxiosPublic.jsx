import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://shop-grid-server-side.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
