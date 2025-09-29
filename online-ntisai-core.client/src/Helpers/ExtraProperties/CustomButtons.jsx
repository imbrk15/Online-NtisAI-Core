import React from "react";
import { Button } from "@mui/material";
import {
    FaSearch, FaRedo, FaFileExport, FaPlus, FaPen, FaSave,
    FaTrash, FaTimesCircle, FaCog
} from "react-icons/fa";
import { useToast } from "../../Contexts/ToastContext";
import { useValidation } from "../../Contexts/ValidationContext";

export default function CustomButton({
    type = "search",
    buttonType = "button",
    children,
    onClick,
    validate,               // ← optional per-button validator
    className: extra = "",
    ...props
}) {
    const { showToast } = useToast();
    const validations = useValidation();

    let className = `
    !text-white !rounded-[7px] px-4 py-1 font-medium
    transition-all duration-300 flex items-center gap-2
  `;

    let Icon = null;

    // Success toasts shown ONLY after validation passes
    const toastMessages = {
        search: { msg: "Search completed!", variant: "info" },
        reset: { msg: "Form reset successfully!", variant: "warning" },
        export: { msg: "Data exported successfully!", variant: "success" },
        add: { msg: "Added successfully!", variant: "success" },
        new: { msg: "Nothing to add!", variant: "info" }, // neutral
        updated: { msg: "Updated successfully!", variant: "success" },
        save: { msg: "Saved successfully!", variant: "success" },
        clear: { msg: "Cleared successfully!", variant: "warning" },
        delete: { msg: "Deleted successfully!", variant: "error" },
        generate: { msg: "Generated successfully!", variant: "info" },
    };

    // Error toasts when validation fails
    const errorMessages = {
        search: "Nothing selected for search!",
        reset: "Nothing to reset!",
        delete: "No item selected to delete!",
        add: "Please fill all required fields before adding!",
        save: "Please complete the required fields before saving!",
        updated: "Nothing to update!",
        clear: "Nothing to clear!",
        generate: "Missing inputs required to generate!",
        new: "Form could not be prepared.", // rarely used (usually always valid)
    };

    // ---- THEMES ----
    if (type === "search") {
        className += `
      bg-gradient-to-r from-[#0a66c2] to-[#05a9ff]
      hover:from-[#05a9ff] hover:to-[#0a66c2]
      shadow-[0_6px_14px_rgba(10,102,194,.22)]
    `;
        Icon = FaSearch;
    }
    if (type === "reset") {
        className += `
      bg-gradient-to-r from-[#c62323] to-[#ff6d6d]
      hover:from-[#ff6d6d] hover:to-[#c62323]
      shadow-[0_6px_14px_rgba(198,35,35,.18)]
    `;
        Icon = FaRedo;
    }
    if (type === "export") {
        className += `
      bg-gradient-to-r from-[#059669] to-[#10b981]
      hover:from-[#10b981] hover:to-[#059669]
      shadow-[0_6px_14px_rgba(16,185,129,.18)]
    `;
        Icon = FaFileExport;
    }
    if (type === "add") {
        className += `
      bg-gradient-to-r from-[#0a66c2] to-[#05a9ff]
      hover:from-[#05a9ff] hover:to-[#0a66c2]
      shadow-[0_6px_14px_rgba(10,102,194,.22)]
    `;
        Icon = FaPlus;
    }
    if (type === "updated") {
        className += `
      bg-gradient-to-r from-[#9c27b0] to-[#ab47bc]
      hover:from-[#ab47bc] hover:to-[#9c27b0]
      shadow-[0_6px_14px_rgba(156,39,176,.22)]
    `;
        Icon = FaPen;
    }
    if (type === "save") {
        className += `
      bg-gradient-to-r from-[#059669] to-[#10b981]
      hover:from-[#10b981] hover:to-[#059669]
      shadow-[0_6px_14px_rgba(16,185,129,.18)]
    `;
        Icon = FaSave;
    }
    if (type === "clear") {
        className += `
      bg-gradient-to-r from-gray-400 to-gray-600
      hover:from-gray-500 hover:to-gray-700
      shadow-[0_6px_14px_rgba(107,114,128,.35)]
    `;
        Icon = FaTimesCircle;
    }
    if (type === "delete") {
        className += `
      bg-gradient-to-r from-[#dc2626] to-[#ef4444]
      hover:from-[#ef4444] hover:to-[#dc2626]
      shadow-[0_6px_14px_rgba(220,38,38,.22)]
    `;
        Icon = FaTrash;
    }
    if (type === "new") {
        className += `
      bg-gradient-to-r from-[#2563eb] to-[#3b82f6]
      hover:from-[#3b82f6] hover:to-[#2563eb]
      shadow-[0_6px_14px_rgba(59,130,246,.22)]
    `;
        Icon = FaPlus;
    }
    if (type === "generate") {
        className += `
      bg-gradient-to-r from-[#0a66c2] to-[#05a9ff]
      hover:from-[#05a9ff] hover:to-[#0a66c2]
      shadow-[0_6px_14px_rgba(10,102,194,.22)]
    `;
        Icon = FaCog;
    }

    // ---- VALIDATION RESOLVER (robust to different context shapes) ----
    const runValidation = () => {
        // 1) Per-button override
        if (typeof validate === "function") return !!validate();

        // 2) Context may expose a function validate(type)
        if (validations && typeof validations.validate === "function") {
            return !!validations.validate(type);
        }

        // 3) Context may expose rules object
        if (validations && validations.rules && typeof validations.rules[type] === "function") {
            return !!validations.rules[type]();
        }

        // 4) Context may directly map type -> fn
        if (validations && typeof validations[type] === "function") {
            return !!validations[type]();
        }

        // 5) No validation available; treat as valid
        return true;
    };

    const handleClick = (e) => {
        const isValid = runValidation();
        if (!isValid) {
            showToast(errorMessages[type] || "Validation failed!", "warning");
            return; // ⛔ stop success toast and onClick
        }

        // Do the action
        if (onClick) onClick(e);

        // Success toast only if valid
        if (toastMessages[type]) {
            const { msg, variant } = toastMessages[type];
            showToast(msg, variant);
        }
    };

    return (
        <Button
            type={buttonType}
            variant="contained"
            disableElevation
            onClick={handleClick}
            className={`${className} ${extra}`}
            {...props}
        >
            {Icon && <Icon className="text-white text-sm" />}
            {children}
        </Button>
    );
}
