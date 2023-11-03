import React, { useState } from "react";
import { Event } from "../../types";
import { Link } from "react-router-dom";
import Metric from "../shared/Metric";
import { getName } from "../../utils/userUtils";
import {
  useLikeEventMutation,
  useUnlikeEventMutation,
  useGetEventsQuery,
  RootState,
  useSaveEventMutation,
  useUnsaveEventMutation,
} from "../../app/store";
import { useSelector } from "react-redux";
import { getLocalStorageUser } from "../../utils/localStorageUtils";

const EventCard = ({
  event,
  likedByUser,
  savedByUser,
  width,
}: {
  event: Event;
  likedByUser: boolean;
  savedByUser: boolean;
  width?: string;
}) => {
  const [like] = useLikeEventMutation();
  const [unlike] = useUnlikeEventMutation();
  const [save] = useSaveEventMutation();
  const [unsave] = useUnsaveEventMutation();
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const user =
    useSelector((state: RootState) => state.user.user) ?? getLocalStorageUser();
  const { refetch } = useGetEventsQuery(user.UserID);

  const handleLikeClick = async (eventid: number) => {
    if (isLiked) {
      try {
        await unlike({ UserID: user?.UserID ?? 0, EventID: eventid });
        setIsLiked(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await like({ UserID: user?.UserID ?? 0, EventID: eventid });
        setIsLiked(true);
      } catch (e) {
        console.log(e);
      }
    }

    refetch();
  };

  const handleSaveClick = async (eventid: number) => {
    if (isSaved) {
      try {
        await unsave({ UserID: user.UserID, EventID: eventid });
        setIsSaved(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await save({ UserID: user.UserID, EventID: eventid });
        setIsSaved(true);
      } catch (e) {
        console.log(e);
      }
    }

    refetch();
  };

  return (
    <div
      className={`card-wrapper rounded-[10px] p-9 sm:px-11 
      ${width ? `max-w-[${width}]` : ""}
      `}
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
          alt="user"
          title={`by ${getName(event.CreatedBy)} `}
          href={`/user/${event.CreatedBy}`}
          textStyles="body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            icon="heart"
            alt="Upvotes"
            value={event.Likes}
            title="Likes"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleLikeClick(event.EventID)}
            iconColor={isLiked ? "red" : ""}
          />
          <Metric
            icon="star"
            alt="Save"
            title="Save"
            textStyles="small-medium text-dark400_light800"
            onClick={() => handleSaveClick(event.EventID)}
            iconColor={isSaved ? "yellow" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
