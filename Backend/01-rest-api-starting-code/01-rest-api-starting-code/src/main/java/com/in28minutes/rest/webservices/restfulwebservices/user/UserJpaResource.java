package com.in28minutes.rest.webservices.restfulwebservices.user;

import com.in28minutes.rest.webservices.restfulwebservices.todohistory.TodoHistory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserJpaResource {

    private UserRepository userRepository;

    public UserJpaResource(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<UserData> retrieveUsers(){
        return userRepository.findAll();
    };

    @GetMapping("/users/{id}")
    public Optional<UserData> retrieveUser(@PathVariable Integer id){
        Optional<UserData> user = userRepository.findById(id);
        return user;
    }

    @GetMapping("/users/{id}/todohistory")
    public List<TodoHistory> retrieveAllHistory(@PathVariable Integer id){
        Optional<UserData> user = userRepository.findById(id);
        return user.get().getTodoHistory();
    }

    @PostMapping("/users")
    public UserData createUser(@RequestBody UserData userData){
        userData.setUserId(null);
        return userRepository.save(userData);
//        Todo newTodo = todoRepository.save(todo.getSummary(), todo.getDescription(), todo.getPriority(), todo.getTime(), todo.getStatus());
//        return todo;

    };
}
