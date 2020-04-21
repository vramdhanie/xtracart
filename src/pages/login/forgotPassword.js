import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import classNames from "classnames";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { firebase } = useContext(FirebaseContext);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    }),
    onSubmit: async (values) => {
      try {
        await firebase.resetPassword(values.email);
        setIsPasswordReset(true);
        setPasswordResetError(null);
      } catch (err) {
        console.error("Error sending email", err);
        setPasswordResetError(err.message);
        setIsPasswordReset(false);
      }
    },
  });

  return (
    <div className="p-2">
      <div className="w-1/2 mx-auto my-8">
        <h2 className="font-bold text-xl mb-2 text-gray-700">Reset Password</h2>

        <form onSubmit={formik.handleSubmit} className="w-11/12">
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
          <div className="flex items-center justify-center lg:justify-end py-2">
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Reset Password
            </button>
            <Link
              to="/login"
              className="flex-shrink-0 border-transparent focus:outline-none text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            >
              Cancel
            </Link>
          </div>
        </form>

        {isPasswordReset && (
          <div className="text-gray-800 text-2xl text-center">
            Check email to reset password
          </div>
        )}

        {passwordResetError && (
          <div className="text-red-500 text-sm">{passwordResetError}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
