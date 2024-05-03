import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [NavbarComponent, FooterComponent]
})
export class ProjectsComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);

  projects = signal<Project[]>([]);

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectServices.getProjects().subscribe(data => {
      this.projects.set(data.data);
    });
  }
}
