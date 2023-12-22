import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserMutation } from "../../app/store";
import useGetUser from "../../hooks/useGetUser";
import { UpdateUserFormValidation } from "../../lib/validation";
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
 * This component is used to display a form to update an user.
 * @param {EventWithUser} prev - The user to update
 * @returns {JSX.Element} - A form to update an user
 */
const UpdateUserForm = () => {
  const prevUser = useGetUser();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const form = useForm<z.infer<typeof UpdateUserFormValidation>>({
    resolver: zodResolver(UpdateUserFormValidation),
    defaultValues: {
      FirstName: prevUser.FirstName,
      LastName: prevUser.LastName,
      Password: "",
    },
  });
  const handleSubmit = async (
    user: z.infer<typeof UpdateUserFormValidation>
  ) => {
    try {
      const res = await updateUser({
        ...user,
        UserID: prevUser.UserID,
      }).unwrap();
      form.reset();
      toast({ title: "Successfully updated your profile" });
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
            name="FirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  FirstName
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
            name="LastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  LastName
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
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-dark100_light900">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
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

export default UpdateUserForm;
