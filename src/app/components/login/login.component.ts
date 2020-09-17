import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @Input('ngModel')
  username:string ='';
  // @Input('ngModel')
  password:string = '';
  employee:Employee;
  constructor(private eserv:EmployeeService, private router:Router) { }

  ngOnInit(): void {
  }

  async attemptLogin(){
    this.employee = await this.eserv.login(this.username,this.password);
    if(this.employee!==null){
      this.eserv.loggedInEmployee = this.employee;
      this.router.navigateByUrl('/home');
    }
  }
}
