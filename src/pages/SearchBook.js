import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@ui/Button";
import { api, getToken } from "@utils/api";
import { AiFillStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import _ from "lodash";

function BookCard({ book, rentBook }) {
  const navigate = useNavigate();

  return (
    <div className="my-2 flex items-center space-x-4">
      <img
        alt=""
        src={book.photo}
        className="w-24  rounded flex-shrink-0  cursor-pointer "
      />
      <div>
        <p className="text-base ">{book.name}</p>
        <p className="text-sm text-gray-500 ">{book.subject}</p>
        <div className="flex items-center my-2">
          <AiFillStar size={18} className="text-yellow-500 mr-1" />
          <AiFillStar size={18} className="text-yellow-500 mr-1" />
          <AiFillStar size={18} className="text-yellow-500 mr-1" />
          <AiFillStar size={18} className="text-yellow-500 mr-1" />
          <AiFillStar size={18} className="text-gray-200 mr-1" />
        </div>
        <p className="text-sm  text-gray-500">2 days left</p>
        <div className="flex space-x-2">
          <Button
            btnType="outline-small"
            onClick={() => navigate(`/book/${book._id}`)}
            className="mt-2"
          >
            View
          </Button>
          <Button
            onClick={() => {
              rentBook(book._id);
            }}
            btnType="fill-small"
            className="mt-2"
          >
            Rent
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchBook() {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleRentingBook = async (id) => {
    try {
      await api.get(`/api/v1/book/rent/${id}`, {
        headers: { Authorization: getToken() },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const renderBooks = () => {
    return result.length ? (
      result.map((curr, ind) => {
        return <BookCard book={curr} key={ind} rentBook={handleRentingBook} />;
      })
    ) : (
      <p className="text-lg text-center my-20 text-gray-500 ">
        No result found 🥲!!
      </p>
    );
  };

  const handleBookSearch = useCallback(
    _.throttle(async (text) => {
      if (text) {
        setSearching(true);
        const { data } = await api.get(`/api/v1/book/search?query=${text}`, {
          headers: { Authorization: getToken() },
        });
        setSearching(false);
        setResult(data.result);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    handleBookSearch(query);
  }, [query]);
  return (
    <div>
      <div className="flex p-2 items-center">
        <div className="p-3 bg-white shadow-md rounded flex items-center flex-grow ">
          <IoArrowBackOutline
            onClick={() => navigate(-1)}
            size={24}
            className="flex-shrink-0 cursor-pointer mr-2"
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search books"
            className="h-full w-full flex-grow outline-none focus:ring-0 text-sm mr-4"
          />
          <FiSearch size={24} className="flex-shrink-0 cursor-pointer " />
        </div>
      </div>
      <div className="p-2">
        {searching ? (
          <p className="text-lg text-center my-20 text-gray-500 ">
            Searching...
          </p>
        ) : (
          renderBooks()
        )}
      </div>
    </div>
  );
}

export default SearchBook;
