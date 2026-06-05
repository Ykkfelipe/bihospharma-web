"use client";

import Image from "next/image";
import { PortalShell } from "../components/PortalShell";
import { PORTAL_APPS } from "@/lib/portal-apps";

export default function ProgramasPage() {
    return (
        <PortalShell title="Mis programas">
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 48px" }}>
                <p style={{ textAlign: "center", color: "#64748b", fontSize: 14, margin: "0 0 8px", lineHeight: 1.5 }}>
                    Seleccione el sistema que necesita. Se abrirá en una nueva pestaña con su propio inicio de sesión.
                </p>
                <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, margin: "0 0 28px" }}>
                    Al terminar el día, cierre esas ventanas y use <strong>Terminar turno</strong> en el portal.
                </p>

                <div className="portal-apps-grid">
                    {PORTAL_APPS.map((app) => (
                        <a
                            key={app.id}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portal-app-card"
                        >
                            <div className="portal-app-card-logo">
                                <Image
                                    src={app.logo}
                                    alt={app.name}
                                    width={220}
                                    height={64}
                                    style={{ width: "100%", maxWidth: 220, height: "auto" }}
                                />
                            </div>
                            <div className="portal-app-card-body">
                                <h2 className="portal-app-card-title">{app.name}</h2>
                                {app.subtitle && (
                                    <p className="portal-app-card-subtitle">{app.subtitle}</p>
                                )}
                                <p className="portal-app-card-desc">{app.description}</p>
                                <span className="portal-app-card-action">Abrir sistema →</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </PortalShell>
    );
}
