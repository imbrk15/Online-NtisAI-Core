import React from "react";

/* -------------------- Input Component -------------------- */
export function CustomInput({
    label,
    icon: Icon,
    type = "text",
    defaultValue,
    placeholder,
    onChange,
}) {
    return (
        <label className="block">
            {/* Label */}
            <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />} {label}
            </span>

            {/* Input */}
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border-slate-300 
                           focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            />
        </label>
    );
}

/* -------------------- Select Component -------------------- */
export function CustomSelect({
    label,
    icon: Icon,
    defaultValue,
    options = [],
    onChange,
}) {
    return (
        <label className="block">
            {/* Label */}
            <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />} {label}
            </span>

            {/* Select */}
            <select
                defaultValue={defaultValue}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border-slate-300 
                           focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
