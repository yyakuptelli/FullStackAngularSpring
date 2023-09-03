export class Product {
  id: string;
  productName: string;
  productDescription: string;
  productType: ProductType.Customer;
  productPrice: string;
  productImagePath: string;
}

export enum ProductType {
  Customer = 'customer',
  Service = 'service',
  Industry = 'industry',
}
