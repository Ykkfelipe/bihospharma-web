/** Áreas operativas para seguimiento de actividades */
export const ACTIVITY_AREAS = [
    "Administración",
    "Consulta externa",
    "Medicina laboral",
    "Gestión",
    "Enfermería",
    "Recursos humanos",
    "General",
] as const;

export type ActivityArea = (typeof ACTIVITY_AREAS)[number];

export const DEFAULT_ACTIVITY_AREA: ActivityArea = "General";

export function resolveUserArea(area: string | null | undefined): string {
    if (area && ACTIVITY_AREAS.includes(area as ActivityArea)) return area;
    return DEFAULT_ACTIVITY_AREA;
}
