import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateTopicMutation } from "../../app/store";
import { TopicFormValidation } from "../../lib/validation";
import { DiscussionTopicWithUser } from "../../types";
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
 * This component is used to display a form to update an topic.
 * @param {EventWithUser} prev - The topic to update
 * @returns {JSX.Element} - A form to update an topic
 */
const UpdateTopicForm = ({ prev }: { prev: DiscussionTopicWithUser }) => {
  const [updateTopic, { isLoading }] = useUpdateTopicMutation();
  const form = useForm<z.infer<typeof TopicFormValidation>>({
    resolver: zodResolver(TopicFormValidation),
    defaultValues: {
      Title: "",
      Content: "",
    },
  });
  const handleSubmit = async (topic: z.infer<typeof TopicFormValidation>) => {
    try {
      const res = await updateTopic({
        ...topic,
        TopicID: prev.TopicID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully updated your topic" });
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
            name="Content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Content
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

export default UpdateTopicForm;
