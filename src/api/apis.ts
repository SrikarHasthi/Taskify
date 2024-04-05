import axios from "axios";
import { PayloadTaskData, TaskData } from "../Interfaces";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    accept: 'application/json',
  }
});

export const retrieveAllTodohistory = () => {
  let data = apiClient
    .get("/todohistory/all")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const retrieveTodayTodohistory = () => {
  let data = apiClient
    .get("/todohistory/today")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const createTodo = (payload: PayloadTaskData) => {
  let data = apiClient
    .post("/todoss",payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const deleteTodo = (id: number) => {
  let data = apiClient
    .delete(`/todos/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const updateTodos = (id: number, payload: TaskData) => {
  let data = apiClient
    .put(`/todos/${id}`,payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const executeBasicAuthentication = (token: string) => {
  let data = apiClient
    .get("/todoss", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};
