import React, { Dispatch } from "react";
import Heading from "./Heading";
import { useAppSelector } from "../store/hook";
import { Link } from "react-router-dom";

const Form = ({
  onSubmit,
  register,
  errors,
  isValid,
  headingTitle = "CREATE",
  buttonTitle,
  link,
  href,
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: Function;
  isValid: boolean;
  errors: any;
  getTodo?: any;
  headingTitle?: string;
  buttonTitle:string;
  link:string;
  href:string;
}) => {
  const { loading, error, todo, headers, response } = useAppSelector(
    (state) => state.todo
  );

  return (
    <section id="contact" className="mt-10 mb-20">
      <div className="flex justify-center ">
        <Heading our={headingTitle} afterOurText="TODO" mb="mb-0" />
      </div>
      <div className="flex justify-center shadow-inner py-2 bg-slate-200">
        <div className="mt-0 md:mt-0 ">
          <form
            onSubmit={onSubmit}
            className="text-left font-outfit p-1.5 max-w-[500px]"
          >
            <div>
              <label htmlFor="name" className=" font-semibold">
                Name
              </label>
              <input
                className=" rounded-lg w-full text-black  outline-0 border-2 font-semibold placeholder-opaque-black p-3 mt-2"
                type="text"
                id="name"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 mt-1">
                {errors.name.type === "required" && "This field is required."}
                {errors.name.type === "maxLength" && "Max length is 100 char."}
              </p>
            )}

            <div className="mt-2">
              <label htmlFor="pass" className=" mb-2 font-semibold">
                Password
              </label>
              <input
                className=" rounded-lg w-full text-black  outline-0 border-2 font-semibold placeholder-opaque-black p-3 mt-2"
                type="text"
                id="pass"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  maxLength: 10,
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1">
                {errors.password.type === "required" &&
                  "This field is required."}
                {errors.password.type === "maxLength" &&
                  "Max length is 10 char."}
              </p>
            )}

            <button
              disabled={!isValid}
              type="submit"
              className="disabled:bg-[#cccccc] disabled:border-[#999999] disabled:text-[#666666] disabled:border-solid font-outfit font-bold mt-5 w-full text-sm xs:text-lg bg-[#73D043] text-white rounded-lg  py-3 px-5 
              hover:bg-blue  hover:bg-[#1B4845] transition duration-500"
            >
              {loading ? "Loading..." : `${buttonTitle}`}
            </button>
            <div className="flex justify-end">
              <Link  className="underline font-bold" to={`${href}`} >
                {link} ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
