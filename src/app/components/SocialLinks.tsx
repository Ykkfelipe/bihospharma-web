const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/bihospharma.ips/',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/Bihospharma.ips/',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/bihospharma-sas/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 6.94A1.06 1.06 0 1 1 8 8a1.06 1.06 0 0 1-1.06-1.06ZM7 10h2v8H7v-8Zm3.5 0h2v1.17h.03c.3-.57 1.04-1.17 2.15-1.17 2.3 0 2.72 1.51 2.72 3.48V18h-2v-3.18c0-.76-.01-1.75-1.07-1.75s-1.23.84-1.23 1.7V18h-2v-8Z" />
      </svg>
    ),
  },
  {
    href: 'https://twitter.com/bihospharma',
    label: 'X (Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

type SocialLinksProps = {
  /** dark = footer/navy backgrounds; light = white/light sections */
  variant?: 'dark' | 'light';
  iconSize?: number;
  className?: string;
};

export default function SocialLinks({
  variant = 'light',
  iconSize = 20,
  className = '',
}: SocialLinksProps) {
  const buttonClass =
    variant === 'dark'
      ? 'bg-white/10 text-white hover:bg-[#48a4dc] hover:text-white border border-white/20'
      : 'bg-[#48a4dc] text-white hover:bg-[#3a8fc4] shadow-sm';

  const size = iconSize + 20;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`inline-flex items-center justify-center rounded-full transition-all duration-200 ${buttonClass}`}
          style={{ width: size, height: size }}
        >
          <span style={{ width: iconSize, height: iconSize }} className="block shrink-0">
            {icon}
          </span>
        </a>
      ))}
    </div>
  );
}
