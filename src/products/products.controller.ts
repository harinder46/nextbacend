import { Controller, Post, Body, Get, Param, Patch, HttpStatus, Res } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController{

    constructor(private readonly productService: ProductService){}
   
    @Post()
    async addProduct(
        @Res() response,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        ){
        const generatedId = await this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
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
        console.log("get api ", products)

        return products.map((prod)=> ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }));
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,) {

            this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
            return null;

    }

}