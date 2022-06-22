import React, { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "@context/authContext";
import Footer from "@front/Footer";
import Header from "@front/Header";
import Button from "@ui/Button";
import Modal from "@components/Modal";
import { api, getToken } from "@utils/api";
import Loader from "@utils/Loader";
// import { RiPencilFill } from "react-icons/ri";
import { AiFillStar, AiOutlinePlus, AiFillSetting } from "react-icons/ai";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function BookCard({ book, returnBook, rentedOn, rentId, ...props }) {
  const [reviewForm, setReviewForm] = useState(false);

  const toggleReviewForm = () => {
    setReviewForm(!reviewForm);
  };

  const handleReview = async (data) => {
    try {
      await api.post(
        "/api/v1/review/create",
        {
          rating: data.rating,
          review: data.review,
          book: book._id,
        },
        {
          headers: { Authorization: getToken() },
        }
      );
      toast.success("Review submitted!");
      toggleReviewForm();
    } catch (error) {
      toast.error("Something bad happened!");
    }
  };
  return (
    <div {...props} className="my-2 flex items-center space-x-4">
      {reviewForm && (
        <Modal className="flex-center">
          <ReviewForm onClose={toggleReviewForm} onSubmit={handleReview} />
        </Modal>
      )}
      <img
        alt=""
        src={book.photo}
        className="w-24 h-36 object-cover  rounded flex-shrink-0  cursor-pointer "
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
        <p className="text-sm  text-gray-500">
          Submission date :{" "}
          {moment(new Date(rentedOn)).add(5, "days").calendar()}
        </p>
        <Button
          onClick={toggleReviewForm}
          btnType="outline-small"
          className="mt-2 mr-2"
        >
          Write Review
        </Button>
        <Button
          onClick={() => returnBook(rentId)}
          btnType="outline-small"
          className="mt-2"
        >
          Return
        </Button>
      </div>
    </div>
  );
}

function ReviewForm({ onClose, onSubmit }) {
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState(5);

  return (
    <div className="bg-white rounded w-11/12 p-4 text-gray-800">
      <h4 className="text-sm font-medium flex items-center justify-between  ">
        Write Review{" "}
        <span
          onClick={onClose}
          className="h-8 w-8 rounded-full bg-gray-100 flex-center"
        >
          <AiOutlinePlus
            className="text-gray-700 transform rotate-45"
            size={18}
          />
        </span>
      </h4>
      <div className="flex flex-col items-start my-2">
        <label className="mb-1 text-sm text-gray-400">
          write your review here
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          type="text"
          className="p-2 rounded border focus:ring focus:ring-blue-400 focus:border-0 outline-none border-gray-400 bg-white text-sm w-full"
        ></textarea>
      </div>
      <div className="w-8/12 mx-auto flex justify-around items-center">
        <p
          onClick={() => setStar(5)}
          className={`text-2xl ${
            star === 5 ? "border-b-2" : ""
          } border-blue-400 text-center`}
        >
          😍
        </p>
        <p
          onClick={() => setStar(4)}
          className={`text-2xl ${
            star === 4 ? "border-b-2" : ""
          } border-blue-400 text-center`}
        >
          🤩
        </p>
        <p
          onClick={() => setStar(3)}
          className={`text-2xl ${
            star === 3 ? "border-b-2" : ""
          } border-blue-400 text-center`}
        >
          😊
        </p>
        <p
          onClick={() => setStar(2)}
          className={`text-2xl ${
            star === 2 ? "border-b-2" : ""
          } border-blue-400 text-center`}
        >
          😌
        </p>
        <p
          onClick={() => setStar(1)}
          className={`text-2xl ${
            star === 1 ? "border-b-2" : ""
          } border-blue-400 text-center`}
        >
          🙁
        </p>
      </div>
      <Button
        btnType="outline-small"
        className="ml-auto block mt-4"
        onClick={() => {
          onSubmit({ rating: star, review: feedback });
        }}
      >
        Submit
      </Button>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const [books, setBooks] = useState([]);
  const { fetchUser, name, enrollment, photo } = useContext(AuthContext);

  const handleReturnBook = async (id) => {
    try {
      setLoaded(false);
      const res = await api.get(`/api/v1/book/return/${id}`, {
        headers: { Authorization: getToken() },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const renderBooks = () => {
    return books.map((curr, ind) => {
      return (
        <BookCard
          key={ind}
          returnBook={handleReturnBook}
          book={curr.book}
          rentId={curr._id}
          rentedOn={curr.createdAt}
        />
      );
    });
  };

  useEffect(() => {
    if (!name) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await api.get("/api/v1/book/my-book", {
        headers: { Authorization: getToken() },
      });
      setBooks(data.books);
      setLoaded(false);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <Header />
      {loaded && <Loader />}

      <div className="my-4 px-4 text-gray-800 min-h-[70vh]">
        <div className="flex items-center ">
          <img
            alt=""
            src={photo}
            className="h-24 w-24 rounded-full object-cover mr-2"
          />
          <div>
            <p className="text-lg font-medium flex items-center capitalize ">
              {name}
              {/* <RiPencilFill size={16} className="ml-2" /> */}
            </p>
            <p className="text-base text-gray-500 ">{enrollment}</p>
          </div>
          <AiFillSetting
            className="ml-auto cursor-pointer"
            onClick={() => navigate("/setting")}
            size={24}
          />
        </div>
        <div className="my-4">
          <h4 className="text-base font-medium ">My Books</h4>
          {Boolean(books.length) ? (
            <div>{renderBooks()}</div>
          ) : (
            <p className="text-center text-xl my-20 text-gray-500">
              You have no books to read 🥲!!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
