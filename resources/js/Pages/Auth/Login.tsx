import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Sparkles } from "lucide-react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex flex-col border-2 px-10 py-10 rounded-xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-blue-400">
                        Quest Up
                    </h1>
                    <p className="mt-2 text-zinc-400">
                        Log in to continue your adventure
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-500">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-zinc-300"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-zinc-800 text-white border-zinc-700"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-zinc-300"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-zinc-800 text-white border-zinc-700"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-zinc-400">
                            Remember me
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-blue-400 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="bg-blue-400 hover:bg-blue-500 text-black"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
