import React from "react";
import { useGetTopicsQuery } from "../../app/store";
import { DiscussionTopicWithUser } from "../../types";
import TopicCard from "../cards/TopicCard";
import Loader from "../shared/Loader";

const RenderTopics = () => {
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
    <div className="mt-10">
      <h2 className="h2-bold text-dark100_light900">Discussions</h2>
      <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-2 max-md:grid-cols-1">
        {isTopicLoading && <Loader />}
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
  );
};

export default RenderTopics;
