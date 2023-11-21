import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateEventMutation } from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import { EventFormValidation } from "../../lib/validation";
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
                <FormLabel className="shad-form_label text-dark100_light900">
                  Title
                </FormLabel>
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
                <FormLabel className="shad-form_label text-dark100_light900">
                  Description
                </FormLabel>
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
                <FormLabel className="shad-form_label text-dark100_light900">
                  Date
                </FormLabel>
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
                <FormLabel className="shad-form_label text-dark100_light900">
                  Location
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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

export default EventForm;
