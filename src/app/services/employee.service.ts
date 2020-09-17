import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  loggedInEmployee:Employee;

  constructor(private http: HttpClient) {  }

  async login(username:string, password:string):Promise<Employee>{
    return await this.http.post<Employee>(`${environment.baseUrl}/login`,{username,password}).toPromise();
  }
}
