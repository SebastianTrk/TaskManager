import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import {ActivatedRoute, Params} from '@angular/router';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {
  lists!: List[];
  tasks!: Task[];
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
        this.tasks = tasks;
        })
       
        
      }
    
      
    )

      this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
      console.log(lists as List);
      })

  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed succesfully!");
      //the task has been set to completed
      task.completed= !task.completed;
    })
  }

  

}
