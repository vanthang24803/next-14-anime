"use client";

import * as z from "zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChapterProps {
  params: {
    animeId: string;
  };
}

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  thumbnail: z.string().min(1),
  url: z.string().min(1),
});

type FormValue = z.infer<typeof formSchema>;

const ChapterPage = ({ params }: ChapterProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      thumbnail: "",
      url: "",
    },
  });

  const onSubmit = async (data: FormValue) => {
    try {
        setLoading(true);
        const respone = await axios.post(
          `/api/anime/${params.animeId}/chapter`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (respone.status == 200) {
          setLoading(false);
          form.reset();
          toast.success("Success");
          router.back();
        } else {
          setLoading(false);
          toast.error("Something went wrong!");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className=" w-10 h-10 hover:bg-neutral-200 rounded-full cursor-pointer flex items-center justify-center"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </div>
      <div className="w-[1000px] border-neutral-200 border rounded-md p-8">
        <FormProvider {...form}>
          <ScrollArea>
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
                        <Input className="w-[500px]" {...field} required />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col mr-10 space-y-1 mb-4">
                        <h2 className="text-base font-bold">Title:</h2>
                        <Input className="w-[500px]" {...field} required />
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
                        <Input className="w-[500px]" {...field} required />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col mr-10 space-y-1 mb-4">
                        <h2 className="text-base font-bold">Url:</h2>
                        <Textarea
                          className="w-[500px] h-[20vh]"
                          {...field}
                          required
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="w-[200px]" type="submit" disabled={loading}>
                Submit
              </Button>
            </form>
          </ScrollArea>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChapterPage;
