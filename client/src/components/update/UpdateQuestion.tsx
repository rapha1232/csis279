import { EditIcon } from "lucide-react";
import React from "react";
import { QuestionWithUser } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateQuestionForm from "./UpdateQuestionForm";

/**
 * UpdateQuetion component
 * @param {QuetionWIithUser} prev - previous question data
 * @returns {JSX.Element} UpdateQuetion component
 */
const UpdateQuestion = ({ prev }: { prev: QuestionWithUser }) => {
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
            Update your question
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to update your question.
          </DialogDescription>
        </DialogHeader>
        <UpdateQuestionForm prev={prev} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuestion;
