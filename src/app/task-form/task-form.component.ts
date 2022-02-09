import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../api.service';
import { Project } from '../app.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  constructor( private apiService: ApiService ) { }

  @Input() projects: Project[];
  @Output() toggle = new EventEmitter();
  @Output() getProjects = new EventEmitter();

  disableButton = true;
  showInput = false;

  taskForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    project_id: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.taskForm.controls['project_id'].valueChanges.subscribe((value: string) => {
      if (Number(value) === 0) {
        this.taskForm.addControl('project_title', new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]));
        this.showInput = true
      } else {
        this.taskForm.removeControl('project_title')
        this.showInput = false
      }
    });
  }

  isControlInvalid(title: string) {
    const control = this.taskForm.controls[title];

    const result = control.dirty && control.errors;

    if (result && result['required']) {
      return 'Это обязательное поле'
    } else if (result && result['minlength']) {
      return 'Минимальная длина 2 символа'
    } else if (result && result['maxlength']) {
      return 'Максимальная длина 30 символа'
    } else {
      return ''
    }
  }

  toggleForm() {
    this.toggle.emit();
  }

  updateProjects() {
    this.getProjects.emit();
  }

  submitForm() {
    this.apiService.createNewTodo(this.taskForm.value)
      .subscribe(res => console.log(res));

    this.toggleForm();
    this.updateProjects();
  }
}