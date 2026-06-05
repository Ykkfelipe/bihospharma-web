"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AdminPortalShell } from "../../components/PortalShell";
import { ACTIVITY_AREAS, DEFAULT_ACTIVITY_AREA } from "@/lib/activity-areas";

type StaffUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    area: string | null;
};

const ROLE_LABEL: Record<string, string> = {
    admin: "Administrador",
    employee: "Colaborador",
};

export default function AdminEquipoPage() {
    const { status } = useSession();
    const [users, setUsers] = useState<StaffUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [draftAreas, setDraftAreas] = useState<Record<string, string>>({});
    const [feedback, setFeedback] = useState<{ id: string; ok: boolean; msg: string } | null>(null);

    const loadUsers = () => {
        setLoading(true);
        fetch("/api/admin/users", { cache: "no-store" })
            .then((r) => r.json())
            .then((data) => {
                const list: StaffUser[] = Array.isArray(data.users) ? data.users : [];
                setUsers(list);
                const drafts: Record<string, string> = {};
                for (const u of list) {
                    drafts[u.id] = u.area ?? DEFAULT_ACTIVITY_AREA;
                }
                setDraftAreas(drafts);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        if (status === "authenticated") loadUsers();
    }, [status]);

    const saveArea = async (userId: string) => {
        setSavingId(userId);
        setFeedback(null);
        const area = draftAreas[userId] ?? DEFAULT_ACTIVITY_AREA;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ area: area === DEFAULT_ACTIVITY_AREA ? null : area }),
            });
            const data = await res.json();
            if (!res.ok) {
                setFeedback({ id: userId, ok: false, msg: data.error || "No se pudo guardar." });
                return;
            }

            setUsers((prev) => prev.map((u) => (u.id === userId ? data.user : u)));
            setFeedback({ id: userId, ok: true, msg: "Área actualizada." });
        } catch {
            setFeedback({ id: userId, ok: false, msg: "Error de red." });
        } finally {
            setSavingId(null);
        }
    };

    return (
        <AdminPortalShell
            heading="Equipo"
            lead="Asigne el área operativa de cada persona. Las actividades diarias se registran con ese área."
        >
            {loading ? (
                <p className="portal-admin-loading">Cargando equipo…</p>
            ) : (
                <>
                    <p className="portal-equipo-scroll-hint">Deslice horizontalmente para ver toda la tabla</p>
                    <div className="portal-section-card portal-equipo-table-wrap">
                        <table className="portal-equipo-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Área</th>
                                <th aria-label="Acciones" />
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const dirty =
                                    (draftAreas[user.id] ?? DEFAULT_ACTIVITY_AREA) !==
                                    (user.area ?? DEFAULT_ACTIVITY_AREA);
                                return (
                                    <tr key={user.id}>
                                        <td className="portal-equipo-name">{user.name}</td>
                                        <td className="portal-equipo-email">{user.email}</td>
                                        <td>{ROLE_LABEL[user.role] ?? user.role}</td>
                                        <td>
                                            <select
                                                className="portal-equipo-select"
                                                value={draftAreas[user.id] ?? DEFAULT_ACTIVITY_AREA}
                                                onChange={(e) =>
                                                    setDraftAreas((prev) => ({
                                                        ...prev,
                                                        [user.id]: e.target.value,
                                                    }))
                                                }
                                            >
                                                {ACTIVITY_AREAS.map((area) => (
                                                    <option key={area} value={area}>
                                                        {area}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="portal-equipo-actions">
                                            <button
                                                type="button"
                                                className="portal-equipo-save"
                                                disabled={!dirty || savingId === user.id}
                                                onClick={() => void saveArea(user.id)}
                                            >
                                                {savingId === user.id ? "…" : "Guardar"}
                                            </button>
                                            {feedback?.id === user.id && (
                                                <span
                                                    className={
                                                        feedback.ok
                                                            ? "portal-equipo-feedback portal-equipo-feedback--ok"
                                                            : "portal-equipo-feedback portal-equipo-feedback--err"
                                                    }
                                                >
                                                    {feedback.msg}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>
                </>
            )}
        </AdminPortalShell>
    );
}
