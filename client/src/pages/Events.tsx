import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState, useGetEventsWithFilterQuery } from "../app/store";
import CreateEventDialog from "../components/CreateEventDialog";
import EventCard from "../components/cards/EventCard";
import Filter from "../components/shared/Filter";
import HomeFilters from "../components/shared/HomeFilters";
import Loader from "../components/shared/Loader";
import LocalSearchBar from "../components/shared/search/LocalSearchBar";
import { MainFilters } from "../constants/filters";
import { EventWithUser } from "../types";

const Events = () => {
  const searchValue = useSelector((state: RootState) => state.eventSearch);
  const [sp, setSp] = useSearchParams();
  useEffect(() => {
    let q = sp.get("q");
  }, [sp]);

  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const { data, isLoading, isSuccess } = useGetEventsWithFilterQuery(
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
        <h1 className="h1-bold text-dark100_light900">Events</h1>
        <CreateEventDialog />
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imageSrc="/assets/icons/search.svg"
          placeholder="Search for events (by title)"
          otherClasses="flex-1"
          slice="eventSearch"
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
        <h2 className="h2-bold text-dark100_light900">Events</h2>
        <div className="mt-10 flex w-full flex-col gap-6 max-sm:mt-20">
          {isLoading && <Loader />}
          {isSuccess && data.length === 0 && <div>No events</div>}
          {isSuccess &&
            data.map((event: EventWithUser) => (
              <EventCard
                key={event.EventID}
                event={event}
                likedByUser={event.likedByUser}
                savedByUser={event.savedByUser}
                q={sp.get("q") ?? "all"}
                s={searchValue}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Events;
