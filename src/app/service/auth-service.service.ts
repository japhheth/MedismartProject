
import { Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireList} from 'angularfire2/database';
import {HttpClient, HttpHeaders} from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  transactionList: AngularFireList<any>;
  arrayList: any;
  baseUrl: any;
  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:24648/api';
  }

  userForm: FormGroup = new FormGroup({
    MaidenName: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', [Validators.required]),
    OtherName: new FormControl(''),
    Sex: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Address: new FormControl(''),
    State: new FormControl(''),
    Next_Of_Kin: new FormControl(''),
    itbid: new FormControl(''),
    Email: new FormControl('', [Validators.required, Validators.email])
  });



  inititializeFormGroup(){
    this.userForm.setValue({
      MaidenName: '',
      FirstName: '',
      LastName: '',
      OtherName: '',
      Sex: '',
      PhoneNumber: '',
      Address: '',
      State: '',
      Next_Of_Kin: '',
      Email: '',
      itbid: ''

    });
  }

  // ----------------- Add User Record ------------------------

  addData(data: any){
    try{

      return this.http.post(`${this.baseUrl}/postUser`, data , httpOptions);

    }
    catch(error){
      console.log(error, 'ërror');
    }
  }

  // ----------------- Populate User Record ------------------------

  populate(userData) {
    this.userForm.setValue(userData);
  }


  // ----------------- Delete User Record ------------------------

  deleteUser(itbId: any) {
    try {
      return this.http.delete(`${this.baseUrl}/DeleteUser/${itbId}`, httpOptions);
    }
    catch (error) {
      console.log(error, 'ërror');
    }

  }

  // ----------------- Get User Records ------------------------

  getRecords(){
    try{
      return this.http.get(`${this.baseUrl}/GetUsers`, httpOptions);
    }
    catch (error){
      console.log(error, 'ërror');
    }
  }


  // ----------------- Update User Record ------------------------

  updateTransaction(itbId: any) {
    try{
      return this.http.post(`${this.baseUrl}/updateUser`, itbId, httpOptions);
    }
    catch (error) {
      console.log(error, 'ërror');
    }
  }




}
