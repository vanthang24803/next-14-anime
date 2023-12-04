"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().min(1),
});

type CreateFormValue = z.infer<typeof formSchema>;

const Create = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<CreateFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      thumbnail: "",
    },
  });

  const onSubmit = async (data: CreateFormValue) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/anime`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setLoading(false);
        redirect("/");
    } else {
        setLoading(false);
        redirect("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <ScrollArea className="w-[1000px] border border-neutral-200 rounded-md p-8 flex flex-col space-y-2">
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col mr-10 space-y-1">
                    <h2 className="text-base font-bold">Name:</h2>
                    <Input className="" {...field} required />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col mr-10 space-y-1 mb-4">
                    <h2 className="text-base font-bold">Type:</h2>
                    <Input className="" {...field} required />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col mr-10 space-y-1">
                    <h2 className="text-base font-bold">Thumbnail:</h2>
                    <Input className="" {...field} required />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col mr-10 space-y-1 mb-4">
                    <h2 className="text-base font-bold">Description:</h2>
                    <Textarea className=" h-[20vh]" {...field} required />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-[300px]" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </ScrollArea>
    </FormProvider>
  );
};

export default Create;
