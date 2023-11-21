import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTopicReplyMutation } from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import { ReplyFormValidation } from "../../lib/validation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const TopicReplyForm = ({ TopicID }: { TopicID: number }) => {
  const user = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof ReplyFormValidation>>({
    resolver: zodResolver(ReplyFormValidation),
    defaultValues: {
      Content: "",
    },
  });

  const [createReply, { isLoading, isSuccess }] = useCreateTopicReplyMutation();

  const handleCreateTopicReply = async (
    values: z.infer<typeof ReplyFormValidation>
  ) => {
    setIsSubmitting(true);
    try {
      console.log(values, new Date().toISOString(), user.UserID, TopicID);
      await createReply({
        ...values,
        CreatedAt: new Date().toISOString(),
        CreatorID: user.UserID,
        TopicID: TopicID,
      });

      form.reset();
      toast({ title: "Reply created successfully" });
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateTopicReply)}
        >
          <FormField
            control={form.control}
            name="Content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Textarea
                    {...field}
                    placeholder="Write your answer here..."
                    className="w-full background-light800_darkgradient text-dark500_light700"
                    rows={10}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-dark100_light900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Replying..." : "Reply"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TopicReplyForm;
