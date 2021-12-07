import { Component, Input } from '@angular/core';

import { ApiService } from '../api.service';
import { Project } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent  {
  constructor( private apiService: ApiService ) { }

  @Input() project: Project;

  markCheckbox = (event: any) => {
    this.apiService.completeTodo(this.project.id, event.source.id)
      .subscribe(res => console.log(res));
  }
}
