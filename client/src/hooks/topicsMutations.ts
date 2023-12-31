import {
  useLikeTopicMutation,
  useSaveTopicMutation,
  useUnlikeTopicMutation,
  useUnsaveTopicMutation,
} from "../app/store";
import { toast } from "../components/ui/use-toast";
import { DiscussionTopicWithUser } from "../types";

/**
 * @description
 * Custom hook for handling topic clicks
 * @param UserID - ID of the user
 * @param isLiked - Whether the topic is liked by the user
 * @param isSaved - Whether the topic is saved by the user
 * @param setIsLiked - Setter for isLiked
 * @param setIsSaved - Setter for isSaved
 * @param refetch - Function to refetch the topic
 * @returns handleSaveClick - Function to handle saving the topic
 * @returns handleLikeClick - Function to handle liking the topic
 */
export const useTopicClicks = ({
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
  const [like] = useLikeTopicMutation();
  const [unlike] = useUnlikeTopicMutation();
  const handleLikeClick = async (topic: DiscussionTopicWithUser) => {
    if (isLiked) {
      try {
        await unlike({
          UserID: UserID,
          TopicID: topic.TopicID,
        });
        setIsLiked(false);
        toast({
          title: "Topic unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking topic",
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
          TopicID: topic.TopicID,
        });
        setIsLiked(true);
        toast({
          title: "Topic liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking topic",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  const [save] = useSaveTopicMutation();
  const [unsave] = useUnsaveTopicMutation();
  const handleSaveClick = async (topic: DiscussionTopicWithUser) => {
    if (isSaved) {
      try {
        await unsave({
          UserID: UserID,
          TopicID: topic.TopicID,
        });
        setIsSaved(false);
        toast({
          title: "Topic unsaved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unsaving topic",
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
          TopicID: topic.TopicID,
        });
        setIsSaved(true);
        toast({
          title: "Topic saved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error saving topic",
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
