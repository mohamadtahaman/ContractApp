import React from 'react';
import { Check, User, Heart, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { PartyRole, MarriageContract, Language } from '../types';
import { translations } from '../i18n/translations';

interface SegmentProgressRadarProps {
  contract: MarriageContract;
  activeRole: PartyRole;
  onSelectRole: (role: PartyRole) => void;
  lang: Language;
}

interface SegmentDef {
  role: PartyRole;
  labelKey: 'husband' | 'wife' | 'guardian' | 'witness1' | 'witness2';
  icon: React.ComponentType<{ className?: string }>;
}

const SEGMENTS: SegmentDef[] = [
  { role: 'husband', labelKey: 'husband', icon: User },
  { role: 'wife', labelKey: 'wife', icon: Heart },
  { role: 'guardian', labelKey: 'guardian', icon: ShieldCheck },
  { role: 'witness1', labelKey: 'witness1', icon: Eye },
  { role: 'witness2', labelKey: 'witness2', icon: Eye },
];

export const SegmentProgressRadar: React.FC<SegmentProgressRadarProps> = ({
  contract,
  activeRole,
  onSelectRole,
  lang,
}) => {
  const t = translations[lang];
  const parties = contract.parties;

  // Count completed parties
  const completedRoles = SEGMENTS.filter((s) => parties[s.role].isCompleted).map((s) => s.role);
  const completedCount = completedRoles.length;
  const percentage = Math.round((completedCount / 5) * 100);

  // SVG Geometry for 5-segment Donut
  const size = 260;
  const center = size / 2;
  const outerR = 108;
  const innerR = 74;
  const gapDeg = 7;
  const segDeg = 360 / 5; // 72 deg per segment

  // Helper to convert polar degrees to Cartesian (starting at -90 deg for top)
  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Helper to describe an SVG donut segment path
  const describeArc = (cx: number, cy: number, rIn: number, rOut: number, startDeg: number, endDeg: number) => {
    const startOut = polarToCartesian(cx, cy, rOut, startDeg);
    const endOut = polarToCartesian(cx, cy, rOut, endDeg);
    const startIn = polarToCartesian(cx, cy, rIn, endDeg);
    const endIn = polarToCartesian(cx, cy, rIn, startDeg);

    const largeArcFlag = endDeg - startDeg <= 180 ? '0' : '1';

    return [
      'M', startOut.x, startOut.y,
      'A', rOut, rOut, 0, largeArcFlag, 1, endOut.x, endOut.y,
      'L', startIn.x, startIn.y,
      'A', rIn, rIn, 0, largeArcFlag, 0, endIn.x, endIn.y,
      'Z',
    ].join(' ');
  };

  return (
    <div
      id="radar-progress-widget"
      className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/80 transition-all hover:shadow-md"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left / Info Text */}
        <div className="flex-1 text-start">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1a4d2e]/10 text-[#1a4d2e]">
              <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
              {t.progressTitle}
            </span>
            <span className="text-xs font-medium text-stone-500">
              ({completedCount}/5 {t.partiesCount})
            </span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            {t.appTitle}
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-md">
            {t.progressSubtitle}
          </p>

          {/* Quick status message */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                completedCount === 5 ? 'bg-[#27ae60] ring-4 ring-[#27ae60]/20 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-xs font-medium text-stone-700">
              {completedCount === 5 ? t.readyToSolemnize : `${5 - completedCount} ${t.pendingParties}`}
            </span>
          </div>

          {/* Role selection quick pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {SEGMENTS.map((seg, idx) => {
              const isComp = parties[seg.role].isCompleted;
              const isActive = activeRole === seg.role;
              return (
                <button
                  key={seg.role}
                  id={`pill-${seg.role}`}
                  onClick={() => onSelectRole(seg.role)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1a4d2e] text-white shadow-sm ring-2 ring-[#1a4d2e]/30'
                      : isComp
                      ? 'bg-[#27ae60]/10 text-[#27ae60] hover:bg-[#27ae60]/20'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isComp ? 'bg-[#27ae60]' : 'bg-stone-400'
                    }`}
                  />
                  <span>
                    {idx + 1}. {t[seg.labelKey].split(' ')[0]}
                  </span>
                  {isComp && <Check className="w-3.5 h-3.5 text-[#27ae60]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / SVG 5-Segment Donut Radar */}
        <div className="relative flex flex-col items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible drop-shadow-sm select-none"
          >
            {/* Background subtle full circle glow */}
            <circle
              cx={center}
              cy={center}
              r={outerR + 4}
              fill="none"
              stroke="#f5f5f4"
              strokeWidth="2"
            />

            {/* 5 Segments */}
            {SEGMENTS.map((seg, idx) => {
              const startDeg = idx * segDeg + gapDeg / 2;
              const endDeg = (idx + 1) * segDeg - gapDeg / 2;
              const isComp = parties[seg.role].isCompleted;
              const isActive = activeRole === seg.role;

              const pathData = describeArc(center, center, innerR, outerR, startDeg, endDeg);

              // Mid angle for active dot/check mark
              const midDeg = (startDeg + endDeg) / 2;
              const midPoint = polarToCartesian(center, center, (innerR + outerR) / 2, midDeg);

              return (
                <g key={seg.role} className="cursor-pointer" onClick={() => onSelectRole(seg.role)}>
                  <path
                    d={pathData}
                    fill={isComp ? '#27ae60' : isActive ? '#d1e7dd' : '#e7e5e4'}
                    stroke={isActive ? '#1a4d2e' : isComp ? '#1e8449' : '#d6d3d1'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="transition-all duration-300 hover:opacity-90"
                    style={{
                      filter: isActive ? 'drop-shadow(0 2px 4px rgba(26, 77, 46, 0.25))' : undefined,
                    }}
                  />

                  {/* Marker Dot / Check Mark inside segment */}
                  {isComp ? (
                    <circle
                      cx={midPoint.x}
                      cy={midPoint.y}
                      r="9"
                      fill="#ffffff"
                      stroke="#27ae60"
                      strokeWidth="1.5"
                    />
                  ) : (
                    <circle
                      cx={midPoint.x}
                      cy={midPoint.y}
                      r="4"
                      fill={isActive ? '#1a4d2e' : '#a8a29e'}
                    />
                  )}

                  {isComp && (
                    <text
                      x={midPoint.x}
                      y={midPoint.y + 3.5}
                      textAnchor="middle"
                      fill="#27ae60"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="system-ui"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center Inner Circle: Displays Progress percentage and badge */}
            <circle
              cx={center}
              cy={center}
              r={innerR - 6}
              fill="#ffffff"
              stroke="#e7e5e4"
              strokeWidth="1"
            />
          </svg>

          {/* Overlay text in the absolute center of the donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-3xl font-extrabold text-[#1a4d2e] tracking-tight">
              {percentage}%
            </span>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              {completedCount}/5 {t.partiesCount}
            </span>
            {completedCount === 5 ? (
              <span className="mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#27ae60] text-white">
                Gültig ✓
              </span>
            ) : (
              <span className="mt-0.5 text-[10px] text-amber-600 font-medium">
                In Bearbeitung
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
