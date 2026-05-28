"use client";

type ToastType = "success" | "error" | "info";

export function PortalToast({
    message,
    type = "info",
}: {
    message: string;
    type?: ToastType;
}) {
    if (!message) return null;

    const styles: Record<ToastType, { bg: string; border: string; color: string }> = {
        success: { bg: "#ecfdf5", border: "#6ee7b7", color: "#047857" },
        error: { bg: "#fef2f2", border: "#fca5a5", color: "#b91c1c" },
        info: { bg: "#eff6ff", border: "#93c5fd", color: "#1d4ed8" },
    };
    const s = styles[type];

    return (
        <div
            role="status"
            style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                background: s.bg,
                border: `1px solid ${s.border}`,
                color: s.color,
            }}
        >
            {message}
        </div>
    );
}
