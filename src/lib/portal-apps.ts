/** Sistemas externos vinculados al portal corporativo (enlaces, no embebidos). */
export type PortalApp = {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    url: string;
    logo: string;
    /** Color de acento para la tarjeta (borde / botón). */
    accent: string;
};

export const PORTAL_APPS: PortalApp[] = [
    {
        id: "mantisweb",
        name: "Mantisweb",
        subtitle: "Software ERP",
        description: "Gestión operativa: pacientes, facturación, inventario y procesos internos.",
        url: "http://45.32.202.126:8081/Bihospharma20apps/servlet/com.version8.loginempresa",
        logo: "/logos/portal-apps/mantisweb.png",
        accent: "#5b6b7a",
    },
    {
        id: "softmedica",
        name: "QB Médica",
        subtitle: "Softmedica",
        description: "Software médico especializado para consultas, historias clínicas y reportes.",
        url: "https://www.qbmedica.net/ES.aspx",
        logo: "/logos/portal-apps/qbmedica.png",
        accent: "#6bc4a8",
    },
];
