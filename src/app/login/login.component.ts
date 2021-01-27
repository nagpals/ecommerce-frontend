import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constant } from '../constants';
import { ProductService } from '../product.service';
import { SharedService } from '../shared.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private constant: Constant,
    private productService: ProductService,
    private router: Router,
    private sharedService : SharedService) { }
  emailId: String

  @Output() logInEmitter = new EventEmitter<any>();

  ngOnInit(): void {
  }

  logIn_subscription: Subscription;

  logIn(): void {
    let url = this.constant.logInURL;
    url = url.replace("{emailId}", this.emailId)
    this.logIn_subscription = this.productService.logIn(url)
      .subscribe((res) => {
        if (res["success"] === true) {
          alert("LogIn Successful")
          this.sharedService.userName = res["userId"];;
          this.sharedService.emailId = res["emailId"];
          this.sharedService.phoneNo = res["phoneNo"];
          this.sharedService.name = res["name"];
          this.router.navigate(["/"]);
        } else {
          alert("LogIn Failed! Invalid User")
          this.router.navigate(["/"]);
        }
      }, (err) => {
        console.log(err);
      });
  }
  signUp(): void {
    this.router.navigate(["/" + "signup"]);
  }

  triggerPage(event:any): void {
    let uri = event.target.id == "home" ? "" : event.target.id;
    this.router.navigate(["/"+uri]);
  }

  OnDestroy() {
    if(this.logIn_subscription) { this.logIn_subscription.unsubscribe}
  }

}
