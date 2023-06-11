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
import Search from "./Search";

const Todos = () => {
  let { loading, error, todo, headers } = useAppSelector((state) => state.todo);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilterTodos] = useState<Todo[]>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const filterArray = Array.isArray(todo)
      ? todo.filter((item, index) =>
          item.title.toLowerCase().includes(search?.toLowerCase())
        )
      : [];
    setFilterTodos(filterArray);
  }, [search, todo]);

  const itemsPerPage = 5;
  const totalCount = +headers;
  const totalPagess = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    dispatch(fetchTodos({ currentPage, itemsPerPage }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    setCurrentPage(totalPagess);
    dispatch(fetchTodos({totalPagess,itemsPerPage}))
  }, [totalPagess]);

  const deleteTod = (id: string) => {
    dispatch(deleteTodos(id)).then((res) => {
      console.log("deleted", res);
      if (res.meta.requestStatus === "fulfilled") {
        // if(totalCount%5)
        dispatch(fetchTodos({ currentPage, itemsPerPage })).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            console.log("totoalPAGES:", totalPagess);
          }
        });
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
        <Link to='/create-todo' className="bg-slate-400 shadow-inner text-white w-fit p-1 px-2 font-semibold mt-5">
          Create Todo
        </Link>
      </div>
    );
  }

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="flex flex-col w-full">
      <Search search={search} searchHandler={searchHandler} />
      <div className="relative mb-10 flex flex-wrap max-[423px]:justify-center gap-12 sm:gap-0  items-center ">
        <Link
          to="/create-todo"
          className="bg-[#73D043] hover:bg-[#61fc14] text-left text-sm sm:text-base relative  mx-auto shadow-inner text-white w-fit p-1 px-8 sm:px-10 font-semibold mt-5"
        >
          Create Todo
          <div className="w-4 h-4 sm:w-5 sm:h-5  rounded-full absolute right-2 bottom-1.5">
            <AiOutlinePlus
              fill="white"
              className="hover:bg-black w-4 h-4 sm:w-5 sm:h-5 rounded-full"
            />
          </div>
        </Link>
        <div className="sm:text-base text-sm sm:absolute self-end flex gap-1">
          <div className="flex gap-1 justify-center items-center">
            <p className="w-5 h-5 rounded-full bg-yellow-400 "></p>
            <p className=" font-semibold">Pending</p>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <p className="w-5 h-5 rounded-full bg-[#73D043] "></p>
            <p className="font-semibold">Completed</p>
          </div>
        </div>
      </div>

      <div className=" place-items-center grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-2 sm:gap-x-2 gap-y-4 ">
        {Array.isArray(filteredTodos) &&
          filteredTodos.length > 0 &&
          filteredTodos.map((tod: Todo, index) => (
            <div
              className="  shadow-inner relative flex flex-col p-4 px-5 justify-center items-start bg-slate-200 w-full  h-[110px]"
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
                <p
                  className={`top-2.5 right-3.5  absolute w-3 h-3 rounded-full ${
                    tod.check === true ? "bg-[#73D043]" : "bg-yellow-400"
                  }  `}
                ></p>
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
