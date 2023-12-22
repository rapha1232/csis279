import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearUser,
  useDeleteEventMutation,
  useDeleteQuestionMutation,
  useDeleteReplyMutation,
  useDeleteTopicMutation,
  useDeleteUserMutation,
} from "../../app/store";
import { removeLocalStorageUser } from "../../utils/localStorageUtils";
import { toast } from "../ui/use-toast";
import DeleteDialog from "./DeleteDialog";

interface Props {
  type: "event" | "topic" | "question" | "reply" | "user";
  TargetID: number;
}

/**
 * Delete Component - Renders a delete confirmation dialog and handles entity deletion.
 * @param {"event" | "topic" | "question" | "reply" | "user"} type - The type of entity to delete.
 * @param {number} TargetID - The ID of the entity to delete.
 * @returns {JSX.Element} - JSX element representing the Delete component.
 */
const Delete = ({ type, TargetID }: Props) => {
  const [deleteEvent] = useDeleteEventMutation();
  const [deleteTopic] = useDeleteTopicMutation();
  const [deleteQuetion] = useDeleteQuestionMutation();
  const [deleteReply] = useDeleteReplyMutation();
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Handles the deletion of the specified entity based on its type.
   */
  const handleDelete = async () => {
    switch (type) {
      case "event":
        try {
          await deleteEvent({
            EventID: TargetID,
          });
          toast({ title: "Successfully deleted your event" });
        } catch (e) {
          toast({ title: "Something went wrong" });
        }
        break;
      case "topic":
        try {
          await deleteTopic({
            TopicID: TargetID,
          }).unwrap();
          toast({ title: "Successfully deleted your topic" });
        } catch (e) {
          toast({ title: "Something went wrong" });
        }
        break;
      case "question":
        try {
          await deleteQuetion({
            QuestionID: TargetID,
          }).unwrap();
          toast({ title: "Successfully deleted your question" });
        } catch (e) {
          toast({ title: "Something went wrong" });
        }
        break;
      case "reply":
        try {
          await deleteReply({
            ReplyID: TargetID,
          }).unwrap();
          toast({ title: "Successfully deleted your reply" });
        } catch (e) {
          toast({ title: "Something went wrong" });
        }
        break;
      case "user":
        try {
          await deleteUser({
            UserID: TargetID,
          }).unwrap();
          toast({ title: "Successfully deleted your account" });
          dispatch(clearUser());
          removeLocalStorageUser();
          navigate("/sign-up");
        } catch (e) {
          toast({ title: "Something went wrong" });
        }
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  };

  return <DeleteDialog onClick={handleDelete} type={type} />;
};

export default Delete;
