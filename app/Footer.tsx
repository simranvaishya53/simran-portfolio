import { social } from "@/types/main";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Fa from 'react-icons/fa';

export default function Footer({ socials, name }: { socials: social[], name: string }) {

    const { theme } = useTheme()

    return (
        <footer className="w-full bg-white dark:bg-grey-800 text-gray-500 dark:text-gray-300">
    <div className="max-w-6xl mx-auto py-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Simple Copyright */}
        <p className="text-sm">
            © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
            {socials.map((s: social) => (
                <Link href={s.link} target="_blank" rel="noreferrer" key={s.icon} className="text-lg hover:text-violet-600 transition">
                    {
                        // @ts-ignore
                        React.createElement(Fa[`${s.icon}`])
                    }
                </Link>
            ))}
        </div>
    </div>
</footer>

    )
}