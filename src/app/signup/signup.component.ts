import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constant } from '../constants';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.Service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  createUser_subscription : Subscription;

  constructor(
      private constant: Constant,
      private productService: ProductService,
      private router: Router,
      private sharedService : SharedService) {}

  phoneNumber: String
  userName: String
  emailId: String
  name: String

  ngOnInit(): void {
  }

  signUp(): void {
    let url = this.constant.createUserURL;
    const body = {
      "userId" : this.userName,
      "name"  : this.name,
      "emailId" : this.emailId,
      "phoneNo" : this.phoneNumber
    };

    this.createUser_subscription = this.productService.createUser(url, body)
      .subscribe((res) => {
        if(res["success"] === true) {
          alert("Sign up successful");
          this.sharedService.userName = this.userName;
          this.sharedService.emailId = this.emailId;
          this.sharedService.phoneNo = this.phoneNumber;
          this.sharedService.name = this.name;
          this.router.navigate(["/"]);
        } else if (res["responseMessage"] === "Record Exist Already" ){
          alert("Existing user! login successful");
          this.sharedService.userName = this.userName;
          this.router.navigate(["/"]);
        } else {
          alert("Sign up failed! Please try later");
        }
      }, (err) => {
        console.log(err);
      });
  }
  
  triggerPage(event:any): void {
    let uri = event.target.id == "home" ? "" : event.target.id;
    this.router.navigate(["/"+uri]);
  }
  
  OnDestroy() {
    if(this.createUser_subscription) { this.createUser_subscription.unsubscribe}
  }
  
}
