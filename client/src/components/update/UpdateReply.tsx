import { EditIcon } from "lucide-react";
import React from "react";
import { ReplyWithUser } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateReplyForm from "./UpdateReplyForm";

/**
 * UpdateReply component
 * @param {ReplyWIithUser} prev - previous reply data
 * @returns {JSX.Element} UpdateReply component
 */
const UpdateReply = ({ prev }: { prev: ReplyWithUser }) => {
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
            Update your reply
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to update your reply.
          </DialogDescription>
        </DialogHeader>
        <UpdateReplyForm prev={prev} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReply;
