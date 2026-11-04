async function create() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  // Evite les saccades quand la barre d'adresse d'iOS Safari se replie
  ScrollTrigger.config({ ignoreMobileResize: true });
  return { gsap, ScrollTrigger };
}

let cached: ReturnType<typeof create> | null = null;

export function loadGsap() {
  cached ??= create();
  return cached;
}