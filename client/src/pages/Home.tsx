import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetEventsQuery, useGetTopicsQuery } from "../app/store";
import { DiscussionTopicWithUser, EventWithUser } from "../types";
import EventCard from "../components/cards/EventCard";
import TopicCard from "../components/cards/TopicCard";
import useGetUser from "../hooks/useGetUser";
const Home = () => {
  const navigate = useNavigate();
  const user = useGetUser();
  const {
    data: eventData,
    isLoading: isEventLoading,
    isSuccess: isEventSuccess,
  } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });

  const {
    data: topicData,
    isLoading: isTopicLoading,
    isSuccess: isTopicSuccess,
  } = useGetTopicsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          Welcome back {user.FirstName}!
        </h1>
        <Link to="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
            onClick={() => navigate("/ask-question")}
          >
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col">
        Check Out the latest events, questions, and more we have for you!
      </div>

      <div className="mt-10">
        <h2 className="h2-bold text-dark100_light900">Events</h2>
        <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-3 max-md:grid-cols-1">
          {isEventLoading && <div>Loading...</div>}
          {isEventSuccess && eventData.length === 0 && <div>No Events Yet</div>}
          {isEventSuccess &&
            eventData
              .slice(0, 3)
              .map((event: EventWithUser) => (
                <EventCard
                  key={event.EventID}
                  event={event}
                  likedByUser={event.likedByUser}
                  savedByUser={event.savedByUser}
                  home={true}
                />
              ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="h2-bold text-dark100_light900">Discussions</h2>
        <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-2 max-md:grid-cols-1">
          {isTopicLoading && <div>Loading...</div>}
          {isTopicSuccess && topicData.length === 0 && (
            <div>No Discussions Yet</div>
          )}
          {isTopicSuccess &&
            topicData
              .slice(0, 4)
              .map((topic: DiscussionTopicWithUser) => (
                <TopicCard
                  key={topic.TopicID}
                  topic={topic}
                  likedByUser={topic.likedByUser}
                  savedByUser={topic.savedByUser}
                  home={true}
                />
              ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="h2-bold text-dark100_light900">Questions</h2>
        <div className="mt-4 flex w-full flex-row gap-6 flex-wrap">
          {/* {isEventLoading && <div>Loading...</div>}
          {isEventFetching && <div>Updating...</div>}
          {isEventSuccess && eventData.length === 0 && <div>No events</div>}
          {isEventSuccess &&
            eventData.map((event: EventWithUser) => (
              <EventCard
                key={event.EventID}
                event={event}
                likedByUser={event.likedByUser}
                savedByUser={event.savedByUser}
              />
            ))} */}
          No questions posted yet!
        </div>
      </div>
    </>
  );
};

export default Home;
