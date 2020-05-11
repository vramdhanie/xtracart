import React, { useContext, useEffect } from "react";
import OrderSummary from "../../components/checkout/orderSummary";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setHours, setMinutes, add } from "date-fns";
import { FirebaseContext } from "../../firebase";
import classNames from "classnames";

const Checkout = () => {
  const { user, firebase } = useContext(FirebaseContext);

  const formik = useFormik({
    initialValues: {
      store_location: "",
      pickup_time: add(new Date(), { hours: 8 }),
      user_name: user ? user.displayName : "",
      phone_number: "",
      email: user ? user.email : "",
    },
    validationSchema: Yup.object({
      store_location: Yup.string().required("Please select a location"),
      phone_number: Yup.string()
        .matches(/^(\d{3})[- ]?(\d{4})$/, "Phone number is not valid")
        .required("Please provide a phone number"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      user_name: Yup.string().required("Please enter your name"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (user) {
      (async () => {
        let phone = await firebase.getUserPhone(user.uid);
        formik.setFieldValue("phone_number", phone);
      })();
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-0 p-2 grid grid-cols-1 md:grid-cols-3 gap-2 h-full">
      <div className="md:col-span-2 p-2">
        <h2 className="text-xl font-bold border-b border-gray-400 mb-2">
          Getting your order
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="py-1 border-b border-gray-400 mb-2">
            <h2 className="text-lg font-semibold">Pick up location</h2>

            <div className="flex flex-wrap -mx-3 mb-6 mt-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                  htmlFor="store_location"
                >
                  Select a store
                </label>
                <p className="text-xs text-gray-500">
                  This is the location where you pick up your order
                </p>

                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="store_location"
                    {...formik.getFieldProps("store_location")}
                  >
                    <option>Please select a store</option>
                    <option value="grand_bazaar">Grand Bazaar</option>
                    <option value="arima">Arima</option>
                    <option value="xtra_plaza">Xtra Plaza - Chaguanas</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {formik.touched.store_location &&
                formik.errors.store_location ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.store_location}
                  </p>
                ) : null}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                  htmlFor="pickup_time"
                >
                  Pick up time
                </label>
                <p className="text-xs text-gray-500">
                  Choose the date and time of your pickup
                </p>
                <DatePicker
                  showTimeSelect
                  dateFormat="d MMMM yyyy h:mm aa"
                  className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="pickup_time"
                  id="pickup_time"
                  startDate={add(new Date(), { hours: 8 })}
                  minDate={add(new Date(), { hours: 8 })}
                  selected={formik.values.pickup_time}
                  minTime={setHours(setMinutes(new Date(), 30), 8)}
                  maxTime={setHours(setMinutes(new Date(), 30), 17)}
                  onChange={(date) => formik.setFieldValue("pickup_time", date)}
                />
              </div>
            </div>
          </div>

          <div className="py-1 border-b border-gray-400 mb-2">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            {user ? (
              <p>Please ensure your contact details are correct below.</p>
            ) : (
              <p>
                Login or register to be able to view the progress of your order.
                Or continue as guest by providing your contact details below.
              </p>
            )}

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                  htmlFor="user-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="user-name"
                  type="text"
                  placeholder="Jane Doe"
                  name="user_name"
                  {...formik.getFieldProps("user_name")}
                />
                {formik.touched.user_name && formik.errors.user_name ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.user_name}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                  htmlFor="phone_number"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    disabled={true}
                    value="1 (868)"
                    className="text-sm flex-grow-0 flex-shrink-0 w-16 appearance-none block bg-gray-100 text-gray-500 border border-gray-200 rounded-l py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-8"
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
                    id="phone_number"
                    type="text"
                    placeholder="777-1111"
                    name="phone_number"
                    {...formik.getFieldProps("phone_number")}
                  />
                </div>
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.phone_number}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                  {
                    "border-gray-200": !(
                      formik.touched.email && formik.errors.email
                    ),
                    "border-red-500":
                      formik.touched.email && formik.errors.email,
                  }
                )}
                id="email"
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

          <div className="py-2 mb-2 text-center">
            <button
              type="submit"
              className="border border-blue-700 hover:border-blue-500 bg-blue-700 hover:bg-blue-800  text-white hover:text-blue-100    text-base border-4  py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed w-9/12"
            >
              Place your order
            </button>
          </div>
        </form>
      </div>
      <OrderSummary
        location={formik.values.store_location}
        time={formik.values.pickup_time}
      />
    </div>
  );
};

export default Checkout;
