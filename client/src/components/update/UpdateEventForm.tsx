import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateEventMutation } from "../../app/store";
import { EventFormValidation } from "../../lib/validation";
import { EventWithUser } from "../../types";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

/**
 * This component is used to display a form to update an event.
 * @param {EventWithUser} prev - The event to update
 * @returns {JSX.Element} - A form to update an event
 */
const UpdateEventForm = ({ prev }: { prev: EventWithUser }) => {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const form = useForm<z.infer<typeof EventFormValidation>>({
    resolver: zodResolver(EventFormValidation),
    defaultValues: {
      Title: "",
      Description: "",
      Date: new Date().toISOString(),
      Location: "",
    },
  });
  const handleSubmit = async (event: z.infer<typeof EventFormValidation>) => {
    try {
      const res = await updateEvent({
        ...event,
        EventID: prev.EventID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully updated your event" });
    } catch (e) {
      toast({ title: "Something went wrong" });
    }
  };
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input text-dark300_light900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input text-dark300_light900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="shad-input text-dark300_light900"
                    {...form.register("Date")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input text-dark300_light900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary text-dark100_light900"
          >
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default UpdateEventForm;
