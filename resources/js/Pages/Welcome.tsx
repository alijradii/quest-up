"use client";
import { Header } from "@/Components/Header";
import { HeroSection } from "@/Components/Pages/Home/HeroSection";
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

                    <main className="flex-grow">
                        {/* Hero Section */}
                        {/* Features Section */}
                        <section id="features" className="py-16 bg-zinc-800/50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="lg:text-center">
                                    <h2 className="text-base text-purple-400 font-semibold tracking-wide uppercase">
                                        Features
                                    </h2>
                                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                        Unlock Your Potential
                                    </p>
                                    <p className="mt-4 max-w-2xl text-xl text-zinc-400 lg:mx-auto">
                                        Quest Up provides everything you need to
                                        transform your productivity into an epic
                                        adventure.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                        <div className="relative">
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                                                <Trophy className="h-6 w-6" />
                                            </div>
                                            <div className="ml-16">
                                                <h3 className="text-lg leading-6 font-medium text-white">
                                                    Daily Quests
                                                </h3>
                                                <p className="mt-2 text-base text-zinc-400">
                                                    Transform your to-do list
                                                    into exciting quests with
                                                    rewards and experience
                                                    points.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                                                <LevelUp className="h-6 w-6" />
                                            </div>
                                            <div className="ml-16">
                                                <h3 className="text-lg leading-6 font-medium text-white">
                                                    Skill Trees
                                                </h3>
                                                <p className="mt-2 text-base text-zinc-400">
                                                    Develop real-life skills as
                                                    you level up and unlock new
                                                    abilities in your personal
                                                    skill tree.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                                                <Shield className="h-6 w-6" />
                                            </div>
                                            <div className="ml-16">
                                                <h3 className="text-lg leading-6 font-medium text-white">
                                                    Boss Battles
                                                </h3>
                                                <p className="mt-2 text-base text-zinc-400">
                                                    Tackle your biggest
                                                    challenges as epic boss
                                                    battles and earn legendary
                                                    rewards.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                                                <Award className="h-6 w-6" />
                                            </div>
                                            <div className="ml-16">
                                                <h3 className="text-lg leading-6 font-medium text-white">
                                                    Achievements
                                                </h3>
                                                <p className="mt-2 text-base text-zinc-400">
                                                    Unlock badges and
                                                    achievements as you build
                                                    consistent habits and
                                                    complete challenges.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How It Works */}
                        <section id="how-it-works" className="py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="lg:text-center">
                                    <h2 className="text-base text-purple-400 font-semibold tracking-wide uppercase">
                                        How It Works
                                    </h2>
                                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                        Your Journey to Mastery
                                    </p>
                                    <p className="mt-4 max-w-2xl text-xl text-zinc-400 lg:mx-auto">
                                        Follow these steps to transform your
                                        productivity into an epic adventure.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <div className="relative">
                                        {/* Connection line */}
                                        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-500 to-purple-600 hidden md:block"></div>

                                        {/* Steps */}
                                        <div className="space-y-12">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 border-2 border-purple-500 text-purple-400 text-2xl font-bold relative z-10">
                                                    <Gamepad2 className="h-10 w-10" />
                                                </div>
                                                <div className="mt-4 md:mt-0 md:ml-8">
                                                    <h3 className="text-xl leading-6 font-bold text-white">
                                                        Create Your Character
                                                    </h3>
                                                    <p className="mt-2 text-base text-zinc-400">
                                                        Set up your profile,
                                                        choose your class, and
                                                        customize your avatar to
                                                        begin your productivity
                                                        journey.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 border-2 border-blue-500 text-blue-400 text-2xl font-bold relative z-10">
                                                    <Target className="h-10 w-10" />
                                                </div>
                                                <div className="mt-4 md:mt-0 md:ml-8">
                                                    <h3 className="text-xl leading-6 font-bold text-white">
                                                        Accept Daily Quests
                                                    </h3>
                                                    <p className="mt-2 text-base text-zinc-400">
                                                        Transform your tasks
                                                        into quests with
                                                        deadlines, difficulty
                                                        levels, and rewards.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 border-2 border-purple-500 text-purple-400 text-2xl font-bold relative z-10">
                                                    <CheckCircle className="h-10 w-10" />
                                                </div>
                                                <div className="mt-4 md:mt-0 md:ml-8">
                                                    <h3 className="text-xl leading-6 font-bold text-white">
                                                        Complete Challenges
                                                    </h3>
                                                    <p className="mt-2 text-base text-zinc-400">
                                                        Finish your quests to
                                                        earn XP, gold, and items
                                                        that help you level up
                                                        your character.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row">
                                                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-zinc-800 border-2 border-blue-500 text-blue-400 text-2xl font-bold relative z-10">
                                                    <Flame className="h-10 w-10" />
                                                </div>
                                                <div className="mt-4 md:mt-0 md:ml-8">
                                                    <h3 className="text-xl leading-6 font-bold text-white">
                                                        Level Up Your Life
                                                    </h3>
                                                    <p className="mt-2 text-base text-zinc-400">
                                                        Watch as your real-life
                                                        productivity improves
                                                        alongside your in-game
                                                        character's growth.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Stats Section */}
                        <section className="py-12 bg-zinc-800/50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="bg-zinc-800 overflow-hidden shadow rounded-lg border border-zinc-700">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-purple-500/20 rounded-md p-3">
                                                    <BarChart2 className="h-6 w-6 text-purple-400" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-zinc-400 truncate">
                                                            Productivity
                                                            Increase
                                                        </dt>
                                                        <dd>
                                                            <div className="text-lg font-medium text-white">
                                                                37%
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-800 overflow-hidden shadow rounded-lg border border-zinc-700">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-blue-500/20 rounded-md p-3">
                                                    <Zap className="h-6 w-6 text-blue-400" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-zinc-400 truncate">
                                                            Tasks Completed
                                                        </dt>
                                                        <dd>
                                                            <div className="text-lg font-medium text-white">
                                                                2.3M+
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-800 overflow-hidden shadow rounded-lg border border-zinc-700">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-purple-500/20 rounded-md p-3">
                                                    <Trophy className="h-6 w-6 text-purple-400" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-zinc-400 truncate">
                                                            Achievements
                                                            Unlocked
                                                        </dt>
                                                        <dd>
                                                            <div className="text-lg font-medium text-white">
                                                                850K
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-800 overflow-hidden shadow rounded-lg border border-zinc-700">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-blue-500/20 rounded-md p-3">
                                                    <LevelUp className="h-6 w-6 text-blue-400" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-zinc-400 truncate">
                                                            Active Adventurers
                                                        </dt>
                                                        <dd>
                                                            <div className="text-lg font-medium text-white">
                                                                125K+
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 rounded-2xl shadow-xl overflow-hidden">
                                    <div className="px-6 py-12 sm:px-12 lg:px-16">
                                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                                            <div>
                                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                                    Ready to Begin Your Quest?
                                                </h2>
                                                <p className="mt-4 text-lg text-zinc-300">
                                                    Join thousands of
                                                    adventurers who are already
                                                    leveling up their
                                                    productivity and conquering
                                                    their daily challenges.
                                                </p>
                                                <div className="mt-8">
                                                    <div className="inline-flex rounded-md shadow">
                                                        <a
                                                            href="/register"
                                                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600"
                                                        >
                                                            Start Your Journey
                                                            <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-start-1">
                                                <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg transform md:translate-x-6 lg:translate-x-0">
                                                    <img
                                                        className="object-cover"
                                                        src="/placeholder.svg?height=300&width=500"
                                                        alt="Quest Up Dashboard Preview"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="bg-zinc-900 border-t border-zinc-800">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Sword className="h-8 w-8 text-purple-500" />
                                    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                                        Quest Up
                                    </span>
                                </div>
                                <p className="text-zinc-500 text-sm">
                                    &copy; {new Date().getFullYear()} Quest Up.
                                    All rights reserved.
                                </p>
                            </div>
                            <div className="mt-8 border-t border-zinc-800 pt-8 md:flex md:items-center md:justify-between">
                                <div className="flex space-x-6 md:order-2">
                                    <a
                                        href="#"
                                        className="text-zinc-400 hover:text-zinc-300"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-zinc-400 hover:text-zinc-300"
                                    >
                                        <span className="sr-only">GitHub</span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-zinc-400 hover:text-zinc-300"
                                    >
                                        <span className="sr-only">Discord</span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18.93 5.34a16.89 16.89 0 00-4.07-1.23c-.03 0-.05.01-.07.03-.17.3-.37.7-.5 1.01a15.72 15.72 0 00-4.57 0c-.14-.32-.34-.71-.51-1.01-.02-.02-.04-.03-.07-.03a16.89 16.89 0 00-4.07 1.23c-.01 0-.03.01-.04.02-2.59 3.8-3.3 7.5-2.95 11.16 0 .02.01.04.03.05a16.95 16.95 0 005.04 2.52c.03 0 .06 0 .07-.03.42-.55.79-1.13 1.11-1.74.02-.04 0-.08-.04-.09-.54-.2-1.06-.44-1.56-.72-.04-.02-.04-.08-.01-.11.1-.08.21-.16.31-.24.02-.01.04-.01.06-.01 3.04 1.36 6.33 1.36 9.33 0 .02 0 .04 0 .06.01.1.08.21.16.32.24.04.03.03.09-.01.11-.5.28-1.02.52-1.56.72-.04.01-.05.06-.04.09.32.61.69 1.19 1.11 1.74.02.03.04.03.07.03a16.9 16.9 0 005.04-2.52c.02-.01.03-.03.03-.05.42-4.27-.73-7.93-2.97-11.16 0-.01-.02-.02-.04-.02zM8.02 14.93c-.99 0-1.81-.9-1.81-2.01 0-1.11.8-2.01 1.81-2.01 1.01 0 1.82.9 1.81 2.01 0 1.11-.8 2.01-1.81 2.01zm6.69 0c-.99 0-1.81-.9-1.81-2.01 0-1.11.8-2.01 1.81-2.01 1.01 0 1.82.9 1.81 2.01 0 1.11-.8 2.01-1.81 2.01z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>
                                <nav className="mt-4 flex flex-wrap justify-center space-x-6 md:mt-0 md:order-1">
                                    <a
                                        href="#"
                                        className="text-sm text-zinc-400 hover:text-zinc-300"
                                    >
                                        Privacy
                                    </a>
                                    <a
                                        href="#"
                                        className="text-sm text-zinc-400 hover:text-zinc-300"
                                    >
                                        Terms
                                    </a>
                                    <a
                                        href="#"
                                        className="text-sm text-zinc-400 hover:text-zinc-300"
                                    >
                                        Support
                                    </a>
                                    <a
                                        href="#"
                                        className="text-sm text-zinc-400 hover:text-zinc-300"
                                    >
                                        Blog
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
