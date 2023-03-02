import {BlogType} from "../repositories/db";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";

export const getPaginationForBlog = (query: any) => {
    let page: number = Number(query.pageNumber) || 1
    let limit: number = Number(query.pageSize) || 10
    let sortDirection = query.sortDirection === 'asc' ? 1 : -1
    let sortBy = query.sortBy || 'createdAt'
    let searchNameTerm = query.searchNameTerm || ''
    // Calculate skip values based on the page and pageSize
    const skip: number = (page - 1) * limit

    return {page, limit, sortDirection, sortBy, searchNameTerm, skip  }
}