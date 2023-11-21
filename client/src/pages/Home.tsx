import React from "react";
import CreateQuestionDialog from "../components/CreateQuestionDialog";
import RenderEvents from "../components/renders/RenderEvents";
import RenderQuestions from "../components/renders/RenderQuestions";
import RenderTopics from "../components/renders/RenderTopics";
import useGetUser from "../hooks/useGetUser";
const Home = () => {
  const user = useGetUser();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          Welcome back {user.FirstName}!
        </h1>
        <CreateQuestionDialog />
      </div>
      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col text-dark100_light900">
        Check Out the latest events, questions, and more we have for you!
      </div>

      <RenderEvents />
      <RenderTopics />
      <RenderQuestions />
    </>
  );
};

export default Home;
