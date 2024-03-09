import type {Metadata} from "next";
import {Inter} from 'next/font/google';
import Header from '@/components/core/header'
import "./globals.css";
import React from "react";
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: "tasker",
    // description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-[#fefefe]`}>
        <Header/>
            {children}
        </body>
        </html>
    );
}
