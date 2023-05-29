"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { addJourneyType } from "@/pages/api/addJourney";

export default function NewJourneyButton({ userId }: { userId: string }) {
  let inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (!inputRef || !inputRef.current || inputRef.current.value === "") {
      setIsLoading(false);
      toast.error("Please enter a journey name");
      return;
    }
    try {
      let data: addJourneyType = {
        name: inputRef.current.value,
        userId: userId,
      };
      await axios.post("/api/addJourney", data);
      toast.success("Journey added!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error adding journey");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add journey</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new journey</DialogTitle>
        </DialogHeader>
        <Input ref={inputRef} placeholder="Journey name" />
        <DialogPrimitive.Close>
          <Button disabled={isLoading} onClick={() => handleClick()}>
            {" "}
            Add new journey{" "}
          </Button>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
