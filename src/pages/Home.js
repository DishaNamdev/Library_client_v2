import React, { useEffect, useState } from "react";
import Footer from "@front/Footer";
import Header from "@front/Header";
import Loader from "@utils/Loader";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { api, getToken } from "@utils/api";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const renderBooks = () => {
    const obj = {};
    books.forEach((book) => {
      if (obj[book.subjectCode]) {
        obj[book.subjectCode].push(book);
      } else {
        obj[book.subjectCode] = [];
        obj[book.subjectCode].push(book);
      }
    });

    return Object.keys(obj).map((curr, ind) => {
      const jsx = obj[curr].map((book, ind) => {
        return (
          <Link
            key={ind}
            to={`/book/${book._id}`}
            className="block flex-shrink-0"
          >
            <img
              alt=""
              src={book.photo}
              className="w-32 h-52 block object-cover  rounded mr-4 cursor-pointer "
            />
          </Link>
        );
      });
      return (
        <React.Fragment key={ind}>
          <h4 className="text-base font-medium ">{obj[curr][0].subject}</h4>
          <div className="py-4 flex items-center overflow-auto flex-nowrap scrollbar-hide">
            {jsx}
          </div>
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await api.get("/api/v1/book/", {
        headers: { Authorization: getToken() },
      });

      setBooks(data.books);
      setLoaded(false);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      {loaded && <Loader />}
      <Header />
      <div
        onClick={() => navigate("/search")}
        className="p-3 bg-white shadow-md rounded m-4 flex items-center "
      >
        <input
          type="text"
          placeholder="Search books"
          className="h-full w-full flex-grow outline-none focus:ring-0 text-sm mr-4"
        />
        <FiSearch size={24} className="cursor-pointer " />
      </div>

      <div className="px-4 my-4">{renderBooks()}</div>
      <Footer />
    </div>
  );
}

export default Home;
