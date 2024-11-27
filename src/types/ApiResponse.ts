import { Message } from "@/models/userModel"

// if user if hitting any api then we'll send this response
export interface ApiResponse{
    success: boolean,
    message: string,
    isAcceptingMessages?: boolean,
    messages?: Array<Message>
}