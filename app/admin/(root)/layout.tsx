import LogoutButton from '@/components/LogoutButton'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react"; // icons

const RootLayout = async ({ children }: { children: ReactNode }) => {

    // const isUserAuthenticated = await isAuthenticated()
    // const user = await getCurrentUser()

    // if (!isUserAuthenticated) redirect('/sign-in')

    return (
        <div className='root-layout'>
            <nav className='flex justify-between'>
                <Link href="/" className='flex items-center gap-2'>
                    <Image src="/logo.svg" alt='Logo' height={32} width={36} />
                    <h1 className='text-primary-100'>TechnoTalk</h1>
                </Link>
                <div className='flex items-center gap-6'>
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <LayoutDashboard size={18} /> {/* icon added */}
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        href="/admin/interviews"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <FileText size={18} /> {/* icon added */}
                        <span className="font-medium">Interviews</span>
                    </Link>

                    <Link
                        href="/admin/students"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Users size={18} /> {/* icon added */}
                        <span className="font-medium">Students</span>
                    </Link>

                    <LogoutButton />
                </div>
            </nav>
            {children}
        </div>
    )
}

export default RootLayout
