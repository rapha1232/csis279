import { RepliesController } from '@/controllers/replies.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class RepliesRoute implements Routes {
  public path = '/replies/';
  public router = Router();
  public replies = new RepliesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}getAllReplies`, this.replies.getAll);
    this.router.post(`${this.path}likeReply`, this.replies.likeReply);
    this.router.post(`${this.path}unlikeReply`, this.replies.unlikeReply);
    this.router.get(`${this.path}getAllWithFilter`, this.replies.filtered);
    this.router.post(`${this.path}createQuestionReply`, this.replies.createQuestionReply);
    this.router.post(`${this.path}createTopicReply`, this.replies.createTopicReply);
  }
}
