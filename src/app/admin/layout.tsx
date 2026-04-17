import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for Tarapith Travel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light min-h-screen bg-background">
      {children}
    </div>
  );
}
