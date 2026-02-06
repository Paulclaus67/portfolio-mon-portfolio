/**
 * Composants et utilitaires réutilisables pour le portfolio
 */

// Badge composant réutilisable
export function Badge({ children, variant = "default", className = "" }) {
  const baseClass = "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] border transition-all";
  
  const variants = {
    default: "border-slate-200/70 bg-white/70 text-slate-700 shadow-sm shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:shadow-none",
    cyan: "border-cyan-400/70 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-400/20",
    emerald: "border-emerald-400/70 bg-emerald-500/10 text-emerald-200",
    sky: "border-sky-400/70 bg-sky-500/10 text-sky-200",
  };

  return (
    <span className={`${baseClass} ${variants[variant]} ${className}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}

// Section Header composant
export function SectionHeader({ 
  badge = "", 
  title = "", 
  subtitle = "",
  className = ""
}) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${className}`}>
      <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
      <div>
        {badge && (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 dark:text-slate-400">
            {badge}
          </p>
        )}
        {title && (
          <h2 className="mt-1 text-2xl md:text-3xl font-semibold">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600 max-w-2xl dark:text-slate-300">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// Card component
export function Card({ 
  children, 
  hoverable = false, 
  glowing = false,
  className = ""
}) {
  const baseClass = "rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm shadow-slate-900/5 transition-all dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-black/40";
  const hoverClass = hoverable ? "hover:border-cyan-500/50 hover:bg-white hover:-translate-y-1 dark:hover:border-cyan-500/70 dark:hover:bg-slate-900/90" : "";
  const glowClass = glowing ? "shadow-[0_0_20px_rgba(34,211,238,0.15)]" : "shadow-sm shadow-black/40";

  return (
    <div className={`${baseClass} ${hoverClass} ${glowClass} ${className}`}>
      {children}
    </div>
  );
}

// Stat Box component
export function StatBox({ 
  label = "", 
  value = "", 
  suffix = "",
  description = "",
  icon = null,
  color = "cyan"
}) {
  const colorClasses = {
    cyan: "text-cyan-300",
    emerald: "text-emerald-300",
    sky: "text-sky-300",
  };

  return (
    <Card className="p-5 text-center">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-semibold ${colorClasses[color]}`}>
        {value}
        {suffix && <span className="ml-1 text-xs font-normal text-slate-600 dark:text-slate-400">{suffix}</span>}
      </p>
      {description && (
        <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </Card>
  );
}

// Skill progress bar
export function SkillBar({ 
  label = "", 
  percentage = 0,
  color = "cyan"
}) {
  const colorClasses = {
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-400",
    sky: "bg-sky-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="w-24 text-slate-600 text-[11px] dark:text-slate-400">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-right text-slate-600 text-[11px] dark:text-slate-300">
        {percentage}%
      </span>
    </div>
  );
}

// Button component
export function PrimaryButton({ 
  children, 
  onClick, 
  className = "",
  disabled = false 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full bg-slate-50 px-7 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-slate-50/20 transition hover:-translate-y-0.5 hover:bg-slate-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ 
  children, 
  onClick, 
  className = "",
  disabled = false 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border border-slate-300 px-7 py-3 text-sm font-medium text-slate-900 backdrop-blur transition hover:border-cyan-400 hover:text-cyan-700 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-500/80 dark:text-slate-100 dark:hover:text-cyan-300 ${className}`}
    >
      {children}
    </button>
  );
}

// Empty state
export function EmptyState({ 
  title = "Aucun résultat", 
  description = "Essayez de modifier vos critères de recherche.",
  icon = null 
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-8 text-center shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-black/40">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}
