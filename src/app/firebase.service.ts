import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { Firestore, getDocs, addDoc, collection } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: Auth, private firestore: Firestore) { 
    
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

  async AddEmployee(name: string){
    try {
      await addDoc(collection(this.firestore, "employees"), {
        EmployeeName: name,
        Created: new Date()
      });
      alert("Employee created successfully.");
    } catch (error) {
      alert("Error occured while creting Employee. Check console for detail.");
      console.log(error);
    }
  }

  async GetEmployees(){
    let newData: any = [];
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "employees"));
      querySnapshot.forEach((doc) => {
        newData.push({
          EmployeeId: doc.id,
          EmployeeName: doc.data()["EmployeeName"]
        });
      });
    } catch (error) {
      alert("Error occured while creting Employee. Check console for detail.");
      console.log(error);
    }
    return newData;
  }
}
