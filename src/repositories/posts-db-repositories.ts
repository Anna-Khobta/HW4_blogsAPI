import {blogsCollection, BlogType, postsCollection, PostType} from "./db";
import {blogsRepository} from "./blogs-db-repositories";


export const postsRepositories = {
    async findPosts(title: string | null | undefined): Promise<PostType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find((filter), {projection: {_id: 0}}).toArray()
    },


    async findPostById(id: string): Promise<PostType | null> {
        let post: PostType | null = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
        if (post) {
            return post
        } else {
            return null
        }
    },


    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string): Promise<PostType | null | undefined> {

        let foundBlogName = await blogsCollection.findOne({id: blogId}, {projection: {_id: 0}})

    if (foundBlogName) {
    const newPost = {
        id: (+(new Date())).toString(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: foundBlogName.name,
        createdAt: (new Date()).toISOString(),
    }
    const newPostInDb = await postsCollection.insertOne(newPost)

        return await postsCollection.findOne({id: newPost.id},{projection:{_id:0}})


}},

    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string): Promise<boolean | undefined> {

        let foundPostId = await postsCollection.findOne({id: id})

        let foundBlogName = await blogsCollection.findOne({id: blogId}, {projection: {_id: 0}})

        if (foundPostId) {
            if (foundBlogName) {
                const updatedPost = await postsCollection.updateOne({id: id},
                    {$set: {title: title, shortDescription: shortDescription, content: content}})

                return updatedPost.matchedCount === 1
            }
        }
    },

                // если совпал 1, то обвновился 1
                // const updatedPost = {
                //     id: (+(new Date())).toString(),
                //     title: title,
                //     shortDescription: shortDescription,
                //     content: content,
                //     blogId: blogId,
                //     blogName: foundBlogName.name,
                //     createdAt: (new Date()).toISOString(),
                // }
/*

                const updatedPostInDb = await postsCollection.insertOne(updatedPost)
                const updatedPosWithoughtID = await postsCollection.findOne({id: updatedPost.id},{projection:{_id:0}})
                return updatedPosWithoughtID*/





    async deletePost(id: string): Promise<boolean> {

        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
        // если 1 сработало. если 0, то нет
    },

async deleteAllPosts(): Promise<boolean> {
    const result = await postsCollection.deleteMany({})
    return result.acknowledged
    // если всё удалит, вернет true
}
}