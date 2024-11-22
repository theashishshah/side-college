import { z } from "zod";

export const AcceptMessageSchema = z.object({
    isUserAcceptingMessages: z.boolean()
})