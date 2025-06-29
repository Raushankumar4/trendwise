export default function LoadingSpinner({ size = 48, color = "#3B82F6" }) {
  return (
    <div>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <circle
          className="opacity-100"
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="90,150"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
}
