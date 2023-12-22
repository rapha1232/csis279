import { EditIcon } from "lucide-react";
import React from "react";
import { EventWithUser } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateEventForm from "./UpdateEventForm";

/**
 * UpdateEvent component
 * @param {EventWIithUser} prev - previous event data
 * @returns {JSX.Element} UpdateEvent component
 */
const UpdateEvent = ({ prev }: { prev: EventWithUser }) => {
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
            Update your event
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to update your event.
          </DialogDescription>
        </DialogHeader>
        <UpdateEventForm prev={prev} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEvent;
