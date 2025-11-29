"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";

const Rank = () => {
    const [students, setStudents] = useState([]);
      useEffect(() => {
    // fetch from API or just load static data
    setStudents([
      { name: "Charlie Green", email: "charlie5@example.com", department: "CSE", marks: 95 },
      { name: "Kyle Perry", email: "kyle39@example.com", department: "CSE", marks: 95 },
      { name: "Grace Kim", email: "grace9@example.com", department: "CSE(AI&ML)", marks: 94 },
      { name: "Ella Jones", email: "ella33@example.com", department: "CSE", marks: 94 },
      { name: "Umar Allen", email: "umar49@example.com", department: "CSE(AI&ML)", marks: 94 },
    ]);
  }, []);

     const rankedStudents = [...students]
    .sort((a, b) => b.marks - a.marks)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center"><h1 className="text-xl font-bold mb-6">Interview Name</h1><h1 className="text-xl font-bold mb-6">Hi-Tech Institute of Technology, Aurangabad</h1></div>
            <h1 className="text-3xl font-bold mb-6">Student Rank</h1>
            <div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead className="w-[100px]">Student Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Departments</TableHead>
                            <TableHead>Interview Name</TableHead>
                            <TableHead className="text-right">Marks</TableHead>
                        </TableRow>
                    </TableHeader>
                    {rankedStudents.map((student, index) => (
                        <TableBody>
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.department}</TableCell>
                                <TableCell>{student.department}</TableCell>
                                <TableCell className="text-right">{student.marks ?? 0}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}

                </Table>
            </div>
        </div>
    )
}

export default Rank
