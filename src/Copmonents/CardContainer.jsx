import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Card from "./Card";
import { CiFilter } from "react-icons/ci";

const CardContainer = () => {
  // State for pagination
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 8; // Number of items per page

  // State for search and filters
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Axios instance for API requests
  const axiosPublic = useAxiosPublic();

  // Fetch products with pagination, search, and filters
  const {
    data: products = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: [
      "products",
      currentPage,
      searchText,
      brandFilter,
      categoryFilter,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/products?page=${currentPage}&size=${itemPerPage}&searchText=${searchText}&brand=${brandFilter}&category=${categoryFilter}&min=${minPrice}&max=${maxPrice}`
      );
      setNumOfPages(response.data.pageNum);
      return response.data.result;
    },
  });

  // Update filtered products whenever products data changes
  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Handle search input change
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    setSearchText(searchValue);
    setCurrentPage(0); // Reset to first page on new search
  };

  // Handle sorting
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    const sortedProducts = [...products];

    // Sorting logic
    switch (selectedValue) {
      case "ascending":
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "descending":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  // Handle filter submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setBrandFilter(form.brand.value);
    setCategoryFilter(form.category.value);
    setMinPrice(form.minPrice.value);
    setMaxPrice(form.maxPrice.value);
  };

  // Loading state with spinner
  if (isPending || isLoading) {
    return (
      <div className="w-full h-[170px] flex items-center justify-center">
        <PuffLoader color="#25BCCF" />
      </div>
    );
  }

  return (
    <>
      {/* Search, sort, and filter section */}
      <div className="grid grid-cols-5 gap-3 mb-7">
        {/* Sorting */}
        <div className="relative inline-flex self-center w-full col-span-2">
          <div className="text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[6px] -right-[6px] m-2 py-[8px] px-5 rounded-r-full pointer-events-none">
            <IoIosArrowDown className="text-xl" />
          </div>
          <select
            onChange={handleSortChange}
            className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-full pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
          >
            <option>Sort By - </option>
            <option value="descending">Newest first</option>
            <option value="ascending">Oldest first</option>
            <option value="lowToHigh">Price: Low to high</option>
            <option value="highToLow">Price: High to low</option>
          </select>
        </div>

        {/* Search */}
        <div className="w-full col-span-2">
          <form
            onSubmit={handleSearch}
            className="relative inline-flex self-center w-full"
          >
            <input
              defaultValue={searchText}
              className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 w-full pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              type="text"
              placeholder="Search"
              name="search"
            />
            <button className="text-white text-xl bg-gradient-to-r from-[#25BCCF] to-[#2EE9B1] absolute -top-[6px] -right-[6px] m-2 py-[12px] px-5 rounded-r-full">
              <FaSearch className="text-xs" />
            </button>
          </form>
        </div>

        {/* Filters with drawer */}
        <div className="drawer drawer-end z-50">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="border-2 px-5 py-2 rounded-full flex items-center justify-center gap-2 w-full border-[#2EE9B1]"
            >
              <CiFilter />
              <p>Filters</p>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <form
              onSubmit={handleFilterSubmit}
              className="flex flex-col gap-3 mb-7 bg-base-200 text-base-content min-h-full w-[400px] p-10"
            >
              {/* Brand Filter */}
              <select
                defaultValue={brandFilter}
                name="brand"
                className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              >
                <option value="">All Brands</option>
                <option value="SoundWave">SoundWave</option>
                <option value="VisionTech">VisionTech</option>
                <option value="ComfortSeat">ComfortSeat</option>
                <option value="GamerX">GamerX</option>
                <option value="PhotoMaster">PhotoMaster</option>
                <option value="AudioPro">AudioPro</option>
                <option value="SmartHome">SmartHome</option>
                <option value="TechAudio">TechAudio</option>
              </select>

              {/* Category Filter */}
              <select
                defaultValue={categoryFilter}
                name="category"
                className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Photography">Photography</option>
                <option value="Computers">Computers</option>
                <option value="Furniture">Furniture</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Wearables">Wearables</option>
                <option value="Accessories">Accessories</option>
                <option value="Personal Care">Personal Care</option>
              </select>

              {/* Price Range Filter */}
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                defaultValue={minPrice}
                className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 pl-5 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                defaultValue={maxPrice}
                className="text-xl border-2 border-[#2EE9B1] text-gray-600 h-10 pl-5 bg-white hover:border-[#25BCCF] focus:outline-none appearance-none rounded-full"
              />

              <button className="btn btn-accent">Apply</button>
            </form>
          </div>
        </div>
      </div>

      {/* Display products */}
      {filteredProducts.length < 1 ? (
        <div className="w-full h-[200px] flex items-center justify-center font-semibold text-4xl text-center">
          <div>No Product available.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div
        className={`mx-auto w-fit mt-10 ${numOfPages === 0 ? "hidden" : ""}`}
      >
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold"
        >
          «
        </button>
        {Array.from({ length: numOfPages }, (_, page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-blue-800 text-white px-3 py-2 rounded-lg font-semibold ml-2"
                : "px-3 py-2 bg-gray-200 rounded-lg text-black font-semibold ml-2"
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < numOfPages - 1 && setCurrentPage(currentPage + 1)
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
