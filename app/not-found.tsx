import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell page-stack">
      <section className="surface-card">
        <span className="eyebrow">404</span>
        <h1>Route not found</h1>
        <p>This MVP only publishes pages that have a clear search intent and enough evidence to be useful.</p>
        <Link href="/" className="related-link-card">
          <strong>Return to the homepage</strong>
          <span>Open the route hub and search from there.</span>
        </Link>
      </section>
    </div>
  );
}
