import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

function ReviewCard({ review }) {
  return (
    <div className="mb-4">
      <div className="bg-white p-4 rounded my-2">
        <div className="flex items-center mb-2">
          {new Array(review.rating).fill(-1).map((curr, ind) => {
            return (
              <AiFillStar
                size={22}
                key={ind}
                className="text-yellow-500 mr-1"
              />
            );
          })}
          {new Array(5 - review.rating).fill(-1).map((curr, ind) => {
            return (
              <AiFillStar size={22} key={ind} className="text-gray-200 mr-1" />
            );
          })}
        </div>
        <p className="text-sm font-light">{review.review}</p>
        <span className="font-medium text-sm italic flex items-center mt-2 ">
          {review.user.name} <BsDot /> 1st year
        </span>
      </div>
    </div>
  );
}

export default ReviewCard;
