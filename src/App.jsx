import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateTodo from "./Components/CreateTodo";
import EditTodo from "./Components/EditTodo";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todos from "./Components/Todos";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hook";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "CHECK_LOCAL_STORAGE" });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Navbar />
        <div className=" h-screen  items-center flex justify-center">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Todos" element={<Todos />} />
            <Route path="/Create-Todo" element={<CreateTodo />} />
            <Route path="/edit-todo/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
