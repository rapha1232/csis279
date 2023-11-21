import { Events, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class EventsService {
  public events = new PrismaClient().events;
  public likes = new PrismaClient().likes;
  public saved = new PrismaClient().saved;
  public async getAll(): Promise<Events[]> {
    const allEvents: Events[] = await this.events.findMany({
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } } },
      orderBy: { Title: 'asc' },
    });
    return allEvents;
  }

  public async likeEvent(EventID: number, UserID: number): Promise<void> {
    this.events
      .update({
        where: { EventID: EventID },
        data: { LikesNB: { increment: 1 } },
      })
      .then(() => this.likes.create({ data: { EventID: EventID, UserID: UserID } }))
      .catch(err => console.log(err));
  }

  public async unlike(EventID: number, UserID: number): Promise<void> {
    this.events
      .update({
        where: { EventID: EventID },
        data: { LikesNB: { decrement: 1 } },
      })
      .then(() => this.likes.delete({ where: { EventID_UserID: { EventID: EventID, UserID: UserID } } }))
      .catch(err => console.log(err));
  }

  public async saveEvent(EventID: number, UserID: number): Promise<void> {
    this.saved.create({ data: { EventID: EventID, UserID: UserID } }).catch(err => console.log(err));
  }

  public async unsaveEvent(EventID: number, UserID: number): Promise<void> {
    this.saved.delete({ where: { EventID_UserID: { EventID: EventID, UserID: UserID } } }).catch(err => console.log(err));
  }

  public async filtered(q: 'all' | 'popular' | 'recent' | 'name' | 'old', search: string): Promise<Events[]> {
    const allEvents: Events[] = await this.events.findMany({
      where: {
        Title: { contains: search, mode: 'insensitive' },
      },
      include: { CreatedBy: true, Likes: { include: { User: true } }, Saved: { include: { User: true } } },
    });

    switch (q) {
      case 'all':
        // No sorting needed
        break;
      case 'popular':
        allEvents.sort((a, b) => b.LikesNB - a.LikesNB);
        break;
      case 'recent':
        allEvents.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        break;
      case 'name':
        allEvents.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'old':
        allEvents.sort((a, b) => a.Date.getTime() - b.Date.getTime());
        break;
    }

    return allEvents;
  }

  public async create(Title: string, Description: string, Date: string, Location: string, CreatorID: number): Promise<void> {
    this.events
      .create({ data: { Title: Title, Description: Description, Date: Date, Location: Location, CreatorID: CreatorID } })
      .catch(err => console.log(err));
  }
}
