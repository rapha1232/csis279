import EventForm from "./EventForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React from "react";
const CreateEventDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Create your own Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle>Create your own Event</DialogTitle>
          <DialogDescription>
            Please fill out the form below to create your own event.
          </DialogDescription>
        </DialogHeader>
        <EventForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
