"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 🧾 Types
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  year: string;
  stream: string;
}

interface Interview {
  id: string;
  date: string;
  score: number;
  feedback: string;
}

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 🧪 Dummy Student Data
    const dummyStudent: Student = {
      id: studentId,
      name: "Vikas Lokhande",
      email: "vikas@example.com",
      phone: "+91 98765 43210",
      year: "Final Year",
      stream: "Computer Engineering",
    };

    // 🧪 Dummy Interview Data
    const dummyInterviews: Interview[] = [
      {
        id: "int1",
        date: "2025-10-01T14:30:00Z",
        score: 85,
        feedback:
          "Good understanding of fundamentals. Needs improvement in explaining problem-solving approach clearly.",
      },
      {
        id: "int2",
        date: "2025-10-10T15:45:00Z",
        score: 92,
        feedback:
          "Excellent communication and strong DSA knowledge. Gave optimal solutions.",
      },
      {
        id: "int3",
        date: "2025-10-15T13:20:00Z",
        score: 78,
        feedback:
          "Average performance in behavioral questions. Technical was decent.",
      },
    ];

    setStudent(dummyStudent);
    setInterviews(dummyInterviews);
  }, [studentId]);

  return (
    <div className="p-6 space-y-6">
      {/* ================= Student Details ================= */}
      {student && (
    <Card className="text-white rounded-lg shadow-md p-6" style={{ backgroundColor: '#171717' }}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Student Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>College:</strong> {student.phone}</p>
          {/* <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Branch:</strong> {student.branch}</p> */}
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Semester:</strong> {student.stream}</p>
          {/* <p><strong>Roll Number:</strong> {student.rollNumber}</p>
          <p><strong>Phone Number:</strong> {student.phone}</p>
          <p><strong>Date of Birth:</strong> {student.dob}</p>
          <p><strong>Gender:</strong> {student.gender}</p> */}
        </div>
      </CardContent>
    </Card>
  )}

      {/* ================= Interview History ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Interview History</CardTitle>
        </CardHeader>
        <CardContent>
          {interviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2">#</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Score</th>
                    <th className="py-2 px-2">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview, index) => (
                    <tr key={interview.id} className="border-b">
                      <td className="py-2 px-2">{index + 1}</td>
                      <td className="py-2 px-2">
                        {new Date(interview.date).toLocaleString()}
                      </td>
                      <td className="py-2 px-2 font-semibold">
                        {interview.score}
                      </td>
                      <td className="py-2 px-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedFeedback(interview.feedback);
                            setOpen(true);
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No interviews found for this student.</p>
          )}
        </CardContent>
      </Card>

      {/* ================= Feedback Modal ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Interview Feedback</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="whitespace-pre-line">{selectedFeedback}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
