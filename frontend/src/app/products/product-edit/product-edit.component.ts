import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product-service";
import {Product, ProductType} from "../product-model";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  id: string = this.route.snapshot.paramMap.get('id');
  product = new Product();
  productTypes = Object.values(ProductType);
  image: string;
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

  onSubmit() {
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.router.navigate(['product-detail', this.product.id]);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );

  }

  backToProductList() {
    this.router.navigate(['products']);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.product.productImagePath = this.image; // Set the productImagePath
      };
    }
  }
}
