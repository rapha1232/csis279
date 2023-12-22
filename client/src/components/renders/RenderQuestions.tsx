import React from "react";
import { useGetQuestionsQuery } from "../../app/store";
import { QuestionWithUser } from "../../types";
import QuestionCard from "../cards/QuestionCard";
import Loader from "../shared/Loader";

/**
 * Component for rendering a list of questions.
 */
const RenderQuestions = () => {
  // Fetch events data using the useGetQuestionsQuery hook from the Redux store.
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isSuccess: isQuestionSuccess,
  } = useGetQuestionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });
  return (
    <div className="mt-10">
      <h2 className="h2-bold text-dark100_light900">Questions</h2>
      <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-1">
        {isQuestionLoading && <Loader />}
        {isQuestionSuccess && questionData.length === 0 && (
          <div>No Questions</div>
        )}
        {isQuestionSuccess &&
          questionData.map((question: QuestionWithUser) => (
            <QuestionCard
              key={question.QuestionID}
              question={question}
              likedByUser={question.likedByUser}
              savedByUser={question.savedByUser}
              home={true}
            />
          ))}
      </div>
    </div>
  );
};

export default RenderQuestions;
