import { PrismaClient, Replies } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class RepliesService {
  public replies = new PrismaClient().replies;
  public likes = new PrismaClient().likes;
  public saved = new PrismaClient().saved;
  public async getAll(QuestionID: number): Promise<Replies[]> {
    const allReplies: Replies[] = await this.replies.findMany({
      where: { QuestionID: QuestionID },
      include: { CreatedBy: true, Likes: { include: { User: true } } },
    });
    return allReplies;
  }

  public async likeReply(ReplyID: number, UserID: number): Promise<void> {
    this.replies
      .update({
        where: { ReplyID: ReplyID },
        data: { LikesNB: { increment: 1 } },
      })
      .then(() => this.likes.create({ data: { ReplyID: ReplyID, UserID: UserID } }))
      .catch(err => console.log(err));
  }

  public async unlikeReply(ReplyID: number, UserID: number): Promise<void> {
    this.replies
      .update({
        where: { ReplyID: ReplyID },
        data: { LikesNB: { decrement: 1 } },
      })
      .then(() => this.likes.delete({ where: { ReplyID_UserID: { ReplyID: ReplyID, UserID: UserID } } }))
      .catch(err => console.log(err));
  }

  public async filtered(q: 'all' | 'popular' | 'recent' | 'name' | 'old', QuestionID: number): Promise<Replies[]> {
    const allreplies: Replies[] = await this.replies.findMany({
      where: { QuestionID: QuestionID },
      include: { CreatedBy: true, Likes: { include: { User: true } } },
    });

    switch (q) {
      case 'all':
        // No sorting needed
        break;
      case 'popular':
        allreplies.sort((a, b) => b.LikesNB - a.LikesNB);
        break;
      case 'recent':
        allreplies.sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime());
        break;
      case 'name':
        allreplies.sort((a, b) => a.Content.localeCompare(b.Content));
        break;
      case 'old':
        allreplies.sort((a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime());
        break;
    }

    return allreplies;
  }

  public async createQuestionReply(Content: string, CreatedAt: string, CreatorID: number, QuestionID: number): Promise<void> {
    this.replies
      .create({ data: { Content: Content, CreatedAt: CreatedAt, CreatorID: CreatorID, QuestionID: QuestionID } })
      .catch(err => console.log(err));
  }

  public async createTopicReply(Content: string, CreatedAt: string, CreatorID: number, TopicID: number): Promise<void> {
    this.replies.create({ data: { Content: Content, CreatedAt: CreatedAt, CreatorID: CreatorID, TopicID: TopicID } }).catch(err => console.log(err));
  }
}
