import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsListFromDB(url: any): Observable<any> {
        return this.http.get(url);
    }

    addProductToCart(url: any, body: any): Observable<any> {
        const headers = {};
        return this.http.post(url, body, { 'headers': headers })
    }

    removeProductsFromCart(url: any): Observable<any> {
        return this.http.delete(url);
    }

    createUser(url: any, body: any): Observable<any> {
        const headers = {};
        return this.http.post(url, body, { 'headers': headers });
    }

    logIn(url: any): Observable<any> {
        return this.http.get(url);
    }

    orderProduct(url: any, body: any): Observable<any> {
        const headers = {};
        return this.http.post(url, body, { 'headers': headers });
    }

    ImageURL = [];
    getImageURL(): void {
        this.ImageURL = [
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/red-book-hi8d6431a.png"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/indexa51d5d7.jpeg"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/blue-book-hic09def7.png"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/blue-book-reading-hid3b6f09.png"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/green-book-reading-hiec1b149.png"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/closed-book-cartoon-vector-symbol-icon-design-beautiful-illustr-illustration-isolated-white-background-975033320bc2a72.jpeg"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/inex290acda.jpeg"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/f958c0ca1c1701d236796ed90542a21940742f7.jpeg"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/index5848f8e.png"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/2511916-orange-book-cartoon6cc76e1.jpeg"
            }
        ];
    }

}