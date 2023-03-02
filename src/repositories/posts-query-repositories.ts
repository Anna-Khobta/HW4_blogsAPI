

export const postsQueryRepositories = {
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
