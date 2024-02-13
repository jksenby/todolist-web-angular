import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import ITask from "../../shared/models/task.model";
import { Observable } from "rxjs";

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(body: ITask): Observable<ITask> {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<ITask>("http://localhost:3000/tasks", body, options);
  }

  getTasks(priority: number | null, isReady: number = 0) {
    console.log(isReady);
    const params = new HttpParams()
      .set("priority", priority)
      .set("isReady", isReady);
    return this.http.get<ITask[]>("http://localhost:3000/tasks", { params });
  }

  taskToggle(id, readiness) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.put<ITask>(
      "http://localhost:3000/tasks",
      { id, readiness },
      options
    );
  }
}
