import { z } from "zod";

export const MessageSchema = z.object({
  content: z
            .string()
            .min(10, {message: "Msg must be at least of 10 characteres"})
            .max(300, {message: "Sorry! we're running out of money, so we're not accepting more than 300 characters"})
});
