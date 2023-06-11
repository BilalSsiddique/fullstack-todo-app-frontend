import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateTodo from "./Components/CreateTodo";
import EditTodo from "./Components/EditTodo";
import Home from "./Components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-todo" element={<CreateTodo />} />
        <Route path="/edit-todo/:id" element={<EditTodo />} />
      </Routes>
    </>
  );
}

export default App;
