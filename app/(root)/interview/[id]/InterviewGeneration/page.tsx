"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField"

const generationSchema = z.object({
  type: z.string().nonempty("Type is required"),
  role: z.string().nonempty("Role is required"),
  level: z.string().nonempty("Level is required"),
  techstack: z.string().nonempty("Tech stack is required"),
  amount: z.coerce.number().min(1, "At least 1 question is required"),
  userid: z.string().nonempty("User ID is missing"),
});

type InterviewInput = z.infer<typeof generationSchema>;

const InterviewGeneration = () => {
  const router = useRouter();
  const params = useParams();
  const userid = params?.id as string;

  const form = useForm<InterviewInput>({
    resolver: zodResolver(generationSchema),
    defaultValues: {
      type: "",
      role: "",
      level: "",
      techstack: "",
      amount: 5,
      userid: "",
    },
  });

  // ✅ Set userid after mount if not available immediately
  useEffect(() => {
    if (userid && form.getValues("userid") === "") {
      form.setValue("userid", userid);
    }
  }, [userid, form]);

  const onSubmit = async (values: InterviewInput) => {
    try {
      console.log("Submitting values:", values); // ✅ Debug log

      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Interview questions generated!");
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        toast.error("Failed to generate questions");
        console.error("API Error:", data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Generate Interview Questions</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-4 form"
        >
          <FormField
            control={form.control}
            name="type"
            label="Interview Type"
            placeholder="e.g. Technical"
            type="text"
          />
          <FormField
            control={form.control}
            name="role"
            label="Job Role"
            placeholder="e.g. Frontend Developer"
            type="text"
          />
          <FormField
            control={form.control}
            name="level"
            label="Experience Level"
            placeholder="e.g. Mid"
            type="text"
          />
          <FormField
            control={form.control}
            name="techstack"
            label="Tech Stack"
            placeholder="e.g. React, JavaScript"
            type="text"
          />
          <FormField
            control={form.control}
            name="amount"
            label="Number of Questions"
            placeholder="e.g. 5"
            type="number" // ✅ Use number input
          />
          <Button type="submit" className="btn">
            Generate Interview
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InterviewGeneration;
