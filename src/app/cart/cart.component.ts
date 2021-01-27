import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Constant } from '../constants';
import { Router } from '@angular/router';
import { SharedService } from '../shared.Service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService]

})
export class CartComponent implements OnInit {

  getProductsFromCart_subscription: Subscription;
  removeProductFromCart_subscription: Subscription;

  productsFromCart: any = [];
  constructor(private productService: ProductService,
    private constant: Constant,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private sharedService: SharedService) { }

  // product cards Paginations
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>

  allProducts: any;
  imageURL: any;
  getProductsFromCartURL = this.constant.getProductsFromCartURL;
  userName: String
  ngOnInit(): void {
    this.userName = this.sharedService.userName != "" ? this.sharedService.userName : "NoUser";
    const url = this.getProductsFromCartURL.replace("{userId}", this.userName)
    this.getProductsFromCart_subscription = this.productService.getProductsListFromDB(url)
      .subscribe((res) => {
        this.allProducts = res["products"];
        this.loadPaginatorObs(this.allProducts);

        // ImageURL
        this.productService.getImageURL();
        this.imageURL = this.productService.ImageURL;
      }, (err) => {
        console.log(err);
      });
  }

  /**
  * Order Product Page
  */
  orderProduct(index: any): void {
    const id = this.allProducts[index].bookID;
    this.router.navigate(["/" + "order", id]);
  }

  getRemovedFromCartURL = this.constant.getRemovedFromCartURL;
  /**
  * Add Product into Cart
  * @param index
  */
  removeFromCart(index: any): void {
    const currentProduct = this.allProducts[index];
    let url = this.getRemovedFromCartURL.replace("{productId}", currentProduct.bookID);
    url = url.replace("{userId}", this,this.userName);
    this.removeProductFromCart_subscription = this.productService.removeProductsFromCart(url)
      .subscribe((res) => {
        alert(res["responseMessage"]);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      });
  }

  /**
  * Load Pagination 
  * @param products
  */
  private loadPaginatorObs(products: any): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<any>(products);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  triggerPage(event: any): void {
    let uri = event.target.id == "home" ? "" : event.target.id;
    this.router.navigate(["/" + uri]);
  }

  OnDestroy(): void {
    if (this.getProductsFromCart_subscription) { this.getProductsFromCart_subscription.unsubscribe; }
    if (this.dataSource) { this.dataSource.disconnect(); }
    if (this.removeProductFromCart_subscription) { this.removeProductFromCart_subscription.unsubscribe; }
  }

}
