export default function Vinyl({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="58" fill="#1E2A44" />
      <circle cx="60" cy="60" r="54" fill="none" stroke="#2a3a5c" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      <circle cx="60" cy="60" r="22" fill="#FF8A3D" />
      <circle cx="60" cy="60" r="16" fill="#e07030" />
      <text x="60" y="56" textAnchor="middle" fill="#FFF6EE" fontSize="6" fontWeight="bold">ROAMING</text>
      <text x="60" y="65" textAnchor="middle" fill="#FFF6EE" fontSize="6" fontWeight="bold">RECORDS</text>
      <circle cx="60" cy="60" r="4" fill="#1E2A44" />
    </svg>
  )
}
