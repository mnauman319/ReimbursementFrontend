import Employee from './employee';

export class Reimbursement{

    rId:number;
    employee:Employee;
    status:string;
    category:string;
    dateSubmitted:Date;
    item:string;
    note:string;
    amount:number;

}

export default Reimbursement;