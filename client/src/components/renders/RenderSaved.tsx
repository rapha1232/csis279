import React from "react";
import {
  useGetEventsQuery,
  useGetQuestionsQuery,
  useGetTopicsQuery,
} from "../../app/store";
import EventCard from "../cards/EventCard";
import QuestionCard from "../cards/QuestionCard";
import TopicCard from "../cards/TopicCard";

const RenderSaved = () => {
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
  const savedEvents = eventData
    ?.filter((d) => d.savedByUser === true)
    .map((savedEvent) => (
      <EventCard
        key={savedEvent.EventID}
        event={savedEvent}
        likedByUser={savedEvent.likedByUser}
        savedByUser={savedEvent.savedByUser}
        home={true}
      />
    ));
  const savedTopics = topicData
    ?.filter((d) => d.savedByUser === true)
    .map((savedTopic) => (
      <TopicCard
        key={savedTopic.TopicID}
        topic={savedTopic}
        likedByUser={savedTopic.likedByUser}
        savedByUser={savedTopic.savedByUser}
        home={true}
      />
    ));
  const savedQuestions = questionData
    ?.filter((d) => d.savedByUser === true)
    .map((savedQuestion) => (
      <QuestionCard
        key={savedQuestion.QuestionID}
        question={savedQuestion}
        likedByUser={savedQuestion.likedByUser}
        savedByUser={savedQuestion.savedByUser}
        home={true}
      />
    ));
  return { savedEvents, savedTopics, savedQuestions };
};

export default RenderSaved;
