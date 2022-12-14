import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";

import { API } from "../../libs/axios";
import {
  getUpdateProfile,
  getUser,
  setUpdateProfile,
  setUser,
} from "../../store/authSlice";
import Input from "../form/Input";
import Button from "../Button";
import ErrorMessage from "../form/ErrorMessage";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const user = useSelector(getUser);
  const isOpen = useSelector(getUpdateProfile);

  const closeModal = () => {
    dispatch(setUpdateProfile(false));
  };

  const validationSchema = Yup.object().shape({
    avatar: Yup.string(),
    username: Yup.string(),
  });
  const initialValues = {
    avatar: "",
    username: user.username,
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await API.UpdateProfile({ data: values });
      toast.success(response.data.message);
      resetForm();
      dispatch(setUser(response.data.updatedUser));
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    } finally {
      dispatch(setUpdateProfile(false));
    }
  };

  const onImageChange = (e, setFiledValue) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const extension = reader.result?.split(";")[0]?.split("/")[1];
      if (reader.readyState === 2) {
        if (
          extension === "jpeg" ||
          extension === "png" ||
          extension === "jpg"
        ) {
          setImage(reader.result);
          setFiledValue(e.target.name, reader.result);
        } else return toast.error("Only image is valid for profile");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="space-y-5 divide-y-2 divide-neutral-lighter">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ handleSubmit, setFieldValue, errors, touched }) => {
                        return (
                          <>
                            <div>
                              <label className="block text-center text-lg font-medium text-gray-700">
                                Photo
                              </label>
                              <div className="mt-1 flex flex-col items-center gap-3">
                                <div className="h-40 w-40 overflow-hidden rounded-full">
                                  <img
                                    src={image || user.avatar.url}
                                    alt="user default"
                                    className={`h-full w-full ${
                                      user.avatar.url
                                        ? "object-cover"
                                        : "bg-[#999] object-contain"
                                    }`}
                                  />
                                </div>
                                <button className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:outline-secondary-darker focus:ring-2 focus:ring-offset-2">
                                  <label htmlFor="userAvatar">Upload</label>
                                </button>
                                <input
                                  type="file"
                                  name="avatar"
                                  id="userAvatar"
                                  className="hidden"
                                  onChange={(e) =>
                                    onImageChange(e, setFieldValue)
                                  }
                                  accept="image/png, image/jpeg"
                                />
                                <ErrorMessage
                                  err={errors["avatar"]}
                                  visible={touched["avatar"]}
                                />
                              </div>
                            </div>
                            <div>
                              <h2 className="mb-1 mt-2 text-lg">
                                Email (immutable)
                              </h2>
                              <Input
                                name="email"
                                app
                                type="email"
                                value={user.email}
                                disabled
                              />
                            </div>
                            <div>
                              <h2 className="mb-1 mt-2 text-lg">username</h2>
                              <Input name="username" app type="text" />
                            </div>
                            <Button
                              app
                              title={"Update Profile!"}
                              onClick={handleSubmit}
                            />
                          </>
                        );
                      }}
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
