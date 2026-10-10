import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required")
});

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must contain at least 3 characters"),

    email: z.string().email("Please enter a valid email address"),

    password: z.string().min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine(
        (date) => {
          const today = new Date();
          const birthDate = new Date(date);

          today.setHours(0, 0, 0, 0);
          birthDate.setHours(0, 0, 0, 0);

          return birthDate <= today;
        },
        {
          message: "Date of birth cannot be in the future"
        }
      ),

    phone: z.string().min(9, "Please enter a valid phone number"),

    gender: z.enum(["MALE", "FEMALE"], {
      message: "Please select your gender"
    }),

    bloodType: z.string().min(1, "Please select your blood type")
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"]
      });
    }
  });
