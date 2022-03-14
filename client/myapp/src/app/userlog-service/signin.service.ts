import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  Url: string = 'http://localhost:3030/'
 
  constructor(private client: HttpClient) { }
//Backend call for the creating new user
  signUpUser(user: any) {
    return this.client.post(this.Url + 'signup', user)
  }
//Backend call for user login
  loginUser(user: { name: string, password: string }) {
    return this.client.post(this.Url + 'login', user)
  }
//Backend call for saving complaints by users
  postComplaint(post: any) {
    return this.client.post(this.Url + 'complaints', post)
  }
//Backend call for accessing all complaints by admin
  getAllComplaints() {
    return this.client.get(this.Url + 'complaints')
  }
  //Backend call for the accessing all complaints by a user
  getComplaintById(id: any) {
    return this.client.get(this.Url + 'complaints/' + id)
  }
  
  //Backend call for accessing single complaints details by a user
  getComplaintDetailById(id: any) {
    return this.client.get(this.Url + 'complaints/details/' + id)
  }
  
//Backend call for updating the complaints status by admin
  updateComplaints(post: any) {
    return this.client.patch(this.Url + 'complaints', post)
  }

  postContact(post:any){
    return this.client.post(this.Url + 'contacts', post)
  }
  getAllContacts(){
    return this.client.get(this.Url +'contacts')
  }

  deleteContactById(id:string){
    return this.client.delete(this.Url+'contacts/' + id)
  }
  updateContactById(id:string, data:any){
    return this.client.patch(this.Url+'contacts/'+id, data)
  }
  
  //function for decoding the token for data use purpose
  getDecodeToken() {
    const token = localStorage.getItem('token')
    if (token) {
      return jwt_decode(token)
    }
    return null;

  }
  
}
