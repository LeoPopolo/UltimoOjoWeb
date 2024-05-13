import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { MatDialog } from '@angular/material/dialog';
import { FlatViewComponent } from '../../components/flat-view/flat-view.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [NavbarComponent, FooterComponent]
})
export class ProjectsComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);
  private readonly dialog = inject(MatDialog);

  projects = signal<Project[]>([]);

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectServices.getProjects().subscribe(data => {
      this.projects.set(data.data);
    });
  }

  viewFlat(flatPath: string) {
    this.dialog.open(FlatViewComponent, {
      width: '80%',
      height: '80%',
      data: {
        flat: flatPath
      }
    });
  }
}
