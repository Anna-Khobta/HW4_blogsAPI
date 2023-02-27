import {Request, Response, Router} from "express";

import {blogsRepository} from "../repositories/blogs-db-repositories";
import {postsCollection} from "../repositories/db";
import {postsRepositories} from "../repositories/posts-db-repositories";

export const deleteAllRouter = Router({})

deleteAllRouter.delete('/testing/all-data',

    async (req: Request, res: Response ) => {

        const deleteAllBlogs = await blogsRepository.deleteAllBlogs()

        const deleteAllPosts = await postsRepositories.deleteAllPosts()

        if (deleteAllBlogs) {
            if (deleteAllPosts) {
                res.send(204)
            }
        } else {
            res.send(404)
        }
    })


