import { Component } from '@angular/core';
import { ToDoService } from './todo.service';

@Component({
  selector: 'to-do',
  templateUrl: 'app/todo.template.html',
  providers: [ToDoService]
})

export class ToDoComponent implements OnInit{
  newItem: string;
  items: Array<string> = [];

  constructor(private toDoService: ToDoService) { }

  ngOnInit() { this.getItems(); }

  getItems = () => {
    this.toDoService.getList().then(list => this.items = list);
  };

  addItem = () => {
    this.toDoService.addItem(this.newItem).then(data => this.getItems());
  }
}
