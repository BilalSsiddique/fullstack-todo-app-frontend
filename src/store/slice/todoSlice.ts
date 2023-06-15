import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Todos from "../../Components/Todos";

export type todo = {
  _id: string;
  title: string;
  desc: string;
  check: boolean;
  date: Date;
}[];

type InitialState = {
  loading: boolean;
  todo: undefined | todo;
  error: string;
  headers: string;
  response: string;
  getTodo: object;
  search: string;
};

const initialState: InitialState = {
  loading: false,
  todo: [],
  error: "",
  headers: "",
  response: "",
  getTodo: {},
  search: "",
};

// export const fetchTodos = createAsyncThunk(
//   "todo/fetchTodos",
//   async (params?:any) => {

//     console.log('tpdpsssssssssssssssss:',params)
//     return axios
//       .get("http://localhost:3000/todos/", {
//         headers: { Authorization: `Bearer ${params?.token}` },
//         params: {
//           currentPage: params?.currentPage,
//           itemsPerPage: params?.itemsPerPage,
//         },
//       })
//       .then((res) => {
//         return [res.data, res.headers["products-total-count"]];
//       });
//   }
// );

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (params?: any) => {
    // console.log("bodysssssssssss", params);
    try {
      const response = await axios.get(
        "https://fullstack-todo-app-backend.up.railway.app/todos/",
        {
          headers: { Authorization: `Bearer ${params?.token}` },
          params: {
            currentPage: params?.currentPage,
            itemsPerPage: params?.itemsPerPage,
          },
        }
      );
      // console.log("response on todoSlice fetch", response);
      return {
        response: response.data,
        header: response.headers["products-total-count"],
      };
    } catch (error) {
      // console.log("hereeeee", error);
      if (
        (error.response && error.response?.status === 500) ||
        (error.response.status === 409 &&
          error.response.data &&
          error.response.data.errors)
      ) {
        // Validation errors were returned from the server
        // console.log(error.response.status);
        throw new Error(error.response.data.errors);
      } else {
        // Handle other server errors
        // console.log("error", error.response.data);
        throw error.response.data;
      }
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todo/deleteTodos",
  async (params: any) => {
    const { todoId } = params;
    const { token } = params;
    return axios
      .delete(
        `https://fullstack-todo-app-backend.up.railway.app/todos/${todoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const saveTodos = createAsyncThunk(
  "todo/saveTodos",
  async (data: any) => {
    // console.log("dataa", data);
    const { token } = data;
    const { body } = data;
    return axios
      .post(
        `https://fullstack-todo-app-backend.up.railway.app/todos/create-todo`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("savetodo", res.data);
        return res.data;
      });
  }
);

export const getTodo = createAsyncThunk("todo/getTodo", async (param: any) => {
  const { token } = param;
  const { id } = param;
  return axios
    .get(`https://fullstack-todo-app-backend.up.railway.app/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
});

export const editTodos = createAsyncThunk(
  "todo/editTodos",
  async (bodyRec: any) => {
    // console.log("bodycheck", bodyRec);
    const { body } = bodyRec;
    const { id } = bodyRec;
    const { token } = bodyRec;
    const upbody = { ...body, _id: id };
    // console.log("id inside editRodos", id, upbody, token);
    return axios
      .put(
        `https://fullstack-todo-app-backend.up.railway.app/todos/${id}`,
        upbody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const registerUser = createAsyncThunk(
  "todo/registerUser",
  async (body: any) => {
    // console.log("bodysssssssssss", body);
    try {
      const response = await axios.post(
        `https://fullstack-todo-app-backend.up.railway.app/register`,
        body
      );
      // console.log("response on todoSlice", response);
      return response.data;
    } catch (error) {
      // console.log("hereeeee", error);
      if (
        (error.response && error.response.status === 400) ||
        (error.response.status === 409 &&
          error.response.data &&
          error.response.data.errors)
      ) {
        // Validation errors were returned from the server
        // console.log(error.response.status);
        throw new Error(error.response.data.errors);
      } else {
        // Handle other server errors
        // console.log("errorchecking", error.response);
        throw error.response.data.error;
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "todo/loginUser",
  async (body: any) => {
    // console.log("bodysssssssssss", body);
    try {
      const response = await axios.post(
        `https://fullstack-todo-app-backend.up.railway.app/login`,
        body
      );
      // console.log("response on todoSlice", response);
      return response.data;
    } catch (error) {
      // console.log("hereeeee", error);
      if (
        (error.response && error.response.status === 400) ||
        (error.response.status === 409 &&
          error.response.data &&
          error.response.data.errors)
      ) {
        // Validation errors were returned from the server
        // console.log(error.response.status);
        throw new Error(error.response.data.errors);
      } else {
        // Handle other server errors
        // console.log("errorchecking", error.response);
        throw error.response.data.error;
      }
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const todos = action.payload.response;
      // console.log("payl", todos);
      state.loading = false;
      state.todo = todos;
      state.error = "";
      state.headers = action.payload.header;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      (state.loading = false),
        (state.todo = []),
        (state.error = action.error.message || "something went wrong");
    });

    // delete case
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.response = action.payload; //will back here
      state.todo = action.payload;
    });

    // save Todos
    builder.addCase(saveTodos.fulfilled, (state, action) => {
      state.response = action.payload;
    });

    // save Todos
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.getTodo = action.payload[0];
    });

    //register User
  },
});

export default todoSlice.reducer;
