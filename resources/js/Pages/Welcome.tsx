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
