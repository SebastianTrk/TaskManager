import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Task} from '../../models/task.model'

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  listId!: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        console.log(this.listId);
        }
      )
       
        
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((newTask: Object) => {
      // use newTask as Task
      console.log((newTask as Task));
      this.router.navigate(['../'],{relativeTo: this.route});
    } 
    )
  }

}
