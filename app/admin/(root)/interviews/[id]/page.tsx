// pages/admin/interview/[id].tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Student = {
  id: number;
  name: string;
  score: number;
};

type Interview = {
  id: number;
  title: string;
  description: string;
  date: string;
  students: Student[];
};

const dummyInterview: Interview = {
  id: 1,
  title: "Frontend Developer Interview",
  description:
    "Interview for hiring frontend developers skilled in React.js, TypeScript, and Tailwind CSS.",
  date: "Oct 20, 2025 2:00 PM",
  students: [
    { id: 1, name: "Alice Johnson", score: 85 },
    { id: 2, name: "Bob Smith", score: 70 },
    { id: 3, name: "Charlie Brown", score: 90 },
  ],
};

export default function InterviewDetailsPage() {
  const interview = dummyInterview;

  const averageScore =
    interview.students.reduce((acc, student) => acc + student.score, 0) /
    interview.students.length;

  return (
    <div className="p-6 space-y-6 bg-gray-800 min-h-screen text-white">
      {/* Interview Info */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{interview.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{interview.description}</p>
          <p>
            <strong>Date & Time:</strong> {interview.date}
          </p>
          <p>
            <strong>Total Students:</strong> {interview.students.length}
          </p>
          <p>
            <strong>Average Score:</strong> {averageScore.toFixed(2)}/100
          </p>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader>
          <CardTitle>Students Attended</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {interview.students.map((student) => (
              <div
                key={student.id}
                className="flex justify-between p-3 bg-gray-600 rounded-md"
              >
                <span>{student.name}</span>
                <span>{student.score}/100</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
