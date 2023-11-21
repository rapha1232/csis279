import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateQuestionMutation } from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import { QuestionFormValidation } from "../../lib/validation";
import { getTodaysDate } from "../../utils/utils";
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

const QuestionForm = () => {
  const user = useGetUser();
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();
  const form = useForm<z.infer<typeof QuestionFormValidation>>({
    resolver: zodResolver(QuestionFormValidation),
    defaultValues: {
      Title: "",
      Content: "",
    },
  });
  const handleSubmit = async (
    event: z.infer<typeof QuestionFormValidation>
  ) => {
    try {
      const res = await createQuestion({
        ...event,
        CreatedAt: getTodaysDate(),
        CreatorID: user.UserID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully created your question" });
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
                <FormLabel className="shad-form_label">Content</FormLabel>
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

export default QuestionForm;
