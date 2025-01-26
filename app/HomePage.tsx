'use client';
import { useState, useEffect } from "react";
import { data } from "@/types/main";  // TypeScript Type
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Socials from "@/components/Socials";
import Experiences from "@/components/experiences/Experiences";
import Contact from "@/components/Contact";
import Header from "./Header";
import Footer from "./Footer";

const HomePage = () => {
    const [data, setData] = useState<data | null>(null);

    useEffect(() => {
        console.log("⏳ Fetching /data.json...");
        
        fetch("/data.json")  // ✅ Must be in /public/
            .then(response => {
                if (!response.ok) throw new Error("Failed to load data.json");
                return response.json();
            })
            .then(jsonData => {
                console.log("✅ Data loaded:", jsonData);
                setData(jsonData);
            })
            .catch(error => console.error("❌ Error fetching data.json:", error));
    }, []);
    

    // 🚀 Custom Loading Screen with Animation
    if (!data) return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-40 h-1 bg-gray-300 rounded-full relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1/3 h-full bg-violet-600 animate-slide"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 animate-pulse">Loading portfolio...</p>
        </div>
    );
    
    return (
        <>
            <Header logo={data.main.name} />
            <Hero mainData={data.main} />
            <Socials socials={data.socials} />
            <About aboutData={data.about} name={data.main.name} />
            <Experiences experienceData={data.experiences} educationData={data.educations} />
            <Projects projectsData={data.projects} />
            <Skills skillData={data.skills} />
            <Contact />
            <Footer socials={data.socials} name={data.main.name} />
        </>
    );
};

export default HomePage;