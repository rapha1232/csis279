"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RepliesService", {
    enumerable: true,
    get: function() {
        return RepliesService;
    }
});
const _client = require("@prisma/client");
const _typedi = require("typedi");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RepliesService = class RepliesService {
    async getAll(QuestionID) {
        const allReplies = await this.replies.findMany({
            where: {
                QuestionID: QuestionID
            },
            include: {
                CreatedBy: true,
                Likes: {
                    include: {
                        User: true
                    }
                }
            }
        });
        return allReplies;
    }
    async likeReply(ReplyID, UserID) {
        this.replies.update({
            where: {
                ReplyID: ReplyID
            },
            data: {
                LikesNB: {
                    increment: 1
                }
            }
        }).then(()=>this.likes.create({
                data: {
                    ReplyID: ReplyID,
                    UserID: UserID
                }
            })).catch((err)=>console.log(err));
    }
    async unlikeReply(ReplyID, UserID) {
        this.replies.update({
            where: {
                ReplyID: ReplyID
            },
            data: {
                LikesNB: {
                    decrement: 1
                }
            }
        }).then(()=>this.likes.delete({
                where: {
                    ReplyID_UserID: {
                        ReplyID: ReplyID,
                        UserID: UserID
                    }
                }
            })).catch((err)=>console.log(err));
    }
    async filtered(q, QuestionID) {
        const allreplies = await this.replies.findMany({
            where: {
                QuestionID: QuestionID
            },
            include: {
                CreatedBy: true,
                Likes: {
                    include: {
                        User: true
                    }
                }
            }
        });
        switch(q){
            case 'all':
                break;
            case 'popular':
                allreplies.sort((a, b)=>b.LikesNB - a.LikesNB);
                break;
            case 'recent':
                allreplies.sort((a, b)=>b.CreatedAt.getTime() - a.CreatedAt.getTime());
                break;
            case 'name':
                allreplies.sort((a, b)=>a.Content.localeCompare(b.Content));
                break;
            case 'old':
                allreplies.sort((a, b)=>a.CreatedAt.getTime() - b.CreatedAt.getTime());
                break;
        }
        return allreplies;
    }
    async createQuestionReply(Content, CreatedAt, CreatorID, QuestionID) {
        this.replies.create({
            data: {
                Content: Content,
                CreatedAt: CreatedAt,
                CreatorID: CreatorID,
                QuestionID: QuestionID
            }
        }).catch((err)=>console.log(err));
    }
    async createTopicReply(Content, CreatedAt, CreatorID, TopicID) {
        this.replies.create({
            data: {
                Content: Content,
                CreatedAt: CreatedAt,
                CreatorID: CreatorID,
                TopicID: TopicID
            }
        }).catch((err)=>console.log(err));
    }
    constructor(){
        _define_property(this, "replies", new _client.PrismaClient().replies);
        _define_property(this, "likes", new _client.PrismaClient().likes);
        _define_property(this, "saved", new _client.PrismaClient().saved);
    }
};
RepliesService = _ts_decorate([
    (0, _typedi.Service)()
], RepliesService);

//# sourceMappingURL=replies.service.js.map