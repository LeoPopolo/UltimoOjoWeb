import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';

type projectsResponseType = { data: Project[] };
type projectResponseType = { data: Project };

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private api_url = environment.api_url;
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  createProject(bodyProject: Project) {
    return this.httpClient.post<Project>(`${this.api_url}/project/`, bodyProject);
  }

  updateProject(bodyProject: Project) {
    return this.httpClient.put<Project>(`${this.api_url}/project/${bodyProject.id}`, bodyProject);
  }

  getProjects() {
    return this.httpClient.get<projectsResponseType>(`${this.api_url}/project/`);
  }

  getProject(id: number) {
    return this.httpClient.get<projectResponseType>(`${this.api_url}/project/${id}`);
  }

  deleteProject(id: number) {
    return this.httpClient.delete<void>(`${this.api_url}/project/${id}`);
  }
}
