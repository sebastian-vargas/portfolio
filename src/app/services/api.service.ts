import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@app/shared/interfaces/company.interface';
import { OtherProject, ProjectDetails } from '@app/shared/interfaces/project.details';
import { Project } from '@app/shared/interfaces/project.interface';
import { map, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    //private url = 'http://localhost:3000/'; json-server --watch db.json but no use in GitHub Pages

    private url = 'assets/db.json'; //Static Page for GitHub Pages without backend server


    /**
     * app.config.ts add provideHttpClient() without modules
     * @param http 
     */
    constructor(private http: HttpClient) {}

    getAllProjects(): Observable<Project[]> {
        return this.http.get<any>(this.url).pipe(
          map((data) => data.projects)
        );
    }

    getImagesByIdProject(id_project: number): Observable<ProjectDetails[]> {
        return this.http.get<any>(this.url).pipe(
            map((data) => {
                const projectImages: ProjectDetails[] = data.images_project.filter(
                    (project: ProjectDetails) => project.id_project === id_project
                );
                return projectImages;
            })
        );
    }
    

    getAllCompanies(): Observable<Company[]> {
        return this.http.get<any>(this.url).pipe(
            map((data) => data.companies)
        );
    }

    getAllOtherProject() : Observable<OtherProject[]> {
        return this.http.get<any>(this.url).pipe(
          map((data) => data.other_projects)
        );
    }
    




    //Promise with json-server

    /*async getAllProjects(): Promise<Project[]> {
        const data = await fetch(`${this.url}/projects`);
        return (await data.json()) ?? [];
    }*/
    /*async getImagesByIdProject(id_project: number): Promise<ImagesProject[] | undefined> {
        const data = await fetch(`${this.url}/images_project/${id_project}`);
        return (await data.json()) ?? {};
    }
    async getAllCompanies(): Promise<Company[]> {
        const data = await fetch(`${this.url}/companies`);
        return (await data.json()) ?? [];
    }*/
    submitApplication(firstName: string, lastName: string, email: string) {
        // tslint:disable-next-line
        console.log(firstName, lastName, email);
    }
}