"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscussionsService", {
    enumerable: true,
    get: function() {
        return DiscussionsService;
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
let DiscussionsService = class DiscussionsService {
    async getAll() {
        const allTopics = await this.topics.findMany({
            include: {
                CreatedBy: true,
                Likes: {
                    include: {
                        User: true
                    }
                },
                Saved: {
                    include: {
                        User: true
                    }
                },
                _count: {
                    select: {
                        Replies: true
                    }
                }
            },
            orderBy: {
                Title: 'asc'
            }
        });
        return allTopics;
    }
    async likeTopic(TopicID, UserID) {
        this.topics.update({
            where: {
                TopicID: TopicID
            },
            data: {
                LikesNb: {
                    increment: 1
                }
            }
        }).then(()=>this.likes.create({
                data: {
                    TopicID: TopicID,
                    UserID: UserID
                }
            })).catch((err)=>console.log(err));
    }
    async unlikeTopic(TopicID, UserID) {
        this.topics.update({
            where: {
                TopicID: TopicID
            },
            data: {
                LikesNb: {
                    decrement: 1
                }
            }
        }).then(()=>this.likes.delete({
                where: {
                    TopicID_UserID: {
                        TopicID: TopicID,
                        UserID: UserID
                    }
                }
            })).catch((err)=>console.log(err));
    }
    async saveTopic(TopicID, UserID) {
        this.saved.create({
            data: {
                TopicID: TopicID,
                UserID: UserID
            }
        }).catch((err)=>console.log(err));
    }
    async unsaveTopic(TopicID, UserID) {
        this.saved.delete({
            where: {
                TopicID_UserID: {
                    TopicID: TopicID,
                    UserID: UserID
                }
            }
        }).catch((err)=>console.log(err));
    }
    async filtered(q, search) {
        const alltopics = await this.topics.findMany({
            where: {
                Title: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            include: {
                CreatedBy: true,
                Likes: {
                    include: {
                        User: true
                    }
                },
                Saved: {
                    include: {
                        User: true
                    }
                },
                _count: {
                    select: {
                        Replies: true
                    }
                }
            }
        });
        switch(q){
            case 'all':
                break;
            case 'popular':
                alltopics.sort((a, b)=>b.LikesNb - a.LikesNb);
                break;
            case 'recent':
                alltopics.sort((a, b)=>b.CreatedAt.getTime() - a.CreatedAt.getTime());
                break;
            case 'name':
                alltopics.sort((a, b)=>a.Title.localeCompare(b.Title));
                break;
            case 'old':
                alltopics.sort((a, b)=>a.CreatedAt.getTime() - b.CreatedAt.getTime());
                break;
        }
        return alltopics;
    }
    async create(Title, Content, CreatedAt, CreatorID) {
        this.topics.create({
            data: {
                Title: Title,
                Content: Content,
                CreatedAt: CreatedAt,
                CreatorID: CreatorID
            }
        }).catch((err)=>console.log(err));
    }
    async getOne(TopicID) {
        const question = await this.topics.findUnique({
            where: {
                TopicID: TopicID
            },
            include: {
                CreatedBy: true,
                Likes: {
                    include: {
                        User: true
                    }
                },
                Saved: {
                    include: {
                        User: true
                    }
                },
                _count: {
                    select: {
                        Replies: true
                    }
                }
            }
        });
        return question;
    }
    constructor(){
        _define_property(this, "topics", new _client.PrismaClient().topics);
        _define_property(this, "likes", new _client.PrismaClient().likes);
        _define_property(this, "saved", new _client.PrismaClient().saved);
    }
};
DiscussionsService = _ts_decorate([
    (0, _typedi.Service)()
], DiscussionsService);

//# sourceMappingURL=discussions.service.js.map