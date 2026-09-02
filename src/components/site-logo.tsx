import Link from "next/link";

export function GateMark({ compact = false }: { compact?: boolean }) {
  const size = compact ? 31 : 68;
  return (
    <svg aria-hidden="true" className="gate-mark" width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M12 56V28C12 16 20 8 32 8s20 8 20 20v28" stroke="currentColor" strokeWidth="3" />
      <path d="M22 56V32c0-6 4-10 10-10s10 4 10 10v24" stroke="var(--accent-blue)" strokeWidth="2.4" />
      <path d="M32 8l5 6-5 6-5-6 5-6z" fill="var(--accent-purple)" />
      <path d="M7 56h50" stroke="var(--border)" strokeWidth="2" />
    </svg>
  );
}

export function SiteLogo() {
  return (
    <Link href="/" className="site-logo" aria-label="DQR.GG home">
      <GateMark compact />
      <span>DQR.GG</span>
    </Link>
  );
}

