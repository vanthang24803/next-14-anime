"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

interface CommentFormProps {
  animeId: String | undefined;
}

const formSchema = z.object({
  content: z.string().min(1),
});

type CommentFormValue = z.infer<typeof formSchema>;

export const CommentForm = ({ animeId }: CommentFormProps) => {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);

  const form = useForm<CommentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CommentFormValue) => {
    try {
      setLoading(true);
      const respone = await axios.post(`/api/anime/${animeId}/comment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (respone.status == 200) {
        setLoading(false);
        form.reset();
      } else {
        setLoading(false);
        console.log("Wrong!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const router = useRouter();
  return (
    <>
      {isSignedIn ? (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={loading} {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="h-8 w-[30%]" type="submit" disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </FormProvider>
      ) : (
        <div className="flex items-center space-y-4 justify-center flex-col h-[300px]">
          <Button onClick={() => router.push("/sign-in")}>Login</Button>
        </div>
      )}
    </>
  );
};
