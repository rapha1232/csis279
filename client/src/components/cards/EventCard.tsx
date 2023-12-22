import React, { useState } from "react";
import {
  useGetEventsQuery,
  useGetEventsWithFilterQuery,
} from "../../app/store";
import { useEventClicks } from "../../hooks/eventMutations";
import useGetUser from "../../hooks/useGetUser";
import { EventWithUser } from "../../types";
import { getTimestamp } from "../../utils/utils";
import Metric from "../shared/Metric";
import Delete from "../update/Delete";
import UpdateEvent from "../update/UpdateEvent";

/**
 * Functional component representing an event card.
 * @param {Object} props - Component props.
 * @param {EventWithUser} props.event - The event data.
 * @param {boolean} props.likedByUser - Indicates if the event is liked by the user.
 * @param {boolean} props.savedByUser - Indicates if the event is saved by the user.
 * @param {string} props.width - Width of the card.
 * @param {boolean} props.home - Indicates if the card is displayed in the home view.
 * @param {string} props.q - Query parameter.
 * @param {string} props.s - Search parameter.
 * @param {boolean} props.editable - Indicates if the card is editable.
 * @returns {JSX.Element} - Rendered EventCard component.
 */
const EventCard = ({
  event,
  likedByUser,
  savedByUser,
  width,
  home = false,
  q = "all",
  s = "",
  editable = false,
}: {
  event: EventWithUser;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
  home?: boolean;
  q?: string;
  s?: string;
  editable?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const UserID = useGetUser().UserID;

  /**
   * Fetch events based on conditions.
   */
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

  /**
   * Event click handling functions.
   */
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
          <div className="flex flex-row justify-between items-center">
            {editable && <UpdateEvent prev={event} />}
            {editable && <Delete type="event" TargetID={event.EventID} />}
          </div>
          <h3 className="mt-2 sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {event.Title}
          </h3>
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
