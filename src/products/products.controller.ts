import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly prodService: ProductService) { }

    @Post('create')
    async createProducts(
        @Body('title') pTitle: string,
        @Body('description') pDesc: string,
        @Body('price') pPrice: number
    ): Promise<any> {
        const prodId = await this.prodService.createProduct(pTitle, pDesc, pPrice);

        return {
            id: prodId,
        };
    }

    @Get()
    async getAllProducts() {
        return await this.prodService.fetchProducts();
    }

    @Get(':id')
    getOneProduct(@Param('id') id: string) {
        return this.prodService.getSingleProduct(id);

    }

    @Patch('update/:id')
    async updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') desc: string, @Body('price') price: number) { 
        await this.prodService.updateProduct(id, title, desc, price);
        
        return {
            "message": "Successfully updated product."
        }
    }

    @Delete('delete/:id')
    async removeProduct(@Param('id') id: string) {
        await this.prodService.deleteProduct(id);

        return {
            "message": "Successfully product deleted. "
        }
    }
}