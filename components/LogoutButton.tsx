'use client'

import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await signOut()
        router.push('/sign-in')
    }

    return (
        <Button onClick={handleLogout} className='btn-primary'>
            Logout
        </Button>
    )
}

export default LogoutButton
