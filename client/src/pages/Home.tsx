import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LocalSearcchBar from "../components/shared/search/LocalSearcchBar";
import Filter from "../components/shared/Filter";
import HomeFilters from "../components/Home/HomeFilters";
import { HomePageFilters } from "../constants/filters";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link to="/ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
            onClick={() => navigate("/ask-question")}
          >
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearcchBar
          route="/"
          iconPosition="left"
          imageSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
        <Filter
          filter={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">{}</div>
    </>
  );
};

export default Home;
