import React, { useState } from "react";
import { EventWithUser } from "../../types";
import { Link } from "react-router-dom";
import Metric from "../shared/Metric";
import {
  useLikeEventMutation,
  useUnlikeEventMutation,
  useGetEventsQuery,
  useSaveEventMutation,
  useUnsaveEventMutation,
  useGetEventsWithFilterQuery,
} from "../../app/store";
import { toast } from "../ui/use-toast";
import useGetUser from "../../hooks/useGetUser";

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
  const [like] = useLikeEventMutation();
  const [unlike] = useUnlikeEventMutation();
  const [save] = useSaveEventMutation();
  const [unsave] = useUnsaveEventMutation();
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [isSaved, setIsSaved] = useState(savedByUser);
  const user = useGetUser();
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

  const handleLikeClick = async (event: EventWithUser) => {
    if (isLiked) {
      try {
        await unlike({ UserID: user?.UserID ?? 0, EventID: event.EventID });
        setIsLiked(false);
        toast({ title: "Event unliked!" });
      } catch (e) {
        toast({ title: "Error unliking event" });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await like({ UserID: user?.UserID ?? 0, EventID: event.EventID });
        setIsLiked(true);
        toast({ title: "Event liked!" });
      } catch (e) {
        toast({ title: "Error liking event" });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };

  const handleSaveClick = async (event: EventWithUser) => {
    if (isSaved) {
      try {
        await unsave({ UserID: user.UserID, EventID: event.EventID });
        setIsSaved(false);
        toast({ title: "Event unsaved!" });
      } catch (e) {
        toast({ title: "Error unsaving event" });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await save({ UserID: user.UserID, EventID: event.EventID });
        setIsSaved(true);
        toast({ title: "Event saved!" });
      } catch (e) {
        toast({ title: "Error saving event" });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
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
          title={`by ${event.CreatedBy.FirstName} `}
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
