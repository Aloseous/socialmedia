
import prisma from '@/utils/connect';
import CommentList from './CommentList';

const Comments = async ({ postId }: { postId: string }) => {

    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    return (
        <CommentList comments={comments} postId={postId} />
    )
}

export default Comments