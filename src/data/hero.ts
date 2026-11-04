// Passer à "webp" quand les vraies photos sont en place dans public/images/hero/
const EXT = "webp";

export const heroImages = [1, 2, 3, 4, 5, 6].map((n) => `/images/hero/hero+${n}.${EXT}`);