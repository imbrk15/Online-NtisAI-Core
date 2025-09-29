import React from "react";
import { Card } from "@mui/material";

// MUI icons
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CampaignIcon from "@mui/icons-material/Campaign";

const CARD_META = {
  old: {
    title: "Old Property",
    Icon: HomeIcon,
    varFrom: "var(--old-from)",
    varTo: "var(--old-to)",
  },
  numbering: {
    title: "Numbering",
    Icon: ContentPasteIcon,
    varFrom: "var(--num-from)",
    varTo: "var(--num-to)",
  },
  survey: {
    title: "Survey",
    Icon: BarChartIcon,
    varFrom: "var(--sur-from)",
    varTo: "var(--sur-to)",
  },
  entry: {
    title: "Data Entry",
    Icon: KeyboardIcon,
    varFrom: "var(--ent-from)",
    varTo: "var(--ent-to)",
  },
  qc: {
    title: "QC Completed",
    Icon: CheckCircleIcon,
    varFrom: "var(--qc-from)",
    varTo: "var(--qc-to)",
  },
  notice: {
    title: "Notice Distributed",
    Icon: CampaignIcon,
    varFrom: "var(--not-from)",
    varTo: "var(--not-to)",
  },
};

function PropertySearchCard({ type, value }) {
  const meta = CARD_META[type] || CARD_META.old;
  const IconComp = meta.Icon;

  // Base gradient ALWAYS visible on the Card element
  const normalBgStyle = {
    backgroundImage: `linear-gradient(135deg, ${meta.varFrom}, ${meta.varTo})`,
  };
  // Reverse gradient fades in on hover
  const hoverBgStyle = {
    backgroundImage: `linear-gradient(135deg, ${meta.varTo}, ${meta.varFrom})`,
  };
  return (
    <Card
      elevation={0}
      style={normalBgStyle} // 👈 base gradient here (always visible)
      sx={{ backgroundColor: "transparent", borderRadius: "12px" }}
      className={[
        "relative isolate w-full h-[110px] overflow-hidden",
        "rounded-[25px] text-white",
        "transition-transform duration-200 hover:-translate-y-1",
        "shadow-[0_10px_30px_rgba(2,6,23,.10),0_2px_10px_rgba(2,6,23,.06)]",
        "animate-[gradientDrift_8s_ease-in-out_infinite_alternate]",
      ].join(" ")}
    >
      {/* Hover overlay (reverse gradient) */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none animate-[gradientDrift_8s_ease-in-out_infinite_alternate]"
        style={hoverBgStyle}
      />

      {/* Subtle glossy shine */}
      <div
        className="
          pointer-events-none absolute -top-[40%] -right-[60%]
          h-[200%] w-[60%] rotate-[15deg] blur-[10px]
          bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,.25),transparent_60%)]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-[18px] pb-4">
        <div className="flex items-center justify-between gap-2 opacity-95">
          <span className="!text-white text-[1rem] font-bold tracking-[.2px] drop-shadow-[0_1px_0_rgba(0,0,0,.12)]">
            {meta.title}
          </span>
          <IconComp className="!text-white !w-7 !h-7" />
        </div>

        <div className="mt-2 text-center">
          <span className="!text-white text-[1.7rem] font-extrabold leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,.2)]">
            {value}
          </span>
        </div>
      </div>
    </Card>
  );
}
function PropertySearchCards({ stats }) {
  const order = ["old", "numbering", "survey", "entry", "qc", "notice"];
  return (
    <section
      className="
        grid w-full gap-4 py-2
        grid-cols-6
        max-[1200px]:grid-cols-3
        max-[700px]:grid-cols-2
        max-[420px]:grid-cols-1
      "
    >
      {order.map((key) => (
        <PropertySearchCard key={key} type={key} value={stats?.[key]} />
      ))}
    </section>
  );
}

export default PropertySearchCards;
