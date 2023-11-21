import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetTopicsQuery,
  useGetTopicsWithFilterQuery,
  useLikeTopicMutation,
  useSaveTopicMutation,
  useUnlikeTopicMutation,
  useUnsaveTopicMutation,
} from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import { DiscussionTopic } from "../../types";
import { formatAndDivideNumber, getTimestamp } from "../../utils/utils";
import Metric from "../shared/Metric";
import { toast } from "../ui/use-toast";

const TopicCard = ({
  topic,
  likedByUser,
  savedByUser,
  width,
  home = false,
  s = "",
  q = "all",
}: {
  topic: DiscussionTopic;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
  home?: boolean;
  s?: string;
  q?: string;
}) => {
  const [like] = useLikeTopicMutation();
  const [unlike] = useUnlikeTopicMutation();
  const [save] = useSaveTopicMutation();
  const [unsave] = useUnsaveTopicMutation();
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const user = useGetUser();

  const { refetch } = home
    ? useGetTopicsQuery()
    : useGetTopicsWithFilterQuery(
        { q: q, search: s },
        {
          refetchOnMountOrArgChange: true,
          refetchOnFocus: true,
          refetchOnReconnect: true,
          skip: false,
          pollingInterval: 5000,
        }
      );

  const handleLikeClick = async (topic: DiscussionTopic) => {
    if (isLiked) {
      try {
        await unlike({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
        setIsLiked(false);
        toast({
          title: "Topic unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await like({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
        setIsLiked(true);
        toast({
          title: "Topic liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };

  const handleSaveClick = async (topic: DiscussionTopic) => {
    if (isSaved) {
      try {
        await unsave({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
        setIsSaved(false);
        toast({
          title: "Topic unsaved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unsaving topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await save({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
        setIsSaved(true);
        toast({
          title: "Topic saved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error saving topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  return (
    <div
      className={`card-wrapper rounded-[10px] p-9 sm:px-11 col-span-1
      ${width ? `max-w-[${width}]` : ""}
      `}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <Link to={`/topic/${topic.TopicID}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {topic.Title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2 text-dark200_light900">
        {topic.Content}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          icon="user"
          value={topic.CreatedBy.FirstName}
          title={` - started ${getTimestamp(topic.CreatedAt)}`}
          href={`/user/${topic.CreatedBy.UserID}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon="comment"
            value={formatAndDivideNumber(topic.CommentsNb)}
            title=" Replies"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            icon="heart"
            value={topic.LikesNb}
            title="Likes"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleLikeClick(topic)}
            iconColor={isLiked ? "red" : ""}
          />
          <Metric
            icon="star"
            title="Save"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleSaveClick(topic)}
            iconColor={isSaved ? "yellow" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
