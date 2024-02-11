import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm">
    <div class="test"> 
      <label for="name"> Name</label> ::
      <input formControlName="name"   type="text" placeholder="Enter Name ">
      <br>
      <label for="password">Password</label> :: 
      <input formControlName="password" type="text" placeholder="Enter Password">
      <br>
      <button type="submit" (click)="validateLogin()"> Submit </button>
    </div>
    </form>
    
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @Output() userAuthUpdate: EventEmitter <any> = new EventEmitter();

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name:['akash', [Validators.required]],
      password:['ok',[Validators.required]]
    })
  }

  validateLogin(){
    debugger
    console.log(this.loginForm);
    let userDetails = {
      userName: this.loginForm.value.name,
      password: this.loginForm.value.password
    }
    this.http.post('http://localhost:3000/login',userDetails).subscribe({
      next:(response: any)=>{
        localStorage['token'] = response.jwt;
        console.log("Validation complete");
        this.userAuthUpdate.emit({userAuthenticated:true});
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
