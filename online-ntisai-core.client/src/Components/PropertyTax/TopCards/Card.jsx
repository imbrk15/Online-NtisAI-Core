import React from "react";

function Card({ title, subtitle, right, children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {(title || right || subtitle) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            {subtitle && (
              <div className="text-xs text-slate-500">{subtitle}</div>
            )}
            {title && (
              <div className="text-slate-800 font-semibold">{title}</div>
            )}
          </div>
          <div>{right}</div>
        </div>
      )}
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

export default Card;
