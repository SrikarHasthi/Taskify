package com.in28minutes.rest.webservices.restfulwebservices.todo;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

//@Service
public class TodoService {

	private static List<Todo> todos = new ArrayList<>();

	private static int todosCount = 0;

	static {
		todos.add(new Todo((int) ++todosCount, "minutes","Get AWS Certified", "medium",
				3600000, "new", "1708276611728" ));
		todos.add(new Todo((int) ++todosCount, "in28minutes","Learn DevOps", "medium",
				3600000, "new", "1708276611728" ));
		todos.add(new Todo((int) ++todosCount, "in28minutes","Learn Full Stack Development", "medium",
				3600000, "new", "1708276611728" ));
	}

	public List<Todo> getTodos(){
//		Predicate<? super Todo> predicate =
//				todo -> todo.getsummary().equalsIgnoreCase(summary);
//		return todos.stream().filter(predicate).toList();
		return todos;
	}

	public Todo addTodo(String summary, String description, String priority, long time, String status, String dateCreated) {
		Todo todo = new Todo(++todosCount,summary,description, priority, time,status, dateCreated);
		todos.add(todo);
		return todo;
	}

	public void deleteById(long id) {
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		todos.removeIf(predicate);
	}

	public Todo findById(long id) {
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		Todo todo = todos.stream().filter(predicate).findFirst().get();
		return todo;
	}

	public void updateTodo(Todo todo) {
		deleteById(todo.getId());
		todos.add(todo);
	}
}