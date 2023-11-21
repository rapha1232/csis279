import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, clearUser, useSignoutMutation } from "../app/store";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const LogoutDialog = () => {
  const cookie = useSelector((state: RootState) => state.cookie);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signout, { isLoading }] = useSignoutMutation();
  const handleSignOut = async () => {
    try {
      await signout(cookie);
      navigate("/sign-in");
      dispatch(clearUser());
      toast({ title: "Successfully logged out" });
    } catch {
      toast({ title: "Something went wrong" });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
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
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your session and log you out. Press
            "Confirm" to logout or "Cancel" to stay logged in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" className="bg-primary-100/10">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              type="button"
              variant={"destructive"}
              onClick={handleSignOut}
              disabled={isLoading}
            >
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
