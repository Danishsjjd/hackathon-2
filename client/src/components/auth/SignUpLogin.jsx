import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Formik } from "formik";

import login_signUp from "../../assets/images/auth/login_SignUp.jpg";
import { ReactComponent as Google } from "../../assets/icons/social/ic-google.svg";
import { ReactComponent as Logo } from "../../assets/logo-black.svg";
import Input from "../form/Input";
import Button from "../Button";
import default_img from "../../assets/default_img.jpg";
import useSignUpLogin from "./useSignUpLogin";
import ErrorMessage from "../form/ErrorMessage";

export default function SignUpLogin() {
  const {
    closeModal,
    haveAccount,
    initialData,
    isOpen,
    loginValidation,
    onSubmit,
    setHaveAccount,
    signUpValidation,
    onImageChange,
    image,
    setAgreeTerms,
    googleLogin,
    forgetPassword,
  } = useSignUpLogin();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="hidden sm:block">
                      <img
                        src={login_signUp}
                        alt="login "
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Logo className="w-24" />
                      <h1 className="text-lg  font-medium">
                        {haveAccount ? "Welcome Back" : "Hello Friends!!!"}
                      </h1>
                      <button
                        className="min-w-210 flex w-full items-center justify-center gap-3 rounded-full bg-white p-4 text-center shadow-lg"
                        onClick={googleLogin}
                      >
                        <Google /> Sign up with Google
                      </button>
                      <div className="!my-3 flex items-center justify-center gap-2 px-3">
                        <div className="h-1 flex-1 rounded-full bg-neutral-lightest" />
                        <p className=" font-bold">or</p>
                        <div className="h-1 flex-1 rounded-full bg-neutral-lightest" />
                      </div>
                      <Formik
                        validationSchema={
                          haveAccount ? loginValidation : signUpValidation
                        }
                        initialValues={initialData}
                        onSubmit={onSubmit}
                      >
                        {({ handleSubmit, errors, touched, setFieldValue }) => (
                          <>
                            {!haveAccount && (
                              <div>
                                <label className="block text-center text-sm font-medium text-gray-700">
                                  Photo
                                </label>
                                <div className="mt-1 flex flex-col items-center gap-3">
                                  <div className="grid h-full max-h-[100px] w-full max-w-[100px] place-items-center overflow-hidden rounded-full">
                                    <img
                                      src={image || default_img}
                                      alt="user default "
                                      className={`w-full ${
                                        image
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
                            )}
                            {/* end */}
                            {!haveAccount && (
                              <div>
                                <p>Username</p>
                                <Input name="username" app />
                              </div>
                            )}
                            <div>
                              <p>Your email</p>
                              <Input name="email" app />
                            </div>
                            <div>
                              <p>Password</p>
                              <Input name="password" app type="password" />
                            </div>
                            {haveAccount && (
                              <span
                                className="block cursor-pointer text-right hover:text-blue-700"
                                onClick={forgetPassword}
                              >
                                forget password?
                              </span>
                            )}
                            {!haveAccount && (
                              <div className="!my-2 flex justify-center">
                                <div className="form-check ml-2 flex gap-2">
                                  <input
                                    type="checkbox"
                                    id="flexCheckIndeterminate"
                                    className="checkbox checkbox-primary accent-secondary-darker focus:outline-1 focus:outline-secondary-darker focus:ring-0"
                                    onChange={(e) =>
                                      setAgreeTerms(e.target.checked)
                                    }
                                  />
                                  <label
                                    className="form-check-label inline-block text-xs text-gray-800 sm:text-base"
                                    htmlFor="flexCheckIndeterminate"
                                  >
                                    By submitting this form you agree to our
                                    Terms and Conditions
                                  </label>
                                </div>
                              </div>
                            )}
                            <div className="!my-2 text-center">
                              <Button
                                title={`${
                                  haveAccount ? "Login" : "create Account"
                                }`}
                                app
                                ClassName={"text-center"}
                                onClick={handleSubmit}
                              />
                            </div>
                            <p className="!mt-2 text-center">
                              {haveAccount
                                ? "Not a Member?"
                                : "Already a member?"}{" "}
                              <span
                                className="cursor-pointer text-[#2F80ED]"
                                onClick={() => setHaveAccount((pre) => !pre)}
                              >
                                {haveAccount ? "Sign In" : "Login"}
                              </span>
                            </p>
                          </>
                        )}
                      </Formik>
                    </div>
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
