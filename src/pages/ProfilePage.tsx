import { UserRound } from "lucide-react";
import Container from "@/components/ui/container";

export default function ProfilePage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
          <UserRound className="h-7 w-7 text-violet-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Account</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in and profile management coming soon.</p>
      </div>
    </Container>
  );
}
