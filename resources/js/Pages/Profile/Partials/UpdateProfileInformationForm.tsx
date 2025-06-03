import { FormEventHandler } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <header className="mb-6">
        <p className="mt-1 text-sm text-slate-300">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="space-y-6 text-slate-400">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="mt-1"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <Alert variant="default" className="text-sm text-yellow-400 border-yellow-500 bg-yellow-500/10">
            <AlertDescription>
              Your email address is unverified.{' '}
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline underline-offset-2 hover:text-yellow-300"
              >
                Click here to re-send the verification email.
              </Link>
            </AlertDescription>

            {status === 'verification-link-sent' && (
              <p className="mt-2 font-medium text-green-500">
                A new verification link has been sent to your email address.
              </p>
            )}
          </Alert>
        )}

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={processing}>
            Save
          </Button>

          <Transition
            show={recentlySuccessful}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            leave="transition-opacity duration-300"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
