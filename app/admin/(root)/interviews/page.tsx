import React from 'react'

// import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { getInterviewById } from '@/lib/actions/general.action';
import InterviewCard from '@/components/InterviewCard';
import CollegeInterviewCard from '@/components/CollegeInterviewCard';

// Type for an Interview
type Interview = {
  id: number;
  title: string;
  date: string;
  studentsCount: number;
};

const page = async () => {

  const user = await getCurrentUser();
  const userInterviews = await getInterviewById(user?.id!)
  const hasPastInterviews = userInterviews?.length > 0;

  return (
     <>
     <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
           {hasPastInterviews ? (
            userInterviews?.map((interview) => (
               <CollegeInterviewCard {...interview} />
            ))) : (
            <p>You haven&apos;t taken any interviews yet</p> 
        )}
        </div>
     </section>
    </>
  )
}

export default page
