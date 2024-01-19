import { Injectable, inject } from '@angular/core';
import { ITemplate } from '../models/template';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

type templateResponse = { data: ITemplate };
type templatesResponse = { data: ITemplate[] };

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private api_url = environment.api_url;
  private readonly httpClient = inject(HttpClient);

  getTemplates() {
    return this.httpClient.get<templatesResponse>(`${this.api_url}/template/`);
  }

  getTemplate(template_id: number) {
    return this.httpClient.get<templateResponse>(
      `${this.api_url}/template/${template_id}`
    );
  }

  updateTemplate(template: ITemplate) {
    return this.httpClient.put<templateResponse>(
      `${this.api_url}/template/${template.id}`, template
    );
  }
}
