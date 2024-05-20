import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ProjectService } from '../../../web/services/project.service';
import { Project } from '../../../web/models/project';
import { InputComponent } from '../../../web/components/input/input.component';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environments';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateEditProjectComponent } from '../../components/dialog-create-edit-project/dialog-create-edit-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InputComponent, AsyncPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private readonly projectServices = inject(ProjectService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarServices = inject(MatSnackBar);
  public readonly downloadImageUrl = `${environment.api_url}/file/download`;

  projects = signal<Project[]>([]);

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectServices.getProjects().subscribe((data) => {
      this.projects.set(data.data);
    });
  }

  openDialogCreateProject() {
    const dialog = this.dialog.open(DialogCreateEditProjectComponent, {
      width: '50%',
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.openSnackbar('Proyecto creado con éxito');
      } else {
        this.openSnackbar('No se pudo crear el proyecto');
      }
      this.getProjects();
    });
  }

  deleteProject(projectId: number) {
    if (confirm('Seguro desea eliminar esta publicación?')) {
      this.projectServices.deleteProject(projectId).subscribe(
        () => {
          this.openSnackbar('Publicación eliminada con éxito');
          this.getProjects();
        },
        (err) => {
          this.openSnackbar('Error al intentar eliminar la publicación');
          console.log(err);
        }
      );
    }
  }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar'],
    });
  }
}
