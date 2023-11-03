import React, { useState } from "react";
import { DiscussionTopic } from "../../types";
import { Link } from "react-router-dom";
import Metric from "../shared/Metric";
import { getName } from "../../utils/userUtils";
import {
  useLikeTopicMutation,
  useUnlikeTopicMutation,
  RootState,
  useSaveTopicMutation,
  useUnsaveTopicMutation,
  useGetTopicsQuery,
} from "../../app/store";
import { useSelector } from "react-redux";
import { getLocalStorageUser } from "../../utils/localStorageUtils";

const TopicCard = ({
  topic,
  likedByUser,
  savedByUser,
  width,
}: {
  topic: DiscussionTopic;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
}) => {
  const [like] = useLikeTopicMutation();
  const [unlike] = useUnlikeTopicMutation();
  const [save] = useSaveTopicMutation();
  const [unsave] = useUnsaveTopicMutation();
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const user =
    useSelector((state: RootState) => state.user.user) ?? getLocalStorageUser();
  const { refetch } = useGetTopicsQuery(user.UserID);

  const handleLikeClick = async (topicid: number) => {
    if (isLiked) {
      try {
        await unlike({ UserID: user?.UserID ?? 0, TopicID: topicid });
        setIsLiked(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await like({ UserID: user?.UserID ?? 0, TopicID: topicid });
        setIsLiked(true);
      } catch (e) {
        console.log(e);
      }
    }

    refetch();
  };

  const handleSaveClick = async (topicid: number) => {
    if (isSaved) {
      try {
        await unsave({ UserID: user.UserID, TopicID: topicid });
        setIsSaved(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await save({ UserID: user.UserID, TopicID: topicid });
        setIsSaved(true);
      } catch (e) {
        console.log(e);
      }
    }

    refetch();
  };

  return (
    <div
      className={`card-wrapper rounded-[10px] p-9 sm:px-11 
      ${width ? `max-w-[${width}]` : ""}
      `}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <Link to={`/events/${topic.TopicID}`}>
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
          alt="user"
          title={`by ${getName(topic.CreatedBy)} `}
          href={`/user/${topic.CreatedBy}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon="heart"
            alt="Upvotes"
            value={topic.Likes}
            title="Likes"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleLikeClick(topic.TopicID)}
            iconColor={isLiked ? "red" : ""}
          />
          <Metric
            icon="star"
            alt="Save"
            title="Save"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleSaveClick(topic.TopicID)}
            iconColor={isSaved ? "yellow" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
