import { ChangeDetectorRef, Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Constant } from '../constants';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../shared.Service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService]
})


export class HomeComponent implements OnInit {

  @Output() userNameUpdate = new EventEmitter<String>();

  getAllProduct_subscription: Subscription;
  addProductToCart_subscription: Subscription;
  homeRouteSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private constant: Constant,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private sharedService: SharedService) { }

  getAllProductsURL: any = this.constant.getAllProductsURL;
  allProducts: any;
  imageURL: any;
  titleToSearch: String // two binded
  loggedIn: boolean = false

  // product cards Paginations
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>
  
  userName: String;
  userId: String = "NoUser"
  ngOnInit(): void {
    
    if(this.sharedService.userName) {
      this.loggedIn = true;
      this.userName = this.sharedService.name
      this.userId = this.sharedService.userName;
    } else {
      this.loggedIn = false;
    }

    this.getAllProduct_subscription = this.productService.getProductsListFromDB(this.getAllProductsURL)
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

  triggerPage(event:any): void {
    let uri = event.target.id == "home" ? "" : event.target.id;
    this.router.navigate(["/"+uri]);
  }

  /**
   * Order Product Page
   */
  orderProduct(index: any): void {
    const id = this.allProducts[index].bookID;
    this.router.navigate(["/" + "order", id]);
  }

  /**
   * Add Product into Cart
   * @param index
   */
  addToCart(index: any): void {
    const currentProduct = this.allProducts[index];
    const url = this.constant.addProductToCartURL;

    // TODO : userName
    const body = { 'productId': currentProduct["bookID"], 'userId':  this.userId};
    this.addProductToCart_subscription = this.productService.addProductToCart(url, body)
      .subscribe((res) => {
        alert(res["responseMessage"]);
      }, (err) => {
        console.log(err);
      });
  }

  // Sortby rating
  sortByRating(event): void {
    let sortedProducts = Object.assign([], this.allProducts);
    const action = event.target.innerText;
    console.log(event.target.innerText);
    if (action === "Low to High") {
      sortedProducts.sort((a, b) => 0 - (a.average_rating > b.average_rating ? -1 : 1));
      this.loadPaginatorObs(sortedProducts);
    } else {
      sortedProducts.sort((a, b) => 0 - (a.average_rating > b.average_rating ? 1 : -1));
      this.loadPaginatorObs(sortedProducts);
    }
    this.isToggledClicked = true;
  }

  searchedProducts: any = [];
  // Search Panel
  searchProduct(): void {
    this.searchedProducts = [];
    console.log(this.titleToSearch)
    this.allProducts.filter(products => {
      const title = products.title;
      if (title.includes(this.titleToSearch)) {
        this.searchedProducts.push(products)
      }
    })
    this.loadPaginatorObs(this.searchedProducts);
  }

  // Clear Search
  clearSearch(): void {
    this.loadPaginatorObs(this.allProducts);
    this.titleToSearch = "";
  }
  isToggledClicked: boolean = false;

  clearToggled(): void {
    this.loadPaginatorObs(this.allProducts);
    this.isToggledClicked = false;
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

  OnDestroy(): void {
    if (this.getAllProduct_subscription) { this.getAllProduct_subscription.unsubscribe; }
    if (this.dataSource) { this.dataSource.disconnect(); }
    if (this.addProductToCart_subscription) { this.addProductToCart_subscription.unsubscribe; }
  }

}
