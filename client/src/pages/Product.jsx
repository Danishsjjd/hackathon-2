import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ReactComponent as FireIcon } from "../assets/icons/fire.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/header/heart.svg";
import { ReactComponent as FBIcon } from "../assets/icons/social/ic-facebook.svg";
import { ReactComponent as InstaIcon } from "../assets/icons/social/ic-instagram.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/social/ic-twitter.svg";
import { Button, PageNotFound, Reviews, Slider } from "../components";
import { API } from "../libs/axios";
import { getUser, setDialog, setUser } from "../store/authSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishList, setIsWishList] = useState(false);
  const user = useSelector(getUser);
  const toggleWishList = async () => {
    if (Object.keys(user).length < 1) return dispatch(setDialog(true));
    const isInWishList = user.wishlist.find(
      (wishes) => wishes._id === product._id
    );
    if (!isInWishList) {
      try {
        const response = await API.updateWishList({ data: product });
        toast.success(response.data.message);
        dispatch(setUser({ ...user, wishlist: [...user.wishlist, product] }));
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
    } else {
      try {
        const response = await API.removeItemFromWishList({ data: product });
        toast.success(response.data.message);
        const updatedWishlist = user.wishlist.filter((wishes) => {
          return wishes._id !== product._id;
        });
        dispatch(setUser({ ...user, wishlist: [...updatedWishlist] }));
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchProduct = await API.getSingleProduct({ params: id });
        setProduct(fetchProduct.data.product);
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);
  useEffect(() => {
    if (Object.keys(user).length > 0 && product !== null) {
      const inWishlist = user.wishlist.find(
        (wishes) => wishes?._id === product._id
      );
      if (inWishlist) setIsWishList(true);
      else setIsWishList(false);
    } else {
      setIsWishList(false);
    }
  }, [user, product, user.wishlist]);

  return loading ? (
    <div className="min-w-screen mt-16 grid h-full min-h-screen w-full place-items-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  ) : product ? (
    <div className="">
      <div className="mt-16 flex h-14 items-center bg-neutral-lightest text-neutral-darker ">
        <div className="mx-auto flex max-w-7xl flex-1">
          <span className="px-4">
            Home &gt; {product.category} &gt; {product.title}
          </span>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-7xl px-2 lg:p-0">
        <div className="grid-cols-2 items-start gap-3 md:grid ">
          <Slider slides={product.images} />
          <div className="sticky top-16 right-0 space-y-6 bg-white pt-3">
            <h1 className="text-3xl font-medium text-neutral-darkest">
              {product.title}
            </h1>
            <div className="flex justify-between ">
              <div>
                <div className="flex items-baseline gap-3 text-4xl font-bold text-secondary-darkest">
                  <FireIcon />${product.price}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-neutral-darker ">{product.description}</p>
              <div>
                <p>
                  <strong>Location:- </strong> {product.location}
                </p>
                <p>
                  <strong>No. Of Bathrooms:- </strong> {product.Bathrooms}
                </p>
                <p>
                  <strong>No. Of Living Rooms:- </strong> {product.livingRoom}
                </p>
              </div>
              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-1 border-gray-400"
                onClick={() => toggleWishList()}
              >
                <HeartIcon className={`${isWishList ? "fill-red-600" : ""}`} />
              </div>
            </div>
            <a href={`tel:+9203011800058`} className="block">
              <Button
                title={"Buy it now!"}
                ClassName="w-full bg-accent-green hover:!bg-opacity-75"
              />
            </a>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <span className="text-xl font-medium">share</span>
              <a
                className="flex gap-1 rounded-md bg-blue-700/25 p-2 text-center text-blue-700"
                href="https://facebook.com/danishsjjd"
                target={"_blank"}
                rel="noreferrer"
              >
                <FBIcon />
                <span>facebook</span>
              </a>
              <a
                rel="noreferrer"
                className="flex gap-1 rounded-md bg-red-700/25 p-2 text-center text-red-700"
                href="https://instagram.com/danishsjjd"
                target={"_blank"}
              >
                <InstaIcon />
                <span>Instagram</span>
              </a>
              <a
                rel="noreferrer"
                className="flex gap-1 rounded-md bg-cyan-700/25 p-2  text-center text-cyan-700"
                href="https://twitter.com/danishsjjd"
                target={"_blank"}
              >
                <TwitterIcon />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Reviews
        reviews={product.reviews}
        ratings={product.ratings}
        productId={product._id}
        setProduct={setProduct}
        product={product}
      />
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Product;
