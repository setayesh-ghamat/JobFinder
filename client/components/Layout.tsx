import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";
import { Button } from "@material-tailwind/react";
import LoginFunc from '@/pages/api/LoginFunc';
import LoginForm from './LoginForm';
import LogoutFunc from '@/pages/api/LogoutFunc';

export function Layout({ children }: { children: React.ReactNode }) {
    const [userName, setUserName] = useState<string | null>(null);

    const onSuccessLogout = () => {
        console.log("Logout successful. Setting userName to null...");
        setUserName(null);  // Update the state after successful logout
    };

    const {handleModalToggle, isModalVisible} = LoginFunc();
    const {handleLogout} = LogoutFunc(onSuccessLogout);
    
    useEffect(() => {
        // This code will only run on the client side after the initial render.
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []); 

    const customFontStyle = {
        fontFamily: 'Roboto Slab, serif'
      };

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/26.jpg')` }}>
            {/* Header with light blue background */}
            <header className="text-white p-4 flex justify-between items-center bg-cover bg-center" style={{ backgroundImage: `url('/23.jpg')` }}>
                {/* Logo */}
                <div className="relative w-16 h-16">
                    <Image src="/logo21.png" alt="Logo" layout="fill" objectFit="cover" />
                </div>
                <h1 className="text-2xl font-bold text-blue-900" style={customFontStyle}>Job Finder</h1>
                <nav>
                    <ul className="flex gap-4">
                        {userName && <li>Welcome, {userName} ! </li>}
                        {userName && (
                        <Button
                            onClick={handleLogout}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Logout
                        </Button>
                        )}
                        {!userName && (
                        <Button
                            onClick={handleModalToggle}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Login
                        </Button>
                        )}
                        {!userName && (
                        <LoginForm
                            handleModalToggle={handleModalToggle}
                            isModalVisible={isModalVisible}
                        />
                        )}
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4">{children}</main>

            {/* Footer with light blue background */}
            <footer className="text-white p-4 flex justify-between items-center bg-cover bg-center" style={{ backgroundImage: `url('/23.jpg')` }}>
                <p className="text-blue-900">
                    &copy; 2023 Setayesh and Massoud JOB FINDER company. All rights reserved.
                </p>
            </footer>
        </div>

    );
}