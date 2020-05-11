import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";

const Login = () => {
  const history = useHistory();
  let { next = "/" } = useParams();
  if (!next.startsWith("/")) {
    next = `/${next}`;
  }
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Please enter a password"),
      phoneNumber: Yup.string().matches(
        /^(\d{3})[- ]?(\d{4})$/,
        "Phone number is not valid"
      ),
      //.required("Please provide a phone number"),
    }),
    onSubmit: async (values) => {
      const { fullName, phoneNumber, email, password } = values;

      try {
        login
          ? await firebase.login(email, password)
          : await firebase.register(fullName, phoneNumber, email, password);
        history.push(next);
      } catch (err) {
        console.error("Authentication Error", err);
        setFirebaseError(err.message);
      }
    },
  });

  return (
    <div className="p-2">
      <div className="w-1/2 mx-auto my-8">
        <h2 className="font-bold text-xl mb-2 text-gray-700">
          {login ? "Login" : "Create an account"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-11/12">
          {!login && (
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-full-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-full-name"
                  type="text"
                  placeholder="Jane Doe"
                  name="fullName"
                  {...formik.getFieldProps("fullName")}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-phone-number"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    disabled={true}
                    value="1 (868)"
                    className="flex-grow-0 flex-shrink-0 w-16 appearance-none block bg-gray-100 text-gray-500 border border-gray-200 rounded-l py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-8"
                  />
                  <input
                    className={classNames(
                      "flex-1",
                      "appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                      {
                        "border-gray-200": !(
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        ),
                        "border-red-500":
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber,
                      }
                    )}
                    id="grid-phone-number"
                    type="text"
                    placeholder="777-1111"
                    name="phoneNumber"
                    {...formik.getFieldProps("phoneNumber")}
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.phoneNumber}
                  </p>
                ) : null}
              </div>
            </div>
          )}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email <span className="text-red-500">*</span>
              </label>

              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                  {
                    "border-gray-200": !(
                      formik.touched.email && formik.errors.email
                    ),
                    "border-red-500":
                      formik.touched.email && formik.errors.email,
                  }
                )}
                id="grid-email"
                type="email"
                placeholder="Your email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              <p className="text-gray-600 text-xs italic"></p>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                  {
                    "border-gray-200": !(
                      formik.touched.password && formik.errors.password
                    ),
                    "border-red-500":
                      formik.touched.password && formik.errors.password,
                  }
                )}
                id="grid-password"
                type="password"
                placeholder="******************"
                name="password"
                {...formik.getFieldProps("password")}
              />
              <p className="text-gray-600 text-xs italic">
                Must be at least 6 characters long
              </p>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
          {firebaseError && (
            <div className="text-red-500 text-sm"> {firebaseError}</div>
          )}
          <div className="flex items-center justify-center lg:justify-end py-2">
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {login ? "Log in" : "Sign Up"}
            </button>
            <button
              className="flex-shrink-0 border-transparent focus:outline-none text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
              type="button"
              onClick={() => setLogin((prevLogin) => !prevLogin)}
            >
              {login
                ? "Need to create an account?"
                : "Already have an account?"}
            </button>
          </div>
        </form>
        <div className="border-t border-gray-200 text-center p-4 mt-2">
          <Link to="/forgot" className="text-blue-800 hover:text-teal-500">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
