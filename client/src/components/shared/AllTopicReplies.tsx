import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetTopicRepliesWithFilterQuery } from "../../app/store";
import { MainFilters } from "../../constants/filters";
import { useReplyClicks } from "../../hooks/replyMutations";
import useGetUser from "../../hooks/useGetUser";
import { getTimestamp } from "../../utils/utils";
import Filter from "./Filter";
import Loader from "./Loader";
import Metric from "./Metric";

interface Props {
  TopicID: number;
  userId: number;
  totalReplies: number;
}

const AllTopicReplies = ({ TopicID, totalReplies }: Props) => {
  const [sp, setSp] = useSearchParams();

  const { data, isLoading, isSuccess, refetch } =
    useGetTopicRepliesWithFilterQuery(
      {
        TopicID: TopicID,
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

  useEffect(() => {
    let q = sp.get("q");
  }, [sp]);

  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const UserID = useGetUser().UserID;

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
            <article
              key={reply.ReplyID}
              className="light-border border-b py-10"
            >
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  to={`/user/${reply.CreatorID}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
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
              <div>{reply.Content}</div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default AllTopicReplies;
