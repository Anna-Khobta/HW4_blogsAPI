import {Request, Response, Router} from "express";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {nameValidation, descriptionValidation, websiteUrlValidation} from "../middlewares/blogs-validations";

import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {blogsService} from "../domain/blogs-service";

export const blogsRouter = Router({})

///

import {getPaginationForBlog} from "../functions/pagination";

blogsRouter.get('/blogs', async (req: Request, res: Response ) => {

    const {page, limit, sortDirection, sortBy, searchNameTerm, skip} = getPaginationForBlog(req.query)

    const foundBlogs = await blogsQueryRepository.findBlogs(page, limit, sortDirection, sortBy, searchNameTerm, skip)
    res.status(200).send(foundBlogs)
})

blogsRouter.get('/blogs/:id', async(req: Request, res: Response ) => {

    let blogByID = await blogsQueryRepository.findBlogById(req.params.id)

    if (blogByID) {
        return res.status(200).send(blogByID)
    } else {
        return res.send(404)
    }

})

blogsRouter.post('/blogs',
    authorizationMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response ) => {

        const newBlog = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl )
        res.status(201).send(newBlog)
    }
)


blogsRouter.put('/blogs/:id',
    authorizationMiddleware,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    inputValidationMiddleware,
    async (req: Request, res:Response) => {

        const isUpdated = await blogsService.updateBlog(((+req.params.id).toString()), req.body.name, req.body.description, req.body.websiteUrl )
        if (isUpdated) {
            // const blog = await blogsRepository.findBlogById(req.params.id)
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouter.delete('/blogs/:id',
    authorizationMiddleware,
   async (req: Request, res: Response ) => {

    const isDeleted = await blogsService.deleteBlog(req.params.id)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
   })