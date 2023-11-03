import React from "react";
import { useGetEventsQuery, useGetTopicsQuery } from "../../app/store";
import EventCard from "../cards/EventCard";
import TopicCard from "../cards/TopicCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const SavedTab = ({ UserID }: { UserID: number }) => {
  const { data: eventData } = useGetEventsQuery(UserID);
  const { data: topicData } = useGetTopicsQuery(UserID);
  const savedEvents = eventData
    ?.filter((d) => d.savedByUser === true)
    .map((savedEvent) => (
      <EventCard
        key={savedEvent.EventID}
        event={savedEvent}
        likedByUser={savedEvent.likedByUser}
        savedByUser={savedEvent.savedByUser}
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
      />
    ));

  return (
    <div className="mt-2 flex gap-10">
      <Tabs defaultValue="events" className="flex-1">
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          <TabsTrigger value="events" className="tab">
            Events
          </TabsTrigger>
          <TabsTrigger value="topics" className="tab">
            Discussion Topics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="flex w-full flex-col gap-6">
          {savedEvents && savedEvents.length > 0 ? (
            <>{savedEvents}</>
          ) : (
            <p>No Events Saved</p>
          )}
        </TabsContent>
        <TabsContent value="topics" className="flex w-full flex-col gap-6">
          {savedTopics && savedTopics.length > 0 ? (
            <>{savedTopics}</>
          ) : (
            <p>No Discussion Topics Saved</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedTab;
