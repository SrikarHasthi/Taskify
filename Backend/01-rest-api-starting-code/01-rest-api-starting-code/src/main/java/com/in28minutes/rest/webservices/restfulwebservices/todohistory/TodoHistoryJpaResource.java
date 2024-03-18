package com.in28minutes.rest.webservices.restfulwebservices.todohistory;

import com.in28minutes.rest.webservices.restfulwebservices.user.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class TodoHistoryJpaResource {

    private TodoHistoryRepository todoHistoryRepository;
    private UserRepository userRepository;

    public TodoHistoryJpaResource(TodoHistoryRepository todoHistoryRepository,  UserRepository userRepository) {
        this.todoHistoryRepository = todoHistoryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/todohistory")
    public List<TodoHistory> retrieveAllTodoHistory(){
        return todoHistoryRepository.findAll();
    };
//
    @GetMapping("/todohistory/{id}")
    public List<TodoHistory> retrieveUserTodoHistory(@PathVariable int id){
        return todoHistoryRepository.findByUserDataUserId(id);
    }

    @GetMapping("/todohistory/{id}/date")
    public TodoHistory retrieveUserTodoHistoryByDate(@PathVariable int id){
        LocalDate today = LocalDate.now();
        System.out.println(today.toString());
        return todoHistoryRepository.findByDateCreatedAndUserDataUserId(String.valueOf(today), id);
    }
//
//    @GetMapping("/users/{id}/posts")
//    public List<TodoHistory> retrievehistory(@PathVariable int id){
//        Optional<UserDetails> user = todoHistoryRepository.findById(id);
//        return user.get().getTodoHistory();
//    }

//    @GetMapping("/users/{id}/todohistoryy")
//    public List<Todo> retrieveAllHistory(@PathVariable int id){
//        LocalDate today = LocalDate.now();
//        System.out.println(today.toString());
//        TodoHistory byDateCreated = todoHistoryRepository.findByDateCreated("2024-02-19");
//    }


}
