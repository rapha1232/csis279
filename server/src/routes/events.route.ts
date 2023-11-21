import { EventsController } from '@/controllers/events.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class EventsRoute implements Routes {
  public path = '/events/';
  public router = Router();
  public events = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}getAll`, this.events.getAll);
    this.router.post(`${this.path}like`, this.events.likeEvent);
    this.router.post(`${this.path}unlike`, this.events.unlikeEvent);
    this.router.post(`${this.path}save`, this.events.saveEvent);
    this.router.post(`${this.path}unsave`, this.events.unsaveEvent);
    this.router.get(`${this.path}getAllWithFilter`, this.events.filtered);
    this.router.post(`${this.path}create`, this.events.create);
  }
}
