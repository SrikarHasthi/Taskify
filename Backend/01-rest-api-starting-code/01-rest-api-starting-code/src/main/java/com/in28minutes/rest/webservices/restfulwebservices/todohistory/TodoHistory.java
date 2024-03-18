package com.in28minutes.rest.webservices.restfulwebservices.todohistory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.in28minutes.rest.webservices.restfulwebservices.todo.Todo;
import com.in28minutes.rest.webservices.restfulwebservices.user.UserData;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class TodoHistory {

    @Id
    @GeneratedValue
    private int todoHistoryId;
    private String dateCreated;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private UserData userData;

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

    @OneToMany(mappedBy = "todoHistoryy")
    private List<Todo> todos;
    public int getTodoHistoryId() {
        return todoHistoryId;
    }

    public void setTodoHistoryId(int todoHistoryId) {
        this.todoHistoryId = todoHistoryId;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }
}
