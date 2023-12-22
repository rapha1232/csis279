import { EditIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateUserForm from "./UpdateUserForm";

/**
 * UpdateUser component
 * @returns {JSX.Element} UpdateUser component
 */
const UpdateUser = () => {
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
            Update your profile
          </DialogTitle>
          <DialogDescription className="text-dark300_light900">
            Please fill out the form below to update your profile.
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
