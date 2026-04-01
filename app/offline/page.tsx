export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <section className="max-w-lg rounded-2xl border border-border bg-panel/80 p-6">
        <h1 className="text-3xl font-bold text-ink">You are offline</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Second Brain OS cached your workspace shell. Pending requests will sync automatically once
          you are back online.
        </p>
      </section>
    </main>
  );
}
