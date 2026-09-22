import React from 'react';

interface QrCodeProps {
  value: string;
  size?: number;
  className?: string;
}

// Deterministic matrix generator for display QR code
export const QrCode: React.FC<QrCodeProps> = ({ value, size = 180, className = '' }) => {
  // Generate a clean 25x25 QR grid deterministically based on value string
  const gridSize = 25;
  const hash = Array.from(value).reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);

  const isDark = (r: number, c: number): boolean => {
    // Top-left finder pattern (7x7)
    if (r < 7 && c < 7) {
      if (r === 0 || r === 6 || c === 0 || c === 6) return true;
      if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Top-right finder pattern (7x7)
    if (r < 7 && c >= gridSize - 7) {
      const cc = c - (gridSize - 7);
      if (r === 0 || r === 6 || cc === 0 || cc === 6) return true;
      if (r >= 2 && r <= 4 && cc >= 2 && cc <= 4) return true;
      return false;
    }
    // Bottom-left finder pattern (7x7)
    if (r >= gridSize - 7 && c < 7) {
      const rr = r - (gridSize - 7);
      if (rr === 0 || rr === 6 || c === 0 || c === 6) return true;
      if (rr >= 2 && rr <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Timing patterns
    if (r === 6 || c === 6) {
      return (r + c) % 2 === 0;
    }
    // Alignment pattern (around bottom right)
    if (r >= 16 && r <= 20 && c >= 16 && c <= 20) {
      if (r === 16 || r === 20 || c === 16 || c === 20 || (r === 18 && c === 18)) return true;
      return false;
    }
    // Data encoding simulation
    const charCode = value.charCodeAt((r * 5 + c) % value.length) || 42;
    return ((r * c + charCode + hash) % 3 === 0 || (r + c + charCode) % 5 === 0);
  };

  const rects: React.ReactNode[] = [];
  const cellSize = size / gridSize;

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (isDark(r, c)) {
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize + 0.3}
            height={cellSize + 0.3}
            fill="#1e3a8a"
          />
        );
      }
    }
  }

  return (
    <div
      className={`inline-block p-3 bg-white rounded-xl shadow-xs border border-blue-200 ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rects}
      </svg>
    </div>
  );
};
