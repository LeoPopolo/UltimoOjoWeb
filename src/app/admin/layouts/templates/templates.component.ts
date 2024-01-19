import { Component, OnInit, inject, signal } from '@angular/core';
import { TemplateService } from '../../../web/services/template.service';
import { ITemplate } from '../../../web/models/template';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditTemplateComponent } from '../../components/dialog-edit-template/dialog-edit-template.component';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent implements OnInit {

  private readonly templateServices = inject(TemplateService)
  private readonly dialog = inject(MatDialog)

  templates = signal<ITemplate[]>([]);

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.templateServices.getTemplates().subscribe(
      data => {
        this.templates.set(data.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTemplate(template: ITemplate) {
    this.templateServices.updateTemplate(template).subscribe(() => {
      alert('Precio modificado con éxito');
      this.getTemplates();
    });
  }

  openDialogEditTemplate(template: ITemplate) {
    const dialog = this.dialog.open(DialogEditTemplateComponent, {
      width: '300px',
      data: {
        price: template.price
      }
    });

    dialog.afterClosed().subscribe(data => {
      const updatedTemplate = {
        ...template,
        price: data
      }

      this.updateTemplate(updatedTemplate);
    });
  }
}
