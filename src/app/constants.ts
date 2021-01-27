import { Injectable } from "@angular/core";

@Injectable()
export class Constant {
    
    getAllProductsURL: any = "https://thawing-sea-79453.herokuapp.com/barclays/product/all";
    addProductToCartURL: any = "https://thawing-sea-79453.herokuapp.com/barclays/cart";
    getProductsFromCartURL: any  ="https://thawing-sea-79453.herokuapp.com/barclays/cart/all/{userId}";
    getRemovedFromCartURL: any = "https://thawing-sea-79453.herokuapp.com/barclays/cart/{productId}/{userId}";
    createUserURL: any = "https://thawing-sea-79453.herokuapp.com/barclays/user"
    logInURL: any = "https://thawing-sea-79453.herokuapp.com/barclays/logIn/{emailId}"
    orderProduct: any = "https://thawing-sea-79453.herokuapp.com/barclays/payment"
}