/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryCollectionSchema } from '../models/CategoryCollectionSchema';
import type { CategorySchema } from '../models/CategorySchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CategoriesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param categoryId 
     * @returns CategorySchema Default Response
     * @throws ApiError
     */
    public getCategory(
categoryId: string,
): CancelablePromise<CategorySchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/categories/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }

    /**
     * @param categoryId 
     * @param requestBody 
     * @returns CategorySchema Default Response
     * @throws ApiError
     */
    public updateCategory(
categoryId: string,
requestBody?: {
name?: string;
},
): CancelablePromise<CategorySchema> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/categories/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns CategoryCollectionSchema Default Response
     * @throws ApiError
     */
    public getCategories(): CancelablePromise<CategoryCollectionSchema> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/categories/',
        });
    }

    /**
     * @param name 
     * @returns CategorySchema Default Response
     * @throws ApiError
     */
    public createCategory(
name: string,
): CancelablePromise<CategorySchema> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/categories/',
            path: {
                'name': name,
            },
        });
    }

    /**
     * @returns CategorySchema Default Response
     * @throws ApiError
     */
    public deleteCategory(): CancelablePromise<CategorySchema> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/categories/{categoryId}?',
        });
    }

}
