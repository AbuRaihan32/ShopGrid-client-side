import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Card from "./Card";

const CardContainer = () => {
  const [numOfPages, setNumOfPage] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8;
  const pages = [...Array(numOfPages).keys()];
  const [searchText, setSearchText] = useState("");
  const [filteredPro, setFilteredPro] = useState([]);

  // Fetch products with pagination and search functionality
  const {
    data: products = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["products", currentPage, searchText],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${currentPage}&size=${itemPerPage}&searchText=${searchText}`
      );
      setNumOfPage(res.data.pageNum);
      return res.data.result;
    },
  });

  useEffect(() => {
    setFilteredPro(products);
  }, [products]);

  // Handle search input change
  const handleSearch = (e) => {
    const searchValue = e.target.search.value;
    setSearchText(searchValue);
    setCurrentPage(0);
  };

  const handleShortBtn = (e) => {
    const selectedValue = e.target.value;
    let sortedPro = [...products];
    if (selectedValue === "ascending") {
      sortedPro.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (selectedValue === "descending") {
      sortedPro.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredPro(sortedPro);
  };

  // Loading state with spinner
  if (isPending || isLoading) {
    return (
      <div className="w-full h-[170px] flex items-center justify-center">
        <PuffLoader color="#25BCCF"></PuffLoader>
      </div>
    );
  }

  return (
    <>
      {/* search and sort */}
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-evenly gap-3 mb-7">
        <div className="relative inline-flex self-center">
          <div className="text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[6px] -right-[6px] m-2 py-[8px] px-5 rounded-r-full">
            <IoIosArrowDown className="text-xl"></IoIosArrowDown>
          </div>
          <select
            onChange={handleShortBtn}
            className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-[300px] pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
          >
            <option>Sort By - </option>
            <option value="descending">Newest first</option>
            <option value="ascending">Oldest first</option>
          </select>
        </div>

        <div className="w-fit">
          <form
            onSubmit={handleSearch}
            className="relative inline-flex self-center"
          >
            <input
              defaultValue={searchText}
              className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-[300px] pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              type="text"
              placeholder="Search"
              name="search"
            />

            <button
              className={`text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[6px] -right-[6px] m-2 py-[12px] px-5 rounded-r-full`}
            >
              <FaSearch className="text-xs"></FaSearch>
            </button>
          </form>
        </div>
      </div>

      {filteredPro.length < 1 ? (
        <div className="w-full h-[200px] flex items-center justify-center font-semibold text-4xl text-center">
          <div>No Product available.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPro?.map((pro) => (
            <Card key={pro._id} pro={pro}></Card>
          ))}
        </div>
      )}

      <div className={`mx-auto w-fit mt-10`}>
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
