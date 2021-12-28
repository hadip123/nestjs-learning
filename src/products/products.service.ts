import { Injectable } from "@nestjs/common";
import uuid from 'uuid';
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    products: Product[] = [];

    createProduct(title: string, description: string, price: number): string {
        let uniqeId = uuid.v4();
        const newProduct = new Product(uniqeId, title, description, price);
        this.products.push(newProduct);
        return uniqeId;
    }
}