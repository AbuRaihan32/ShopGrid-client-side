import { useLoaderData } from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import Card from "./Card";
import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CardContainer = ({ count }) => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;
  const numOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numOfPages).keys()];

  console.log(pages);

  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", currentPage, itemPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((pro) => (
          <Card key={pro._id} pro={pro}></Card>
        ))}
      </div>

      <div className="mx-auto w-fit mt-10">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold"
        >
          «
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-blue-800 text-white px-3 py-2 rounded-lg font-semibold ml-2"
                : "px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold ml-2 "
            }
            key={page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)
          }
          className="px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold ml-2"
        >
          »
        </button>
      </div>
    </>
  );
};

export default CardContainer;
