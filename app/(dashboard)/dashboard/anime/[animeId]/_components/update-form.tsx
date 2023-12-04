import * as z from "zod";
import axios from "axios";
import { Anime } from "@/types";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UpdateFormProps {
  anime: Anime | undefined;
  hanldeOpen: () => void;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().min(1),
});

type CommentFormValue = z.infer<typeof formSchema>;

export const UpdateForm = ({ anime, hanldeOpen }: UpdateFormProps) => {
  const form = useForm<CommentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: anime?.name?.toString() || "",
      description: anime?.description || "",
      thumbnail: anime?.thumbnail || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: CommentFormValue) => {
    try {
      setLoading(true);
      const respone = await axios.patch(`/api/anime/${anime?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (respone.status == 200) {
        setLoading(false);
        form.reset();
        toast.success("Success");
        router.refresh();
        hanldeOpen();
      } else {
        setLoading(false);
        toast.error("Something went wro");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onRemove = async () => {
    toast.success("OK")
  };

  return (
    <FormProvider {...form}>
      <ScrollArea className="w-[700px]">
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
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col mr-10 space-y-1">
                      <h2 className="text-base font-bold">Name:</h2>
                      <Input className="w-[500px]" {...field} required />
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={hanldeOpen}
                    >
                      <X />
                    </Button>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col mr-10 space-y-1 mb-4">
                    <h2 className="text-base font-bold">Description:</h2>
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

          <Button className="w-[200px]"  type="submit" disabled={loading}>
            Submit
          </Button>
        </form>

        {anime?.chapters?.length == 0 && (
          <Button
            className="w-[200px] mt-4"
            variant="destructive"
            disabled={loading}
            onClick={onRemove}
          >
            Remove
          </Button>
        )}
      </ScrollArea>
    </FormProvider>
  );
};
