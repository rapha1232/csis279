'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'QuestionsService', {
  enumerable: true,
  get: function () {
    return QuestionsService;
  },
});
const _client = require('@prisma/client');
const _typedi = require('typedi');
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let QuestionsService = class QuestionsService {
  async getAll() {
    const allQuestions = await this.questions.findMany({
      include: {
        CreatedBy: true,
        Likes: {
          include: {
            User: true,
          },
        },
        Saved: {
          include: {
            User: true,
          },
        },
        _count: {
          select: {
            Replies: true,
          },
        },
      },
      orderBy: {
        Title: 'asc',
      },
    });
    return allQuestions;
  }
  async likeQuestion(QuestionID, UserID) {
    this.questions
      .update({
        where: {
          QuestionID: QuestionID,
        },
        data: {
          LikesNb: {
            increment: 1,
          },
        },
      })
      .then(() =>
        this.likes.create({
          data: {
            QuestionID: QuestionID,
            UserID: UserID,
          },
        }),
      )
      .catch(err => console.log(err));
  }
  async unlikeQuestion(QuestionID, UserID) {
    this.questions
      .update({
        where: {
          QuestionID: QuestionID,
        },
        data: {
          LikesNb: {
            decrement: 1,
          },
        },
      })
      .then(() =>
        this.likes.delete({
          where: {
            QuestionID_UserID: {
              QuestionID: QuestionID,
              UserID: UserID,
            },
          },
        }),
      )
      .catch(err => console.log(err));
  }
  async saveQuestion(QuestionID, UserID) {
    this.saved
      .create({
        data: {
          QuestionID: QuestionID,
          UserID: UserID,
        },
      })
      .catch(err => console.log(err));
  }
  async unsaveQuestion(QuestionID, UserID) {
    this.saved
      .delete({
        where: {
          QuestionID_UserID: {
            QuestionID: QuestionID,
            UserID: UserID,
          },
        },
      })
      .catch(err => console.log(err));
  }
  async filtered(q, search) {
    const allQuestions = await this.questions.findMany({
      where: {
        Title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        CreatedBy: true,
        Likes: {
          include: {
            User: true,
          },
        },
        Saved: {
          include: {
            User: true,
          },
        },
        _count: {
          select: {
            Replies: true,
          },
        },
      },
    });
    switch (q) {
      case 'all':
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
  async create(Title, Content, CreatedAt, CreatorID) {
    this.questions
      .create({
        data: {
          Title: Title,
          Content: Content,
          CreatedAt: CreatedAt,
          CreatorID: CreatorID,
        },
      })
      .catch(err => console.log(err));
  }
  async getOne(QuestionID) {
    const question = await this.questions.findUnique({
      where: {
        QuestionID: QuestionID,
      },
      include: {
        CreatedBy: true,
        Likes: {
          include: {
            User: true,
          },
        },
        Saved: {
          include: {
            User: true,
          },
        },
        _count: {
          select: {
            Replies: true,
          },
        },
      },
    });
    return question;
  }
  constructor() {
    _define_property(this, 'questions', new _client.PrismaClient().questions);
    _define_property(this, 'likes', new _client.PrismaClient().likes);
    _define_property(this, 'saved', new _client.PrismaClient().saved);
  }
};
QuestionsService = _ts_decorate([(0, _typedi.Service)()], QuestionsService);

//# sourceMappingURL=questions.service.js.map
