import React from "react";
import { useGetEventsQuery } from "../../app/store";
import { EventWithUser } from "../../types";
import EventCard from "../cards/EventCard";
import Loader from "../shared/Loader";

const RenderEvents = () => {
  const {
    data: eventData,
    isLoading: isEventLoading,
    isSuccess: isEventSuccess,
  } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });
  return (
    <div className="mt-10">
      <h2 className="h2-bold text-dark100_light900">Events</h2>
      <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-3 max-md:grid-cols-1">
        {isEventLoading && <Loader />}
        {isEventSuccess && eventData.length === 0 && <div>No Events Yet</div>}
        {isEventSuccess &&
          eventData
            .slice(0, 3)
            .map((event: EventWithUser) => (
              <EventCard
                key={event.EventID}
                event={event}
                likedByUser={event.likedByUser}
                savedByUser={event.savedByUser}
                home={true}
              />
            ))}
      </div>
    </div>
  );
};

export default RenderEvents;
