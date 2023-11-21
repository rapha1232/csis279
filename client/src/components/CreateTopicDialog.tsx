import React from "react";
import TopicForm from "./forms/TopicForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
const CreateTopicDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 text-dark300_light900">
          Create a new Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-dark300_light900">
            Create a new Discussion
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to create a new discussion.
          </DialogDescription>
        </DialogHeader>
        <TopicForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
