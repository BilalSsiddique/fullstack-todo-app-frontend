import React, { Dispatch } from "react";
import Heading from "./Heading";
import { useAppSelector } from "../store/hook";

const Form = ({
  buttonTitle,
  onSubmit,
  register,
  errors,
  isValid,
  getTodo,
  headingTitle = "CREATE",
}: {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: Function;
  isValid: boolean;
  errors: any;
  getTodo?: any;
  headingTitle?: string;
  buttonTitle:string;
}) => {
  const { loading, error, todo, headers, response } = useAppSelector(
    (state) => state.todo
  );

  return (
    <section id="contact" className="mt-40 mb-20 w-full ">
      <div className="flex justify-center ">
        <Heading our={headingTitle} afterOurText="TODO" mb="mb-0" />
      </div>
      <div className="flex justify-center shadow-inner py-2 bg-slate-200">
        <div className="mt-0 md:mt-0 ">
          <form
            target="_blank"
            onSubmit={onSubmit}
            className="text-left font-outfit p-1.5 max-w-[500px]"
          >
            <div>
              <label htmlFor="title" className="mb-2 font-semibold">
                Title
              </label>
              <input
                className=" rounded-lg w-full text-black  outline-0 border-2 font-semibold placeholder-opaque-black p-3 mt-2"
                type="text"
                id="title"
                placeholder="Title"
                defaultValue={getTodo && getTodo.title}
                {...register("title", {
                  required: true,
                  maxLength: 100,
                })}
              />
            </div>
            {errors.title && (
              <p className="text-red-500 mt-1">
                {errors.title.type === "required" && "This field is required."}
                {errors.title.type === "maxLength" && "Max length is 100 char."}
              </p>
            )}

            <div className="mt-5">
              <label htmlFor="desc" className="font-semibold">
                Description
              </label>

              <textarea
                className="text-black rounded-lg w-full border-2 outline-0 bg-white font-semibold placeholder-opaque-black p-3 mt-2"
                placeholder="Your Todo:"
                id="desc"
                rows={3}
                cols={30}
                defaultValue={getTodo && getTodo.desc}
                {...register("desc", {
                  required: true,
                  maxLength: 2000,
                })}
              />
            </div>
            {errors.desc && (
              <p className="text-red-500 mt-1 font-outfit">
                {errors.desc.type === "required" && "This field is required."}
                {errors.desc.type === "maxLength" && "Max length is 2000 char."}
              </p>
            )}
            <div className="flex justify-center  mt-5 ">
              <label className="font-semibold " htmlFor="checked">
                Status
              </label>
              <input
                className="text-black accent-[#73D043] rounded-lg w-full outline-0 border-2  bg-white font-semibold placeholder-opaque-black p-3 mt-2"
                type="checkbox"
                id="checked"
                defaultChecked={getTodo && getTodo.check}
                placeholder="Enter Your phone number"
                {...register("checked", {})}
              />
            </div>
            {errors.checked && (
              <p className="text-red-500 mt-1 ">
                {errors.checked.type === "required" &&
                  "This field is required."}
              </p>
            )}
            <div className="mt-5">
              <label htmlFor="Date" className="font-semibold">
                Date
              </label>

              <input
                type="date"
                defaultValue={String(getTodo && getTodo.date).slice(0, 10)}
                className="text-black rounded-lg w-full border-2 outline-0 bg-white font-semibold placeholder-opaque-black p-3 mt-2"
                placeholder="date"
                id="date"
                {...register("date", {
                  required: true,
                })}
              />
            </div>
            {errors.date && (
              <p className="text-red-500 mt-1 font-outfit">
                {errors.date.type === "required" && "This field is required."}
              </p>
            )}
            <button
              disabled={!isValid}
              type="submit"
              className="disabled:bg-[#cccccc] disabled:border-[#999999] disabled:text-[#666666] disabled:border-solid font-outfit font-bold mt-5 w-full text-sm xs:text-lg bg-[#73D043] text-white rounded-lg  py-3 px-5 
              hover:bg-blue  hover:bg-[#1B4845] transition duration-500"
            >
              {loading ? "Loading..." :  `${buttonTitle}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
