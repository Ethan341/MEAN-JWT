import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [CommonModule, HttpClientModule, RouterOutlet, LoginComponent, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'JWT';
  isUserAuthenticated: boolean = false;
  constructor(private httpClient: HttpClient){

  }
  ngOnInit(): void {
  }
  updateLoginView(eventData: any){
    if(eventData.userAuthenticated){
      this.isUserAuthenticated = true;
      this.httpClient.get('http://localhost:3000/getUserDetails').subscribe({next:(data)=>{
          console.log(data)
      }})
    }
  }
}
