import { BadRequestException, Injectable, NotFoundException, } from "@nestjs/common";
import { v4 as uuidV4 } from 'uuid';
import { Product } from "./product.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async createProduct(title: string, description: string, price: number): Promise<string> {
        const newProduct = new this.productModel({
            title,
            description,
            price
        });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async fetchProducts() {
        const products = await this.productModel.find().exec();
        return products.map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        })) as Product[];
    }

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }
    }

    async updateProduct(id: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(id);

        if (title) updatedProduct.title = title;
        if (desc) updatedProduct.description = desc;
        if (price) updatedProduct.price = price;

        updatedProduct.save()
    }

    async deleteProduct(id: string) {
        const product = await this.findProduct(id);
        product.delete(); 
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Not found any product')
        }
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }     
} 