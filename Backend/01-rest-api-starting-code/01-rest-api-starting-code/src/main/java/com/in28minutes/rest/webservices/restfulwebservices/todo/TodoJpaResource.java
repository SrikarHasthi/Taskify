package com.in28minutes.rest.webservices.restfulwebservices.todo;

import com.in28minutes.rest.webservices.restfulwebservices.todohistory.TodoHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoJpaResource {

//    private  TodoService todoService;
    private  TodoRepository todoRepository;

    private TodoHistoryRepository todoHistoryRepository;

    public TodoJpaResource(TodoRepository todoRepository, TodoHistoryRepository todoHistoryRepository){
      this.todoRepository = todoRepository;
      this.todoHistoryRepository = todoHistoryRepository;
    };

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/todoss")
    public List<Todo> retrieveTodos(){
        return todoRepository.findAll();
    };

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id){
        todoRepository.deleteById(id);
        return  ResponseEntity.noContent().build();
    };

    @PutMapping("/todos/{id}")
    public Todo updateTodo(@PathVariable int id, @RequestBody Todo todo){
        todoRepository.save(todo);
        return todo;
    };

    @PostMapping("/todoss")
    public Todo createTodo(@RequestBody Todo todo){
        todo.setId(null);
        return todoRepository.save(todo);
//        Todo newTodo = todoRepository.save(todo.getSummary(), todo.getDescription(), todo.getPriority(), todo.getTime(), todo.getStatus());
//        return todo;

    };
}
