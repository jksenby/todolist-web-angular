import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import ITask from "../../../shared/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { Priority } from "src/shared/enums/priority";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "name",
    "description",
    "readiness",
    "created",
    "priority",
  ];

  pageSize: number[] = [5, 7, 10];
  totalDataLength: number;
  @ViewChild("paginator") paginator: MatPaginator;
  priority = Priority;

  taskName: string;
  taskPriority: Priority;
  taskDescription: string;

  isReady: number = 0;
  priorityTask: number = 0;

  task: ITask[];

  dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>();

  serverMessage = {
    message: null,
    class: null,
  };
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTasks() {
    this.taskService
      .getTasks(this.priorityTask, this.isReady)
      .subscribe((task: ITask[]) => {
        this.task = task;
        this.totalDataLength = this.task.length;
        this.dataSource = new MatTableDataSource(this.task);
      });
  }

  toggleReadiness(id, readiness) {
    return this.taskService.taskToggle(id, !readiness).subscribe((res) => {
      console.log(res);
      this.getTasks();
    });
  }

  select(value) {
    if (value === this.isReady) this.isReady = 0;
    else this.isReady = value;
    this.getTasks();
  }

  format(stringDate: string) {
    return new Date(stringDate).toLocaleString();
  }

  createTask() {
    const task: ITask = {
      name: this.taskName,
      created: new Date(),
      readiness: false,
      description: this.taskDescription,
      priority: this.taskPriority,
    };

    return this.taskService.createTask(task).subscribe((response) => {
      if (response) {
        this.serverMessage.message = "The task has created";
        this.serverMessage.class = "green";
      } else {
        this.serverMessage.message = "Something went wrong, please try again";
        this.serverMessage.class = "red";
      }
      setTimeout(() => (this.serverMessage.message = null), 8000);
    });
  }
}
