import React from "react";
import EventForm from "./forms/EventForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

/**
 * @returns {JSX.Element} - A dialog to create a new event
 */
const CreateEventDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 text-dark300_light900">
          Create your own Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-dark300_light900">
            Create your own Event
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to create your own event.
          </DialogDescription>
        </DialogHeader>
        <EventForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
