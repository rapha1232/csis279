import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useGetEventsQuery, useGetTopicsQuery } from "../app/store";
import { DiscussionTopicWithUser, EventWithUser } from "../types";
import EventCard from "../components/cards/EventCard";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import { useSelector } from "react-redux";
import TopicCard from "../components/cards/TopicCard";
const Home = () => {
  const navigate = useNavigate();
  const user =
    useSelector((state: RootState) => state.user.user) ?? getLocalStorageUser();
  const {
    data: eventData,
    isFetching: isEventFetching,
    isLoading: isEventLoading,
    isSuccess: isEventSuccess,
  } = useGetEventsQuery(user!.UserID, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const {
    data: topicData,
    isFetching: isTopicFetching,
    isLoading: isTopicLoading,
    isSuccess: isTopicSuccess,
  } = useGetTopicsQuery(user!.UserID, {
    refetchOnMountOrArgChange: true,
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
        <div className="mt-4 flex w-full flex-row gap-6 flex-wrap">
          {isEventLoading && <div>Loading...</div>}
          {isEventFetching && <div>Updating...</div>}
          {isEventSuccess && eventData.length === 0 && <div>No events</div>}
          {isEventSuccess &&
            eventData
              .slice(0, 4)
              .map((event: EventWithUser) => (
                <EventCard
                  key={event.EventID}
                  event={event}
                  likedByUser={event.likedByUser}
                  savedByUser={event.savedByUser}
                  width="300px"
                />
              ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="h2-bold text-dark100_light900">Discussions</h2>
        <div className="mt-4 flex w-full flex-row gap-6 flex-wrap">
          {isTopicLoading && <div>Loading...</div>}
          {isTopicFetching && <div>Updating...</div>}
          {isTopicSuccess && topicData.length === 0 && <div>No events</div>}
          {isTopicSuccess &&
            topicData
              .slice(0, 4)
              .map((topic: DiscussionTopicWithUser) => (
                <TopicCard
                  key={topic.TopicID}
                  topic={topic}
                  likedByUser={topic.likedByUser}
                  savedByUser={topic.savedByUser}
                  width="450px"
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
