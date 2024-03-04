import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent implements OnInit {
  
  constructor (private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    
  }
  

  ngOnInit() {
    
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe(next => {
      const list: List = next as List;
      console.log(list);
      

      this.router.navigate([ '/lists', list._id ]);
    })
  }

}
