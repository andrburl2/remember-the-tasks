import { Component, Input } from "@angular/core";

import { Project } from "../app.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input() projects: Project[];
}