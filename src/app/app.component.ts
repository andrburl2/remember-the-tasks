import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

export interface Project {
  id: number,
  title: string,
  todos: Todo[],
}

interface Todo {
  id: number,
  title: string,
  isComplete: boolean,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  isFormOpen = false;
  projects: Project[];

  ngOnInit() {
    this.getProjects();
  }

  onToggled() {
    this.isFormOpen = !this.isFormOpen;
  }

  getProjects() {
    this.apiService.getProjects()
      .subscribe((projects: Project[]) => {
        // Сортировка дел по порядку
        projects.map((el) => {
          el.todos.sort((prev, next) => prev.id - next.id)
        });

        this.projects = projects;
      });
  }
}
