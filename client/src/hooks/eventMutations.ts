import {
  useLikeEventMutation,
  useSaveEventMutation,
  useUnlikeEventMutation,
  useUnsaveEventMutation,
} from "../app/store";
import { toast } from "../components/ui/use-toast";
import { EventWithUser } from "../types";
export const useEventClicks = ({
  UserID,
  isLiked,
  isSaved,
  setIsLiked,
  setIsSaved,
  refetch,
}: {
  UserID: number;
  isLiked: boolean;
  isSaved: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) => {
  const [like] = useLikeEventMutation();
  const [unlike] = useUnlikeEventMutation();
  const handleLikeClick = async (event: EventWithUser) => {
    if (isLiked) {
      try {
        await unlike({
          UserID: UserID,
          EventID: event.EventID,
        });
        setIsLiked(false);
        toast({
          title: "Event unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking event",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await like({
          UserID: UserID,
          EventID: event.EventID,
        });
        setIsLiked(true);
        toast({
          title: "Event liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking event",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  const [save] = useSaveEventMutation();
  const [unsave] = useUnsaveEventMutation();
  const handleSaveClick = async (event: EventWithUser) => {
    if (isSaved) {
      try {
        await unsave({
          UserID: UserID,
          EventID: event.EventID,
        });
        setIsSaved(false);
        toast({
          title: "Event unsaved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unsaving event",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    } else {
      try {
        await save({
          UserID: UserID,
          EventID: event.EventID,
        });
        setIsSaved(true);
        toast({
          title: "Event saved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error saving event",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  return { handleSaveClick, handleLikeClick };
};
