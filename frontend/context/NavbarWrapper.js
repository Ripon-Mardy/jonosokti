'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Header/Navbar';
import AuthNavbar from '@/components/Header/AuthNavbar'
import { useRouter } from 'next/navigation';

const NavbarWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authToken = localStorage.getItem('authToken');
            setIsAuthenticated(!authToken)
        }
        checkAuth()

        const handleStorageChange = () => {
            checkAuth()
        }

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    const handleLogin = () => {
            localStorage.setItem('loginToken', authToken)
    }


    return isAuthenticated ? <AuthNavbar/> : <Navbar  onLogin={handleLogin} />
}

export default NavbarWrapper;