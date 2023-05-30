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
import { Plus } from "lucide-react";
import { Journey } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function NewJourneyButton({ userId }: { userId: string }) {
  let inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    if (!inputRef || !inputRef.current || inputRef.current.value === "") {
      setIsLoading(false);
      toast.error("Please enter a journey name");
      return;
    }
    try {
      let body: addJourneyType = {
        name: inputRef.current.value,
        userId: userId,
      };
      let { data } = await axios.post("/api/addJourney", body);
      const journey = data.Journalentry as Journey;
      setIsLoading(false);

      toast.success("Journey added!");
      router.push(`/journey/${journey.id}`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error adding journey");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new journey</DialogTitle>
        </DialogHeader>
        <Input ref={inputRef} placeholder="Journey name" />
        <Button
          disabled={isLoading}
          onClick={() => handleClick()}
          className="bg-background2"
        >
          {" "}
          Add new journey{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
