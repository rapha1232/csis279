import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetQuestionRepliesWithFilterQuery } from "../../app/store";
import { MainFilters } from "../../constants/filters";
import { useReplyClicks } from "../../hooks/replyMutations";
import useGetUser from "../../hooks/useGetUser";
import { getTimestamp } from "../../utils/utils";
import Delete from "../update/Delete";
import UpdateReply from "../update/UpdateReply";
import Filter from "./Filter";
import Loader from "./Loader";
import Metric from "./Metric";

interface Props {
  questionId: number;
  userId: number;
  totalReplies: number;
}

/**
 * This component is used to display all the replies of a question.
 * @param {number} QuestionID - The id of the question
 * @param {number} totalReplies - The total number of replies
 * @returns {JSX.Element} - A list of replies
 */
const AllQuestionReplies = ({ questionId, totalReplies }: Props) => {
  // Get the q parameter from the url
  const [sp, setSp] = useSearchParams();

  // Get the replies from the server
  const { data, isLoading, isSuccess, refetch } =
    useGetQuestionRepliesWithFilterQuery(
      {
        QuestionID: questionId,
        q: sp.get("q") ?? "all",
      },
      {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        pollingInterval: 5000,
        skip: false,
      }
    );

  // Update the q parameter in the url
  useEffect(() => {
    let q = sp.get("q");
  }, [sp]);

  // Update the q parameter in the url
  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const UserID = useGetUser().UserID;

  //  Handle the like click
  const { handleLikeClick } = useReplyClicks({
    UserID,
    refetch,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalReplies} Replies</h3>

        <Filter onFilterChange={handleFilterChange} filters={MainFilters} />
      </div>

      <div>
        {isLoading && <Loader />}
        {isSuccess && data.length === 0 && (
          <p className="text-dark200_light900">No comments yet...</p>
        )}
        {isSuccess &&
          data.map((reply) => (
            // Map through the replies and display them
            <article
              key={reply.ReplyID}
              className="light-border border-b py-10"
            >
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                {reply.CreatorID === UserID && <UpdateReply prev={reply} />}
                {reply.CreatorID === UserID && (
                  <Delete type="reply" TargetID={reply.ReplyID} />
                )}
                <Link
                  to={`/user/${reply.CreatorID}`}
                  className="mt-2 flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Metric
                    icon="user"
                    title=""
                    textStyles="small-medium text-dark400_light800"
                    iconSize={50}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {reply.CreatedBy.FirstName}
                    </p>

                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      Replied {getTimestamp(reply.CreatedAt)}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex justify-end">
                <Metric
                  icon="heart"
                  value={reply.LikesNB}
                  title=" Likes"
                  textStyles="small-medium text-dark400_light800"
                  onClick={() => handleLikeClick(reply)}
                  iconColor={reply.likedByUser ? "red" : ""}
                />
              </div>
              <div className="text-dark100_light900">{reply.Content}</div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default AllQuestionReplies;
