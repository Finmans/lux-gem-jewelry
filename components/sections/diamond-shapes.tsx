type Shape = "Round" | "Oval" | "Cushion" | "Emerald" | "Princess" | "Pear" | "Radiant" | "Marquise" | "Asscher" | "Heart";

interface DiamondShapeSVGProps {
  shape: Shape;
  className?: string;
  size?: number;
}

export function DiamondShapeSVG({ shape, className = "", size = 120 }: DiamondShapeSVGProps) {
  const svgs: Record<Shape, React.ReactNode> = {
    Round: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="roundG" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="40%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#roundG)" />
        <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <path d="M 15 50 Q 50 20 85 50 Q 50 80 15 50" fill="rgba(255,255,255,0.1)" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
    ),
    Oval: (
      <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className={className}>
        <defs>
          <radialGradient id="ovalG" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="60" rx="42" ry="55" fill="url(#ovalG)" />
        <ellipse cx="50" cy="60" rx="42" ry="55" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <ellipse cx="50" cy="60" rx="20" ry="30" fill="rgba(255,255,255,0.08)" />
      </svg>
    ),
    Cushion: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="cushG" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#cushG)" />
        <rect x="10" y="10" width="80" height="80" rx="18" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <rect x="25" y="25" width="50" height="50" rx="8" fill="rgba(255,255,255,0.08)" />
      </svg>
    ),
    Emerald: (
      <svg viewBox="0 0 80 100" width={size * 0.8} height={size} className={className}>
        <defs>
          <radialGradient id="emG" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <polygon points="15,5 65,5 80,50 65,95 15,95 0,50" fill="url(#emG)" />
        <polygon points="15,5 65,5 80,50 65,95 15,95 0,50" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <polygon points="20,15 60,15 72,50 60,85 20,85 8,50" fill="rgba(255,255,255,0.07)" />
      </svg>
    ),
    Princess: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="princG" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <rect x="8" y="8" width="84" height="84" fill="url(#princG)" />
        <rect x="8" y="8" width="84" height="84" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <rect x="20" y="20" width="60" height="60" fill="rgba(255,255,255,0.08)" />
        <line x1="8" y1="8" x2="92" y2="92" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="92" y1="8" x2="8" y2="92" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>
    ),
    Pear: (
      <svg viewBox="0 0 80 120" width={size * 0.67} height={size * 1.2} className={className}>
        <defs>
          <radialGradient id="pearG" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <path d="M 40 5 Q 75 45 65 75 Q 55 100 40 115 Q 25 100 15 75 Q 5 45 40 5" fill="url(#pearG)" />
        <path d="M 40 5 Q 75 45 65 75 Q 55 100 40 115 Q 25 100 15 75 Q 5 45 40 5" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <ellipse cx="40" cy="55" rx="15" ry="22" fill="rgba(255,255,255,0.09)" />
      </svg>
    ),
    Radiant: (
      <svg viewBox="0 0 90 100" width={size * 0.9} height={size} className={className}>
        <defs>
          <radialGradient id="radG" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <polygon points="10,5 80,5 95,50 80,95 10,95 -5,50" fill="url(#radG)" />
        <polygon points="10,5 80,5 95,50 80,95 10,95 -5,50" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <polygon points="22,18 68,18 80,50 68,82 22,82 10,50" fill="rgba(255,255,255,0.07)" />
      </svg>
    ),
    Marquise: (
      <svg viewBox="0 0 60 120" width={size * 0.5} height={size * 1.2} className={className}>
        <defs>
          <radialGradient id="marqG" cx="50%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <ellipse cx="30" cy="60" rx="28" ry="55" fill="url(#marqG)" />
        <ellipse cx="30" cy="60" rx="28" ry="55" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <ellipse cx="30" cy="45" rx="10" ry="18" fill="rgba(255,255,255,0.1)" />
      </svg>
    ),
    Heart: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="heartG" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <path d="M 50 90 Q 5 60 5 35 Q 5 10 27 10 Q 42 10 50 25 Q 58 10 73 10 Q 95 10 95 35 Q 95 60 50 90" fill="url(#heartG)" />
        <path d="M 50 90 Q 5 60 5 35 Q 5 10 27 10 Q 42 10 50 25 Q 58 10 73 10 Q 95 10 95 35 Q 95 60 50 90" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <ellipse cx="38" cy="38" rx="10" ry="12" fill="rgba(255,255,255,0.1)" transform="rotate(-20 38 38)" />
      </svg>
    ),
    Asscher: (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="assG" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f0d9a8" />
            <stop offset="45%" stopColor="#C6A878" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
        <polygon points="50,5 90,20 90,80 50,95 10,80 10,20" fill="url(#assG)" />
        <polygon points="50,5 90,20 90,80 50,95 10,80 10,20" fill="none" stroke="#8B6914" strokeWidth="0.5" />
        <polygon points="50,20 75,30 75,70 50,80 25,70 25,30" fill="rgba(255,255,255,0.07)" />
      </svg>
    ),
  };

  return <>{svgs[shape] ?? svgs.Round}</>;
}
