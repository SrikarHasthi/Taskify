import axios from "axios";

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

export const updateTodos = () => {
  const payload = {
    id: 10005,
    summary: "testing12345",
    description: "Learn Backend",
    priority: "medium",
    time: 5600000,
    status: "new",
    dateCreated: "1708281792855",
  };
  let data = apiClient
    .put("/todos/10005",payload)
    .then((res) => {
      console.log(res);

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
