import { Controller, Post, Body, Get, Param, Patch, HttpStatus, Res, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController{

    constructor(private readonly productService: ProductService){}
   
    @Post()
    async addProduct(
        @Res() response,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
        ){
            // console.log("kkkkkkkkkkkkkk>>>>>.",prodTitle, prodDescription, prodPrice)
        const generatedId = await this.productService.insertProduct(
            prodTitle, 
            prodDescription, 
            prodPrice
            );
            // return {id: generatedId };
            return response.status(HttpStatus.CREATED).json({
                generatedId
            })
            
            
    }
    @Get()
    async getAllProducts(){
        const products = await this.productService.getProducts();
        // console.log("get api ", products)

        return products.map((prod)=> ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }));
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string){
        const product = await this.productService.getSingleProduct(prodId);
        console.log(".................", product);
         return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,) {
        return this.productService.updatedProduct(prodId, prodTitle, prodDescription, prodPrice);
        }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string){
        const product = await this.productService.deleteProduct(prodId);
         return product;
    }


}