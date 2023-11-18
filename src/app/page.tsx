import { ProfileForm } from "./_components/profile-form";

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen flex-col place-items-center justify-center">
      <div className="text-5xl font-bold">Home Page</div>
      <ProfileForm />
    </div>
  );
}
