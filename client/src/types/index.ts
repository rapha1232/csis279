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
  UserID: number;
  FirstName: string;
  LastName: string;
  Password: string;
};

export type UpdateEvent = {
  EventID: number;
  Title: string;
  Description: string;
  Date: string;
  Location: string;
};

export type UpdateQuestion = {
  QuestionID: number;
  Title: string;
  Content: string;
};

export type UpdateTopic = {
  TopicID: number;
  Title: string;
  Content: string;
};

export type UpdateReply = {
  ReplyID: number;
  Content: string;
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
  Location: string;
  CreatedBy: User;
  LikesNB: number;
};

export type EventWithUser = {
  EventID: number;
  Title: string;
  Description: string;
  Date: string;
  Location: string;
  CreatedBy: User;
  LikesNB: number;
  likedByUser: boolean;
  savedByUser: boolean;
};

export type EventFromServer = {
  EventID: number;
  Title: string;
  Description: string;
  Date: string;
  Location: string;
  CreatorID: number;
  LikesNB: number;
  CreatedBy: User;
  Likes: Like[];
  Saved: Save[];
};

export type Like = {
  LikeID: number;
  UserID: number;
  EventID?: number;
  TopicID?: number;
  QuestionID?: number;
  User: User;
};

export type Save = {
  SavedID: number;
  UserID: number;
  EventID?: number;
  TopicID?: number;
  QuestionID?: number;
  User: User;
};

export type DiscussionTopic = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  LikesNb: number;
  CommentsNb: number;
};

export type DiscussionTopicWithUser = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  LikesNb: number;
  likedByUser: boolean;
  savedByUser: boolean;
  CommentsNb: number;
};

export type DiscussionTopicFromServer = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  CreatorID: number;
  LikesNb: number;
  Likes: Like[];
  Saved: Save[];
  CommentsNb: number;
  _count: { Replies: number };
};

export type Question = {
  TopicID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  LikesNb: number;
  CommentsNb: number;
};

export type QuestionWithUser = {
  QuestionID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  LikesNb: number;
  likedByUser: boolean;
  savedByUser: boolean;
  CommentsNb: number;
};

export type QuestionFromServer = {
  QuestionID: number;
  Title: string;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
  CreatorID: number;
  LikesNb: number;
  Likes: Like[];
  Saved: Save[];
  _count: { Replies: number };
};

export type Article = {
  id: number;
  title: string;
  url: string;
  img_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: { launch_id: string; provider: string }[];
  events: { event_id: number; provider: string }[];
};

export type Reply = {
  ReplyID: number;
  Content: string;
  CreatedAt: string;
  CreatedBy: User;
};

export type ReplyWithUser = {
  ReplyID: number;
  Content: string;
  CreatedAt: string;
  CreatorID: number;
  QuestionID?: number;
  TopicID?: number;
  LikesNB: number;
  CreatedBy: User;
  likedByUser: boolean;
};

export type ReplyFromServer = {
  ReplyID: number;
  Content: string;
  CreatedAt: string;
  CreatorID: number;
  QuestionID?: number;
  TopicID?: number;
  LikesNB: number;
  CreatedBy: User;
  Likes: Like[];
};

export type APOD = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};
