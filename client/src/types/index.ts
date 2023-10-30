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
  UserId: number;
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
