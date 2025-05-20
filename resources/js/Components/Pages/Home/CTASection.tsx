import { ChevronRight } from "lucide-react";

export const CTASection: React.FC = () => {
    return (
        <section className="py-16 snap-always snap-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-blue-700/40 to-black/40 border">
                    <div className="px-6 py-12 sm:px-12 lg:px-16">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                            {/* Text Section */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                                    Ready to Begin Your Quest?
                                </h2>
                                <p className="mt-4 text-lg text-zinc-300">
                                    Join thousands of adventurers leveling up their productivity
                                    and conquering daily challenges.
                                </p>
                                <div className="mt-8">
                                    <a
                                        href="/register"
                                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-black rounded-md bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-400 hover:to-blue-900"
                                    >
                                        Start Your Journey
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </a>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="mt-10 lg:mt-0">
                                <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg">
                                    <img
                                        className="object-cover w-full h-full"
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
    );
};
