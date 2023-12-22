import React from "react";
import {
  useGetEventsQuery,
  useGetQuestionsQuery,
  useGetTopicsQuery,
} from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import EventCard from "../cards/EventCard";
import QuestionCard from "../cards/QuestionCard";
import TopicCard from "../cards/TopicCard";

/**
 * Component for rendering events, topics, and questions posted by the current user.
 * @returns {Object} An object containing components for posted events, topics, and questions.
 */
const RenderPosted = () => {
  // Fetch user data using the useGetUser hook.
  const user = useGetUser();

  // Fetch data for events, topics, and questions posted by the user from the Redux store.
  const { data: eventData } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });
  const { data: topicData } = useGetTopicsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });
  const { data: questionData } = useGetQuestionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });

  // Map the events, topics, and questions posted by the user to their respective cards.
  // This is to filter the data to only show the events, topics, and questions posted by the user.
  const postedEvents = eventData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((postedEvent) => (
      <EventCard
        key={postedEvent.EventID}
        event={postedEvent}
        likedByUser={postedEvent.likedByUser}
        savedByUser={postedEvent.savedByUser}
        home={true}
        editable
      />
    ));
  const postedTopics = topicData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((postedTopic) => (
      <TopicCard
        key={postedTopic.TopicID}
        topic={postedTopic}
        likedByUser={postedTopic.likedByUser}
        savedByUser={postedTopic.savedByUser}
        home={true}
        editable
      />
    ));

  const postedQuestions = questionData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((postedQuestion) => (
      <QuestionCard
        key={postedQuestion.QuestionID}
        question={postedQuestion}
        likedByUser={postedQuestion.likedByUser}
        savedByUser={postedQuestion.savedByUser}
        home={true}
        editable
      />
    ));
  return { postedEvents, postedTopics, postedQuestions };
};

export default RenderPosted;
