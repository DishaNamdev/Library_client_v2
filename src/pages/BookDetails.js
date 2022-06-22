import React, { useEffect, useState } from "react";
import Footer from "@front/Footer";
import Header from "@front/Header";
import Button from "@ui/Button";
import Loader from "@utils/Loader";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { api, getToken } from "@utils/api";
import { toast } from "react-hot-toast";

function BookDetails() {
  const [loaded, setLoaded] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({
    name: "",
    author: "",
    photo: "",
    quantity: 0,
  });
  const params = useParams();

  const handleRentingBook = async () => {
    try {
      setRequesting(true);
      const res = await api.get(`/api/v1/book/rent/${params.id}`, {
        headers: { Authorization: getToken() },
      });
      toast.success("Book added to your library 🤩!");
      setRequesting(false);
    } catch (error) {
      setRequesting(false);
      toast.error(error.response.data.message);
    }
  };

  const renderReviews = () => {
    return reviews.map((curr, ind) => {
      return <ReviewCard review={curr} key={ind} />;
    });
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await api.get(`/api/v1/book/${params.id}`, {
          headers: { Authorization: getToken() },
        });

        if (data.status === "success") {
          setBook(data.book);
        }
        setLoaded(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    const fetchBookReviews = async () => {
      try {
        const { data } = await api.get(`/api/v1/review?book=${params.id}`, {
          headers: { Authorization: getToken() },
        });
        setReviews(data.reviews);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchBookDetails();
    fetchBookReviews();
  }, []);

  return (
    <div>
      <Header />
      {loaded && <Loader />}
      <div className="px-4 my-4">
        <div className="flex items-start space-x-2">
          <img
            alt=""
            src={book.photo}
            className="w-32 h-52 object-cover rounded flex-shrink-0 mr-4 cursor-pointer "
          />
          <div className="text-base ">
            <p>{book.name}</p>
            <p className="text-sm text-gray-500 ">by {book.author}</p>
            {book.quantity >= 1 ? (
              <span className="p-1 w-max px-2 bg-green-500 my-2 block text-center text-xs text-white rounded">
                Available
              </span>
            ) : (
              <span className="p-1 w-max px-2 bg-red-500 my-2 block text-center text-xs text-white rounded">
                Not Available
              </span>
            )}

            <Button
              btnType="fill-small"
              disabled={book.quantity <= 0}
              onClick={handleRentingBook}
            >
              {requesting ? "Please wait" : " Rent Now"}
            </Button>
          </div>
        </div>
        <div className="my-4">
          <h4 className="text-base font-medium ">Reviews</h4>
          {Boolean(reviews.length) ? (
            renderReviews()
          ) : (
            <p className="text-center text-xl my-20 text-gray-500">
              No reviews yet 🥲!!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookDetails;
