import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState, useGetQuestionsWithFilterQuery } from "../app/store";
import CreateQuestionDialog from "../components/CreateQuestionDialog";
import QuestionCard from "../components/cards/QuestionCard";
import Filter from "../components/shared/Filter";
import HomeFilters from "../components/shared/HomeFilters";
import Loader from "../components/shared/Loader";
import LocalSearchBar from "../components/shared/search/LocalSearchBar";
import { MainFilters } from "../constants/filters";
import { QuestionWithUser } from "../types";

const Questions = () => {
  const searchValue = useSelector((state: RootState) => state.questionsSearch);
  const [sp, setSp] = useSearchParams();
  useEffect(() => {
    let q = sp.get("q");
    console.log("Current q:", q);
  }, [sp]);

  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const { data, isLoading, isSuccess } = useGetQuestionsWithFilterQuery(
    {
      q: sp.get("q") ?? "all",
      search: searchValue,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      pollingInterval: 5000,
      refetchOnReconnect: true,
      skip: false,
    }
  );
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Questions</h1>
        <CreateQuestionDialog />
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imageSrc="/assets/icons/search.svg"
          placeholder="Search for questions (by title)"
          otherClasses="flex-1"
          slice="questionsSearch"
        />

        <Filter
          filters={MainFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
          onFilterChange={handleFilterChange}
        />
      </div>

      <HomeFilters onFilterChange={handleFilterChange} />

      <div className="mt-10">
        <h2 className="h2-bold text-dark100_light900">Questions</h2>
        <div className="mt-10 flex w-full flex-col gap-6 max-sm:mt-20">
          {isLoading && <Loader />}
          {isSuccess && data.length === 0 && <div>No questions</div>}
          {isSuccess &&
            data.map((question: QuestionWithUser) => (
              <QuestionCard
                key={question.QuestionID}
                question={question}
                likedByUser={question.likedByUser}
                savedByUser={question.savedByUser}
                q={sp.get("q") ?? "all"}
                s={searchValue}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
