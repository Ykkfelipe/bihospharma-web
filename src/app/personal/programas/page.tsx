"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { PortalShell } from "../components/PortalShell";
import { PORTAL_APPS } from "@/lib/portal-apps";
import { signOutWithAttendance } from "../lib/attendance-client";

function ExternalLinkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

export default function ProgramasPage() {
    const [endingShift, setEndingShift] = useState(false);

    const handleEndShift = async () => {
        setEndingShift(true);
        try {
            await signOutWithAttendance("/personal/login");
        } finally {
            setEndingShift(false);
        }
    };

    return (
        <PortalShell title="Mis programas">
            <div className="portal-programas-page portal-animate-in">
                <header className="portal-programas-hero portal-page-hero">
                    <p className="portal-page-eyebrow">Accesos corporativos</p>
                    <h1 className="portal-page-title">Mis programas</h1>
                    <p className="portal-page-lead">
                        Seleccione el sistema que necesita. Cada acceso abre en una nueva pestaña.
                    </p>
                </header>

                <div className="portal-apps-grid">
                    {PORTAL_APPS.map((app) => (
                        <a
                            key={app.id}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portal-app-card"
                            style={{ "--app-accent": app.accent } as CSSProperties}
                        >
                            <div className="portal-app-card-logo">
                                <Image
                                    src={app.logo}
                                    alt={app.name}
                                    width={280}
                                    height={120}
                                    className="portal-app-card-logo-img"
                                />
                            </div>
                            <div className="portal-app-card-body">
                                <div className="portal-app-card-head">
                                    <div>
                                        <h2 className="portal-app-card-title">{app.name}</h2>
                                        {app.subtitle && (
                                            <p className="portal-app-card-subtitle">{app.subtitle}</p>
                                        )}
                                    </div>
                                    <span className="portal-app-card-icon" aria-hidden>
                                        <ExternalLinkIcon />
                                    </span>
                                </div>
                                <p className="portal-app-card-desc">{app.description}</p>
                                <span className="portal-app-card-action">Abrir sistema</span>
                            </div>
                        </a>
                    ))}
                </div>

                <section className="portal-programas-end-shift" aria-label="Fin de jornada">
                    <div className="portal-programas-end-shift-copy">
                        <p className="portal-programas-end-shift-title">Fin de jornada</p>
                        <p className="portal-programas-end-shift-text">
                            Registra su salida y cierra la sesión del portal.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="portal-programas-end-shift-btn"
                        onClick={() => void handleEndShift()}
                        disabled={endingShift}
                    >
                        {endingShift ? "Guardando…" : "Terminar turno"}
                    </button>
                </section>
            </div>
        </PortalShell>
    );
}
