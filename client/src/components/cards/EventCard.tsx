import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetEventsQuery,
  useGetEventsWithFilterQuery,
} from "../../app/store";
import { useEventClicks } from "../../hooks/eventMutations";
import useGetUser from "../../hooks/useGetUser";
import { EventWithUser } from "../../types";
import { getTimestamp } from "../../utils/utils";
import Metric from "../shared/Metric";

const EventCard = ({
  event,
  likedByUser,
  savedByUser,
  width,
  home = false,
  q = "all",
  s = "",
}: {
  event: EventWithUser;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
  home?: boolean;
  q?: string;
  s?: string;
}) => {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const UserID = useGetUser().UserID;

  const { refetch } = home
    ? useGetEventsQuery()
    : useGetEventsWithFilterQuery(
        { q: q, search: s },
        {
          refetchOnMountOrArgChange: true,
          refetchOnFocus: true,
          refetchOnReconnect: true,
          pollingInterval: 5000,
          skip: false,
        }
      );
  const { handleLikeClick, handleSaveClick } = useEventClicks({
    UserID,
    isLiked,
    isSaved,
    setIsLiked,
    setIsSaved,
    refetch,
  });
  return (
    <div
      className={`card-wrapper rounded-[10px] p-9 sm:px-11 col-span-1 ${
        width ? `max-w-[${width}]` : ""
      }`}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <Link to={`/events/${event.EventID}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {event.Title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2 text-dark200_light900">
        {event.Description}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          icon="user"
          value={event.CreatedBy.FirstName}
          title={` - in ${getTimestamp(event.Date)}`}
          href={`/user/${event.CreatedBy.UserID}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon="heart"
            value={event.LikesNB}
            title="Likes"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleLikeClick(event)}
            iconColor={isLiked ? "red" : ""}
          />
          <Metric
            icon="star"
            title="Save"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleSaveClick(event)}
            iconColor={isSaved ? "yellow" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
