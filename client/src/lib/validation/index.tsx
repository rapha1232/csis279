import * as z from "zod";

// All Criteria for form validations using zod

export const SignupValidation = z.object({
  FirstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(30, { message: "First Name must be at most 30 characters." }),
  LastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters." })
    .max(30, { message: "Last Name must be at most 30 characters." }),
  Email: z.string().email(),
  Password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
});

export const SigninValidation = z.object({
  Email: z.string().email(),
  Password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters." }),
});

export const EventFormValidation = z.object({
  Title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(40, { message: "Title must be at most 40 characters." }),
  Description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(2000, { message: "Description must be at most 2,000 characters." }),
  Date: z.coerce
    .date()
    .min(new Date(), { message: "Event can't take place so early" })
    .max(new Date("2026-06-24"), {
      message: "We would have graduated by then :(",
    })
    .transform((date) => date.toISOString()),
  Location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." })
    .max(40, { message: "Location must be at most 40 characters." }),
});

export const TopicFormValidation = z.object({
  Title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(40, { message: "Title must be at most 40 characters." }),
  Content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." })
    .max(2000, { message: "Content must be at most 2,000 characters." }),
});

export const QuestionFormValidation = TopicFormValidation;

export const ReplyFormValidation = z.object({
  Content: z
    .string()
    .min(10, { message: "Reply must be at least 10 characters." })
    .max(2000, { message: "Reply must be at most 2,000 characters." }),
});

export const UpdateUserFormValidation = z.object({
  FirstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(30, { message: "First Name must be at most 30 characters." }),
  LastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters." })
    .max(30, { message: "Last Name must be at most 30 characters." }),
  Password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
});
