export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <button
      {...props}
      className={`btn w-full mt-4 btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}