package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
public class TodoResource {

    private  TodoService todoService;

    public TodoResource (TodoService todoService){
      this.todoService = todoService;
    };
    @GetMapping("/todos")
    public List<Todo> retrieveTodos(){
        return todoService.getTodos();
    };

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable long id){
        todoService.deleteById(id);
        return  ResponseEntity.noContent().build();
    };

    @PutMapping("/todos/{id}")
    public Todo updateTodo(@PathVariable long id, @RequestBody Todo todo){
        todoService.updateTodo(todo);
        return todo;
    };

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo){
        Todo newTodo = todoService.addTodo(todo.getSummary(), todo.getDescription(), todo.getPriority(), todo.getTime(), todo.getStatus(), todo.getDateCreated());
        return newTodo;

    };
}
