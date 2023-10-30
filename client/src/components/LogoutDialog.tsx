import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const LogoutDialog = ({ handleSignOut }: { handleSignOut: () => void }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-start gap-4 h-14">
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            width={20}
            height={20}
            className="invert-colors"
          />
          <p className="base-medium max-lg:hidden ">Logout</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogDescription>
            Press "Confirm" to logout or "Cancel" to stay logged in.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant={"destructive"} onClick={handleSignOut}>
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
