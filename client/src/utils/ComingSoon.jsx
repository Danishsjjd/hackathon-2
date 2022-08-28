import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import bg from "../assets/images/Blog_image.jpg";
import { Button, Input } from "../components";
import CountDown from "./CountDown";

const ComingSoon = ({ title, desc, date }) => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover pt-20 text-white "
      style={{ background: `url(${bg}) center black no-repeat` }}
    >
      <div className="mx-auto grid w-full max-w-2xl items-center justify-center gap-8 px-4">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold sm:text-4xl">{title}</h2>
          <p className="text-sm sm:text-base">{desc}</p>
        </div>
        <CountDown date={date} />
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    name="email"
                    app
                    className="flex-1 flex-grow !bg-transparent focus:border-secondary-darker focus:text-secondary-darker"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div>
                  <Button title={"Submit"} onClick={handleSubmit} app />
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
