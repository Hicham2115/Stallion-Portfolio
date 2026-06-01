import { AlertTriangle } from "lucide-react";

interface Props { message?: string; onRetry?: () => void }

export function ErrorState({ message = "Something went wrong.", onRetry }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "64px 24px",
        color: "var(--fg3)",
        textAlign: "center",
      }}
    >
      <AlertTriangle size={36} color="var(--olive)" aria-hidden="true" />
      <p style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--fg2)" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-secondary"
          style={{ fontSize: 14, padding: "10px 20px" }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
