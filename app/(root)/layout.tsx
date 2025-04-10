import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser, isAuthenticated, signOut } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {

    const isUserAuthenticated = await isAuthenticated()
    const user = await getCurrentUser()


    if(!isUserAuthenticated) redirect('/sign-in')

    return (
        <div className='root-layout'>
            <nav className='flex justify-between'>
                <Link href="/" className='flex items-center gap-2'>
                <Image src="/logo.svg" alt='Logo' height={32} width={36}/>
                <h1 className='text-primary-100'>Propwis</h1>
                </Link>
                <div className='flex items-center gap-6'>
                    <h4 className=' capitalize'>{user?.name}</h4>
                    <LogoutButton/>
                </div>
            </nav>
            {children}
        </div>
    )
}
 
export default RootLayout
