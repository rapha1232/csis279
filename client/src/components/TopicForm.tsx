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
import { TopicFormValidation } from "../lib/validation";
import { useCreateTopicMutation } from "../app/store";
import { toast } from "./ui/use-toast";
import useGetUser from "../hooks/useGetUser";

const TopicForm = () => {
  const user = useGetUser();
  const [createEvent, { isLoading }] = useCreateTopicMutation();
  const form = useForm<z.infer<typeof TopicFormValidation>>({
    resolver: zodResolver(TopicFormValidation),
    defaultValues: {
      Title: "",
      Content: "",
    },
  });
  const handleSubmit = async (event: z.infer<typeof TopicFormValidation>) => {
    try {
      const res = await createEvent({
        ...event,
        CreatedAt: new Date().toISOString(),
        CreatorID: user.UserID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully created your discussion" });
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
            name="Content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Content</FormLabel>
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

export default TopicForm;
