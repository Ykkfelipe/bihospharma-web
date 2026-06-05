"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PortalShell } from "../components/PortalShell";

type ScheduleBlock = {
  label: string;
  time: string;
  kind?: "break";
};

type Profile = {
  name: string;
  email: string;
  roleLabel: string;
  area: string | null;
  scheduleBlocks?: {
    weekdays: ScheduleBlock[];
    saturday: ScheduleBlock | null;
  };
  createdAt: string;
};

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ScheduleDisplay({ blocks }: { blocks: Profile["scheduleBlocks"] }) {
  if (!blocks) return <p className="portal-profile-muted">—</p>;

  return (
    <div className="portal-schedule-blocks">
      <p className="portal-schedule-heading">Lunes a viernes</p>
      {blocks.weekdays.map((row) => (
        <div
          key={row.label}
          className={`portal-schedule-row${row.kind === "break" ? " portal-schedule-row--break" : ""}`}
        >
          <span className="portal-schedule-row-label">{row.label}</span>
          <span className="portal-schedule-row-time">{row.time}</span>
        </div>
      ))}
      {blocks.saturday && (
        <>
          <p className="portal-schedule-heading portal-schedule-heading--spaced">{blocks.saturday.label}</p>
          <div className="portal-schedule-row">
            <span className="portal-schedule-row-label">Jornada</span>
            <span className="portal-schedule-row-time">{blocks.saturday.time}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function MiPerfilPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.email) setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const name = profile?.name ?? session?.user?.name ?? "";
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <PortalShell title="Mi perfil">
      <div className="portal-page portal-page--profile">
        <header className="portal-profile-hero portal-animate-in">
          <span className="portal-avatar portal-avatar--xl" aria-hidden>
            {getInitials(name)}
          </span>
          <div>
            <h1 className="portal-profile-name">{loading ? "…" : name}</h1>
            <p className="portal-profile-meta">
              {profile?.roleLabel ?? "Colaborador"}
              {profile?.area ? ` · ${profile.area}` : ""}
            </p>
            <p className="portal-profile-email">{profile?.email ?? session?.user?.email}</p>
          </div>
        </header>

        <div className="portal-profile-sections portal-animate-in-delay">
          <section className="portal-surface">
            <h2 className="portal-surface-title">Información laboral</h2>
            {loading ? (
              <p className="portal-profile-muted">Cargando…</p>
            ) : (
              <>
                <ScheduleDisplay blocks={profile?.scheduleBlocks} />
                <dl className="portal-profile-meta-grid">
                  <div>
                    <dt>Área</dt>
                    <dd>{profile?.area ?? "General"}</dd>
                  </div>
                  {memberSince && (
                    <div>
                      <dt>En el portal desde</dt>
                      <dd>{memberSince}</dd>
                    </div>
                  )}
                </dl>
              </>
            )}
          </section>

          <section className="portal-surface">
            <h2 className="portal-surface-title">Mis documentos</h2>
            <p className="portal-profile-muted">
              Próximamente podrá consultar aquí contratos, certificados y comunicaciones personales.
            </p>
            <span className="portal-profile-badge">Próximamente</span>
          </section>

          <section className="portal-surface">
            <h2 className="portal-surface-title">Cuenta</h2>
            <div className="portal-profile-links">
              <Link href="/personal/programas">Mis programas</Link>
              <Link href="/personal/actividades">Registrar actividades</Link>
              <Link href="/personal/shifts">Historial de turnos</Link>
              <Link href="/personal/forgot-password?returnTo=/personal/mi-perfil">
                Cambiar contraseña
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
