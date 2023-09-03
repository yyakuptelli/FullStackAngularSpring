import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Product, ProductType} from "../product-model";
import {ProductService} from "../product-service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  newProduct = new Product();
  productTypes = Object.values(ProductType);
  image: string;
  constructor(private router: Router, private productService : ProductService) {
  }
  backToProductList() {
    this.router.navigate(['products']);
  }

  onSubmit() {
    this.productService.createProduct(this.newProduct).subscribe(
      (response) => {
        this.backToProductList();
        console.log('Product created:', response);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }
  handleFileInput(event: any) {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.newProduct.productImagePath = this.image; // Set the productImagePath
      };
    }
  }

}
