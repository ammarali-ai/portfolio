import Link from "next/link";
import { LogOut, FileText, Home } from "lucide-react";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container-wide py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Admin</p>
            <h1 className="text-2xl font-bold">Content Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-ghost text-xs"><Home className="h-3 w-3" /> Site</Link>
            <Link href="/admin" className="btn-ghost text-xs"><FileText className="h-3 w-3" /> Files</Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="btn-ghost text-xs"><LogOut className="h-3 w-3" /> Logout</button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
