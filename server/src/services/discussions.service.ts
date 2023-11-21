import { PrismaClient, Topics } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class DiscussionsService {
  public topics = new PrismaClient().topics;
  public likes = new PrismaClient().likes;
  public saved = new PrismaClient().saved;
  public async getAll(): Promise<Topics[]> {
    const allTopics: Topics[] = await this.topics.findMany({
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } }, _count: { select: { Replies: true } } },
      orderBy: { Title: 'asc' },
    });
    return allTopics;
  }

  public async likeTopic(TopicID: number, UserID: number): Promise<void> {
    this.topics
      .update({
        where: { TopicID: TopicID },
        data: { LikesNb: { increment: 1 } },
      })
      .then(() => this.likes.create({ data: { TopicID: TopicID, UserID: UserID } }))
      .catch(err => console.log(err));
  }

  public async unlikeTopic(TopicID: number, UserID: number): Promise<void> {
    this.topics
      .update({
        where: { TopicID: TopicID },
        data: { LikesNb: { decrement: 1 } },
      })
      .then(() => this.likes.delete({ where: { TopicID_UserID: { TopicID: TopicID, UserID: UserID } } }))
      .catch(err => console.log(err));
  }

  public async saveTopic(TopicID: number, UserID: number): Promise<void> {
    this.saved.create({ data: { TopicID: TopicID, UserID: UserID } }).catch(err => console.log(err));
  }

  public async unsaveTopic(TopicID: number, UserID: number): Promise<void> {
    this.saved.delete({ where: { TopicID_UserID: { TopicID: TopicID, UserID: UserID } } }).catch(err => console.log(err));
  }

  public async filtered(q: 'all' | 'popular' | 'recent' | 'name' | 'old', search: string): Promise<Topics[]> {
    const alltopics: Topics[] = await this.topics.findMany({
      where: {
        Title: { contains: search, mode: 'insensitive' },
      },
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } }, _count: { select: { Replies: true } } },
    });

    switch (q) {
      case 'all':
        // No sorting needed
        break;
      case 'popular':
        alltopics.sort((a, b) => b.LikesNb - a.LikesNb);
        break;
      case 'recent':
        alltopics.sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime());
        break;
      case 'name':
        alltopics.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'old':
        alltopics.sort((a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime());
        break;
    }

    return alltopics;
  }

  public async create(Title: string, Content: string, CreatedAt: string, CreatorID: number): Promise<void> {
    this.topics.create({ data: { Title: Title, Content: Content, CreatedAt: CreatedAt, CreatorID: CreatorID } }).catch(err => console.log(err));
  }

  public async getOne(TopicID: number): Promise<Topics> {
    const question: Topics = await this.topics.findUnique({
      where: { TopicID: TopicID },
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } }, _count: { select: { Replies: true } } },
    });
    return question;
  }
}
