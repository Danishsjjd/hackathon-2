import React from "react";
import { useSelector } from "react-redux";

import { getUser } from "../store/authSlice";
import { Card } from "../components";

const WishList = () => {
  const wishlist = useSelector(getUser)?.wishlist;
  return (
    <div className="mx-auto mt-20 max-w-6xl">
      <div className="lg:col-span-3">
        {/* Replace with your content */}
        <div className="block grid-cols-2 gap-6 sm:grid md:grid-cols-3">
          {wishlist.map((product) => {
            return (
              <Card
                key={product?._id}
                id={product?._id}
                description={product?.description}
                image={product?.images[0]?.url}
                price={product?.price}
                offerPrice={product?.offerPrice}
                rating={product?.rating}
                title={product?.title}
                category={product?.category}
              />
            );
          })}
        </div>
        {/* /End replace */}
      </div>
    </div>
  );
};

export default WishList;
