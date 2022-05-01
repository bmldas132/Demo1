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
    },
    Image:{
      ImageContent: null,
      FileName: ""
    }
  }

  loggedInUser: any = "";
  employees: any = [];
  allImages: any = null;

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

  fileChanged(e: any) {
    this.model.Image.ImageContent = e.target.files[0];
    this.model.Image.FileName = e.target.files[0]?.name;
  }

  async UploadImage(){
    console.log(this.model.Image.ImageContent);
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      console.log(fileReader.result?.toString());
      await this.firebaseService.UploadFileAsText(this.model.Image.FileName, <any>fileReader.result?.toString());
    }
    fileReader.readAsText(<any>this.model.Image.ImageContent);
  }

  async GetImages(){
    this.allImages = await this.firebaseService.GetAllImages();
    console.log(this.allImages);
  }
}
