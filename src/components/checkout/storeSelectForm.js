import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const StoreSelectForm = () => {
  const formik = useFormik({
    initialValues: {
      store_location: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="py-1 border-b border-gray-400 mb-2">
      <h2 className="text-lg font-semibold">Pick up location</h2>
      <form onSubmit={formik.handleSubmit} className="w-11/12">
        <div className="flex flex-wrap -mx-3 mb-6 mt-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-full-name"
            >
              Select a store
            </label>
            <p className="text-xs text-gray-500">
              This is the location where you pick up your order
            </p>

            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="store_location"
                {...formik.getFieldProps("store_location")}
              >
                <option>Grand Bazaar</option>
                <option>Arima</option>
                <option>Xtra Plaza - Chaguanas</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreSelectForm;
