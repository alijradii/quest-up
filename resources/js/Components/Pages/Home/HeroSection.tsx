import { ArrowRight, MoveUp } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="bg-black relative px-[20px] md:px-[30px] lg:px-[40px]  w-full h-full flex items-center justify-center">
            <div className="flex-1">
                <div className="max-w-[560px]">
                    <div className="sm:text-center lg:text-left">
                        <h1 className="flex flex-col gap-0">
                            <span className="text-[60px] tracking-tight font-extrabold flex flex-col leading-none">
                                <span className="text-white">
                                    Transform Your Life
                                </span>
                                <span className="tracking-wide bg-gradient-to-r from-blue-400 to-blue-900 text-transparent bg-clip-text">
                                    Into An Adventure
                                </span>
                            </span>
                        </h1>
                        <p className="mt-3 text-base text-zinc-400 opacity-80 sm:mt-5 text-[18px] max-w-[520px]">
                            Quest Up turns your everyday tasks into epic
                            adventures. Level up, gain skills, and unlock
                            achievements as you conquer your daily quests.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div
                                    className={`absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-blue-700 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 ${
                                        isHovered ? "animate-pulse" : ""
                                    }`}
                                ></div>
                                <a
                                    href="/register"
                                    className="relative flex items-center justify-center px-8 py-3 bg-zinc-900 rounded-lg leading-6 text-white font-medium"
                                >
                                    Begin Your Adventure{" "}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center flex-1">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                    <div className="relative block w-full bg-zinc-800 rounded-lg overflow-hidden">
                        <img
                            className="w-full"
                            src="/placeholder.svg?height=400&width=600"
                            alt="Quest Up App Screenshot"
                        />
                        <div className="absolute inset-0 bg-zinc-900 opacity-30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-zinc-800/80 backdrop-blur-sm p-4 rounded-lg border border-purple-500/50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <MoveUp className="h-5 w-5 text-purple-400" />
                                    <span className="text-white font-bold">
                                        LEVEL 7 ACHIEVED!
                                    </span>
                                </div>
                                <div className="text-zinc-300 text-sm">
                                    Productivity Mastery +3
                                    <br />
                                    Focus Duration +5
                                    <br />
                                    New Skill Unlocked: Time Bender
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
