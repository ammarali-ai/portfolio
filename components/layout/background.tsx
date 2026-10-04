/** Fixed decorative backdrop: brand glows, faded grid and film noise. CSS only. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute top-64 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-2/10 blur-3xl" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise" />
    </div>
  );
}
