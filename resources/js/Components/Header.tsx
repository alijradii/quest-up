import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils"; // if you're using classnames or a utility fn
import { Button } from "@/components/ui/button";

interface Props {
    auth: {
        user: User;
    };
}

const pages = [
    { name: "About", href: "/" },
    { name: "Services", href: "/" },
    { name: "Contact", href: "/" },
];

export const Header: React.FC<Props> = ({ auth }) => {
    return (
        <header className="border-b backdrop-blur-sm bg-black/90 sticky top-0 z-50">
            <div className="flex justify-between items-center h-16 px-4 lg:px-6 gap-20">
                <div className="flex-shrink-0 flex items-center">
                    <span className="ml-2 text-[40px] font-bold bg-gradient-to-r from-blue-400 to-blue-900 text-transparent bg-clip-text font-poppins">
                        Q
                    </span>
                </div>
                <nav className="hidden md:ml-10 md:flex space-x-8">
                    <a
                        href="#features"
                        className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium"
                    >
                        Features
                    </a>
                    <a
                        href="#how-it-works"
                        className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium"
                    >
                        How It Works
                    </a>
                    <a
                        href="#testimonials"
                        className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium"
                    >
                        Testimonials
                    </a>
                    <a
                        href="#pricing"
                        className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium"
                    >
                        Pricing
                    </a>
                </nav>
                <div className="flex items-center">
                    {auth?.user ? (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                href={route("login")}
                                className="text-zinc-300 hover:text-white px-3 py-2 text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Button asChild>
                                <Link
                                    href={route("register")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
