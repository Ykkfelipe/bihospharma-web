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
    {
        id: "easymipres",
        name: "EasyMipres",
        subtitle: "Programación MIPRES",
        description:
            "Programación y seguimiento de entregas MIPRES: consulte órdenes, estados y reportes del programa.",
        url: "https://bihospharma.easymipres.com/session/login?redirect=%2Fdefault%2Fprogramaciones%2Fprogramaciones",
        logo: "/logos/portal-apps/easymipres.png",
        accent: "#3b82c4",
    },
    {
        id: "aws-contabilidad",
        name: "AWS Contabilidad",
        subtitle: "Almacenamiento S3",
        description:
            "Acceso al repositorio contable en la nube: documentos, archivos y respaldos del área financiera.",
        url: "https://signin.aws.amazon.com/oauth?response_type=code&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fs3tb&redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fs3%2Fbuckets%2Fbihospharmacontabilidad%3Fca-oauth-flow-id%3Da2d0%26hashArgs%3D%2523%26isau%3DforceMobileLayout%3D0&forceMobileLayout=0&forceMobileApp=0",
        logo: "/logos/portal-apps/aws.png",
        accent: "#ff9900",
    },
];
