import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetTopicsQuery,
  useGetTopicsWithFilterQuery,
} from "../../app/store";
import { useTopicClicks } from "../../hooks/topicsMutations";
import useGetUser from "../../hooks/useGetUser";
import { DiscussionTopicWithUser } from "../../types";
import { formatAndDivideNumber, getTimestamp } from "../../utils/utils";
import Metric from "../shared/Metric";
import Delete from "../update/Delete";
import UpdateTopic from "../update/UpdateTopic";

/**
 * Functional component representing a topic card.
 * @param {Object} props - Component props.
 * @param {DiscussionTopicWithUser} props.topic - The topic data.
 * @param {boolean} props.likedByUser - Indicates if the topic is liked by the user.
 * @param {boolean} props.savedByUser - Indicates if the topic is saved by the user.
 * @param {string} props.width - Width of the card.
 * @param {boolean} props.home - Indicates if the card is displayed in the home view.
 * @param {string} props.q - Query parameter.
 * @param {string} props.s - Search parameter.
 * @param {boolean} props.editable - Indicates if the card is editable.
 * @returns {JSX.Element} - Rendered TopicCard component.
 */

const TopicCard = ({
  topic,
  likedByUser,
  savedByUser,
  width,
  home = false,
  s = "",
  q = "all",
  editable = false,
}: {
  topic: DiscussionTopicWithUser;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
  home?: boolean;
  s?: string;
  q?: string;
  editable?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const UserID = useGetUser().UserID;

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

  const { handleLikeClick, handleSaveClick } = useTopicClicks({
    UserID,
    isLiked,
    isSaved,
    setIsLiked,
    setIsSaved,
    refetch,
  });
  return (
    <div
      className={`card-wrapper rounded-[10px] p-9 sm:px-11 col-span-1
      ${width ? `max-w-[${width}]` : ""}
      `}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <div className="flex flex-row justify-between items-center">
            {editable && <UpdateTopic prev={topic} />}
            {editable && <Delete type="topic" TargetID={topic.TopicID} />}
          </div>
          <Link to={`/topic/${topic.TopicID}`}>
            <h3 className="mt-2 sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
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
