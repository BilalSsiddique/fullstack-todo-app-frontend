import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hook";
import { registerUser } from "../store/slice/todoSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Reg_Login from "./Reg_Login";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Inside your component

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    // console.log("isValid:", isValid);
    if (isValid) {
      const body = getValues();

      dispatch(registerUser(body)).then((res) => {
        // console.log(res, "response");
        if (res.meta.requestStatus === "fulfilled") {
          // console.log("succ", res);

          toast.success("Successfully Login");
          reset({
            name: "",
            password: "",
          });
          // console.log("token", res.payload.token);
          localStorage.setItem("token", res.payload.token);
          navigate("/todos");
        }
        if (res.meta.requestStatus === "rejected") {

          // console.log("ssssserror", res);
          const error = res.error.message;
          if (typeof error == "string") {
            error.split(",").forEach((item) => {
              toast.error(item);
            });
          }
        }
      });
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      {
        <Reg_Login
          link="Log In"
          href="/login"
          headingTitle={"Register"}
          buttonTitle={"Sign up"}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isValid={isValid}
        />
      }
    </>
  );
};

export default Register;
