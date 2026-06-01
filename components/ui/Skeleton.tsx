import React from "react";

interface SkeletonProps { className?: string; style?: React.CSSProperties }

export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function WorkSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 90 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <Skeleton style={{ aspectRatio: "4/3", borderRadius: 18 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "4px 0" }}>
            <Skeleton style={{ height: 48, width: "80%", borderRadius: 8 }} />
            <Skeleton style={{ height: 20, width: "60%", borderRadius: 4 }} />
            <Skeleton style={{ height: 16, width: "40%", borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
