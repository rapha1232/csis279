import { RepliesService } from '@/services/replies.service';
import { Replies } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class RepliesController {
  public r = Container.get(RepliesService);

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { QuestionID } = req.query;
    try {
      const allReplies: Replies[] = await this.r.getAll(Number(QuestionID));
      res.status(201).json({ data: allReplies, message: 'get All Replies' });
    } catch (error) {
      next(error);
    }
  };
  public likeReply = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ReplyID, UserID } = req.query;
      await this.r.likeReply(Number(ReplyID), Number(UserID));
      res.status(201).json({ message: 'liked Reply' });
    } catch (error) {
      next(error);
    }
  };

  public unlikeReply = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ReplyID, UserID } = req.query;
      await this.r.unlikeReply(Number(ReplyID), Number(UserID));
      res.status(201).json({ message: 'unliked Reply' });
    } catch (error) {
      next(error);
    }
  };

  public filtered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q, QuestionID } = req.query;
      if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
        const filteredReplies: Replies[] = await this.r.filtered(q, Number(QuestionID));
        res.status(201).json({ data: filteredReplies, message: 'filtered Replies' });
      } else {
        res.status(400).json({ message: 'Invalid query parameter' });
      }
    } catch (error) {
      next(error);
    }
  };

  public createQuestionReply = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { Content, CreatedAt, CreatorID, QuestionID } = req.body;
      const newReply = await this.r.createQuestionReply(Content, CreatedAt, Number(CreatorID), Number(QuestionID));
      res.status(201).json({ data: newReply, message: 'created Reply' });
    } catch (error) {
      next(error);
    }
  };

  public createTopicReply = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { Content, CreatedAt, CreatorID, TopicID } = req.body;
      const newReply = await this.r.createTopicReply(Content, CreatedAt, Number(CreatorID), Number(TopicID));
      res.status(201).json({ data: newReply, message: 'created Reply' });
    } catch (error) {
      res.send(error);
      next(error);
    }
  };
}
