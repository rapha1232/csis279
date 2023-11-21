import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOneQuestionQuery,
  useLikeQuestionMutation,
  useSaveQuestionMutation,
  useUnlikeQuestionMutation,
  useUnsaveQuestionMutation,
} from "../app/store";
import QuestionReplyForm from "../components/forms/QuestionReplyForm";
import AllReplies from "../components/shared/AllQuestionReplies";
import Loader from "../components/shared/Loader";
import Metric from "../components/shared/Metric";
import { toast } from "../components/ui/use-toast";
import useGetUser from "../hooks/useGetUser";
import { QuestionWithUser } from "../types";
import { formatAndDivideNumber, getTimestamp } from "../utils/utils";

const SingleQuestion = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isSuccess, refetch } = useGetOneQuestionQuery(
    { QuestionID: Number(id) },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      pollingInterval: 5000,
      skip: false,
    }
  );
  const [like] = useLikeQuestionMutation();
  const [unlike] = useUnlikeQuestionMutation();
  const [save] = useSaveQuestionMutation();
  const [unsave] = useUnsaveQuestionMutation();

  const user = useGetUser();
  const handleLikeClick = async (question: QuestionWithUser) => {
    if (question.likedByUser) {
      try {
        await unlike({
          UserID: user.UserID,
          QuestionID: question.QuestionID,
        });
        toast({
          title: "Question unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking Question",
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
          QuestionID: question.QuestionID,
        });
        toast({
          title: "Question liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking Question",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };

  const handleSaveClick = async (question: QuestionWithUser) => {
    if (question.savedByUser) {
      try {
        await unsave({
          UserID: user.UserID,
          QuestionID: question.QuestionID,
        });
        toast({
          title: "Question unsaved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unsaving question",
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
          QuestionID: question.QuestionID,
        });
        toast({
          title: "Question saved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error saving question",
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

          <AllReplies
            questionId={data.QuestionID}
            userId={data.CreatedBy.UserID}
            totalReplies={data.CommentsNb}
          />

          <QuestionReplyForm QuestionID={data.QuestionID} />
        </>
      )}
    </>
  );
};

export default SingleQuestion;
