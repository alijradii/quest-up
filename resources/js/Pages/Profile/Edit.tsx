import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12 bg-background text-primary-foreground">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    <Card className="text-primary-foreground border border-border/60">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white">Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </CardContent>
                    </Card>

                    <Card className="text-primary-foreground border border-border/60">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white">Update Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UpdatePasswordForm className="max-w-xl" />
                        </CardContent>
                    </Card>

                    <Card className=" text-primary-foreground border border-border/60">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white">Delete Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DeleteUserForm className="max-w-xl" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
