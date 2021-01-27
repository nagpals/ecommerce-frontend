import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ecommerce-frontend';
  userName: String

  constructor() {}

  // variable use to navigate the page - defualting to home
  page: String = "home";
  getPageClickFromHeader(name) {
    this.page = name;
    console.log(name);
  }

  // Login details
  logInDetails: any = {};
  getLogInDetails(details) {
    this.page = "home";
    this.logInDetails = details;
    if(details["isSuccess"] === true && details["userName"] != undefined)  {
      this.userName  = details["userName"];
    }
    console.log(this.logInDetails);
  }
}
