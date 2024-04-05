import { Styles } from 'react-modal';

export interface CustomModalStyles extends Styles {
  content: React.CSSProperties;
  overlay: React.CSSProperties;
}

export interface priorityInterface {
  value: string,
  imgSrc: string,
}

export interface PayloadTaskData {
  summary: string,
  description: string,
  priority: string,
  time: number,
  dateCreated: string,
  status: string,
}

export interface TaskData extends PayloadTaskData {
  id: number,
}

export interface TimeConverter {
  toDisplayTime(): string,
  toAlphaNumericTime(): string,
  toMs(): number,
}

export interface allTasksHistory {
  todoHistoryId: number,
  dateCreated: string,
  todos: TaskData[],
}