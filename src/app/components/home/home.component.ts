import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ReimbursementService } from '../../services/reimbursement.service';
import { Reimbursement } from '../../models/reimbursement';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newReimbursement:Reimbursement = new Reimbursement;
  updateReimbursement:Reimbursement;
  reimbursements:Reimbursement[];
  storedReimbursements:Reimbursement[];
  sortMap = new Map<string,boolean>(); //key is name of sortType, value is true when sorted alphabetically
  employee:Employee;
  searchInput:string;
  newNote:string;
  submitVisibility:string = "hidden";
  updateVisibility:string = "hidden";
  isUpdateReimPending:boolean = false;
  constructor(private rserv:ReimbursementService, private eserv:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.employee = this.eserv.loggedInEmployee
    if(this.employee === undefined){
      this.router.navigateByUrl('/login');
    }
    this.getReimbursements();
    this.initializeSortMap();
  }

  async getReimbursements(){
    this.reimbursements = this.employee.permission ? 
                        await this.rserv.getAllReimbursements() : 
                        await this.rserv.getEmployeeReimbursements(this.employee.id);
    this.storedReimbursements = this.reimbursements;
    
  }

  search(){
    this.searchInput = this.searchInput.toLowerCase();
    this.reimbursements = this.rserv.search(this.searchInput,this.storedReimbursements);
  }

  sort(event){
    this.rserv.sort(event.target.id,this.sortMap.get(event.target.id),this.reimbursements);
    let currentSortBool = !this.sortMap.get(event.target.id);
    this.sortMap.set(event.target.id,currentSortBool);
  }    
  toggleSubmitVisibility(){
    if (!this.employee.permission) {
      this.submitVisibility = (this.submitVisibility === "visible") ? "hidden" : "visible";
    } else {
      alert("You should not be creating a reimbursement.");
    }
  }
  initializeSortMap(){
    this.sortMap.set("item",false);
    this.sortMap.set("status",false);
    this.sortMap.set("category",false);
    this.sortMap.set("amount",false);
    this.sortMap.set("employee",false);
    this.sortMap.set("note",false);
    this.sortMap.set("date",false);
  }

  submitReimbursement(){
    this.newReimbursement.employee = this.employee;
    console.log(this.newReimbursement);
    
  }

  async toggleUpdateVisibility(event){
    if(this.updateVisibility === "hidden"){

      if(this.employee.permission !== true){
        alert("You do not have permission to update reimbursements")
      }else{
        let id = event.target.value;
        let tempReimbursements:Reimbursement[];
  
        tempReimbursements = this.reimbursements.filter(reim =>{ return (reim.rId == id) });
        this.updateReimbursement = tempReimbursements[0];
        
        this.isUpdateReimPending = (this.updateReimbursement.status === "pending");
        this.updateVisibility = "visible";
      }

    }else{
      this.updateVisibility = "hidden";
    }
  }
  async changeStatus(event){
    let newStatus = (event.target.innerText == "approved") ? "accepted" : "rejected";
    
    this.updateReimbursement.status = newStatus;
    this.updateReimbursement = await this.rserv.updateReimbursement(this.updateReimbursement);
  }

  async changeNote(){
    this.updateReimbursement.note = this.newNote;
    this.updateReimbursement = await this.rserv.updateReimbursement(this.updateReimbursement);
  }
}
