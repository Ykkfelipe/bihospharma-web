"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
import { PortalShell } from "../components/PortalShell";
import { PORTAL_APPS } from "@/lib/portal-apps";

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
    return (
        <PortalShell title="Mis programas">
            <div className="portal-programas-page">
                <header className="portal-programas-hero">
                    <p className="portal-programas-eyebrow">Accesos corporativos</p>
                    <h1 className="portal-programas-title">Mis programas</h1>
                    <p className="portal-programas-lead">
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

                <p className="portal-programas-footnote">
                    Al finalizar su jornada, cierre las pestañas de los sistemas y use{" "}
                    <strong>Terminar turno</strong> en el menú superior del portal.
                </p>
            </div>
        </PortalShell>
    );
}
