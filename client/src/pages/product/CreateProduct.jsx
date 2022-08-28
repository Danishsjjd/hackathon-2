import { Formik } from "formik";
import { IoMdAddCircle } from "react-icons/io";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ColorRing } from "react-loader-spinner";

import {
  AreaTextField,
  Button,
  ErrorMessage,
  FormDropDown,
  Input,
} from "../../components";
import { productCategory } from "../../constants/data";
import MountTransition from "../../utils/MountTransition";
import useCreateProduct from "./useCreateProduct";

const CreateProducts = () => {
  const {
    images,
    createProductImagesChange,
    validationSchema,
    handleSubmit,
    loading,
  } = useCreateProduct();
  return (
    <MountTransition className="mt-16 p-4">
      {!loading ? (
        <Formik
          initialValues={{
            title: "",
            description: "",
            images: [],
            category: "Apartment",
            price: "",
            location: "",
            Bathrooms: "",
            livingRoom: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            submitForm,
            values,
          }) => (
            <>
              <div className="h-96 rounded">
                {images.length < 1 ? (
                  <div className="flex h-full w-full items-center justify-center rounded bg-accent text-xl font-medium text-white dark:bg-black sm:text-4xl">
                    Please select images
                  </div>
                ) : images?.length === 1 ? (
                  <img
                    src={images[0]}
                    alt="not found"
                    className="h-full w-full overflow-hidden rounded object-cover"
                  />
                ) : (
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper h-full w-full"
                  >
                    {images.map((buffer, index) => (
                      <SwiperSlide className="h-full w-full" key={index}>
                        <img
                          src={buffer}
                          alt="not found"
                          className="h-full w-full overflow-hidden rounded object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              {images.length < 1 && (
                <ErrorMessage
                  err={errors["images"]}
                  visible={touched["images"]}
                />
              )}
              <div className="my-3 flex flex-col gap-3 sm:flex-row">
                <label>
                  <IoMdAddCircle className="text-5xl text-accent" />
                  <input
                    type="file"
                    name="images"
                    id="images"
                    className="pointer-events-none hidden max-w-0 select-none bg-transparent"
                    accept="image/png, image/jpeg"
                    onChange={(e) =>
                      createProductImagesChange(e, setFieldValue)
                    }
                    multiple
                    onBlur={(e) => setFieldTouched(e.target.name)}
                  />
                </label>
                <div className="flex-1">
                  <Input
                    type="text"
                    name={"title"}
                    placeholder="Title of Product"
                    className={"bg-transparent dark:text-white"}
                  />
                </div>
                <div>
                  <Button
                    onClick={() => submitForm()}
                    title="Add Product"
                    ClassName={"dark:bg-black"}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="ml-14">
                    <FormDropDown
                      name={"category"}
                      list={productCategory}
                      side="right"
                    />
                  </div>
                </div>
                <ErrorMessage
                  err={errors["inStock"]}
                  visible={touched["inStock"]}
                  additionalClasses="text-center"
                />
                <h2 className="heading mt-3 text-center ">Select category</h2>
              </div>
              <div className="my-4 flex gap-6">
                <div className="flex-grow ">
                  <Input
                    name="price"
                    type="number"
                    className={
                      "flex-grow bg-transparent focus:ring-0 dark:text-white"
                    }
                    placeholder="Price"
                    min={0}
                  />
                </div>
                <div className="flex-grow ">
                  <Input
                    name="phoneNumber"
                    type="number"
                    className={
                      "flex-grow bg-transparent focus:ring-0 dark:text-white"
                    }
                    placeholder="Enter Phone Number"
                    min={0}
                  />
                </div>
                <div>
                  <Input
                    name="location"
                    type="text"
                    className={
                      "flex-grow bg-transparent focus:ring-0 dark:text-white"
                    }
                    placeholder="location"
                    min={0}
                  />
                </div>
                <div>
                  <Input
                    name="Bathrooms"
                    type="number"
                    className={
                      "flex-grow bg-transparent focus:ring-0 dark:text-white"
                    }
                    placeholder="No. of Bathrooms"
                    min={0}
                  />
                </div>
                <div>
                  <Input
                    name="livingRoom"
                    type="number"
                    className={
                      "flex-grow bg-transparent focus:ring-0 dark:text-white"
                    }
                    placeholder="No. of Living Room"
                    min={0}
                  />
                </div>
              </div>
              <h2 className="heading my-2 mt-4">Descriptions</h2>
              <AreaTextField
                name={"description"}
                placeholder="Enter Your product descriptions"
                className={
                  "text-xl font-medium dark:bg-transparent dark:text-white"
                }
              />
            </>
          )}
        </Formik>
      ) : (
        <div className="grid h-screen w-screen place-items-center">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </MountTransition>
  );
};

export default CreateProducts;
