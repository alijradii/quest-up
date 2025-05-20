import { ArrowRight, MoveUp } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="bg-black relative px-[20px] md:px-[30px] lg:px-[40px] w-full h-full flex items-center justify-center">
            <div className="flex-1 z-10 flex items-center justify-center">
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
                            achievements as you conquer your quests.
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

            <div className="absolute w-full h-full z-0 blur-md opacity-20" style={{background: "url(assets/system.webp"}}/>
        </section>
    );
};
