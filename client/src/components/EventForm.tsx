import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EventFormValidation } from "../lib/validation";
import { useCreateEventMutation } from "../app/store";
import { toast } from "./ui/use-toast";
import useGetUser from "../hooks/useGetUser";

const EventForm = () => {
  const user = useGetUser();
  const [createEvent, { isLoading }] = useCreateEventMutation();
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
      const res = await createEvent({
        ...event,
        CreatorID: user.UserID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully created your event" });
    } catch {
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
                <FormLabel className="shad-form_label">Title</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Description</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="shad-input"
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
                <FormLabel className="shad-form_label">Location</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
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

export default EventForm;
