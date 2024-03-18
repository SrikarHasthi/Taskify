package com.in28minutes.rest.webservices.restfulwebservices.todohistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TodoHistoryRepository extends JpaRepository<TodoHistory, Integer> {
    public TodoHistory findByDateCreatedAndUserDataUserId(String date, int userId);
    public List<TodoHistory> findByUserDataUserId(int userId);
}