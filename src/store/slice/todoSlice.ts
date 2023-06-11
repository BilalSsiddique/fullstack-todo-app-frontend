import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export type Todo = {
  _id: string;
  title: string;
  description: string;
  check: boolean;
  Date: Date;
};

type InitialState = {
  loading: boolean;
  todo: Todo[];
  error: string;
  headers:string,
  response:string,
  getTodo: object
  search: string,
};

const initialState: InitialState = {
  loading: false,
  todo: [],
  error: "",
  headers : '',
  response: '',
  getTodo: {},
  search : ""
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (params?:any) => {
    
    console.log('tpdp:',params)
    return axios
      .get("https://fullstack-todo-app-backend.up.railway.app/todos/", {
        params: params,
      })
      .then((res) => {
        return [res.data, res.headers["products-total-count"]];
      });
  }
);

export const deleteTodos = createAsyncThunk(
  "todo/deleteTodos",
  async (params:any) => {
    console.log(params)  
    return axios
      .delete(
        `https://fullstack-todo-app-backend.up.railway.app/todos/${params}`
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const saveTodos = createAsyncThunk(
  "todo/saveTodos",
  async (body:any) => {
    
    return axios
      .post(
        `https://fullstack-todo-app-backend.up.railway.app/todos/create-todo`,
        body
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const getTodo = createAsyncThunk("todo/getTodo", async (param:any) => {

  return axios
    .get(`https://fullstack-todo-app-backend.up.railway.app/todos/${param}`)
    .then((res) => {
      return res.data;
    });
});

export const editTodos = createAsyncThunk("todo/editTodos", async (body:any) => {

  const {getTodo} = body
  const {_id}  = getTodo
  return axios
    .put(`https://fullstack-todo-app-backend.up.railway.app/todos/${_id}`, body)
    .then((res) => {
      return res.data;
    });
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      (state.loading = false),
        (state.todo = action.payload[0]),
        (state.error = "");
      state.headers = action.payload[1];
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      (state.loading = false),
        (state.todo = []),
        (state.error = action.error.message || "something went wrong");
    });

    // delete case
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.response = action.payload; //will back here
      state.todo= action.payload
    });

    // save Todos
    builder.addCase(saveTodos.fulfilled, (state, action) => {
      state.response = action.payload;
    });

    // save Todos
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.getTodo = action.payload[0];
    });

    //
  },
});


export default todoSlice.reducer;
