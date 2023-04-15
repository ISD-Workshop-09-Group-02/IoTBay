/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductsCollectionSchema } from '../models/ProductsCollectionSchema';
import type { ProductsSchema } from '../models/ProductsSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param productId 
     * @returns ProductsSchema Default Response
     * @throws ApiError
     */
    public getProduct(
productId: string,
): CancelablePromise<ProductsSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/{productId}',
            path: {
                'productId': productId,
            },
        });
    }

    /**
     * @param productId 
     * @returns ProductsSchema Default Response
     * @throws ApiError
     */
    public deleteProduct(
productId: string,
): CancelablePromise<ProductsSchema> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/products/{productId}',
            path: {
                'productId': productId,
            },
        });
    }

    /**
     * @param productId 
     * @param requestBody 
     * @returns ProductsSchema Default Response
     * @throws ApiError
     */
    public updateProduct(
productId: string,
requestBody?: {
name?: string;
price?: number;
stock?: number;
image?: string;
description?: string;
category?: string;
},
): CancelablePromise<ProductsSchema> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/products/{productId}',
            path: {
                'productId': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ProductsCollectionSchema Default Response
     * @throws ApiError
     */
    public getProducts(): CancelablePromise<ProductsCollectionSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/products/',
        });
    }

    /**
     * @param name 
     * @param price 
     * @param stock 
     * @param image 
     * @param description 
     * @param category 
     * @returns ProductsSchema Default Response
     * @throws ApiError
     */
    public createProduct(
name: string,
price: number,
stock: number,
image: string,
description: string,
category: string,
): CancelablePromise<ProductsSchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/products/',
            path: {
                'name': name,
                'price': price,
                'stock': stock,
                'image': image,
                'description': description,
                'category': category,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns ProductsCollectionSchema Default Response
     * @throws ApiError
     */
    public deleteProducts(
requestBody?: {
products?: any[];
},
): CancelablePromise<ProductsCollectionSchema> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/products/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
