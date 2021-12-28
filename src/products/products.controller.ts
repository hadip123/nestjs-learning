import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly prodService: ProductService) { }

    @Post('create')
    createProducts(
        @Body('title') pTitle: string,
        @Body('description') pDesc: string,
        @Body('price') pPrice: number
    ): any {
        const prodId = this.prodService.createProduct(pTitle, pDesc, pPrice);

        return {
            id: prodId,
        };
    }
}