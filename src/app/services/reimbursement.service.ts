import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  constructor(private http: HttpClient) { }

  lastSortInput:string = "";

  async getEmployeeReimbursements(eId: number): Promise<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(`${environment.baseUrl}/reimbursements/${eId}`).toPromise();
  }
  async getAllReimbursements(): Promise<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(`${environment.baseUrl}/reimbursements`).toPromise();
  }
  async getReimbursementById(rId:number): Promise<Reimbursement>{
    return this.http.get<Reimbursement>(`${environment.baseUrl}/reimbursements/${rId}`).toPromise();
  }
  async updateReimbursement(reimbursement:Reimbursement): Promise<Reimbursement>{
    return this.http.put<Reimbursement>(`${environment.baseUrl}/reimbursements`,reimbursement).toPromise();
  }

  search(searchInput: string, reimbursements: Reimbursement[]) {
    searchInput = searchInput.toLowerCase();
    console.log(searchInput);

    let tempFilteredReimbursements: Reimbursement[] = [];
    for (let reimbursement of reimbursements) {
      if (reimbursement.amount.toString().toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.category.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.dateSubmitted.toString().toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.employee.firstName.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.employee.lastName.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.item.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.note.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.status.toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      } else if (reimbursement.rId.toString().toLowerCase().includes(searchInput)) {
        tempFilteredReimbursements.push(reimbursement);
      }
    }
    return tempFilteredReimbursements;
  }

  sort(sortType: string, sortBool: boolean, reimbursements: Reimbursement[]): Reimbursement[] {
    console.log(`sortBool - ${sortBool}`);
    console.log(`sortType - ${sortType}`);


    if (!sortBool) {
      let aChar, bChar;
      reimbursements = reimbursements.sort((a, b) => {
        switch (sortType) {
          case "item":
            aChar = a.item.toLowerCase();
            bChar = b.item.toLowerCase();
            break;
          case "category":
            aChar = a.category.toLowerCase();
            bChar = b.category.toLowerCase();
            break;
          case "status":
            aChar = a.status.toLowerCase();
            bChar = b.status.toLowerCase();
            break;
          case "employee":
            aChar = a.employee.firstName.toLowerCase() + a.employee.lastName.toLowerCase();
            bChar = b.employee.firstName.toLowerCase() + b.employee.lastName.toLowerCase();
            break;
          case "note":
            aChar = a.note.toLowerCase();
            bChar = b.note.toLowerCase();
            break;
          case "amount":
            aChar = b.amount;
            bChar = a.amount;
            break;
          case "date":
            aChar = b.dateSubmitted.valueOf();
            bChar = a.dateSubmitted.valueOf();
            break;
          default:
            return null;
        }
        return (aChar > bChar) ? 1 : (bChar > aChar) ? -1 : 0;
      });
    } else if (sortBool && this.lastSortInput === sortType){
        reimbursements = reimbursements.reverse();
    }
    this.lastSortInput = sortType;
    return reimbursements;
  }

}
