import React from "react";
import RenderPosted from "../renders/RenderPosted";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

/**
 * PostedTab component represents a tabbed view for displaying posted events, topics, and questions.
 *
 * @returns {JSX.Element} The JSX for the PostedTab component.
 */
const PostedTab = () => {
  const { postedEvents, postedTopics, postedQuestions } = RenderPosted();
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
          <TabsTrigger value="postedQuestions" className="tab">
            Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="postedEvents"
          className="flex w-full flex-col gap-6"
        >
          {postedEvents && postedEvents.length > 0 ? (
            <>{postedEvents}</>
          ) : (
            <p>No Events Posted</p>
          )}
        </TabsContent>
        <TabsContent
          value="postedTopics"
          className="flex w-full flex-col gap-6"
        >
          {postedTopics && postedTopics.length > 0 ? (
            <>{postedTopics}</>
          ) : (
            <p>No Discussion Topics Posted</p>
          )}
        </TabsContent>
        <TabsContent
          value="postedQuestions"
          className="flex w-full flex-col gap-6"
        >
          {postedQuestions && postedQuestions.length > 0 ? (
            <>{postedQuestions}</>
          ) : (
            <p>No Questions Posted</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default PostedTab;
