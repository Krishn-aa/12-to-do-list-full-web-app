export default class Task {
  id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdOn?: Date;
  completedOn?: Date | null;
  modifiedOn?:Date;
  constructor(
    title: string,
    description: string,
    isCompleted: boolean,
    createdOn?: Date,
    completedOn?: Date,
    id?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.completedOn = completedOn;
    this.createdOn = createdOn;
  }
}
