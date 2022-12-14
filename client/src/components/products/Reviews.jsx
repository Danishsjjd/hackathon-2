import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";

import { getUser, setDialog } from "../../store/authSlice";
import ReviewForm from "./ReviewForm";
import { Image } from "cloudinary-react";
import { toast } from "react-toastify";
import { API } from "../../libs/axios";
import { useState } from "react";
import { useEffect } from "react";

const Reviews = ({ reviews, ratings, productId, setProduct, product }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [total, setTotal] = useState(0);
  const [percentRating, setPercentRating] = useState(0);
  const deleteReview = async (id) => {
    try {
      const response = await API.deleteReview({
        query: `productId=${productId}&id=${id}`,
      });
      setProduct(response.data.updatedProduct);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  };
  useEffect(() => {
    let finalReview = 0;
    reviews.map((review) => {
      return (finalReview += review.rating);
    });
    setPercentRating(ratings * 20);
    setTotal(finalReview);
  }, [reviews, ratings]);
  const toggleLike = async (id) => {
    if (Object.keys(user).length < 1) return dispatch(setDialog(true));
    try {
      const response = await API.toggleLikeReview({
        data: { authorEmail: user.email, revId: id },
      });
      const updatedReviews = reviews.map((review) => {
        if (review._id === response.data.review._id) {
          return { ...review, likes: response.data.review.likes };
        }
        return review;
      });
      setProduct({ ...product, reviews: updatedReviews });
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
    }
  };
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 lg:p-0">
      <span className="!mb-2 block sm:!mb-5">Reviews</span>
      <div className="flex justify-between">
        <h1 className="w-full max-w-lg font-bold sm:text-4xl">
          What people says about this House
        </h1>
        <div>
          {reviews.length === 0 ? (
            <span>This product is not rated yet</span>
          ) : (
            <div className="max-w-[400px] ">
              <Rating
                name="size-large"
                value={ratings}
                readOnly
                className="text-right"
                size="large"
              />
              <p className="text-left">
                {total} out of {reviews.length * 5} ({percentRating}%) <br />{" "}
                {percentRating > 65
                  ? "Customers recommended this product"
                  : "Customers don't recommended this product"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="my-10 h-1 w-full rounded bg-gray-200" />
      <div className="flex grid-cols-3 flex-col-reverse items-start gap-8 px-1 sm:px-4 md:grid lg:px-0">
        {/* review */}
        <div className="col-span-2 max-w-2xl divide-y">
          {reviews.map((review) => {
            const liked = review.likes.find((email) => email === user.email);
            return (
              <div className="space-y-2 p-4" key={review.user.email}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        cloudName={process.env.REACT_APP_CLOUD_NAME}
                        publicId={review.user.avatar.public_id}
                        width="40"
                        height="40"
                        alt="user image"
                        className="h-full w-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {review.user.username}
                      </h3>
                      <p>{new Date(review.updatedAt).toDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Rating readOnly name="size-medium" value={review.rating} />
                    {user?.email === review?.user?.email ? (
                      <FaRegTrashAlt
                        className="cursor-pointer text-xl text-neutral-darker hover:text-neutral-darkest"
                        onClick={() => deleteReview(review._id)}
                      />
                    ) : null}
                  </div>
                </div>
                <p className="text-neutral-darker">{review.review}</p>
                <button
                  className={
                    "flex cursor-pointer gap-1 font-medium hover:text-blue-600 " +
                    `${liked ? "text-blue-600" : ""}`
                  }
                  onClick={() => toggleLike(review._id)}
                >
                  <span>{review?.likes?.length || "0"}</span>
                  Like
                </button>
              </div>
            );
          })}
        </div>
        <ReviewForm user={user} productId={productId} setProduct={setProduct} />
      </div>
    </div>
  );
};

export default Reviews;
