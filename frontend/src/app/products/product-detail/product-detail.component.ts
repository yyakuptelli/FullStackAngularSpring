import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../product-model";
import {ProductService} from "../product-service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  id: string = this.route.snapshot.paramMap.get('id');
  product = new Product();
  constructor(private router: Router, private route: ActivatedRoute, private productService : ProductService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.fetchProductById(this.id).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    });
  }

  BackToProductList() {
    this.router.navigate(['products']);
  }
}
