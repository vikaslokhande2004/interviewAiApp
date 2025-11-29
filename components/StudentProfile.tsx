"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function StudentProfile({ user, userInterviews, data, latesInterviews }) {
    const [activeSection, setActiveSection] = useState<"interview" | "student">("interview");
    const [selectedMonth, setSelectedMonth] = useState("01");
    const filteredData = data
        .filter((d) => d.date.split("-")[1] === selectedMonth)
        .map((interview, index) => ({
            name: interview.title || `Interview ${index + 1}`,
            marks: interview.marks || 0,
        }));
    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latesInterviews?.length > 0;

    return (
        <div>
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Home Button */}
                <Button
                    asChild
                    className="btn-primary"
                >
                    <Link href="/">Home</Link>
                </Button>
                <LogoutButton />
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Student Profile</h1>

                {/* Student Details */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Your Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p><span className="font-medium">Name:</span> {user?.name}</p>
                            <p><span className="font-medium">Email:</span> {user?.email}</p>
                            <p><span className="font-medium">College:</span> {user?.college}</p>
                            <p><span className="font-medium">Course:</span> {user?.course}</p>
                            <p><span className="font-medium">Branch:</span> {user?.branch}</p>
                            <p><span className="font-medium">Year:</span> {user?.year} Year</p>
                            <p><span className="font-medium">Semester:</span> {user?.semester} Semester</p>
                            <p><span className="font-medium">RollNumber:</span> {user?.rollNumber}</p>
                            <p><span className="font-medium">Phone Number:</span> {user?.phone}</p>
                            <p><span className="font-medium">Date of Birth:</span> {user?.dob}</p>
                            <p><span className="font-medium">Gender:</span> {user?.gender}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Buttons to toggle sections */}
                <div className="flex gap-4 mb-4">
                    <Button
                        variant={activeSection === "interview" ? "default" : "outline"}
                        onClick={() => setActiveSection("interview")}
                    >
                        Interviews
                    </Button>
                    <Button
                        variant={activeSection === "student" ? "default" : "outline"}
                        onClick={() => setActiveSection("student")}
                    >
                        Student Section
                    </Button>
                </div>

                {/* Conditionally render section */}
                {activeSection === "interview" ? (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">College Interviews</h2>
                            </div>
                            <section className="flex flex-col gap-6 mt-8 px-8">
                                <div className="interviews-section">
                                    {hasUpcomingInterviews ? (
                                        latesInterviews?.map((interview) => (
                                            <InterviewCard key={interview.id} {...interview} />
                                        ))) : (
                                        <p>You haven&apos;t taken any interviews yet</p>
                                    )}
                                </div>
                            </section>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-4">
                            <div className="w-full max-w-4xl mx-auto p-6 space-y-4 bg-black text-white">
                                {/* Month selector */}
                                <Select onValueChange={setSelectedMonth} defaultValue="01">
                                    <SelectTrigger className="w-[200px] bg-black text-white border border-white">
                                        <SelectValue placeholder="Select month" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black text-white">
                                        <SelectItem value="01">January</SelectItem>
                                        <SelectItem value="02">February</SelectItem>
                                        <SelectItem value="03">March</SelectItem>
                                        <SelectItem value="04">April</SelectItem>
                                        <SelectItem value="05">May</SelectItem>
                                        <SelectItem value="06">June</SelectItem>
                                        <SelectItem value="07">July</SelectItem>
                                        <SelectItem value="08">August</SelectItem>
                                        <SelectItem value="09">September</SelectItem>
                                        <SelectItem value="10">October</SelectItem>
                                        <SelectItem value="11">November</SelectItem>
                                        <SelectItem value="12">December</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Line Chart */}
                                <div className="h-80 bg-black rounded-2xl shadow p-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={filteredData}>
                                            <XAxis
                                                dataKey="name"
                                                stroke="#ffffff"
                                                tick={{ fill: "#ffffff" }}
                                            />
                                            <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: "#000", borderColor: "#fff" }}
                                                labelStyle={{ color: "#fff" }}
                                                itemStyle={{ color: "#fff" }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="marks"
                                                stroke="#6366F1"
                                                strokeWidth={3}
                                                dot={{ fill: "#6366F1", r: 5 }}
                                                activeDot={{ r: 7 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
