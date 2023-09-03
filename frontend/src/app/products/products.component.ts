import { Component, OnInit } from '@angular/core';
import { Product } from './product-model';
import { ProductService } from './product-service';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.refreshProductList();
  }

  deleteProduct(id: string){
    this.productService.deleteProductById(id).subscribe(
      () => {
        this.refreshProductList();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  refreshProductList(){
    this.productService.fetchProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  editProduct(id: string){
    this.router.navigate(['product-edit', id]);
  }

  detailProduct(id: string){
    this.router.navigate(['product-detail', id]);
  }

  addProduct() {
    this.router.navigate(['product-add']);
  }

  searchProducts() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase();
      this.products = this.products.filter((product) =>
          product.productName.toLowerCase().includes(query)
      );
    } else {
      this.productService.fetchProducts().subscribe(
          (data) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
      );
    }
  }

}
