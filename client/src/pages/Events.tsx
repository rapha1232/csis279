import React, { useEffect } from "react";
import LocalSearchBar from "../components/shared/search/LocalSearchBar";
import Filter from "../components/shared/Filter";
import { MainFilters } from "../constants/filters";
import HomeFilters from "../components/Home/HomeFilters";
import { useSearchParams } from "react-router-dom";
import { RootState, useGetEventsWithFilterQuery } from "../app/store";
import EventCard from "../components/cards/EventCard";
import { EventWithUser } from "../types";
import { useSelector } from "react-redux";

const Events = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const searchValue = useSelector((state: RootState) => state.eventSearch);
  const [sp, setSp] = useSearchParams();
  useEffect(() => {
    let q = sp.get("q");
    console.log("Current q:", q);
  }, [sp]);

  const handleFilterChange = (newQ: string) => {
    setSp({ q: newQ });
  };

  const {
    data: eventData,
    isFetching: isEventFetching,
    isLoading: isEventLoading,
    isSuccess: isEventSuccess,
  } = useGetEventsWithFilterQuery(
    {
      UserID: user!.UserID,
      q: sp.get("q") ?? "all",
      search: searchValue,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Events</h1>
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
          {isEventLoading && <div>Loading...</div>}
          {isEventFetching && <div>Updating...</div>}
          {isEventSuccess && eventData.length === 0 && <div>No events</div>}
          {isEventSuccess &&
            eventData.map((event: EventWithUser) => (
              <EventCard
                key={event.EventID}
                event={event}
                likedByUser={event.likedByUser}
                savedByUser={event.savedByUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Events;
