import { toast } from "react-hot-toast";
import Button from "./ui/Button";
import { redirect } from "next/navigation";

export default function PublishButton() {
  return (
    <Button
      className="py-6 text-xl border-2 border-background2 mb-12"
      onClick={() => {
        toast.success("Journey published!");
        redirect("/welcome");
      }}
    >
      Publish
    </Button>
  );
}
