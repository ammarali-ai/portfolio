import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Login", robots: { index: false } };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  return (
    <div className="container-wide flex justify-center py-24">
      <div className="w-full max-w-sm card">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <p className="text-xs text-fg-muted mt-1">Enter your password to manage content.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
