package com.in28minutes.rest.webservices.restfulwebservices.user;

//import com.in28minutes.rest.webservices.restfulwebservices.role.Role;

import com.in28minutes.rest.webservices.restfulwebservices.todohistory.TodoHistory;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class UserData {
    public UserData() {
    }

    public UserData(Integer userId, String email, String password) {
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    @Id
    @GeneratedValue
    private Integer userId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "userData")
    private List<TodoHistory> todoHistory;

//    @ManyToMany
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private Set<Role> roles;
//
//    public Set<Role> getRoles() {
//        return roles;
//    }
//
//    public void setRoles(Set<Role> roles) {
//        this.roles = roles;
//    }

    public List<TodoHistory> getTodoHistory() {
        return todoHistory;
    }

    public void setTodoHistory(List<TodoHistory> todoHistory) {
        this.todoHistory = todoHistory;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
