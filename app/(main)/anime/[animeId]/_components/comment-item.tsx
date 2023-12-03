"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

import { Comments } from "@/types";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, Settings, Trash } from "lucide-react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentItemProps {
  value: Comments | undefined;
  onLoadComment: () => void;
}

const formSchema = z.object({
  content: z.string().min(1),
});

type CommentFormValue = z.infer<typeof formSchema>;

export const CommentItem = ({ value, onLoadComment }: CommentItemProps) => {
  const { user } = useUser();

  const [setting, setSetting] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRemove = async (
    animeId: string | undefined,
    id: string | undefined
  ) => {
    try {
      const respone = await axios.delete(`/api/anime/${animeId}/comment/${id}`);

      if (respone.status == 200) {
        toast.success("Comment delete successflly!");
        onLoadComment();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<CommentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: value?.content,
    },
  });

  const onSubmit = async (data: CommentFormValue) => {
    try {
      setLoading(true);
      const respone = await axios.patch(
        `/api/anime/${value?.animeId}/comment/${value?.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (respone.status == 200) {
        setLoading(false);
        setSetting(false);
        onLoadComment();
      } else {
        setLoading(false);
        console.log("Wrong!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-start space-x-4 w-full">
        <Avatar>
          <AvatarImage src={value?.avatar} className="w-10 h-10 rounded-full" />
          <AvatarFallback>{value?.authorName}</AvatarFallback>
        </Avatar>
        {user?.id == value?.author ? (
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col">
              {value?.authorName !== null ? (
                <p className="text-[14px] font-semibold">{value?.authorName}</p>
              ) : (
                <p className="text-[14px] font-semibold">another</p>
              )}

              {setting ? (
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-3 w-full"
                  >
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={loading}
                              {...field}
                              required
                              className="w-full h-8 mt-2"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      className="h-8 w-1/4"
                      type="submit"
                      disabled={loading}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </FormProvider>
              ) : (
                <>
                  <span className="text-[13px]">{value?.content}</span>

                  <span className="text-[11px] text-neutral-500 mt-1">
                    {value?.createdAt && (
                      <>
                        {formatDistanceToNow(new Date(value.createdAt), {
                          addSuffix: true,
                        })}
                      </>
                    )}
                  </span>
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:cursor-pointer"
                  onClick={() => setSetting(!setting)}
                >
                  <span>Update</span>
                  <Settings className="w-4 h-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between hover:cursor-pointer"
                  onClick={() => onRemove(value?.animeId, value?.id)}
                >
                  <span>Remove</span>
                  <Trash className="w-4 h-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-col">
            {value?.authorName !== null ? (
              <p className="text-[14px] font-semibold">{value?.authorName}</p>
            ) : (
              <p className="text-[14px] font-semibold">another</p>
            )}
            <span className="text-[13px]">{value?.content}</span>
            <span className="text-[11px] text-neutral-500 mt-1">
              {value?.createdAt && (
                <>
                  {formatDistanceToNow(new Date(value.createdAt), {
                    addSuffix: true,
                  })}
                </>
              )}
            </span>
          </div>
        )}
      </div>
      <Separator className="text-neutral-500 h-[0.5px]" />
    </>
  );
};
