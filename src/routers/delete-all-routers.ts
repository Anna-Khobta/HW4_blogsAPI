import {Request, Response, Router} from "express";

import {blogsRepository} from "../repositories/blogs-db-repositories";
import {postsCollection} from "../repositories/db";
import {postsRepositories} from "../repositories/posts-db-repositories";
import {blogsService} from "../domain/blogs-service";

export const deleteAllRouter = Router({})

deleteAllRouter.delete('/testing/all-data',

    async (req: Request, res: Response ) => {

        const deleteAllBlogs = await blogsService.deleteAllBlogs()

        const deleteAllPosts = await postsService.deleteAllPosts()

        if (deleteAllBlogs) {
            if (deleteAllPosts) {
                res.send(204)
            }
        } else {
            res.send(404)
        }
    })


