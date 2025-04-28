import HeaderDashboard from "@/components/headerDashboard/headerDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function intercambioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <ProtectedRoute>
          <HeaderDashboard />
            {children}
        </ProtectedRoute>
    </section>
  );
}
