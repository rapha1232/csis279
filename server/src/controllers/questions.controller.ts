import { QuestionsService } from '@/services/questions.service';
import { Questions } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class QuestionsController {
  public d = Container.get(QuestionsService);

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allQuestions: Questions[] = await this.d.getAll();
      res.status(201).json({ data: allQuestions, message: 'get All Questions' });
    } catch (error) {
      next(error);
    }
  };
  public likeQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { QuestionID, UserID } = req.query;
      await this.d.likeQuestion(Number(QuestionID), Number(UserID));
      res.status(201).json({ message: 'liked Question' });
    } catch (error) {
      next(error);
    }
  };

  public unlikeQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { QuestionID, UserID } = req.query;
      await this.d.unlikeQuestion(Number(QuestionID), Number(UserID));
      res.status(201).json({ message: 'unliked Question' });
    } catch (error) {
      next(error);
    }
  };

  public saveQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { QuestionID, UserID } = req.query;
      await this.d.saveQuestion(Number(QuestionID), Number(UserID));
      res.status(201).json({ message: 'saved Question' });
    } catch (error) {
      next(error);
    }
  };

  public unsaveQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { QuestionID, UserID } = req.query;
      await this.d.unsaveQuestion(Number(QuestionID), Number(UserID));
      res.status(201).json({ message: 'unsaved Question' });
    } catch (error) {
      next(error);
    }
  };

  public filtered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q, search } = req.query;
      if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
        const filteredQuestions: Questions[] = await this.d.filtered(q, String(search));
        res.status(201).json({ data: filteredQuestions, message: 'filtered Questions' });
      } else {
        res.status(400).json({ message: 'Invalid query parameter' });
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { Title, Content, CreatedAt, CreatorID } = req.body;
      const newQuestion = await this.d.create(Title, Content, CreatedAt, Number(CreatorID));
      res.status(201).json({ data: newQuestion, message: 'created Question' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { QuestionID } = req.query;
      const q = await this.d.getOne(Number(QuestionID));
      res.status(201).json({ data: q, message: 'getOne Question' });
    } catch (error) {
      next(error);
    }
  };
}
