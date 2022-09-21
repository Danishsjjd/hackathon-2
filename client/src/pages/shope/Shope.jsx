import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { Slider, styled } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { Button, Card } from "../../components";
import { filters, sortOptions, subCategories } from "../../constants/filters";
import { getProducts } from "../../store/productSlice";
import MetaData from "../../utils/MetaData";
import MountTransition from "../../utils/MountTransition";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CusSlider = styled(Slider)({
  color: "#e9672b",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#e9672b",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function Shope() {
  const [value, setValue] = useState([20, 500]);
  const [loading, setLoading] = useState(true);
  const products = useSelector(getProducts);
  const [grid, setGrid] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const { id } = useParams();

  const isDateChange = useRef(false);
  const category = searchParams.get("category");
  let cards = [];

  const onCategoryChange = (e) => {
    if (e.target.checked) {
      if (category === null) {
        setSearchParams({ category: e.target.name });
      } else {
        setSearchParams({ category: category + "," + e.target.name });
      }
    } else {
      const updatedFilter = selectedCategory.filter(
        (catName) => catName !== e.target.name
      );
      setSelectedCategory(updatedFilter);
      setSearchParams({ category: updatedFilter.join(",") });
    }
  };

  useEffect(() => {
    if (category !== null && category !== "")
      setSelectedCategory(category.toLowerCase().split(","));
    else setSelectedCategory([]);
  }, [category]);

  useEffect(() => {
    if (products.length > 0) setLoading(false);
    else setLoading(true);
  }, [products]);

  products?.forEach((product) => {
    if (
      selectedCategory.length > 0 &&
      !selectedCategory.includes(product.category.toLowerCase())
    )
      return;
    if (product.price <= value[0] || product.price >= value[1]) return;
    if (
      isDateChange.current &&
      new Date(startDate) > new Date(product.createdAt)
    )
      return;
    if (id && !product?.title?.toLowerCase()?.includes(id?.toLowerCase()))
      return;

    cards.push(
      <Card
        key={product?._id}
        id={product?._id}
        description={product?.description}
        image={product?.images[0]?.url}
        price={product?.price}
        offerPrice={product?.offerPrice}
        rating={product?.ratings}
        title={product?.title}
        category={product?.category}
        reviews={product?.reviews}
        grid={grid}
        createdAt={product?.createdAt}
      />
    );
  });

  if (sort === "Best Rating") {
    cards = cards.sort((a, b) => {
      return b.props.rating - a.props.rating;
    });
  } else if (sort === "Newest") {
    cards = cards.sort((a, b) => {
      return new Date(b.props.createdAt) - new Date(a.props.createdAt);
    });
  }

  return (
    <MountTransition>
      <MetaData title={"Shope"} />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
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
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul className="px-2 py-3 font-medium text-gray-900">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <Link
                              to={category.href}
                              className="block px-2 py-3"
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                          defaultOpen
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        type="checkbox"
                                        className="checkbox checkbox-primary h-4 w-4 accent-secondary-darker focus:outline-1 focus:outline-secondary-darker focus:ring-0"
                                        name={`${option.value}`}
                                        defaultChecked={
                                          selectedCategory.includes(
                                            option.value
                                          )
                                            ? true
                                            : option.checked
                                        }
                                        onChange={onCategoryChange}
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <Disclosure
                        as="div"
                        className="mx-3 border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  Price Range
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <CusSlider
                                getAriaLabel={() => "Price range"}
                                value={value}
                                onChange={(e, updatedValue) =>
                                  setValue(updatedValue)
                                }
                                valueLabelDisplay="auto"
                                getAriaValueText={(value) => `${value}$`}
                                min={10}
                                max={1000}
                              />
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure
                        as="div"
                        className="mx-3 border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  Created After
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="space-y-3 pt-6">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  isDateChange.current = true;
                                }}
                                maxDate={Date.now()}
                              />
                              <Button
                                title={"Clear Time"}
                                onClick={() => {
                                  setStartDate(Date.now());
                                  isDateChange.current = false;
                                }}
                                ClassName="ml-auto p-2 block "
                              />
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <span
                                to={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() => setSort(option.name)}
                              >
                                {option.name}
                              </span>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 hidden p-2 text-gray-400 hover:text-gray-500 sm:ml-7 sm:block"
                  onClick={() => setGrid((pre) => !pre)}
                >
                  {grid ? (
                    <AiOutlineUnorderedList
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <Link to={category.href}>{category.name}</Link>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                      defaultOpen
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    type="checkbox"
                                    className="checkbox checkbox-primary h-4 w-4 accent-secondary-darker focus:outline-1 focus:outline-secondary-darker focus:ring-0"
                                    name={`${option.value}`}
                                    defaultChecked={
                                      selectedCategory.includes(option.value)
                                        ? true
                                        : option.checked
                                    }
                                    onChange={onCategoryChange}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Price Range
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <CusSlider
                            getAriaLabel={() => "Price range"}
                            value={value}
                            onChange={(e, updatedValue) =>
                              setValue(updatedValue)
                            }
                            valueLabelDisplay="auto"
                            getAriaValueText={(value) => `${value}$`}
                            min={10}
                            max={1000}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Created After
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="space-y-3 pt-6">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              isDateChange.current = true;
                            }}
                            maxDate={Date.now()}
                          />
                          <Button
                            title={"Clear Time"}
                            onClick={() => {
                              setStartDate(Date.now());
                              isDateChange.current = false;
                            }}
                            ClassName="ml-auto p-2 block "
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  {!loading ? (
                    <div
                      className={`block grid-cols-2 gap-6 space-y-6 md:grid-cols-3  ${
                        grid ? "sm:grid sm:!space-y-0" : "space-y-6"
                      }`}
                    >
                      {cards.length > 0 ? (
                        [cards]
                      ) : (
                        <div className="text-lg font-medium">
                          {selectedCategory.length > 0
                            ? `we don't currently have item in
                          ${selectedCategory.join(", ")}`
                            : "There is not Item in this filter"}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={[
                          "#e15b64",
                          "#f47e60",
                          "#f8b26a",
                          "#abbd81",
                          "#849b87",
                        ]}
                      />
                    </div>
                  )}
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </MountTransition>
  );
}
