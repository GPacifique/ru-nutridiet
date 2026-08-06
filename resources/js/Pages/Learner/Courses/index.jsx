import React from 'react';

/**
 * Button
 * --------
 * variant: 'primary' (moss fill) | 'secondary' (outline) | 'ghost' (text-only)
 * Renders a <button> unless `href` is passed, in which case it renders an <a>
 * with the same visual treatment — useful for CTA links like "Buy now".
 */
export function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-moss text-paper hover:bg-moss-dark',
    secondary: 'border border-moss text-moss hover:bg-moss/5',
    ghost: 'text-moss hover:underline underline-offset-4 px-0 py-0',
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

/**
 * Input — labeled text input used across checkout/auth forms.
 */
export function Input({ label, id, error, className = '', ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
          {label}
        </span>
      )}
      <input
        id={id}
        className={[
          'w-full border rounded-md px-3.5 py-2.5 text-sm bg-white/60 text-ink placeholder:text-ink/30',
          'focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss',
          error ? 'border-beet' : 'border-line',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <span className="block text-xs text-beet mt-1">{error}</span>}
    </label>
  );
}

/**
 * Select — labeled dropdown, used for catalog filters.
 */
export function Select({ label, id, options, className = '', ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="block text-xs uppercase tracking-widest text-ink/50 mb-1.5">
          {label}
        </span>
      )}
      <select
        id={id}
        className={[
          'w-full border border-line rounded-md px-3.5 py-2.5 text-sm bg-white/60 text-ink',
          'focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss',
          className,
        ].join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * Badge — small pill used for credit type, status, topic tags.
 * tone: 'moss' | 'citrus' | 'beet' | 'neutral'
 */
export function Badge({ tone = 'neutral', children, className = '' }) {
  const tones = {
    moss: 'bg-moss/10 text-moss',
    citrus: 'bg-citrus-light/60 text-ink',
    beet: 'bg-beet/10 text-beet',
    neutral: 'bg-paper-dim text-ink/60',
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] uppercase tracking-wide font-medium px-2.5 py-1 rounded-full ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
