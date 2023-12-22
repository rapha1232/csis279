import { Trash2Icon } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface Props {
  onClick: () => void;
  type: "event" | "topic" | "question" | "reply" | "user";
}

/**
 * Delete Dialog Component - Renders a delete confirmation dialog.
 * @param {() => void} onClick - The function to call when the delete button is clicked.
 * @param {"event" | "topic" | "question" | "reply" | "user"} type - The type of entity to delete.
 * @returns {JSX.Element} - JSX element representing the DeleteDialog component.
 */
const DeleteDialog = ({ onClick, type }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2Icon
          size={24}
          className="rounded-full object-cover text-red-500 cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark300_light900">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-dark300_light900">
            This action will delete your {type === "user" ? "account" : type}{" "}
            forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              className="bg-primary-100/10 text-dark300_light900"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant={"destructive"}
              onClick={onClick}
              className="text-dark300_light900 bg-red-500"
            >
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
