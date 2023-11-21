import React from "react";
import QuestionForm from "./forms/QuestionForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
const CreateQuestionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 text-dark300_light900">
          Ask a new Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-420 items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-dark300_light900">
            Ask a new Question
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to ask a new question.
          </DialogDescription>
        </DialogHeader>
        <QuestionForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
