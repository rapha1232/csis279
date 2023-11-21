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

const RenderPosted = () => {
  const user = useGetUser();
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
  const postedEvents = eventData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((postedEvent) => (
      <EventCard
        key={postedEvent.EventID}
        event={postedEvent}
        likedByUser={postedEvent.likedByUser}
        savedByUser={postedEvent.savedByUser}
        home={true}
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
      />
    ));
  return { postedEvents, postedTopics, postedQuestions };
};

export default RenderPosted;
