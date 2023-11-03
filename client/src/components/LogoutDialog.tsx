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
import { clearUser, useSignoutMutation } from "../app/store";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogoutDialog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signout, { isLoading }] = useSignoutMutation();
  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/sign-in");
      dispatch(clearUser());
      toast({ title: "Successfully logged out" });
    } catch {
      toast({ title: "Something went wrong" });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-start gap-4 h-14"
          disabled={isLoading}
        >
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            width={20}
            height={20}
            className="invert-colors"
          />
          <p className="base-medium max-lg:hidden text-dark300_light900">
            Logout
          </p>
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
          <Button
            type="button"
            variant={"destructive"}
            onClick={handleSignOut}
            disabled={isLoading}
          >
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
