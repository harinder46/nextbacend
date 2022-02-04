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

    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product }
        console.log(productId)
        }

    updateProduct(productId: string, title: string, description: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product}
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;

    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod)=> prod.id === id);
        const product = this.products[productIndex]
        if (!product){
            throw new NotFoundException('cloud not find product.');            
        }
        return [product, productIndex];
    }

}