import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, description, image, price, title, category }) => {
	const navigation = useNavigate();
	const handleClick = () => {
		navigation(`/product/${id}`);
	};
	return (
		<div
			className="card w-full bg-base-100 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
			onClick={handleClick}
		>
			<figure>
				<img src={image} alt={title} />
			</figure>
			<div className="card-body !p-3">
				<h2 className="card-title">
					<span className="line-clamp-1 !text-base">{title}</span>
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