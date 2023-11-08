import React from "react";
import { useGetEventsQuery, useGetTopicsQuery } from "../../app/store";
import EventCard from "../cards/EventCard";
import TopicCard from "../cards/TopicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useGetUser from "../../hooks/useGetUser";

const PostedTab = () => {
  const user = useGetUser();
  const { data: eventData } = useGetEventsQuery();
  const { data: topicData } = useGetTopicsQuery();
  const postedEvents = eventData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((savedEvent) => (
      <EventCard
        key={savedEvent.EventID}
        event={savedEvent}
        likedByUser={savedEvent.likedByUser}
        savedByUser={savedEvent.savedByUser}
        home={true}
      />
    ));
  const postedTopics = topicData
    ?.filter((d) => d.CreatedBy.UserID === user.UserID)
    .map((savedTopic) => (
      <TopicCard
        key={savedTopic.TopicID}
        topic={savedTopic}
        likedByUser={savedTopic.likedByUser}
        savedByUser={savedTopic.savedByUser}
      />
    ));

  return (
    <div className="mt-2 flex gap-10">
      <Tabs defaultValue="postedEvents" className="flex-1">
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          <TabsTrigger value="postedEvents" className="tab">
            Events
          </TabsTrigger>
          <TabsTrigger value="postedTopics" className="tab">
            Discussion Topics
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="postedEvents"
          className="flex w-full flex-col gap-6"
        >
          {postedEvents && postedEvents.length > 0 ? (
            <>{postedEvents}</>
          ) : (
            <p>No Events Saved</p>
          )}
        </TabsContent>
        <TabsContent
          value="postedTopics"
          className="flex w-full flex-col gap-6"
        >
          {postedTopics && postedTopics.length > 0 ? (
            <>{postedTopics}</>
          ) : (
            <p>No Discussion Topics Saved</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default PostedTab;
