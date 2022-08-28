import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

import { ReactComponent as FireIcon } from "../assets/icons/fire.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/header/heart.svg";
import { ReactComponent as FBIcon } from "../assets/icons/social/ic-facebook.svg";
import { ReactComponent as InstaIcon } from "../assets/icons/social/ic-instagram.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/social/ic-twitter.svg";
import { Button, PageNotFound, Reviews, Slider } from "../components";
import { API } from "../libs/axios";
import { getUser, setUser, setDialog } from "../store/authSlice";
import { getCart, setCart } from "../store/cartSlice";

const Product = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [toCart, setToCart] = useState(1);
	const [isWishList, setIsWishList] = useState(false);
	const user = useSelector(getUser);
	const cart = useSelector(getCart);
	const toggleWishList = async () => {
		if (Object.keys(user).length < 1) return dispatch(setDialog(true));
		const isInWishList = user.wishlist.find(
			(wishes) => wishes._id == product._id
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
					return wishes._id != product._id;
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
	}, []);
	useEffect(() => {
		if (Object.keys(user).length > 0 && product !== null) {
			const inWishlist = user.wishlist.find(
				(wishes) => wishes?._id == product._id
			);
			if (inWishlist) setIsWishList(true);
			else setIsWishList(false);
		} else {
			setIsWishList(false);
		}
	}, [user, product, user.wishlist]);

	return loading ? (
		<div className="mt-16 min-h-screen min-w-screen w-full h-full grid place-items-center">
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
			<div className="h-14 bg-neutral-lightest text-neutral-darker flex items-center mt-16 ">
				<div className="flex max-w-7xl mx-auto flex-1">
					<span className="px-4">
						Home &gt; {product.category} &gt; {product.title}
					</span>
				</div>
			</div>
			<div className="mt-6 max-w-7xl mx-auto lg:p-0 px-2">
				<div className="md:grid grid-cols-2 gap-3 items-start ">
					<Slider slides={product.images} />
					<div className="space-y-6 sticky top-16 right-0 bg-white pt-3">
						<h1 className="text-3xl font-medium text-neutral-darkest">
							{product.title}
						</h1>
						<div className="flex justify-between ">
							<div>
								<div className="text-4xl text-secondary-darkest font-bold flex gap-3 items-baseline">
									<FireIcon />${product.price}
								</div>
							</div>
						</div>
						<div className="space-y-3">
							<p className="text-neutral-darker ">{product.description}</p>
							{/* <div className="flex gap-3 items-center">
								<div className="flex items-center gap-5">
									<span className="text-lg hidden sm:inline">quantity</span>
									<span className="rounded-full border-1 border-gray-200 py-2 px-3 flex text-neutral-darker font-bold">
										<span
											className="text-4xl select-none cursor-pointer"
											onClick={() =>
												setToCart((pre) => {
													if (pre >= product.inStock) return product.inStock;
													else return ++pre;
												})
											}
										>
											+
										</span>
										<input
											type="number"
											className="max-w-[60px] lg:max-w-[150px] text-center focus:outline-none outline-none border-none focus:border-none focus:ring-0"
											placeholder="1"
											value={toCart}
											min={1}
											max={product.inStock}
											onChange={(e) => setToCart(e.target.value)}
										/>
										<span
											className="text-4xl select-none cursor-pointer"
											onClick={() =>
												setToCart((pre) => {
													if (pre <= 1) return 1;
													else return --pre;
												})
											}
										>
											-
										</span>
									</span>
								</div>
								<Button
									app
									title="Add to Cart"
									ClassName="flex-1"
									onClick={() => addToCart()}
								/>
							</div> */}
							<div
								className="flex rounded-full w-12 h-12 border-gray-400 items-center justify-center border-1 cursor-pointer"
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
						<div className="flex items-center gap-2 flex-col sm:flex-row">
							<span className="text-xl font-medium">share</span>
							<a
								className="p-2 text-center gap-1 bg-blue-700/25 text-blue-700 rounded-md flex"
								href="https://facebook.com/danishsjjd"
								target={"_blank"}
							>
								<FBIcon />
								<span>facebook</span>
							</a>
							<a
								className="p-2 text-center gap-1 bg-red-700/25 text-red-700 rounded-md flex"
								href="https://instagram.com/danishsjjd"
								target={"_blank"}
							>
								<InstaIcon />
								<span>Instagram</span>
							</a>
							<a
								className="p-2 text-center gap-1 bg-cyan-700/25 text-cyan-700  rounded-md flex"
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