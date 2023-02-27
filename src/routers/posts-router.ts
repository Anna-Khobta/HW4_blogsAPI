
import {Request, Response, Router} from "express";
import {authorizationMiddleware} from "../middlewares/authorization";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

import {titleValidation, shortDescriptionValidation, contentValidation, idValidation} from "../middlewares/posts-validations";
import {postsRepositories} from "../repositories/posts-db-repositories";
import {blogsRepository} from "../repositories/blogs-db-repositories";
import {blogsRouter} from "./blogs-router";

//import {blogs} from "./blogs-router";
//export let posts: PostType = []

export const postsRouter = Router({})


postsRouter.get('/posts',
    async (req: Request, res: Response ) => {
    let foundPosts = await postsRepositories.findPosts(req.query.title?.toString())
        res.status(200).send(foundPosts)
    })


postsRouter.get('/posts/:id', async (req: Request, res: Response ) => {

    let findPostID = await postsRepositories.findPostById(req.params.id)

    if (findPostID) {
        return res.status(200).send(findPostID)
    } else {
        return res.send(404)
    }

})


postsRouter.post('/posts',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response ) => {


        const newPostWithoughtID = await postsRepositories.createPost(req.body.title,
            req.body.shortDescription, req.body.content, req.body.blogId )

        if (newPostWithoughtID) {
            res.status(201).send(newPostWithoughtID)
        } else {
            return res.send(404)
        }
    })

postsRouter.put('/posts/:id',
    authorizationMiddleware,
    idValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res:Response) => {

    const updatedPosWithoughtID = await postsRepositories.updatePost(req.params.id, req.body.title,
        req.body.shortDescription, req.body.content, req.body.blogId )

        if (updatedPosWithoughtID) {
            res.send(204)

            // должно быть 204! оставвила для теста

        } else {
            return res.send(404)
        }
    })



postsRouter.delete('/posts/:id',
    authorizationMiddleware,
    async (req: Request, res: Response ) => {

        const isDeleted = await postsRepositories.deletePost(req.params.id)

        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

