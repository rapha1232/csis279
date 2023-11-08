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
import TopicForm from "./TopicForm";
const CreateTopicDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Create a new Discussion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle>Create a new Discussion</DialogTitle>
          <DialogDescription>
            Please fill out the form below to create a new discussion.
          </DialogDescription>
        </DialogHeader>
        <TopicForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicDialog;
