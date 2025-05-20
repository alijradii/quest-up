import { BarChart2, Zap, Trophy, MoveUp as LevelUp } from "lucide-react";

export const StatsSection = () => {
    const stats = [
        {
            icon: <BarChart2 className="h-6 w-6 text-purple-400" />,
            label: "Productivity Increase",
            value: "37%",
            color: "purple",
        },
        {
            icon: <Zap className="h-6 w-6 text-blue-400" />,
            label: "Tasks Completed",
            value: "2.3M+",
            color: "blue",
        },
        {
            icon: <Trophy className="h-6 w-6 text-purple-400" />,
            label: "Achievements Unlocked",
            value: "850K",
            color: "purple",
        },
        {
            icon: <LevelUp className="h-6 w-6 text-blue-400" />,
            label: "Active Adventurers",
            value: "125K+",
            color: "blue",
        },
    ];

    return (
        <section className="bg-zinc-900 py-16 snap-always snap-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm p-6 flex items-center gap-4"
                        >
                            <div
                                className={`bg-${stat.color}-500/20 p-3 rounded-lg flex items-center justify-center`}
                            >
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-zinc-400 font-medium truncate">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-semibold text-white mt-1">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
