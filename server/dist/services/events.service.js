"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventsService", {
    enumerable: true,
    get: function() {
        return EventsService;
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
let EventsService = class EventsService {
    async getAll() {
        const allEvents = await this.events.findMany({
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
                }
            },
            orderBy: {
                Title: 'asc'
            }
        });
        return allEvents;
    }
    async likeEvent(EventID, UserID) {
        this.events.update({
            where: {
                EventID: EventID
            },
            data: {
                LikesNB: {
                    increment: 1
                }
            }
        }).then(()=>this.likes.create({
                data: {
                    EventID: EventID,
                    UserID: UserID
                }
            })).catch((err)=>console.log(err));
    }
    async unlike(EventID, UserID) {
        this.events.update({
            where: {
                EventID: EventID
            },
            data: {
                LikesNB: {
                    decrement: 1
                }
            }
        }).then(()=>this.likes.delete({
                where: {
                    EventID_UserID: {
                        EventID: EventID,
                        UserID: UserID
                    }
                }
            })).catch((err)=>console.log(err));
    }
    async saveEvent(EventID, UserID) {
        this.saved.create({
            data: {
                EventID: EventID,
                UserID: UserID
            }
        }).catch((err)=>console.log(err));
    }
    async unsaveEvent(EventID, UserID) {
        this.saved.delete({
            where: {
                EventID_UserID: {
                    EventID: EventID,
                    UserID: UserID
                }
            }
        }).catch((err)=>console.log(err));
    }
    async filtered(q, search) {
        const allEvents = await this.events.findMany({
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
                }
            }
        });
        switch(q){
            case 'all':
                break;
            case 'popular':
                allEvents.sort((a, b)=>b.LikesNB - a.LikesNB);
                break;
            case 'recent':
                allEvents.sort((a, b)=>b.Date.getTime() - a.Date.getTime());
                break;
            case 'name':
                allEvents.sort((a, b)=>a.Title.localeCompare(b.Title));
                break;
            case 'old':
                allEvents.sort((a, b)=>a.Date.getTime() - b.Date.getTime());
                break;
        }
        return allEvents;
    }
    async create(Title, Description, Date, Location, CreatorID) {
        this.events.create({
            data: {
                Title: Title,
                Description: Description,
                Date: Date,
                Location: Location,
                CreatorID: CreatorID
            }
        }).catch((err)=>console.log(err));
    }
    constructor(){
        _define_property(this, "events", new _client.PrismaClient().events);
        _define_property(this, "likes", new _client.PrismaClient().likes);
        _define_property(this, "saved", new _client.PrismaClient().saved);
    }
};
EventsService = _ts_decorate([
    (0, _typedi.Service)()
], EventsService);

//# sourceMappingURL=events.service.js.map