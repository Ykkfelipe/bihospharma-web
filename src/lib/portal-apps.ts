/** Sistemas externos vinculados al portal corporativo (enlaces, no embebidos). */
export type PortalApp = {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    url: string;
    logo: string;
};

export const PORTAL_APPS: PortalApp[] = [
    {
        id: "mantisweb",
        name: "Mantisweb",
        subtitle: "software ERP",
        description: "Sistema operativo interno (pacientes, facturación, gestión).",
        url: "http://45.32.202.126:8081/Bihospharma20apps/servlet/com.version8.loginempresa",
        logo: "/logos/portal-apps/mantisweb.svg",
    },
    {
        id: "softmedica",
        name: "Softmedica",
        subtitle: "QB Médica",
        description: "Plataforma Softmedica para procesos médicos y administrativos.",
        url: "https://www.qbmedica.net/ES.aspx",
        logo: "/logos/portal-apps/softmedica.svg",
    },
];
