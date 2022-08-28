import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, description, image, price, title, category, grid }) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation(`/product/${id}`);
  };
  return (
    <div
      className="card w-full cursor-pointer bg-base-100 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={handleClick}
    >
      <figure className="w-full">
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover ${
            grid ? "max-h-[200px] min-h-[200px]" : "max-h-[250px] min-h-[250px]"
          }`}
        />
      </figure>
      <div className="card-body !p-3">
        <h2 className="card-title">
          <span className="!text-base line-clamp-1">{title}</span>
          <div className="badge badge-primary text-white">${price}</div>
        </h2>
        <p className="line-clamp-2">{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
