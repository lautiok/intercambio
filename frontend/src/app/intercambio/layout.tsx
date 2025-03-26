import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function intercambioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    </section>
  );
}
