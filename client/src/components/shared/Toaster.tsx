import React from "react";
import { Button } from "../../components/ui/button";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";

/**
 * This is a toaster component that is used to add toast notifications to the user's expoerience.
 * @returns {Object} An object containing a button that adds an event to the user's experience.
 */
const Toaster = () => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }}
    >
      Add to calendar
    </Button>
  );
};

export default Toaster;
