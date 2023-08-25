import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.scss']
})
export class ReactiveformComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitted!: boolean;

  users!: IUser[];
  errors: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('',Validators.required),
      username: new FormControl('', 
      [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*")
      ]),
      password: new FormControl('', Validators.required),
      address: new FormGroup({
        addressLine: new FormControl('',Validators.required),
        city: new FormControl('',Validators.required),
        state: new FormControl('',[ Validators.required, Validators.pattern("[a-zA-Z ]*")]),
        zipCode: new FormControl('',Validators.required)
      }),
      skills: new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  addSkills(){
    this.skills.push(new FormControl('', Validators.required));
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched();
    if(this.registrationForm.invalid){
      this.errors = true;
      console.log('ERROR!!!!')
    }
    else{
      this.errors = false;
      this.isSubmitted = true;
      console.log(this.registrationForm.value);

      //this.users.push(this.registrationForm.value);

      //console.log(this.users)
    
     
      /*const json = JSON.stringify(this.registrationForm.value)
      localStorage.setItem('users', json)*/
    }
    
      
  }

  get email() { return this.registrationForm?.get('email'); }
  get username() { return this.registrationForm?.get('username'); }
  get password() { return this.registrationForm?.get('password'); }

  get skills() : FormArray {
    return this.registrationForm.get("skills") as FormArray
  }

}
