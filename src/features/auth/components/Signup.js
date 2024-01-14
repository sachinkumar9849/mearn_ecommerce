import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}

      <section
        id="login"
        className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center"
      >
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-5xl font-bold text-[#f85606] mb-6">Sign Up</h2>

            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                    //TODO: this role can be directly given on backend
                  })
                );
                console.log(data);
              })}
            >
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "email not valid",
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border
 focus:bg-white focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border
 focus:bg-white focus:outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-gray-700">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border
 focus:bg-white focus:outline-none"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full block theme_btn hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>Already a Member?</p>

              <Link
                to="/"
                className="btn_transparent py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                login
              </Link>
            </div>
          </div>
          <div className="w-1/2 md:block hidden">
            <img
              src={`${process.env.PUBLIC_URL}/img/signup.jpg`}
              className="h-full object-cover rounded-2xl"
              alt="page img"
            />
          </div>
        </div>
      </section>
    </>
  );
}
