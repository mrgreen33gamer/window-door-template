'use client';
import styles from './styles.module.scss';

function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return function () {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

interface StyledDividerProps {
  seed:  string;
  index: number;
}

// Snowflake SVG paths at different scales
const FLAKE_SIZES = [10, 22, 36];

const StyledDivider: React.FC<StyledDividerProps> = ({ seed, index }) => {
  const rng       = seededRandom(`${seed}-${index}`);
  const count     = Math.floor(rng() * 12) + 8; // 8–20

  const flakes = Array.from({ length: count }, (_, i) => ({
    size:    FLAKE_SIZES[Math.floor(rng() * 3)],
    opacity: (rng() * 0.4 + 0.1).toFixed(2),
    left:    `${rng() * 100}%`,
    top:     `${rng() * 100}%`,
    rotate:  Math.floor(rng() * 360),
  }));

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {flakes.map((f, i) => (
        <svg
          key={i}
          className={styles.flake}
          width={f.size}
          height={f.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            left:    f.left,
            top:     f.top,
            opacity: f.opacity,
            transform: `translate(-50%, -50%) rotate(${f.rotate}deg)`,
          }}
        >
          <line x1="12" y1="2" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <polyline points="8 6 12 2 16 6"/>
          <polyline points="8 18 12 22 16 18"/>
          <polyline points="6 8 2 12 6 16"/>
          <polyline points="18 8 22 12 18 16"/>
        </svg>
      ))}
    </div>
  );
};

export default StyledDivider;
