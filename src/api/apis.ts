import axios from "axios";
import { PayloadTaskData, RegisterUserData, TaskData } from "../Interfaces";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    accept: 'application/json',
    "Content-Type": 'application/json'
  }
});

export const getUserDetails = () => {
  let data = apiClient
    .get("/user-details")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const registerUser = (payload: RegisterUserData) => {
  let data = apiClient
    .post("/register",payload)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const retrieveAllTodohistory = (id: number) => {
  let data = apiClient
    .get(`/todohistory/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const retrieveTodayTodohistory = (id: number) => {
  let data = apiClient
    .get(`/todohistory/${id}/today`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

export const createTodo = (payload: PayloadTaskData, id: number) => {
  let data = apiClient
    .post(`/todoss/${id}`,payload)
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

export const updateTodos = (id: number, userId: number, payload: TaskData) => {
  let data = apiClient
    .put(`/todos/${userId}/${id}`,payload)
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
    .get("/basicauth", {
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

export const executeJwtAuthentication = (username: string, password: string) => {
  let data = apiClient
    .post("/authenticate", {username, password})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return data;
};
