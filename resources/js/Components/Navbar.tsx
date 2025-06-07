import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { FlameIcon as Fire, User } from "lucide-react";
import ApplicationLogo from "./ApplicationLogo";
import { useState } from "react";

const routes = [
    { name: "Dashboard", route: "dashboard" },
    { name: "Quests", route: "quests.index" },
    { name: "Leaderboard", route: "leaderboard" },
    { name: "Admin", route: "admin" },
];

export const Navbar: React.FC = () => {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav className="border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {routes.map((r) => {
                                return (
                                    <NavLink
                                        href={route(r.route)}
                                        active={route().current(r.route)}
                                        key={r.name}
                                    >
                                        {r.name}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex items-center gap-2 h-full">
                                        <Badge
                                            variant="outline"
                                            className="flex items-center gap-1 px-3 py-1 text-amber-500 border-amber-500/20"
                                        >
                                            <Fire className="h-4 w-4" />
                                            <span className="font-bold">
                                                {user.current_streak}
                                            </span>
                                        </Badge>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                                setShowingNavigationDropdown(
                                                    (previousState) =>
                                                        !previousState
                                                )
                                            }
                                            className="rounded-full"
                                        >
                                            <User className="h-5 w-5" />
                                            <span className="sr-only">
                                                User profile
                                            </span>
                                        </Button>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-900 hover:text-gray-200  focus:text-gray-100 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="space-y-1 pb-3 pt-2">
                    {routes.map((r) => {
                        return (
                            <ResponsiveNavLink
                                href={route(r.route)}
                                active={route().current(r.route)}
                            >
                                {r.name}
                            </ResponsiveNavLink>
                        );
                    })}
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4">
                    <div className="px-4">
                        <div className="text-base font-medium">{user.name}</div>
                        <div className="text-sm font-medium">{user.email}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};
