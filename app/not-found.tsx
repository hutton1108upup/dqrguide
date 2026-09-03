import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-stack">
      <section className="surface-card">
        <span className="eyebrow">404</span>
        <h1>Route not found</h1>
        <p>This page is not available. Return to the guide hub or use search to find the closest current route.</p>
        <Link href="/" className="related-link-card">
          <strong>Return to the homepage</strong>
          <span>Open the route hub and search from there.</span>
        </Link>
      </section>
    </div>
  );
}
