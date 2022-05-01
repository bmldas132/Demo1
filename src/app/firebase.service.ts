import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth) { 
    
  }

  async SignUp(email: string, password: string){
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      alert("Signup + login successfull.");
    } catch (error) {
      alert("Error occured while signup. Check console for detail.");
      console.log(error);
    }
  }

  async SignIn(email: string, password: string){
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      alert("Login successfull.");
    } catch (error) {
      alert("Error occured while signin. Check console for detail.");
      console.log(error);
    }
  }

  async SignOut(){
    try {
      await signOut(this.auth);
      alert("Logout successfull.");
    } catch (error) {
      alert("Error occured while signout. Check console for detail.");
      console.log(error);
    }
  }

  getLoggedInUserEmail(){
    return this.auth.currentUser?.email;
  }
}
