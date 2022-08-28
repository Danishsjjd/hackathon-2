import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { API } from "../../libs/axios";
import Button from "../Button";
import Input from "../form/Input";

export default function ResetPassword({ token }) {
  const [isOpen, setIsOpen] = useState(() => (token ? true : false));
  const closeModal = () => {
    setIsOpen(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required().label("New Password"),
    confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await API.resetPassword({ data: values, params: token });
      setIsOpen(false);
      toast.success(response.data.message);
      resetForm();
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
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
                    <h2 className="py-2 text-center text-2xl font-bold">
                      Update Password
                    </h2>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ handleSubmit }) => {
                        return (
                          <>
                            <div>
                              <h2 className="mb-1 mt-2 text-lg">Password</h2>
                              <Input name="password" app type="password" />
                            </div>
                            <div>
                              <h2 className="mb-1 mt-2 text-lg">
                                Confirm Password
                              </h2>
                              <Input
                                name="confirmPassword"
                                app
                                type="password"
                              />
                            </div>
                            <Button
                              app
                              title={"Reset Now!"}
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
