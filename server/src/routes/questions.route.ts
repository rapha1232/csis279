import { QuestionsController } from '@/controllers/questions.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class QuestionRoute implements Routes {
  public path = '/questions/';
  public router = Router();
  public questions = new QuestionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}getAllQuestions`, this.questions.getAll);
    this.router.post(`${this.path}likeQuestion`, this.questions.likeQuestion);
    this.router.post(`${this.path}unlikeQuestion`, this.questions.unlikeQuestion);
    this.router.post(`${this.path}saveQuestion`, this.questions.saveQuestion);
    this.router.post(`${this.path}unsaveQuestion`, this.questions.unsaveQuestion);
    this.router.get(`${this.path}getAllWithFilter`, this.questions.filtered);
    this.router.post(`${this.path}create`, this.questions.create);
    this.router.get(`${this.path}getOne`, this.questions.getOne);
  }
}
