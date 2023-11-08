import React, { useEffect } from "react";
import LocalSearchBar from "../components/shared/search/LocalSearchBar";
import Filter from "../components/shared/Filter";
import { MainFilters } from "../constants/filters";
import HomeFilters from "../components/Home/HomeFilters";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootState, useGetTopicsWithFilterQuery } from "../app/store";
import { DiscussionTopicWithUser } from "../types";
import { useSelector } from "react-redux";
import TopicCard from "../components/cards/TopicCard";
import CreateTopicDialog from "../components/CreateTopicDialog";

const Discussions = () => {
  const navigate = useNavigate();
  const searchValue = useSelector((state: RootState) => state.topicSearch);
  const [sp, setSp] = useSearchParams();
  useEffect(() => {
    let q = sp.get("q");
    console.log("Current q:", q);
  }, [sp]);

  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const { data, isLoading, isSuccess } = useGetTopicsWithFilterQuery(
    {
      q: sp.get("q") ?? "all",
      search: searchValue,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 5000,
      skip: false,
    }
  );
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Discussions</h1>
        <CreateTopicDialog />
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imageSrc="/assets/icons/search.svg"
          placeholder="Search for discussions (by topic)"
          otherClasses="flex-1"
          slice="topicSearch"
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
        <h2 className="h2-bold text-dark100_light900">Topics</h2>
        <div className="mt-10 flex w-full flex-col gap-6 max-sm:mt-20">
          {isLoading && <div>Loading...</div>}
          {isSuccess && data.length === 0 && <div>No topics</div>}
          {isSuccess &&
            data.map((topic: DiscussionTopicWithUser) => (
              <TopicCard
                key={topic.TopicID}
                topic={topic}
                likedByUser={topic.likedByUser}
                savedByUser={topic.savedByUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Discussions;
