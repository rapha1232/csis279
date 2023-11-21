import { DiscussionsController } from '@/controllers/discussions.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class DiscussionsRoute implements Routes {
  public path = '/discussions/';
  public router = Router();
  public discussions = new DiscussionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}getAllTopics`, this.discussions.getAll);
    this.router.post(`${this.path}likeTopic`, this.discussions.likeTopic);
    this.router.post(`${this.path}unlikeTopic`, this.discussions.unlikeTopic);
    this.router.post(`${this.path}saveTopic`, this.discussions.saveTopic);
    this.router.post(`${this.path}unsaveTopic`, this.discussions.unsaveTopic);
    this.router.get(`${this.path}getAllWithFilter`, this.discussions.filtered);
    this.router.post(`${this.path}create`, this.discussions.create);
    this.router.get(`${this.path}getOne`, this.discussions.getOne);
  }
}
