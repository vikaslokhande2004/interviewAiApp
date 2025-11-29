// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">College Admin Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Overview of your college, students, and interviews.
        </p>
      </div>

      {/* College Info */}
      <Card className="bg-[#111111] border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">College Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
          <div>
            <p className="text-sm text-gray-400">College Name</p>
            <p className="text-lg font-semibold">Hitech Engineering College</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg font-semibold">Pune, Maharashtra</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Departments</p>
            <p className="text-lg font-semibold">CSE, ECE, Mechanical</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Contact</p>
            <p className="text-lg font-semibold">contact@hitech.edu.in</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-[#111111] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">1200</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Active Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">5</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">6</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button>Manage Students</Button>
        <Button variant="secondary">Create Interview</Button>
      </div>
    </div>
  );
}
