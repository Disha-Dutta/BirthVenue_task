import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray} from  '@angular/forms';

@Component({
    selector:'app-employee-detail',
    templateUrl:'./employee-detail.component.html',
    styleUrls:['./employee-detail.component.css']
})
export class EmployeeDetail implements OnInit{
    counter:number;
    contactArray:number[];
    employeeDetail:FormGroup;
    searchTerm: any;
    details : any[];
    filteredArray:any[];

    constructor(private formBuilder: FormBuilder){
    }

    ngOnInit(){
        this.details = [];
        this.filteredArray = this.details;

        this.employeeDetail = this.formBuilder.group({
            id:['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])],
            name:['',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
            age:['',Validators.compose([Validators.required, Validators.minLength(2)])],
            gender:['',Validators.required],
            contact:this.formBuilder.group({
                email:['',Validators.required]
            }),
            contacts: this.formBuilder.array([
                this.formBuilder.control('')
            ]),
            address:this.formBuilder.group({
                street:['',Validators.required],
                city:['',Validators.required],
                state:['',Validators.required],
                country:['',Validators.required]
            }),
            address2:this.formBuilder.group({
                street2:[''],
                city2:[''],
                state2:[''],
                country2:['']
            })
        })
    }

    onSubmit(): void {
        this.details.push(this.employeeDetail.value);
        console.log("Details >> ",this.details);
    }
      
    get contacts(){return this.employeeDetail.get('contacts') as FormArray;}
    
    addNewNumber(){this.contacts.push(this.formBuilder.control(''));}

    search(searchTerm){
        this.filteredArray = this.details.filter(function(empdetail){return empdetail.age == searchTerm || empdetail.gender == searchTerm;});
        this.details = this.filteredArray;
    }
}

