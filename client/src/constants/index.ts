import { SidebarLink } from "../types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const CATEGORIES = [
  {
    category_id: 6,
    name: "Electronics",
  },
  {
    category_id: 7,
    name: "Vehicles",
  },
  {
    category_id: 8,
    name: "Appliances",
  },
  {
    category_id: 9,
    name: "Furniture",
  },
  {
    category_id: 10,
    name: "Photography",
  },
  {
    category_id: 11,
    name: "Sports & Outdoors",
  },
  {
    category_id: 12,
    name: "Musical Instruments",
  },
  {
    category_id: 13,
    name: "Home & Kitchen",
  },
  {
    category_id: 14,
    name: "Gaming",
  },
  {
    category_id: 15,
    name: "Fashion",
  },
  {
    category_id: 16,
    name: "Office Supplies",
  },
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
