/*

import {NextFunction, Request, Response} from "express";
import {blogs, blogsRouter} from "../routers/blogs-router";


export const findBlogID= ((req: Request, res:Response, next:NextFunction) => {

    let findBlogID = blogs.find(p => +p.id === +(req.body.blogId) )

    if (findBlogID) {
            next()
        } else {
            return res.send(404)
        }
})


*/

