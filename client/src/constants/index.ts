import { SidebarLink } from "../types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/home",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/events.svg",
    route: "/events",
    label: "Events",
  },
  {
    imgURL: "/assets/icons/discussions.svg",
    route: "/discussions",
    label: "Discussions",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/questions",
    label: "Questions",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/members",
    label: "Discover Members",
  },
  {
    imgURL: "/assets/icons/apod.svg",
    route: "/apod",
    label: "APOD",
  },
];
