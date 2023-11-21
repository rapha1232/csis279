import { DiscussionsService } from '@/services/discussions.service';
import { Topics } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class DiscussionsController {
  public d = Container.get(DiscussionsService);

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allTopics: Topics[] = await this.d.getAll();
      res.status(201).json({ data: allTopics, message: 'get All Topics' });
    } catch (error) {
      next(error);
    }
  };
  public likeTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { TopicID, UserID } = req.query;
      await this.d.likeTopic(Number(TopicID), Number(UserID));
      res.status(201).json({ message: 'liked Topic' });
    } catch (error) {
      next(error);
    }
  };

  public unlikeTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { TopicID, UserID } = req.query;
      await this.d.unlikeTopic(Number(TopicID), Number(UserID));
      res.status(201).json({ message: 'unliked Topic' });
    } catch (error) {
      next(error);
    }
  };

  public saveTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { TopicID, UserID } = req.query;
      await this.d.saveTopic(Number(TopicID), Number(UserID));
      res.status(201).json({ message: 'saved Topic' });
    } catch (error) {
      next(error);
    }
  };

  public unsaveTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { TopicID, UserID } = req.query;
      await this.d.unsaveTopic(Number(TopicID), Number(UserID));
      res.status(201).json({ message: 'unsaved Topic' });
    } catch (error) {
      next(error);
    }
  };

  public filtered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q, search } = req.query;
      if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
        const filteredTopics: Topics[] = await this.d.filtered(q, String(search));
        res.status(201).json({ data: filteredTopics, message: 'filtered Topics' });
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
      const newTopic = await this.d.create(Title, Content, CreatedAt, Number(CreatorID));
      res.status(201).json({ data: newTopic, message: 'created Topic' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { TopicID } = req.query;
      const q = await this.d.getOne(Number(TopicID));
      res.status(201).json({ data: q, message: 'getOne Topic' });
    } catch (error) {
      next(error);
    }
  };
}
