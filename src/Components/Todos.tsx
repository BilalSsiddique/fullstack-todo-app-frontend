import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { fetchTodos, deleteTodos, getTodo } from "../store/slice/todoSlice";
import Loader from "./Loader";
import type { Todo } from "../store/slice/todoSlice";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const { loading, error, todo, headers } = useAppSelector(
    (state) => state.todo
  );
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const totalCount = +headers;
  const totalPagess: number = Math.ceil(totalCount / itemsPerPage);
  console.log("totalPagess:", totalPagess);


  useEffect(() => {
    setCurrentPage(totalPagess);
    const params = { currentPage, itemsPerPage };
    dispatch(fetchTodos(params));
  }, [dispatch, currentPage, totalPagess]);

  const deleteTod = (id: string) => {
    dispatch(deleteTodos(id)).then((res) => {
      console.log("deleted", res);
      if (res.meta.requestStatus === "fulfilled") {
        const params = { currentPage, itemsPerPage };
        dispatch(fetchTodos(params));
        toast.success(res.payload);
      }
      if (res.meta.requestStatus === "rejected") {
        toast.error(res.meta.rejectedWithValue);
      }
    });
  };

  const getTod = (id: string) => {
    console.log("get tod called");
    dispatch(getTodo(id)).then((res) => {
      console.log("set", res);
      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/edit-todo/${res.payload[0]._id}`);
        // toast.success(res.payload[0]);
      }
      if (res.meta.requestStatus === "rejected") {
        toast.error(res.meta.rejectedWithValue);
      }
    });
  };

  const totalPagesArray = useMemo(
    () => [...Array.from(Array(totalPagess), (e, i) => i + 1)],
    [totalPagess]
  );

  if (loading) return <Loader />;

  if (!loading && error)
    return (
      <div className="flex  mt-0 items-center bg-white h-[200px] text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  // console.log("rpdp length", todo.length, "headers:", headers);

  if (todo.length === 0) {
    return (
      <div className="flex flex-col font-extrabold mx-auto my-auto mt-0 items-center justify-center shadow-inner w-2/4 bg-slate-200 h-[200px] text-red-400">
        <p>No Todos Found</p>
        <button className="bg-slate-400 shadow-inner text-white w-fit p-1 px-2 font-semibold mt-5">
          Create Todo
        </button>
      </div>
    );
  }

  console.log(todo, error, loading);

  return (
    <div className="flex flex-col w-full">
      <Link
        to="/create-todo"
        className="bg-[#73D043] text-left text-sm sm:text-base relative mb-24 mx-auto shadow-inner text-white w-fit p-1 px-8 sm:px-10 font-semibold mt-5"
      >
        Create Todo
        <div className="w-4 h-4 sm:w-5 sm:h-5  rounded-full absolute right-2 bottom-1.5">
          <AiOutlinePlus
            fill="white"
            className="hover:bg-black w-4 h-4 sm:w-5 sm:h-5 rounded-full"
          />
        </div>
      </Link>

      <div className=" place-items-center grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-2 sm:gap-x-2 gap-y-4 ">
        {Array.isArray(todo) &&
          todo.length > 0 &&
          todo.map((tod: Todo, index) => (
            <div
              className=" shadow-inner relative flex flex-col p-4 px-5 justify-center items-start bg-slate-200 w-full  h-[110px]"
              key={tod._id}
            >
              <h2 className="font-semibold">{tod.title}</h2>
              <h2 className="font-light text-left line-clamp-1">
                {tod.description.length > 25
                  ? tod.description.slice(0, 25) + "...."
                  : tod.description}
              </h2>
              <h2>{tod.check}</h2>
              <h2 className=" w-full flex justify-start font-semibold text-sm">
                {"Created : "} &nbsp;
                <p className="font-normal"> {String(tod.Date).slice(0, 10)} </p>
              </h2>

              <div onClick={() => getTod(tod._id)}>
                <TbEdit
                  className={`hover:text-[#73D043] cursor-pointer hover:font-extrabold shadow-xl absolute right-8 bottom-6`}
                  size={18}
                />
              </div>
              <div onClick={() => deleteTod(tod._id)}>
                <MdDeleteOutline
                  className={`hover:text-[#73D043] hover:font-extrabold cursor-pointer shadow-xl absolute right-3 bottom-6`}
                  size={18}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {totalPagesArray.length > 1 &&
          totalPagesArray.map((page, index) => (
            <p
              className={`w-[20px] cursor-pointer border  ${
                currentPage === page
                  ? "bg-[#73D043] border-[#73D043] text-white"
                  : "border-gray-200 text-black"
              } `}
              onClick={() => setCurrentPage(page)}
              key={index}
            >
              {page}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Todos;
