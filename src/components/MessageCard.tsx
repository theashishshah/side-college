"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/models/userModel";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  // console.log("What data I'm getting as message", message)
  const createdAt = message.createdAt
  const date = new Date(createdAt)
  const options = {
    month: "short", // Abbreviated month name (e.g., Jan, Feb)
    day: "numeric", // Numeric day (e.g., 30)
    year: "numeric", // Full year (e.g., 2024)
    hour: "numeric", // Hour (e.g., 5)
    minute: "numeric", // Minute (e.g., 59)
    hour12: true, // 12-hour clock with AM/PM
  };
  const formattedDate = date.toLocaleString("en-US", options);
  // console.log(formattedDate)
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    const response = await axios.delete(`/api/delete-message/${message._id}`);
    toast({
      title: response.data.message,
      description: "your feedback is deleted",
      variant: "default",
    });

    onMessageDelete(message._id);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between flex-row">
            <CardTitle>{message.content}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-10 ml-2">
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default MessageCard;
