/** Normalize portal login / reset emails (SQLite match is case-sensitive). */
export function normalizePortalEmail(email: string): string {
    return email.trim().toLowerCase();
}
