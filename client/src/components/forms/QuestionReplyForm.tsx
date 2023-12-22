import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateQuestionReplyMutation } from "../../app/store";
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

/**
 * Component for creating a reply to a question using a form.
 * @param {Object} props - Component props.
 * @param {number} props.QuestionID - ID of the question for which the reply is created.
 */
const QuestionReplyForm = ({ QuestionID }: { QuestionID: number }) => {
  const user = useGetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof ReplyFormValidation>>({
    resolver: zodResolver(ReplyFormValidation),
    defaultValues: {
      Content: "",
    },
  });

  const [createReply, { isLoading, isSuccess }] =
    useCreateQuestionReplyMutation();

  /**
   * Handles the creation of a reply to a question.
   * @param {Object} values - The reply data submitted.
   */
  const handleCreateQuestionReply = async (
    values: z.infer<typeof ReplyFormValidation>
  ) => {
    setIsSubmitting(true);
    try {
      await createReply({
        ...values,
        CreatedAt: new Date().toISOString(),
        CreatorID: user.UserID,
        TargetID: QuestionID,
      });

      form.reset();
      toast({ title: "Reply created successfully" });
    } catch (error) {
      console.log(error);
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
          onSubmit={form.handleSubmit(handleCreateQuestionReply)}
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
              className="primary-gradient w-fit text-white"
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

export default QuestionReplyForm;
