import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOneTopicQuery,
  useLikeTopicMutation,
  useSaveTopicMutation,
  useUnlikeTopicMutation,
  useUnsaveTopicMutation,
} from "../app/store";
import TopicReplyForm from "../components/forms/TopicReplyForm";
import AllTopicReplies from "../components/shared/AllTopicReplies";
import Loader from "../components/shared/Loader";
import Metric from "../components/shared/Metric";
import { toast } from "../components/ui/use-toast";
import useGetUser from "../hooks/useGetUser";
import { DiscussionTopicWithUser } from "../types";
import { formatAndDivideNumber, getTimestamp } from "../utils/utils";

const SingleDiscussion = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isSuccess, refetch } = useGetOneTopicQuery(
    { TopicID: Number(id) },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      pollingInterval: 5000,
      skip: false,
    }
  );
  const [like] = useLikeTopicMutation();
  const [unlike] = useUnlikeTopicMutation();
  const [save] = useSaveTopicMutation();
  const [unsave] = useUnsaveTopicMutation();

  const user = useGetUser();
  const handleLikeClick = async (topic: DiscussionTopicWithUser) => {
    if (topic.likedByUser) {
      try {
        await unlike({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
        toast({
          title: "Topic unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking Topic",
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
        toast({
          title: "Topic liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking Topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };

  const handleSaveClick = async (topic: DiscussionTopicWithUser) => {
    if (topic.savedByUser) {
      try {
        await unsave({
          UserID: user.UserID,
          TopicID: topic.TopicID,
        });
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
    <>
      {isLoading && <Loader />}
      {isSuccess && data !== null && (
        <>
          <div className="flex-start w-full flex-col">
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                to={`/user/${data.CreatedBy.UserID}`}
                className="flex items-center justify-start gap-1"
              >
                <Metric
                  icon="user"
                  title=""
                  textStyles="small-medium text-dark400_light800"
                  iconSize={50}
                />
                <p className="paragraph-semibold text-dark300_light700">
                  {data.CreatedBy.FirstName}
                </p>
              </Link>
            </div>
            <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
              {data.Title}
            </h2>
          </div>

          <div className="mb-8 mt-5 flex flex-wrap gap-4">
            <Metric
              icon="clock"
              value={` asked ${getTimestamp(data.CreatedAt)}`}
              title=""
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              icon="comment"
              value={formatAndDivideNumber(data.CommentsNb)}
              title=" Replies"
              textStyles="small-medium text-dark400_light800"
            />
            <Metric
              icon="heart"
              value={formatAndDivideNumber(data.LikesNb)}
              title=" Likes"
              textStyles="small-medium text-dark400_light800"
              onClick={() => {
                handleLikeClick(data);
              }}
              iconColor={data.likedByUser ? "red" : ""}
            />
            <Metric
              icon="star"
              title="Save"
              textStyles="small-medium text-dark400_light800"
              onClick={() => handleSaveClick(data)}
              iconColor={data.savedByUser ? "yellow" : ""}
            />
          </div>

          <div className="text-dark200_light900">{data.Content}</div>

          <AllTopicReplies
            TopicID={data.TopicID}
            userId={data.CreatedBy.UserID}
            totalReplies={data.CommentsNb}
          />

          <TopicReplyForm TopicID={data.TopicID} />
        </>
      )}
    </>
  );
};

export default SingleDiscussion;
