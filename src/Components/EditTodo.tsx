import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hook";
import { editTodos } from "../store/slice/todoSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { useAppSelector } from "../store/hook";

const EditTodo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, getTodo } = useAppSelector((state) => state.todo);

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const token  =localStorage.getItem('token')
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = await trigger();
    // console.log("isValid:", isValid);
    if (isValid) {
      const body = getValues();
      // console.log('idchekinnnnnnnnnnnnnnn',getTodo)
      const {_id}=getTodo
      const upBody = { body:body,id:_id,token };
      dispatch(editTodos(upBody)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(res.payload);
          navigate("/todos");
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
  // console.log('values',getTodo)
  return (
    <Form
      headingTitle={"EDIT"}
      getTodo={getTodo}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isValid={isValid}
      buttonTitle="UPDATE"
    />
  );
};

export default EditTodo;
