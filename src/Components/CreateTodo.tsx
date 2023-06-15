
import React from "react";
import { useForm } from "react-hook-form";
import {useAppDispatch } from "../store/hook";
import { saveTodos } from "../store/slice/todoSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const CreateTodo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      const token = localStorage.getItem('token')
      dispatch(saveTodos({body,token})).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(res.payload);
          navigate('/todos')
        }
        if (res.meta.requestStatus === "rejected") {
          toast.error(res.payload);
        }
      });
      reset({
        title: "",
        checked: false,
        desc: "",
        date: "",
      });
    } else {
      e.preventDefault();
    }
  };

  
  return (
    <Form
      
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      buttonTitle="CREATE"
    />
  );
};

export default CreateTodo;
