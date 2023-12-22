import { EditIcon } from "lucide-react";
import React from "react";
import { DiscussionTopicWithUser } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateTopicForm from "./UpdateTopicForm";

/**
 * UpdateTopic component
 * @param {DiscussionTopicWIithUser} prev - previous topic data
 * @returns {JSX.Element} UpdateTopic component
 */
const UpdateTopic = ({ prev }: { prev: DiscussionTopicWithUser }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditIcon
          size={24}
          className="rounded-full object-cover text-blue-500 cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-dark300_light900">
            Update your topic
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to update your topic.
          </DialogDescription>
        </DialogHeader>
        <UpdateTopicForm prev={prev} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTopic;
