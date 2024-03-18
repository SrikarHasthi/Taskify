package com.in28minutes.rest.webservices.restfulwebservices.todo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.in28minutes.rest.webservices.restfulwebservices.todohistory.TodoHistory;
import jakarta.persistence.*;



@Entity
public class Todo {


//	id: number,
//	summary: string,
//	description: string,
//	priority: string,
//	time: number,
//	status: string,
// dateCreated: long,
	public Todo() {
		
	}

//	public Todo(Integer id, String summary, String description, String priority, long time, String status, String dateCreated, User user) {
//		this.id = id;
//		this.summary = summary;
//		this.description = description;
//		this.priority = priority;
//		this.time = time;
//		this.status = status;
//		this.dateCreated = dateCreated;
//		this.user = user;
//	}

	public Todo(Integer id, String summary, String description, String priority, long time, String status, String dateCreated) {
		this.id = id;
		this.summary = summary;
		this.description = description;
		this.priority = priority;
		this.time = time;
		this.status = status;
		this.dateCreated = dateCreated;
	}

	@Id
	@GeneratedValue
	private Integer id;

	private String summary;
	
	private String description;

	private String priority;
	private long time;
	private String status;

	private String dateCreated;


	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private TodoHistory todoHistoryy;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public String getDateCreated() { return dateCreated; }

	public void setDateCreated(String dateCreated) { this.dateCreated = dateCreated; }

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	@Override
	public String toString() {
		return "Todo{" +
				"id=" + id +
				", summary='" + summary + '\'' +
				", description='" + description + '\'' +
				", priority='" + priority + '\'' +
				", time=" + time +
				", status='" + status + '\'' +
				", dateCreated='" + dateCreated + '\'' ;
//				", user=" + user +
//				'}';
	}

}