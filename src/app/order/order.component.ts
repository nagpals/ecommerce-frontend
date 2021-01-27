import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { ProductService} from '../product.service'
import { Constant } from '../constants'
import { SharedService } from '../shared.Service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService : ProductService,
    private constant : Constant,
    private sharedService: SharedService) { }

  orderRoute_subscribation: Subscription
  getAllProduct_subscription: Subscription;
  orderProduct_subscription: Subscription;
  logIn_subscription: Subscription;

  getAllProductsURL: any = this.constant.getAllProductsURL;
  userName:String
  emailId:String
  phoneNumber:String
  address: String
  
  productId: string
  product : any
  ImageURL:any= []
  ngOnInit(): void {
    if(this.sharedService.userName) {this.userName = this.sharedService.userName }  
    if(this.sharedService.emailId) {this.emailId = this.sharedService.emailId }  
    if(this.sharedService.phoneNo) {this.phoneNumber = this.sharedService.phoneNo }  

    this.orderRoute_subscribation = this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
      }
    )

    this.getAllProduct_subscription = this.productService.getProductsListFromDB(this.getAllProductsURL)
    .subscribe((res) => {
      const allProducts = res["products"];
      // ImageURL
      this.productService.getImageURL();
      this.ImageURL = this.productService.ImageURL;
      this.product = allProducts[this.productId];
    }, (err) => {
      console.log(err);
    });
  }

  triggerPage(event:any): void {
    let uri = event.target.id == "home" ? "" : event.target.id;
    this.router.navigate(["/"+uri]);
  }

  orderProduct(): void {

    const body = {
      'userName': this.userName,
      'emailId': this.emailId,
      'phoneNo': this.phoneNumber,
      'address': this.address,
      'amount': this.product.price,
      'purpose': "Order of product : " + this.product.title   
    };

    const url = this.constant.orderProduct;
    this.orderProduct_subscription = this.productService.orderProduct(url, body)
    .subscribe((res) => {
      console.log(res["responseMessage"])
      alert("Sorry for Inconvenience, Issue with payment gateway");
    }, (err) => {
      console.log(err);
    });
  }

  getLoggedInUserDetail(): void {
    let url = this.constant.logInURL;
    url = url.replace("{emailId}", this.emailId)
    this.logIn_subscription = this.productService.logIn(url)
      .subscribe((res) => {
        if (res["success"] === true) {
          this.userName = res["userId"];
          this.phoneNumber = res["phoneNo"];
          this.emailId = res["emailId"];
        }
      }, (err) => {
        console.log(err);
      });
  }

  OnDestory() {
    if (this.orderRoute_subscribation) {
      this.orderRoute_subscribation.unsubscribe
    }

    if (this.getAllProduct_subscription) {
      this.getAllProduct_subscription.unsubscribe
    }

    if (this.orderProduct_subscription) {
      this.orderProduct_subscription.unsubscribe
    }
  }

}
