import { PrismaClient, Questions } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class QuestionsService {
  public questions = new PrismaClient().questions;
  public likes = new PrismaClient().likes;
  public saved = new PrismaClient().saved;
  public async getAll(): Promise<Questions[]> {
    const allQuestions: Questions[] = await this.questions.findMany({
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } }, _count: { select: { Replies: true } } },
      orderBy: { Title: 'asc' },
    });
    return allQuestions;
  }

  public async likeQuestion(QuestionID: number, UserID: number): Promise<void> {
    this.questions
      .update({
        where: { QuestionID: QuestionID },
        data: { LikesNb: { increment: 1 } },
      })
      .then(() => this.likes.create({ data: { QuestionID: QuestionID, UserID: UserID } }))
      .catch(err => console.log(err));
  }

  public async unlikeQuestion(QuestionID: number, UserID: number): Promise<void> {
    this.questions
      .update({
        where: { QuestionID: QuestionID },
        data: { LikesNb: { decrement: 1 } },
      })
      .then(() => this.likes.delete({ where: { QuestionID_UserID: { QuestionID: QuestionID, UserID: UserID } } }))
      .catch(err => console.log(err));
  }

  public async saveQuestion(QuestionID: number, UserID: number): Promise<void> {
    this.saved.create({ data: { QuestionID: QuestionID, UserID: UserID } }).catch(err => console.log(err));
  }

  public async unsaveQuestion(QuestionID: number, UserID: number): Promise<void> {
    this.saved.delete({ where: { QuestionID_UserID: { QuestionID: QuestionID, UserID: UserID } } }).catch(err => console.log(err));
  }

  public async filtered(q: 'all' | 'popular' | 'recent' | 'name' | 'old', search: string): Promise<Questions[]> {
    const allQuestions: Questions[] = await this.questions.findMany({
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
        allQuestions.sort((a, b) => b.LikesNb - a.LikesNb);
        break;
      case 'recent':
        allQuestions.sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime());
        break;
      case 'name':
        allQuestions.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'old':
        allQuestions.sort((a, b) => a.CreatedAt.getTime() - b.CreatedAt.getTime());
        break;
    }

    return allQuestions;
  }

  public async create(Title: string, Content: string, CreatedAt: string, CreatorID: number): Promise<void> {
    console.log(CreatedAt);
    this.questions.create({ data: { Title: Title, Content: Content, CreatedAt: CreatedAt, CreatorID: CreatorID } }).catch(err => console.log(err));
  }

  public async getOne(QuestionID: number): Promise<Questions> {
    const question: Questions = await this.questions.findUnique({
      where: { QuestionID: QuestionID },
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } }, _count: { select: { Replies: true } } },
    });
    return question;
  }
}
