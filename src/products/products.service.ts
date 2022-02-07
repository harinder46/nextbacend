import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";


@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
 
    async insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description,
            price,
        });
        const result = await newProduct.save();
        // this.products.push(newProduct)
        console.log(result);
        return result.id as string;
    }

   async getProducts(){
       const products = await this.productModel.find().exec();
        return products;
    }

    async getSingleProduct(productId: string){
        const product = await this.findProduct(productId);
        return {
            id: product.id, 
            title: product.title,
            description: product.description,
            price: product.price
        }
        }

    async updatedProduct(productId: string, title: string, description: string, price: number){
        // const [product, index] = this.findProduct(productId);
        const updatedProduct = await this.findProduct(productId);
        // const updatedProduct = {...product}
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }
        updatedProduct.save();

    }

    async deleteProduct(id): Promise<Product> {
        return await this.productModel.findByIdAndRemove(id);
    }


    private async findProduct(id: string): Promise<Product>{
        const product = await this.productModel.findById(id);
        if (!product){
            throw new NotFoundException('coud not find product.');            
        }
        return product;
        
        
    //     {
    //     id: product.id,
    //     title: product.title,
    //     description: product.description,
    //     price: product.price 
    // }

    }

}