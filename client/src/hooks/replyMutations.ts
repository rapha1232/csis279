import { useLikeReplyMutation, useUnlikeReplyMutation } from "../app/store";
import { toast } from "../components/ui/use-toast";
import { ReplyWithUser } from "../types";
export const useReplyClicks = ({
  UserID,
  refetch,
}: {
  UserID: number;
  refetch: () => void;
}) => {
  const [like] = useLikeReplyMutation();
  const [unlike] = useUnlikeReplyMutation();
  const handleLikeClick = async (reply: ReplyWithUser) => {
    if (reply.likedByUser) {
      try {
        await unlike({
          UserID: UserID,
          ReplyID: reply.ReplyID,
        });
        toast({
          title: "Reply unliked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error unliking reply",
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
          ReplyID: reply.ReplyID,
        });
        toast({
          title: "Reply liked!",
          description: "Changes may take a few seconds to appear",
        });
      } catch (e) {
        toast({
          title: "Error liking reply",
          description: "Changes may take a few seconds to appear",
        });
        console.log(e);
      } finally {
        refetch();
      }
    }
  };
  return { handleLikeClick };
};
