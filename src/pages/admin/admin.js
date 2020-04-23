import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

const Admin = () => {
  const { firebase } = useContext(FirebaseContext);
  const [categories, setCategories] = useState([]);
  const categoryForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(
        4,
        "Category name must be at least 4 characters long"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      await firebase.db.collection("categories").add(values);
      resetForm();
    },
  });

  const productForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      size: "",
      unit: "",
      brand: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "Product name must be at least 4 characters long")
        .required("Please enter a product name"),
      price: Yup.number().positive("Price cannot be less than 0"),
      size: Yup.number().positive("Size must be greater than 0"),
      image: Yup.string().url("Not a valid URL"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await firebase.db.collection("products").add(values);
      resetForm();
    },
  });

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("categories")
      .onSnapshot(handleCategorySnapshot);
    return unsubscribe;
  }, [firebase.db]);

  function handleCategorySnapshot(snapshot) {
    setCategories(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }
  return (
    <div>
      <h1>The admin page</h1>
      <div className="w-11/12 shadow mx-auto my-2 rounded">
        <h2 className="bg-gray-500 text-white text-xl p-1 rounded-t">
          Categories
        </h2>
        <div className="p-2">
          <form
            onSubmit={categoryForm.handleSubmit}
            className="w-full flex items-center"
          >
            <label className="mx-2" htmlFor="catName">
              Category name:{" "}
            </label>
            <div className="flex-1 flex flex-col m-2">
              <input
                className="border-b border-b-gray-500"
                type="text"
                id="catName"
                name="name"
                placeholder="Category Name"
                {...categoryForm.getFieldProps("name")}
              />

              <p
                className={classNames("text-xs italic", {
                  "text-red-500":
                    categoryForm.touched.name && categoryForm.errors.name,
                  "text-gray-400": !(
                    categoryForm.touched.name && categoryForm.errors.name
                  ),
                })}
              >
                Category name must be at least 4 characters long
              </p>
            </div>

            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={categoryForm.isSubmitting}
            >
              Add Category
            </button>
          </form>
        </div>

        <div className="border-t border-t-gray-400 mt-2 p-2">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="w-3/4 px-4 py-2 text-left border-b border-b-gray-300">
                  Name{" "}
                </th>
                <th className="w-1/4 px-4 py2 border-b border-b-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr className="" key={cat.id}>
                  <td className="w-3/4 px-4 py-1  border-b border-b-gray-200">
                    {cat.name}
                  </td>
                  <td className="w-1/4 px-4 py-1  border-b border-b-gray-200">
                    Edit Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-11/12 shadow mx-auto my-2 rounded">
        <h2 className="bg-gray-500 text-white text-xl p-1 rounded-t">
          Products
        </h2>
        <div className="p-2">
          <form
            onSubmit={productForm.handleSubmit}
            className="w-full flex items-center flex-col"
          >
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-name"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                  {
                    "border-gray-200": !(
                      productForm.touched.name && productForm.errors.name
                    ),
                    "border-red-500":
                      productForm.touched.name && productForm.errors.name,
                  }
                )}
                id="grid-name"
                type="text"
                placeholder="Product name"
                name="name"
                {...productForm.getFieldProps("name")}
              />

              {productForm.touched.name && productForm.errors.name ? (
                <p className="text-red-500 text-xs italic">
                  {productForm.errors.name}
                </p>
              ) : null}
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-description"
              >
                Description
              </label>
              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                )}
                id="grid-description"
                type="text"
                placeholder="Product description"
                name="description"
                {...productForm.getFieldProps("description")}
              />
              <p className="text-gray-600 text-xs italic"></p>
            </div>

            <div className="flex w-full">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-price"
                >
                  Price
                </label>
                <input
                  className={classNames(
                    "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                    {
                      "border-gray-200": !(
                        productForm.touched.price && productForm.errors.price
                      ),
                      "border-red-500":
                        productForm.touched.price && productForm.errors.price,
                    }
                  )}
                  id="grid-price"
                  type="text"
                  placeholder="2.00"
                  name="price"
                  {...productForm.getFieldProps("price")}
                />
                {productForm.touched.price && productForm.errors.price ? (
                  <p className="text-red-500 text-xs italic">
                    {productForm.errors.price}
                  </p>
                ) : null}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-size"
                >
                  Size
                </label>
                <input
                  className={classNames(
                    "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                    {
                      "border-gray-200": !(
                        productForm.touched.size && productForm.errors.size
                      ),
                      "border-red-500":
                        productForm.touched.size && productForm.errors.size,
                    }
                  )}
                  id="grid-size"
                  type="text"
                  placeholder="200"
                  name="size"
                  {...productForm.getFieldProps("size")}
                />
                {productForm.touched.size && productForm.errors.size ? (
                  <p className="text-red-500 text-xs italic">
                    {productForm.errors.size}
                  </p>
                ) : null}
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-unit"
                >
                  Unit
                </label>
                <div className="inline-block relative w-64">
                  <select
                    className={classNames(
                      "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    )}
                    id="grid-unit"
                    name="unit"
                    {...productForm.getFieldProps("unit")}
                  >
                    <option value="">Select a unit</option>
                    <option value="g">g - grams</option>
                    <option value="Kg">Kg - kilograms</option>
                    <option value="ml">ml - millilitres</option>
                    <option value="L">L - Litres</option>
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
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-full px-3 flex-1">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-brand"
                >
                  Brand
                </label>
                <input
                  className={classNames(
                    "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  )}
                  id="grid-brand"
                  type="text"
                  placeholder="brand"
                  name="brand"
                  {...productForm.getFieldProps("brand")}
                />
              </div>
              <div className="w-full px-3 flex-1">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-category"
                >
                  Category
                </label>

                <div className="inline-block relative w-64">
                  <select
                    className={classNames(
                      "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    )}
                    id="grid-category"
                    name="category"
                    {...productForm.getFieldProps("category")}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.name}
                      </option>
                    ))}
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
              </div>
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-image"
              >
                Image
              </label>
              <input
                className={classNames(
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                  {
                    "border-gray-200": !(
                      productForm.touched.image && productForm.errors.image
                    ),
                    "border-red-500":
                      productForm.touched.image && productForm.errors.image,
                  }
                )}
                id="grid-image"
                type="text"
                placeholder="Image URL"
                name="image"
                {...productForm.getFieldProps("image")}
              />

              {productForm.touched.image && productForm.errors.image ? (
                <p className="text-red-500 text-xs italic">
                  {productForm.errors.image}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-center lg:justify-end py-2">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={productForm.isSubmitting}
              >
                Add product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
