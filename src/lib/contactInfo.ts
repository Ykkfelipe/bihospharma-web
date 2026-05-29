export const CONTACT = {
  email: 'info@bihospharma.com',
  website: 'www.bihospharma.com',
  phone: 'PBX 3103158806 Opc1 - 3232347791',
  /** Número visible para WhatsApp y llamadas (mismo enlace wa.me) */
  phoneMobile: '3232347791',
  whatsapp: '573232347791',
  whatsappUrl: 'https://wa.me/573232347791',
  locations: [
    {
      name: 'YOPAL (CASANARE)',
      lines: ['Tranversal 18 #7-05 Piso 5', 'Edificio Mont Black'],
    },
    {
      name: 'BOGOTÁ D.C',
      lines: ['Cra 25 No 4A-14'],
    },
  ],
} as const;

export const QUICK_LINKS = [
  { href: '/services/medicina-general', label: 'Medicina General' },
  { href: '/services', label: 'Programas de atención' },
  { href: '/services/medicina-laboral', label: 'SST' },
  { href: null, label: 'Laboratorio Clínico' },
] as const;

export const FOOTER_LINKS = [
  { href: '/estados-financieros-2024', label: 'Estados financieros' },
  { href: '/contact', label: 'Trabaja con nosotros' },
  { href: '/pqrs', label: 'Escríbenos PQRSF' },
] as const;
