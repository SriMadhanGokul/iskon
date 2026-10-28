// Soft saffron and gold light behind the whole site. Plain radial gradients (no blur filter)
// keep it cheap to paint; the slow drift is CSS-only and stops for reduced-motion visitors.
export default function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[20%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(255,153,51,0.22)_0%,rgba(255,153,51,0)_60%)] motion-safe:animate-mesh-drift" />
      <div className="absolute -right-[25%] top-[25%] h-[65vmax] w-[65vmax] rounded-full bg-[radial-gradient(circle,rgba(255,209,163,0.28)_0%,rgba(255,209,163,0)_60%)] motion-safe:animate-mesh-drift-reverse" />
      <div className="absolute -bottom-[30%] left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(184,60,0,0.12)_0%,rgba(184,60,0,0)_60%)] motion-safe:animate-mesh-drift" />
    </div>
  );
}
