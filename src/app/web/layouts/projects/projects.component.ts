import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatViewComponent } from '../../components/flat-view/flat-view.component';
import { ProjectsGalleryViewComponent } from '../../components/projects-gallery-view/projects-gallery-view.component';
import { environment } from '../../../../environments/environments';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [NavbarComponent, FooterComponent, TranslateModule]
})
export class ProjectsComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);
  private readonly dialog = inject(MatDialog);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

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

  viewGallery(imagesPaths: string[]) {
    this.dialog.open(ProjectsGalleryViewComponent, {
      width: '1024px',
      height: 'auto',
      data: {
        images: imagesPaths
      }
    });
  }
}
