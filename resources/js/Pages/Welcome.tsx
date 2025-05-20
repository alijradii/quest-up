"use client";
import { Footer } from "@/Components/Footer";
import { Header } from "@/Components/Header";
import { CTASection } from "@/Components/Pages/Home/CTASection";
import { FeaturesSection } from "@/Components/Pages/Home/FeaturesSection";
import { HeroSection } from "@/Components/Pages/Home/HeroSection";
import { HowItWorksSection } from "@/Components/Pages/Home/HowItWorksSection";
import { StatsSection } from "@/Components/Pages/Home/StatsSection";
import type { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import {
    ArrowRight,
    Award,
    BarChart2,
    CheckCircle,
    ChevronRight,
    Flame,
    Gamepad2,
    MoveUpIcon as LevelUp,
    Shield,
    Sword,
    Target,
    Trophy,
    Zap,
} from "lucide-react";
import { useState } from "react";

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="text-zinc-100 min-h-screen">
                {/* Animated background with subtle grid pattern */}
                {/* <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}

                {/* Glowing accent elements */}
                {/* <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl opacity-20"></div> */}

                <div className="relative flex min-h-screen flex-col">
                    <main className="w-screen h-screen">
                        <Header auth={auth} />
                        <HeroSection />
                    </main>

                    <FeaturesSection />
                    <HowItWorksSection />
                    <StatsSection />
                    <CTASection />

                    <Footer/>
                </div>
            </div>
        </>
    );
}
