export type SignInInfo = {
  Email: string;
  Password: string;
};
export type NewUser = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
};

export type UpdateUser = {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
};

export type User = {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
};

export type SidebarLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type Event = {
  EventID: number;
  Title: string;
  Description: string;
  Date: string;
  Time: string;
  Location: string;
  CreatedBy: number;
  Likes: number;
};

export type EventWithUser = {
  EventID: number;
  Title: string;
  Description: string;
  Date: string;
  Time: string;
  Location: string;
  CreatedBy: number;
  Likes: number;
  likedByUser: boolean;
  savedByUser: boolean;
};

export type DiscussionTopic = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: number;
  Likes: number;
  // Comments: number;
};

export type DiscussionTopicWithUser = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: number;
  Likes: number;
  likedByUser: boolean;
  savedByUser: boolean;
  // Comments: number;
};

export type Article = {
  ArticleID: number;
  Title: string;
  Description: string;
  Visits: number;
  Link: string;
};

export type Comment = {
  CommentID: number;
  DiscussionID: number;
  UserID: number;
  Comment: string;
  Date: Date;
};
