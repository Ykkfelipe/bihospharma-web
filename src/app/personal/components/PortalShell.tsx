"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOutWithAttendance } from "../lib/attendance-client";

const NAV = [
    { href: "/personal", label: "Inicio" },
    { href: "/personal/reloj", label: "Reloj" },
    { href: "/personal/shifts", label: "Mis turnos" },
] as const;

export function PortalShell({
    children,
    title,
    fullHeight,
}: {
    children: React.ReactNode;
    title?: string;
    fullHeight?: boolean;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.user?.role;

    return (
        <div
            style={{
                minHeight: fullHeight ? "100vh" : "100%",
                display: "flex",
                flexDirection: "column",
                background: fullHeight ? "#0a2540" : "#f5f7fa",
            }}
        >
            <header className="portal-header" style={{ flexShrink: 0, zIndex: 50 }}>
                <div
                    style={{
                        maxWidth: fullHeight ? "100%" : 960,
                        margin: "0 auto",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Image
                            src="/logos/bihos-logo.png"
                            alt="Bihospharma"
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%", background: "#fff", padding: 3 }}
                        />
                        <div>
                            <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0 }}>
                                {title || "Acceso Corporativo"}
                            </p>
                            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>Bihospharma IPS</p>
                        </div>
                    </div>

                    <nav style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {NAV.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        color: active ? "#fff" : "#94a3b8",
                                        fontSize: 11,
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        padding: "6px 10px",
                                        borderRadius: 8,
                                        background: active ? "rgba(15, 76, 138, 0.6)" : "transparent",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        {role === "admin" && (
                            <Link
                                href="/personal/admin"
                                style={{
                                    color: "#7dd3fc",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    padding: "6px 10px",
                                }}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>

                    <button
                        type="button"
                        onClick={() => signOutWithAttendance("/personal/login")}
                        className="portal-btn-checkout"
                        style={{ fontSize: 12, padding: "8px 16px" }}
                    >
                        Terminar turno
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
        </div>
    );
}
