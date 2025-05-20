import { Award, MoveUp, Shield, Trophy } from "lucide-react";

export const FeaturesSection: React.FC = () => {
    return (
        <section
            id="features"
            className="min-h-screen w-full flex flex-col justify-center items-center bg-zinc-950 snap-center"
        >
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-blue-400 font-semibold tracking-widest uppercase text-xl font-poppins">
                        Features
                    </h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                        Unlock Your Potential
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
                        Quest Up provides everything you need to transform your productivity into an epic adventure.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                        {
                            icon: <Trophy className="h-6 w-6" />,
                            title: "Daily Quests",
                            description:
                                "Transform your to-do list into exciting quests with rewards and experience points.",
                        },
                        {
                            icon: <MoveUp className="h-6 w-6" />,
                            title: "Skill Trees",
                            description:
                                "Develop real-life skills as you level up and unlock new abilities in your personal skill tree.",
                        },
                        {
                            icon: <Shield className="h-6 w-6" />,
                            title: "Boss Battles",
                            description:
                                "Tackle your biggest challenges as epic boss battles and earn legendary rewards.",
                        },
                        {
                            icon: <Award className="h-6 w-6" />,
                            title: "Achievements",
                            description:
                                "Unlock badges and achievements as you build consistent habits and complete challenges.",
                        },
                    ].map(({ icon, title, description }, idx) => (
                        <div key={idx} className="flex items-start gap-6">
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-900 text-white">
                                {icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-1 text-zinc-400 text-base">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
