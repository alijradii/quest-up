import { Gamepad2, Target, CheckCircle, Flame } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            icon: <Gamepad2 className="h-8 w-8" />,
            title: "Create Your Character",
            description:
                "Set up your profile, choose your class, and customize your avatar to begin your productivity journey.",
            color: "blue",
        },
        {
            icon: <Target className="h-8 w-8" />,
            title: "Accept Daily Quests",
            description:
                "Transform your tasks into quests with deadlines, difficulty levels, and rewards.",
            color: "blue",
        },
        {
            icon: <CheckCircle className="h-8 w-8" />,
            title: "Complete Challenges",
            description:
                "Finish your quests to earn XP, gold, and items that help you level up your character.",
            color: "blue",
        },
        {
            icon: <Flame className="h-8 w-8" />,
            title: "Level Up Your Life",
            description:
                "Watch as your real-life productivity improves alongside your in-game character's growth.",
            color: "blue",
        },
    ];

    return (
        <section
            id="how-it-works"
            className="min-h-screen w-full flex flex-col justify-center items-center bg-black"
        >
            <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-blue-400 font-semibold tracking-widest uppercase text-xl">
                        How It Works
                    </h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Your Journey to Mastery
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
                        Follow these steps to transform your productivity into an epic adventure.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-6">
                            <div
                                className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2 border-${step.color}-500 bg-zinc-800 text-${step.color}-400`}
                            >
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-1 text-base text-zinc-400">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
