import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Bihospharma",
  description: "Soluciones integrales en salud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-800">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
