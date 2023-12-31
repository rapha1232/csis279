import {
  useLikeQuestionMutation,
  useSaveQuestionMutation,
  useUnlikeQuestionMutation,
  useUnsaveQuestionMutation,
} from "../app/store";
import { toast } from "../components/ui/use-toast";
import { QuestionWithUser } from "../types";

/**
 * @description
 * Custom hook for handling question clicks
 * @param UserID - ID of the user
 * @param isLiked - Whether the question is liked by the user
 * @param isSaved - Whether the question is saved by the user
 * @param setIsLiked - Setter for isLiked
 * @param setIsSaved - Setter for isSaved
 * @param refetch - Function to refetch the question
 * @returns handleSaveClick - Function to handle saving the question
 * @returns handleLikeClick - Function to handle liking the question
 */
export const useQuestionClicks = ({
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
  const [like] = useLikeQuestionMutation();
  const [unlike] = useUnlikeQuestionMutation();
  const handleLikeClick = async (question: QuestionWithUser) => {
    if (isLiked) {
      try {
        await unlike({
          UserID: UserID,
          QuestionID: question.QuestionID,
        });
        setIsLiked(false);
        toast({
          title: "Question unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking question",
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
          QuestionID: question.QuestionID,
        });
        setIsLiked(true);
        toast({
          title: "Question liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking question",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  const [save] = useSaveQuestionMutation();
  const [unsave] = useUnsaveQuestionMutation();
  const handleSaveClick = async (question: QuestionWithUser) => {
    if (isSaved) {
      try {
        await unsave({
          UserID: UserID,
          QuestionID: question.QuestionID,
        });
        setIsSaved(false);
        toast({
          title: "Question unsaved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unsaving question",
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
          QuestionID: question.QuestionID,
        });
        setIsSaved(true);
        toast({
          title: "Question saved!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error saving question",
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
