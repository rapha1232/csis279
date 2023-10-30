import React from "react";
import RenderTag from "../RenderTag";
import { Link } from "react-router-dom";

const upcoming = [
  {
    _id: 1,
    title: "Zaarour Stargazing",
  },
  {
    _id: 2,
    title: "Solar Eclipse",
  },
  {
    _id: 3,
    title: "Moon Eclipse",
  },
  {
    _id: 4,
    title: "Meteor Shower",
  },
  {
    _id: 5,
    title: "...",
  },
];

const popularReads = [
  { _id: 1, name: "Article", totalClicks: 12 },
  { _id: 2, name: "Article", totalClicks: 4 },
  { _id: 3, name: "Article", totalClicks: 9 },
  { _id: 4, name: "Article", totalClicks: 10 },
  { _id: 5, name: "Article", totalClicks: 2 },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Upcoming</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {upcoming.map((event) => (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{event.title}</p>
              <img
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Reads</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularReads.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name + " " + tag._id}
              totalQ={tag.totalClicks}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
