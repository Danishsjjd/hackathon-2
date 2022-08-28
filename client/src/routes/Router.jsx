import { AnimatePresence } from "framer-motion";
import { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { Search } from "../components";

import { Footer, Header } from "../layout";
import { API } from "../libs/axios";
import {
	AboutUs,
	Blog,
	ContactUs,
	Home,
	Shope,
	Product,
	Cart,
	CreateProduct,
	WishList,
} from "../pages";
import { getUser, setLogin, setUser } from "../store/authSlice";
import { setCart } from "../store/cartSlice";
import { addProduct } from "../store/productSlice";
import AdminRouter from "./AdminRouter";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const id = useId();
	const location = useLocation();
	const locationArr = location.pathname?.split("/") ?? [];
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await API.me({});
				dispatch(setUser(response?.data));
				dispatch(setLogin(true));
				try {
					const cart = await API.getCart({ params: response.data._id });
					dispatch(setCart(cart.data.products));
				} catch (e) {}
			} catch (e) {
				dispatch(setUser({}));
				dispatch(setLogin(false));
			}
		};
		const getProductsFunc = async () => {
			try {
				const response = await API.getAllProduct({});
				dispatch(addProduct(response?.data?.products));
			} catch (e) {}
		};
		getUser();
		getProductsFunc();
	}, []);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<AnimatePresence mode="wait" initial={false}>
			<Header key={id + "-header"} activeShop={locationArr[1] === "shope"} />
			<Routes location={location} key={id}>
				<Route
					path="/createProduct"
					element={<PrivateRoutes element={<CreateProduct />} role={"user"} />}
				/>
				<Route
					path="/wishList"
					element={<PrivateRoutes element={<WishList />} role={"user"} />}
				/>
				<Route path="/search" element={<Search />} />
				<Route path="/" element={<Footer />}>
					<Route index element={<Home />} />
					<Route path="/shope" element={<Shope />} />
					<Route path="/product/search/:id" element={<Shope />} />
					<Route path="/Contact" element={<ContactUs />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/Cart" element={<Cart />} />
				</Route>
				<Route path="/blog" element={<Blog />} />
			</Routes>
		</AnimatePresence>
	);
};

export default Router;