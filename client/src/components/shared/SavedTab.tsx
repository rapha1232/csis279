import React from "react";
import RenderSaved from "../renders/RenderSaved";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

/**
 * SavedTab component represents a tabbed view for displaying saved events, topics, and questions.
 *
 * @returns {JSX.Element} The JSX for the SavedTab component.
 */
const SavedTab = () => {
  // Retrieve saved events, topics, and questions using the RenderSaved hook
  const { savedEvents, savedTopics, savedQuestions } = RenderSaved();

  return (
    <div className="mt-2 flex gap-10">
      {/* Tabs component for switching between saved events, topics, and questions */}
      <Tabs defaultValue="savedEvents" className="flex-1">
        {/* TabsList contains the tab triggers for events, topics, and questions */}
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          <TabsTrigger value="savedEvents" className="tab">
            Events
          </TabsTrigger>
          <TabsTrigger value="savedTopics" className="tab">
            Discussion Topics
          </TabsTrigger>
          <TabsTrigger value="savedQuestions" className="tab">
            Questions
          </TabsTrigger>
        </TabsList>

        {/* TabsContent for saved events */}
        <TabsContent value="savedEvents" className="flex w-full flex-col gap-6">
          {savedEvents && savedEvents.length > 0 ? (
            <>{savedEvents}</>
          ) : (
            <p>No Events Saved</p>
          )}
        </TabsContent>

        {/* TabsContent for saved topics */}
        <TabsContent value="savedTopics" className="flex w-full flex-col gap-6">
          {savedTopics && savedTopics.length > 0 ? (
            <>{savedTopics}</>
          ) : (
            <p>No Discussion Topics Saved</p>
          )}
        </TabsContent>

        {/* TabsContent for saved questions */}
        <TabsContent
          value="savedQuestions"
          className="flex w-full flex-col gap-6"
        >
          {savedQuestions && savedQuestions.length > 0 ? (
            <>{savedQuestions}</>
          ) : (
            <p>No Questions Saved</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedTab;
