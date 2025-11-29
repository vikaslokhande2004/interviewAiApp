"use client"
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CollegeHeader from "@/components/CollegeHeader";
import Rank from "@/components/Rank";
const Collegeprofile = () => {
    const [activeSection, setActiveSection] = useState<"interview" | "student">("interview");

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {/* Header */}
            <CollegeHeader />

            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to Our College</h2>
                <p className="text-lg text-gray-300 mb-6">
                    A place where innovation meets excellence in education.
                </p>
            </section>

            {/* About Section */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-3xl font-bold mb-4">Hi-Tech Institute of Technology, Aurangabad</h3>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">About Us</h3>
                    <p className="text-gray-300">
                        Our college has been nurturing bright minds for over 25 years. We
                        offer world-class infrastructure, experienced faculty, and
                        opportunities for innovation and research.
                    </p>
                </div>
            </section>

            {/* Departments */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-8">Departments</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {["Computer Science", "Mechanical", "Electrical", "Civil", "MBA", "Biotech"].map((dept) => (
                            <Link href={``}>
                                <div
                                    key={dept}
                                    className="bg-[#1a1a1a] rounded-xl p-6 text-center hover:bg-[#cac5fe] hover:text-black transition"
                                >
                                    <h4 className="text-xl font-semibold">{dept}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Buttons to toggle sections */}
            <div className='max-w-5xl mx-auto p-6'>
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
                                {/* <div className="interviews-section">
                                    {hasPastInterviews ? (
                                        userInterviews?.map((interview) => (
                                            <InterviewCard key={interview.id} {...interview} />
                                        ))
                                    ) : (
                                        <p>You haven&apos;t taken any interviews yet</p>
                                    )}
                                </div> */}
                            </section>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-4">
                            <div className="w-full max-w-4xl mx-auto p-6 space-y-4 bg-black text-white">
                                <Rank />
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    )
}

export default Collegeprofile
