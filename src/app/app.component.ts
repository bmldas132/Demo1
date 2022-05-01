import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo1';
  model = {
    SignUp:{
      Email: "",
      Password: ""
    },
    SignIn: {
      Email: "",
      Password: ""
    },
    NewEmployee: {
      Name: ""
    }
  }

  loggedInUser: any = "";
  employees: any = [];

  constructor(private firebaseService: FirebaseService){
    
  }

  async SignUp(){
    await this.firebaseService.SignUp(this.model.SignUp.Email, this.model.SignUp.Password);
    this.model.SignUp.Email = "";
    this.model.SignUp.Password = "";
  }

  async SignIn(){
    await this.firebaseService.SignIn(this.model.SignIn.Email, this.model.SignIn.Password);
    this.model.SignIn.Email = "";
    this.model.SignIn.Password = "";
  }

  async SignOut(){
    await this.firebaseService.SignOut();
  }

  GetLoggedInUserEmail(){
    var email  = this.firebaseService.getLoggedInUserEmail();
    if(email){
      this.loggedInUser = "You are logged in as " + email;
    }
    else{
      this.loggedInUser = "You are not logged in!!!";
    }
  }

  async AddEmployee(){
    await this.firebaseService.AddEmployee(this.model.NewEmployee.Name);
  }

  async GetEmployees(){
    this.employees = await this.firebaseService.GetEmployees();
    console.log(this.employees)
  }
}
