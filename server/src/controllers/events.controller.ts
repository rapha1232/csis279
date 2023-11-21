import { Events } from '@prisma/client';
import { EventsService } from '@services/events.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class EventsController {
  public e = Container.get(EventsService);

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allEvents: Events[] = await this.e.getAll();
      res.status(201).json({ data: allEvents, message: 'get All Events' });
    } catch (error) {
      next(error);
    }
  };
  public likeEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { EventID, UserID } = req.query;
      await this.e.likeEvent(Number(EventID), Number(UserID));
      res.status(201).json({ message: 'liked Event' });
    } catch (error) {
      next(error);
    }
  };

  public unlikeEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { EventID, UserID } = req.query;
      await this.e.unlike(Number(EventID), Number(UserID));
      res.status(201).json({ message: 'unliked Event' });
    } catch (error) {
      next(error);
    }
  };

  public saveEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { EventID, UserID } = req.query;
      await this.e.saveEvent(Number(EventID), Number(UserID));
      res.status(201).json({ message: 'saved Event' });
    } catch (error) {
      next(error);
    }
  };

  public unsaveEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { EventID, UserID } = req.query;
      await this.e.unsaveEvent(Number(EventID), Number(UserID));
      res.status(201).json({ message: 'unsaved Event' });
    } catch (error) {
      next(error);
    }
  };

  public filtered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q, search } = req.query;
      if (q === 'all' || q === 'popular' || q === 'recent' || q === 'name' || q === 'old') {
        const filteredEvents: Events[] = await this.e.filtered(q, String(search));
        res.status(201).json({ data: filteredEvents, message: 'filtered Events' });
      } else {
        res.status(400).json({ message: 'Invalid query parameter' });
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { Title, Description, Date, Location, CreatorID } = req.body;
      const newEvent = await this.e.create(Title, Description, Date, Location, Number(CreatorID));
      res.status(201).json({ data: newEvent, message: 'created Event' });
    } catch (error) {
      next(error);
    }
  };
}
