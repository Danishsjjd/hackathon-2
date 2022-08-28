import { Dialog, Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Image } from "cloudinary-react";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ReactComponent as Heart } from "../assets/icons/header/heart.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/header/search.svg";
import { ReactComponent as User } from "../assets/icons/header/user.svg";
import logo from "../assets/logo-black.svg";
import { DropDown } from "../components";
import { shope, userDropdown } from "../constants/data";
import { getUser, setDialog } from "../store/authSlice";

export default function Header({ activeShop }) {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(window.pageYOffset);
  const dispatch = useDispatch();
  const [showHeader, setShowHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector(getUser);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchParams] = useSearchParams();

  const err = searchParams.get("err");

  const userClickHandle = (link) => {
    if (!user?.email) return dispatch(setDialog(true));
    navigate(link);
  };

  const MotionLink = motion(NavLink);
  const UserImage = user.avatar && (
    <Image
      alt={"user profile"}
      className="h-6 w-6 rounded-full"
      cloudName={process.env.REACT_APP_CLOUD_NAME}
      publicId={user.avatar.public_id}
      width="24"
      height="24"
    />
  );

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setShowHeader(scrollY > moving);
      setScrollY(moving);
      setActiveIndex(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    if (err === "emailExists") {
      toast.error("Email is already register through email password");
      dispatch(setDialog(true));
    }
  }, [err, dispatch]);

  return (
    <div
      className={`fixed top-0 z-30 w-full transition-transform duration-500 ${
        showHeader ? "translate-y-0" : "-translate-y-[70px]"
      } `}
    >
      <div className="mx-auto max-w-7xl">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Links */}
                  <div className="space-y-6 border-t border-gray-200 py-6 px-4 text-center">
                    {shope.pages.map((page) => {
                      if (!user.email && page.to === "/createProduct")
                        return null;
                      return (
                        <div key={page.name} className="flow-root ">
                          <NavLink
                            to={page.to}
                            className="-m-2 block border-b-1 p-2 font-medium text-gray-900"
                            onClick={() => setOpen(false)}
                          >
                            {page.name}
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" space-y-6 py-6 px-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl bg-white px-4 shadow sm:px-6 lg:px-8 "
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center lg:justify-between">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <NavLink to="/">
                    <span className="sr-only">Home</span>
                    <img className="h-8 w-auto" src={logo} alt="" />
                  </NavLink>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="mx-auto hidden lg:block lg:self-stretch">
                  <motion.div
                    className="flex h-full gap-8"
                    onHoverEnd={() => setActiveIndex(null)}
                  >
                    {shope.pages.map((page, index) => {
                      if (!user.email && page.to === "/createProduct")
                        return null;
                      return (
                        <MotionLink
                          key={index}
                          to={page.to}
                          className={({ isActive }) =>
                            `${
                              isActive && activeIndex === null && !activeShop
                                ? "border-neutral-darkest text-neutral-darkest"
                                : "text-neutral-darker hover:text-neutral-darkest"
                            } relative flex items-center overflow-hidden text-sm font-medium ${
                              page.className
                            }`
                          }
                          onHoverStart={() => setActiveIndex(index)}
                        >
                          {({ isActive }) => {
                            const isBorderActive = index === activeIndex;
                            return (
                              <>
                                {isBorderActive && (
                                  <motion.span
                                    layoutId="border"
                                    className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                  />
                                )}
                                {activeIndex === null && isActive === true && (
                                  <motion.span
                                    layoutId="border"
                                    className={`text-bold absolute bottom-0 h-2 w-full border-b-2 border-neutral-darkest text-neutral-darkest transition-none`}
                                  />
                                )}
                                {page.name}
                              </>
                            );
                          }}
                        </MotionLink>
                      );
                    })}
                  </motion.div>
                </Popover.Group>

                <div className="ml-auto flex items-center -space-x-2 sm:space-x-1 lg:ml-0">
                  {/* Search */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <Link
                      className="cursor-pointer p-2 text-gray-400 hover:text-gray-500"
                      to="/search"
                    >
                      <span className="sr-only">Search</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* heart */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <span className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Wishlist</span>
                      <Heart
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={() => userClickHandle("/wishlist")}
                      />
                    </span>
                  </div>

                  {/* user */}
                  <div className="flex rounded-md bg-white text-gray-400 lg:ml-6">
                    <span className="cursor-pointer p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Profile</span>
                      {user?.avatar ? (
                        <DropDown
                          anchor={UserImage}
                          list={userDropdown}
                          side="left"
                        />
                      ) : user.googleAvatar ? (
                        <DropDown
                          anchor={
                            <img
                              src={user.googleAvatar}
                              alt="user profile pic"
                              className="h-6 w-6 rounded-full"
                            />
                          }
                          list={userDropdown}
                          side="left"
                        />
                      ) : (
                        <User
                          className="h-6 w-6 "
                          fill="red"
                          stock="blue"
                          onClick={() => dispatch(setDialog(true))}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
