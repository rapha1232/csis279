import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetQuestionsQuery,
  useGetQuestionsWithFilterQuery,
} from "../../app/store";
import { useQuestionClicks } from "../../hooks/questionsMutations";
import useGetUser from "../../hooks/useGetUser";
import { QuestionWithUser } from "../../types";
import { formatAndDivideNumber, getTimestamp } from "../../utils/utils";
import Metric from "../shared/Metric";

interface QuestionProps {
  question: QuestionWithUser;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
  home?: boolean;
  q?: string;
  s?: string;
}

const QuestionCard = ({
  question,
  likedByUser,
  savedByUser,
  width,
  home = false,
  q = "all",
  s = "",
}: QuestionProps) => {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const UserID = useGetUser().UserID;

  const { refetch } = home
    ? useGetQuestionsQuery()
    : useGetQuestionsWithFilterQuery(
        { q: q, search: s },
        {
          refetchOnMountOrArgChange: true,
          refetchOnFocus: true,
          refetchOnReconnect: true,
          pollingInterval: 5000,
          skip: false,
        }
      );

  const { handleLikeClick, handleSaveClick } = useQuestionClicks({
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
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(question.CreatedAt)}
          </span>
          <Link to={`/question/${question.QuestionID}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.Title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2 text-dark200_light900">
        {question.Content}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          icon={"user"}
          value={question.CreatedBy.FirstName}
          title={` - asked ${getTimestamp(question.CreatedAt)}`}
          href={`/profile/${question.CreatedBy.UserID}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon="comment"
            value={formatAndDivideNumber(question.CommentsNb)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            icon="heart"
            value={question.LikesNb}
            title="Likes"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleLikeClick(question)}
            iconColor={isLiked ? "red" : ""}
          />
          <Metric
            icon="star"
            title="Save"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleSaveClick(question)}
            iconColor={isSaved ? "yellow" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
