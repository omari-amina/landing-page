
export const WaslaLogo = ({ size = 48, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Background Circle with Gradient */}
        <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be185d" />
                <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
        </defs>

        <rect width="48" height="48" rx="12" fill="url(#logo-grad)" />

        {/* Abstract "W" or Connection Symbol */}
        <path
            d="M14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24C34 29.5228 29.5228 34 24 34"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
        />
        <path
            d="M14 24L24 24"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
        />
        <circle cx="28" cy="24" r="3" fill="white" />
    </svg>
);
