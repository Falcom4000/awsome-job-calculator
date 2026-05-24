"use client";

import { AlertTriangle, ArrowLeft, BriefcaseBusiness, ChevronRight, Gauge, LineChart, Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";
import type { ReactNode, FormEvent } from "react";
import { useState, useRef } from "react";

import { cityBenchmarks, industryBenchmarks, roleBenchmarks } from "@/data/job-market";
import {
  calculateJobScore,
  defaultInputs,
  dimensionLabels,
  type Certainty,
  type CityKey,
  type CompanySize,
  type BusinessState,
  type EnterpriseNatureInput,
  type IndustryKey,
  type InputMode,
  type JobInputs,
  type JobLevelInput,
  type OfferParity,
  type RoleKey,
  type WeekendWork,
} from "@/lib/job-scoring";

type RatingOption = {
  score: number;
  title: string;
  description: string;
};

const SHARE_URL = "https://awsome-job-calculator.vercel.app/";

type RatingCopyKey =
  | "stress"
  | "benefitsLevel"
  | "atmosphere"
  | "peopleHealth"
  | "healthImpact"
  | "lifeAndLearningTime"
  | "safetyFeeling"
  | "roleCore"
  | "replacementDifficulty"
  | "layoffRisk"
  | "pastGrowth"
  | "futureGrowth"
  | "closeToCoreBusiness"
  | "mentoring"
  | "resumeValue"
  | "externalOpportunities"
  | "jdMatch"
  | "projectExplainability"
  | "companyTransferability"
  | "industryTransferability"
  | "longTermFit"
  | "industryLove"
  | "contentLove"
  | "extraLearningWillingness";

const genericRatingOptions: RatingOption[] = [
  { score: 1, title: "很拉胯", description: "已经是明显短板。" },
  { score: 2, title: "有点拖", description: "不算灾难，但会消耗。" },
  { score: 3, title: "还行", description: "普通水平，先不加戏。" },
  { score: 4, title: "挺加分", description: "比平均好，能撑起体验。" },
  { score: 5, title: "很能打", description: "这是这份工作的核心优势。" },
];

const ratingCopy: Record<RatingCopyKey, RatingOption[]> = {
  stress: [
    { score: 1, title: "很窒息", description: "经常焦虑，下班也缓不过来。" },
    { score: 2, title: "偏顶", description: "能扛，但恢复成本不低。" },
    { score: 3, title: "还行", description: "忙归忙，总体还能接受。" },
    { score: 4, title: "比较稳", description: "大多数时候节奏可控。" },
    { score: 5, title: "很松弛", description: "压力低，基本不内耗。" },
  ],
  benefitsLevel: [
    { score: 1, title: "几乎裸奔", description: "保障、假期、补贴都明显不足。" },
    { score: 2, title: "偏少", description: "基础有一点，但整体不香。" },
    { score: 3, title: "正常", description: "常规配置，不拖后腿。" },
    { score: 4, title: "挺舒服", description: "保障完整，还有一些实用福利。" },
    { score: 5, title: "很香", description: "福利扎实，确实能提升体验。" },
  ],
  atmosphere: [
    { score: 1, title: "氛围很差", description: "有明显 PUA、甩锅、内斗或不尊重。" },
    { score: 2, title: "氛围偏差", description: "沟通成本高，人际关系消耗明显。" },
    { score: 3, title: "普通", description: "没明显问题，但也谈不上舒服。" },
    { score: 4, title: "较好", description: "同事和老板基本正常，合作顺畅。" },
    { score: 5, title: "很好", description: "氛围舒服，信任度高，沟通成本低。" },
  ],
  peopleHealth: [
    { score: 1, title: "很消耗", description: "甩锅、内斗、失信或情绪化管理明显。" },
    { score: 2, title: "偏消耗", description: "沟通和协作经常消耗精力。" },
    { score: 3, title: "一般", description: "有摩擦，但没有明显恶性问题。" },
    { score: 4, title: "较舒服", description: "大多数沟通直接、稳定、可预期。" },
    { score: 5, title: "很舒服", description: "尊重边界，合作省心，信任成本低。" },
  ],
  healthImpact: [
    { score: 1, title: "很伤身", description: "已经明显影响睡眠、情绪或身体状态。" },
    { score: 2, title: "有点伤", description: "经常疲惫，恢复成本偏高。" },
    { score: 3, title: "还行", description: "有消耗，但整体还能恢复。" },
    { score: 4, title: "较健康", description: "大多数时候状态稳定。" },
    { score: 5, title: "很健康", description: "基本不伤身，节奏可持续。" },
  ],
  lifeAndLearningTime: [
    { score: 1, title: "完全没有", description: "下班后只想恢复，生活和学习被挤掉。" },
    { score: 2, title: "很少", description: "偶尔有时间，但很难稳定安排。" },
    { score: 3, title: "一般", description: "能保住基本生活，但余量不多。" },
    { score: 4, title: "比较有", description: "有稳定时间生活、学习或运动。" },
    { score: 5, title: "很充足", description: "工作之外仍有明显自主时间。" },
  ],
  safetyFeeling: [
    { score: 1, title: "很悬", description: "随时可能出问题。" },
    { score: 2, title: "不太稳", description: "组织、业务或岗位有明显风险。" },
    { score: 3, title: "一般", description: "有风险，但还没到警报级别。" },
    { score: 4, title: "比较稳", description: "短中期看问题不大。" },
    { score: 5, title: "很稳", description: "公司、团队和岗位都比较稳。" },
  ],
  roleCore: [
    { score: 1, title: "很边缘", description: "主要做杂活、支持、低价值维护。" },
    { score: 2, title: "偏边缘", description: "对业务有帮助，但不是关键环节。" },
    { score: 3, title: "中等", description: "参与重要流程，但不是核心决策或核心产出。" },
    { score: 4, title: "较核心", description: "负责关键模块，对业务结果有明显影响。" },
    { score: 5, title: "非常核心", description: "直接参与核心收入、产品、策略或关键决策。" },
  ],
  replacementDifficulty: [
    { score: 1, title: "很容易", description: "岗位标准化强，替换成本很低。" },
    { score: 2, title: "偏容易", description: "有一定门槛，但外部替代人选较多。" },
    { score: 3, title: "中等", description: "需要业务熟悉度或经验，但不是不可替代。" },
    { score: 4, title: "较难", description: "能力、经验或上下文积累有明显壁垒。" },
    { score: 5, title: "很难", description: "短期很难找到同等产出的人替代。" },
  ],
  layoffRisk: [
    { score: 1, title: "风险很高", description: "组织或岗位有明显优化风险。" },
    { score: 2, title: "偏危险", description: "有一些不稳定信号，需要留意。" },
    { score: 3, title: "一般", description: "看不出特别安全，也没有明显危险。" },
    { score: 4, title: "较安全", description: "短期被优化概率较低。" },
    { score: 5, title: "很安全", description: "岗位和团队都比较稳。" },
  ],
  pastGrowth: [
    { score: 1, title: "几乎没有", description: "几乎没有成长，甚至感觉能力在退化。" },
    { score: 2, title: "成长较少", description: "大多是重复劳动或内部经验。" },
    { score: 3, title: "有一定成长", description: "有一定成长，但不算明显。" },
    { score: 4, title: "成长明显", description: "能力、认知或履历都有提升。" },
    { score: 5, title: "成长很快", description: "明显进入更高水平或新阶段。" },
  ],
  futureGrowth: [
    { score: 1, title: "看不到", description: "基本看不到成长空间。" },
    { score: 2, title: "有限", description: "成长空间有限，可能很快重复。" },
    { score: 3, title: "还有一些", description: "还有一些成长，但不确定。" },
    { score: 4, title: "较好", description: "成长空间较好，有明确可学的东西。" },
    { score: 5, title: "很大", description: "未来一年大概率继续显著升值。" },
  ],
  closeToCoreBusiness: [
    { score: 1, title: "很远", description: "离收入、产品或关键决策很远。" },
    { score: 2, title: "偏远", description: "支持核心业务，但接触有限。" },
    { score: 3, title: "中等", description: "参与核心流程的一部分。" },
    { score: 4, title: "较近", description: "能直接影响关键业务结果。" },
    { score: 5, title: "非常近", description: "直接站在核心价值链上。" },
  ],
  mentoring: [
    { score: 1, title: "没人带", description: "基本靠自己摸索，反馈和指导很少。" },
    { score: 2, title: "带得少", description: "偶尔有指导，但系统性不足。" },
    { score: 3, title: "一般", description: "能获得基本反馈和经验传递。" },
    { score: 4, title: "较好", description: "有人能持续给方向、标准和反馈。" },
    { score: 5, title: "很好", description: "身边有高水平的人带，成长速度明显提升。" },
  ],
  resumeValue: [
    { score: 1, title: "几乎不加分", description: "经历难以对外解释，简历价值弱。" },
    { score: 2, title: "加分有限", description: "能写一些，但市场识别度不高。" },
    { score: 3, title: "普通", description: "能支撑基本履历，但亮点不突出。" },
    { score: 4, title: "较加分", description: "有明确成果、指标或难度。" },
    { score: 5, title: "很加分", description: "对外非常好讲，能明显提升市场定价。" },
  ],
  externalOpportunities: [
    { score: 1, title: "几乎没有", description: "几乎没人找，也很难匹配外部岗位。" },
    { score: 2, title: "偶尔有", description: "偶尔有机会，但质量一般或匹配度低。" },
    { score: 3, title: "有一些", description: "有一些机会，但不确定能否拿到好 offer。" },
    { score: 4, title: "机会较多", description: "能匹配不少不错岗位。" },
    { score: 5, title: "需求很强", description: "容易获得高质量机会。" },
  ],
  jdMatch: [
    { score: 1, title: "很低", description: "外部 JD 关键要求大多不匹配。" },
    { score: 2, title: "偏低", description: "能匹配少量要求，但短板明显。" },
    { score: 3, title: "一般", description: "能匹配常见要求，但优势不突出。" },
    { score: 4, title: "较高", description: "能匹配多数目标岗位要求。" },
    { score: 5, title: "很高", description: "与目标岗位高度契合，竞争力明确。" },
  ],
  projectExplainability: [
    { score: 1, title: "讲不清", description: "几乎讲不清，主要是内部系统和内部流程。" },
    { score: 2, title: "较难讲", description: "能讲一些，但外部不容易理解价值。" },
    { score: 3, title: "基本能讲", description: "可以讲清基本价值，但不够突出。" },
    { score: 4, title: "比较好讲", description: "有明确成果、指标或技术难度。" },
    { score: 5, title: "非常好讲", description: "项目有清晰影响力、难度和可迁移价值。" },
  ],
  companyTransferability: [
    { score: 1, title: "很弱", description: "强依赖当前公司上下文，换公司价值下降明显。" },
    { score: 2, title: "偏弱", description: "部分能力可迁移，但需要较长适应。" },
    { score: 3, title: "一般", description: "基础能力可迁移，部分经验公司专用。" },
    { score: 4, title: "较强", description: "换到同类公司仍容易被认可。" },
    { score: 5, title: "很强", description: "跨公司复用度高，市场认可清晰。" },
  ],
  industryTransferability: [
    { score: 1, title: "很弱", description: "高度依赖当前行业，跨行业价值很低。" },
    { score: 2, title: "偏弱", description: "跨行业需要明显补课或降级。" },
    { score: 3, title: "一般", description: "有部分通用能力可迁移。" },
    { score: 4, title: "较强", description: "跨到相邻行业仍有竞争力。" },
    { score: 5, title: "很强", description: "能力跨行业通用，选择面很宽。" },
  ],
  longTermFit: [
    { score: 1, title: "明显不适合", description: "明显不喜欢，不适合长期做。" },
    { score: 2, title: "不太喜欢", description: "不太喜欢，经常内耗。" },
    { score: 3, title: "一般", description: "不讨厌但也谈不上喜欢。" },
    { score: 4, title: "比较匹配", description: "比较喜欢，适合当前阶段。" },
    { score: 5, title: "很匹配", description: "很喜欢，也愿意长期投入。" },
  ],
  industryLove: [
    { score: 1, title: "明显不喜欢", description: "对行业缺乏认同，长期做会消耗。" },
    { score: 2, title: "不太喜欢", description: "能做，但兴趣和认同感偏弱。" },
    { score: 3, title: "一般", description: "不排斥，但也没有明显热情。" },
    { score: 4, title: "比较喜欢", description: "认可行业，愿意继续积累。" },
    { score: 5, title: "很喜欢", description: "高度认同行业，愿意长期投入。" },
  ],
  contentLove: [
    { score: 1, title: "明显不喜欢", description: "工作内容让人排斥或持续内耗。" },
    { score: 2, title: "不太喜欢", description: "能完成，但经常缺乏动力。" },
    { score: 3, title: "一般", description: "不讨厌，但也没有明显兴趣。" },
    { score: 4, title: "比较喜欢", description: "大部分内容适合自己。" },
    { score: 5, title: "很喜欢", description: "内容本身有吸引力，愿意持续钻研。" },
  ],
  extraLearningWillingness: [
    { score: 1, title: "不愿意", description: "完全不想为这条路额外投入。" },
    { score: 2, title: "偏低", description: "只有被动需要时才会学习。" },
    { score: 3, title: "一般", description: "愿意做必要学习，但主动性有限。" },
    { score: 4, title: "较愿意", description: "愿意持续补能力、做积累。" },
    { score: 5, title: "很愿意", description: "愿意长期主动投入，形成复利。" },
  ],
};

const educationOptions = ["高中/中专", "大专", "本科", "硕士", "博士", "其他"];
const enterpriseNatureOptions: Array<{ value: Exclude<EnterpriseNatureInput, "">; label: string }> = [
  { value: "state_owned", label: "国有企业" },
  { value: "foreign", label: "外资企业" },
  { value: "private_leading", label: "民营龙头" },
  { value: "private_general", label: "民营普通" },
  { value: "unknown", label: "不清楚" },
];
const jobLevelOptions: Array<{ value: Exclude<JobLevelInput, "">; label: string }> = [
  { value: "general_staff", label: "普通职员 / 执行岗" },
  { value: "senior_staff", label: "高级职员 / 资深岗" },
  { value: "middle_manager", label: "中层经理" },
  { value: "senior_management", label: "高级管理" },
  { value: "unknown", label: "不清楚" },
];
function NumberField({
  label,
  value,
  suffix,
  note,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  note?: string;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid content-start gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <input
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-stone-950 outline-none"
          min={min}
          type="number"
          placeholder="0"
          value={value === 0 ? "" : value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix ? <span className="flex items-center bg-stone-100 px-3 text-sm text-stone-500">{suffix}</span> : null}
      </div>
      {note ? <span className="text-xs leading-5 text-stone-500">{note}</span> : null}
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: Array<{ value: T; label: string }>;
  onChange: (value: T | "") => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-semibold text-stone-950 shadow-sm outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        <option value="">请选择</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function RatingField({
  label,
  value,
  low,
  high,
  copyKey,
  onChange,
}: {
  label: string;
  value: number | null;
  low: string;
  high: string;
  copyKey?: RatingCopyKey;
  onChange: (value: number) => void;
}) {
  const options = copyKey ? ratingCopy[copyKey] : genericRatingOptions;
  const selectedOption = options.find((option) => option.score === value);

  return (
    <div className="grid gap-3 md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-stone-700">{label}</span>
        <span className="hidden text-xs text-stone-500 sm:inline">
          {low} / {high}
        </span>
      </div>
      <div className="relative min-h-10 sm:hidden">
        <span className="absolute left-0 top-1/2 max-w-14 -translate-y-1/2 text-left text-xs leading-4 text-stone-500">{low}</span>
        <div className="mx-auto grid w-[14rem] max-w-[calc(100%-7rem)] grid-cols-5 justify-items-center">
          {options.map((option) => {
            const selected = value === option.score;
            return (
              <button
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black transition ${
                  selected
                    ? "border-emerald-900 bg-emerald-900 text-white shadow-sm"
                    : "border-stone-200 bg-white text-stone-950 hover:border-emerald-300"
                }`}
                key={option.score}
                type="button"
                onClick={() => onChange(option.score)}
                aria-label={`${option.score}，${option.title}`}
              >
                {option.score}
              </button>
            );
          })}
        </div>
        <span className="absolute right-0 top-1/2 max-w-14 -translate-y-1/2 text-right text-xs leading-4 text-stone-500">{high}</span>
      </div>
      {selectedOption ? (
        <div className="rounded-xl border border-stone-200 bg-white px-3 py-2 sm:hidden">
          <p className="text-sm font-black leading-5 text-stone-900">{selectedOption.title}</p>
          <p className="mt-1 text-xs leading-5 text-stone-500">{selectedOption.description}</p>
        </div>
      ) : null}
      <div className="hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5">
        {options.map((option) => {
          const selected = value === option.score;
          return (
            <button
              className={`flex min-h-[148px] flex-col rounded-2xl border p-3 text-left transition ${
                selected
                  ? "border-emerald-900 bg-emerald-900 text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:border-emerald-300"
              }`}
              key={option.score}
              type="button"
              onClick={() => onChange(option.score)}
            >
              <span className={`block h-7 text-lg font-black leading-7 ${selected ? "text-white" : "text-stone-950"}`}>{option.score}</span>
              <span className={`mt-2 block min-h-5 text-sm font-black leading-5 ${selected ? "text-emerald-50" : "text-stone-800"}`}>{option.title}</span>
              <span className={`mt-2 block text-xs leading-5 ${selected ? "text-emerald-100" : "text-stone-500"}`}>{option.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-black text-stone-950">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function RadarChart({ values }: { values: Array<{ label: string; value: number }> }) {
  const size = 720;
  const center = size / 2;
  const radius = 170;
  const labelRadius = 238;
  const points = values.map((item, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
    const itemRadius = (item.value / 100) * radius;
    const rawLabelX = center + Math.cos(angle) * labelRadius;
    const labelAnchor: "end" | "start" | "middle" = rawLabelX < center - 12 ? "end" : rawLabelX > center + 12 ? "start" : "middle";
    return {
      ...item,
      x: center + Math.cos(angle) * itemRadius,
      y: center + Math.sin(angle) * itemRadius,
      labelX: labelAnchor === "end" ? Math.max(rawLabelX, 92) : labelAnchor === "start" ? Math.min(rawLabelX, size - 92) : rawLabelX,
      labelY: center + Math.sin(angle) * labelRadius,
      labelAnchor,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg className="h-auto w-full max-w-[680px]" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="六维雷达图">
      {[0.25, 0.5, 0.75, 1].map((level) => {
        const ring = values
          .map((_, index) => {
            const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
            return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
          })
          .join(" ");
        return <polygon fill="none" key={level} points={ring} stroke="#e7e5e4" strokeWidth="1.5" />;
      })}
      {points.map((point) => (
        <line key={point.label} stroke="#e7e5e4" strokeWidth="1.5" x1={center} x2={point.axisX} y1={center} y2={point.axisY} />
      ))}
      <polygon fill="rgba(16, 185, 129, 0.24)" points={polygon} stroke="#065f46" strokeWidth="3" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} fill="#064e3b" r="4" />
          <text
            dominantBaseline="middle"
            fill="#44403c"
            fontSize="30"
            fontWeight="900"
            textAnchor={point.labelAnchor}
            x={point.labelX}
            y={point.labelY}
          >
            <tspan>{point.label}</tspan>
            <tspan dx="6" fill="#064e3b">
              {point.value}
            </tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function JobCalculator() {
  const [inputs, setInputs] = useState<JobInputs>(defaultInputs);
  const [submittedInputs, setSubmittedInputs] = useState<JobInputs | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);
  const calculationTimerRef = useRef<number | null>(null);
  const shareCaptureRef = useRef<HTMLDivElement | null>(null);
  const result = submittedInputs ? calculateJobScore(submittedInputs) : null;
  const setValue = <K extends keyof JobInputs>(key: K, value: JobInputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };
  const radarValues = result
    ? Object.entries(result.dimensions).map(([key, value]) => ({
        label: dimensionLabels[key as keyof typeof dimensionLabels],
        value,
      }))
    : [];
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (calculationTimerRef.current !== null) {
      window.clearInterval(calculationTimerRef.current);
    }
    setIsCalculating(true);
    setCalculationProgress(0);
    const startedAt = Date.now();
    const duration = 1500;

    calculationTimerRef.current = window.setInterval(() => {
      const progress = Math.min(((Date.now() - startedAt) / duration) * 100, 99);
      setCalculationProgress(progress);
    }, 50);
    window.setTimeout(() => {
      if (calculationTimerRef.current !== null) {
        window.clearInterval(calculationTimerRef.current);
        calculationTimerRef.current = null;
      }
      const score = calculateJobScore(inputs);
      void fetch("/api/job-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs, result: score }),
        keepalive: true,
      }).catch((error: unknown) => {
        console.warn("Failed to save job submission", error);
      });
      setCalculationProgress(100);
      setSubmittedInputs(inputs);
      setIsCalculating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, duration);
  };
  const handleBack = () => {
    setSubmittedInputs(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleShareImage = async () => {
    if (!shareCaptureRef.current || isSharing) return;

    setIsSharing(true);
    try {
      const [captureUrl, qrUrl] = await Promise.all([
        toPng(shareCaptureRef.current, {
          backgroundColor: "#f4efe4",
          cacheBust: true,
          pixelRatio: 2,
        }),
        QRCode.toDataURL(SHARE_URL, {
          margin: 1,
          width: 240,
          color: {
            dark: "#0f3f2f",
            light: "#ffffff",
          },
        }),
      ]);

      const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = src;
        });

      const [captureImage, qrImage] = await Promise.all([loadImage(captureUrl), loadImage(qrUrl)]);
      const footerHeight = 220;
      const footerGap = 32;
      const deviceWidth = Math.min(window.innerWidth || shareCaptureRef.current.clientWidth, shareCaptureRef.current.clientWidth);
      const deviceHeight = window.innerHeight || deviceWidth * 1.8;
      const deviceAspectRatio = deviceWidth / deviceHeight;
      const outerPadding = Math.round(Math.min(Math.max(deviceWidth * 0.12, 40), 72));
      const padding = 42;
      const qrSize = 156;
      const fixedHeight = footerGap + footerHeight + outerPadding * 2;
      const fixedWidth = outerPadding * 2;
      const scaleDenominator = captureImage.width - deviceAspectRatio * captureImage.height;
      const idealScale =
        scaleDenominator > 0 ? (deviceAspectRatio * fixedHeight - fixedWidth) / scaleDenominator : 1;
      const captureScale = Math.min(Math.max(idealScale, 1), 1.14);
      const captureWidth = Math.round(captureImage.width * captureScale);
      const captureHeight = Math.round(captureImage.height * captureScale);
      const canvasHeight = captureHeight + footerGap + footerHeight + outerPadding * 2;
      const baseCanvasWidth = captureWidth + outerPadding * 2;
      const minCanvasWidth = Math.ceil(canvasHeight * deviceAspectRatio);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(baseCanvasWidth, minCanvasWidth);
      canvas.height = canvasHeight;
      const contentX = Math.round((canvas.width - captureWidth) / 2);

      const context = canvas.getContext("2d");
      if (!context) return;

      context.fillStyle = "#f4efe4";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(captureImage, contentX, outerPadding, captureWidth, captureHeight);

      const footerY = outerPadding + captureHeight + footerGap;
      context.fillStyle = "#ffffff";
      context.fillRect(contentX, footerY, captureWidth, footerHeight);
      context.drawImage(qrImage, contentX + padding, footerY + (footerHeight - qrSize) / 2, qrSize, qrSize);

      const textX = contentX + padding + qrSize + 28;
      context.fillStyle = "#0f172a";
      context.font = "700 34px sans-serif";
      context.fillText("扫码测测你的工作疯得值不值", textX, footerY + 78);
      context.fillStyle = "#64748b";
      context.font = "500 24px sans-serif";
      context.fillText(SHARE_URL, textX, footerY + 120);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "job-calculator-report.png";
      link.click();
    } catch (error) {
      console.warn("Failed to generate share image", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe4] text-stone-950">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-8 lg:px-8">
        {isCalculating ? (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-900/10 bg-stone-950 p-8 text-white shadow-2xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-300/30 blur-2xl" />
              <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-amber-300/20 blur-2xl" />
              <div className="relative">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-emerald-300" />
                <p className="mt-6 text-center text-xs font-bold tracking-[0.24em] text-emerald-200">正在计算</p>
                <h1 className="mt-2 text-center text-3xl font-black">正在算这班值不值</h1>
                <p className="mt-3 max-w-md text-center text-sm leading-6 text-stone-300">
                  正在匹配薪酬分位、城市基准和六维评分。
                </p>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.55)] transition-[width] duration-100 ease-linear"
                    style={{ width: `${Math.max(calculationProgress, 4)}%` }}
                  />
                </div>
                <p className="mt-3 text-center text-sm font-black text-emerald-200">{Math.round(calculationProgress)}%</p>
              </div>
            </div>
          </div>
        ) : !result ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <header className="relative overflow-hidden rounded-[2rem] border border-stone-900/10 bg-stone-950 px-6 py-7 text-white shadow-xl md:rounded-[2.5rem] md:p-9">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-amber-200/10 blur-2xl" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
              <h1 className="shrink-0 text-left text-[2.25rem] font-black tracking-tight md:text-[3.5rem]">打工哪有不疯的</h1>
              <p className="text-left text-[1.45rem] font-black leading-tight tracking-tight text-emerald-100 md:text-right md:text-[2.2rem]">
                测测这份工作疯得值不值
              </p>
            </div>
          </header>

          <section className="rounded-[2rem] border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                ["brief", "快速评估", "少填一点，先看大方向"],
                ["detailed", "完整评估", "多填一点，对标更细"],
              ].map(([mode, title, description]) => (
                <button
                  className={`rounded-[1.5rem] border p-4 text-left transition ${
                    inputs.mode === mode
                      ? "border-emerald-900 bg-emerald-900 text-white"
                      : "border-stone-200 bg-white text-stone-950 hover:border-emerald-300"
                  }`}
                  key={mode}
                  type="button"
                  onClick={() => setValue("mode", mode as InputMode)}
                >
                  <p className="text-base font-black sm:text-lg">{title}</p>
                  <p className={`mt-1 text-xs leading-5 sm:text-sm ${inputs.mode === mode ? "text-emerald-100" : "text-stone-500"}`}>
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <Section eyebrow="第一步" title="基础信息">
            <SelectField
              label="所在城市"
              options={Object.entries(cityBenchmarks).map(([value, item]) => ({ value: value as CityKey, label: item.label }))}
              value={inputs.city}
              onChange={(value) => setValue("city", value)}
            />
            <SelectField
              label="行业"
              options={Object.entries(industryBenchmarks).map(([value, item]) => ({ value: value as IndustryKey, label: item.label }))}
              value={inputs.industry}
              onChange={(value) => setValue("industry", value)}
            />
            <SelectField<JobLevelInput>
              label="岗位层级"
              options={jobLevelOptions}
              value={inputs.jobLevel}
              onChange={(value) => setValue("jobLevel", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField
                  label="学历"
                  options={educationOptions.map((item) => ({ value: item, label: item }))}
                  value={inputs.education}
                  onChange={(value) => setValue("education", value)}
                />
                <NumberField label="年龄" suffix="岁" value={inputs.age} onChange={(value) => setValue("age", value)} />
                <NumberField label="工作年限" suffix="年" value={inputs.experienceYears} onChange={(value) => setValue("experienceYears", value)} />
                <SelectField
                  label="岗位"
                  options={Object.entries(roleBenchmarks).map(([value, item]) => ({ value: value as RoleKey, label: item.label }))}
                  value={inputs.role}
                  onChange={(value) => setValue("role", value)}
                />
                <SelectField<EnterpriseNatureInput>
                  label="企业性质"
                  options={enterpriseNatureOptions}
                  value={inputs.enterpriseNature}
                  onChange={(value) => setValue("enterpriseNature", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第二步" title="回报水平">
            <NumberField
              label={inputs.mode === "detailed" ? "税前总包：现金部分" : "税前总包"}
              suffix="元/年"
              value={inputs.annualCashIncome}
              onChange={(value) => setValue("annualCashIncome", value)}
            />
            {inputs.mode === "detailed" ? (
              <NumberField
                label="税前总包：股权/期权年化"
                suffix="元/年"
                value={inputs.annualEquityIncome}
                onChange={(value) => setValue("annualEquityIncome", value)}
              />
            ) : null}
            <p className="text-sm leading-6 text-stone-500 md:col-span-2">
              税前总包包括固定工资、现金奖金、现金补贴、股权、期权、股票等预计年化收益。
            </p>
          </Section>

          <Section eyebrow="第三步" title="舒适度">
            <NumberField
              label="每周工时"
              suffix="小时"
              note="指从上班到下班的时间差。"
              value={inputs.weeklyHours}
              onChange={(value) => setValue("weeklyHours", value)}
            />
            <NumberField label="单程通勤时间" suffix="分钟" value={inputs.commuteMinutes} onChange={(value) => setValue("commuteMinutes", value)} />
            <RatingField label="工作压力" low="压力大" high="从容" copyKey="stress" value={inputs.stress} onChange={(value) => setValue("stress", value)} />
            <RatingField label="福利水平" low="弱" high="好" copyKey="benefitsLevel" value={inputs.benefitsLevel} onChange={(value) => setValue("benefitsLevel", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<WeekendWork>
                  label="周末工作频率"
                  options={[
                    { value: "never", label: "从不" },
                    { value: "sometimes", label: "偶尔" },
                    { value: "often", label: "经常" },
                  ]}
                  value={inputs.weekendWork}
                  onChange={(value) => setValue("weekendWork", value)}
                />
                <RatingField label="工作氛围" low="消耗" high="舒服" copyKey="atmosphere" value={inputs.atmosphere} onChange={(value) => setValue("atmosphere", value)} />
                <RatingField label="人际关系" low="消耗" high="舒服" copyKey="peopleHealth" value={inputs.peopleHealth} onChange={(value) => setValue("peopleHealth", value)} />
                <RatingField label="健康影响" low="伤身" high="健康" copyKey="healthImpact" value={inputs.healthImpact} onChange={(value) => setValue("healthImpact", value)} />
                <RatingField
                  label="学习生活余量"
                  low="没余量"
                  high="很充足"
                  copyKey="lifeAndLearningTime"
                  value={inputs.lifeAndLearningTime}
                  onChange={(value) => setValue("lifeAndLearningTime", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第四步" title="稳定性">
            <SelectField<CompanySize>
              label="公司规模"
              options={[
                { value: "large", label: "大公司 / 平台型" },
                { value: "medium", label: "中型公司" },
                { value: "small", label: "小公司" },
                { value: "startup", label: "早期团队" },
              ]}
              value={inputs.companySize}
              onChange={(value) => setValue("companySize", value)}
            />
            <SelectField<BusinessState>
              label="公司经营状态"
              options={[
                { value: "good", label: "好" },
                { value: "average", label: "一般" },
                { value: "bad", label: "差" },
                { value: "unknown", label: "不清楚" },
              ]}
              value={inputs.companyBusiness}
              onChange={(value) => setValue("companyBusiness", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<BusinessState>
                  label="行业景气度"
                  options={[
                    { value: "good", label: "好" },
                    { value: "average", label: "一般" },
                    { value: "bad", label: "差" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.industryOutlook}
                  onChange={(value) => setValue("industryOutlook", value)}
                />
                <SelectField<Certainty>
                  label="团队稳定性"
                  options={[
                    { value: "high", label: "高" },
                    { value: "medium", label: "中" },
                    { value: "low", label: "低" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.teamStability}
                  onChange={(value) => setValue("teamStability", value)}
                />
                <RatingField label="岗位核心度" low="边缘" high="核心" copyKey="roleCore" value={inputs.roleCore} onChange={(value) => setValue("roleCore", value)} />
                <RatingField label="被替代难度" low="容易替代" high="很难替代" copyKey="replacementDifficulty" value={inputs.replacementDifficulty} onChange={(value) => setValue("replacementDifficulty", value)} />
                <RatingField label="裁员 / 优化风险" low="风险高" high="安全" copyKey="layoffRisk" value={inputs.layoffRisk} onChange={(value) => setValue("layoffRisk", value)} />
              </>
            ) : null}
            <RatingField label="未来一年安全感" low="不安全" high="很安全" copyKey="safetyFeeling" value={inputs.safetyFeeling} onChange={(value) => setValue("safetyFeeling", value)} />
          </Section>

          <Section eyebrow="第五步" title="成长性">
            <RatingField label="过去半年成长性" low="停滞" high="变强很多" copyKey="pastGrowth" value={inputs.pastGrowth} onChange={(value) => setValue("pastGrowth", value)} />
            <RatingField label="未来一年成长预期" low="有限" high="空间大" copyKey="futureGrowth" value={inputs.futureGrowth} onChange={(value) => setValue("futureGrowth", value)} />
                <RatingField label="核心业务接近度" low="边缘" high="核心" copyKey="closeToCoreBusiness" value={inputs.closeToCoreBusiness} onChange={(value) => setValue("closeToCoreBusiness", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="带教与学习资源" low="没人带" high="学得快" copyKey="mentoring" value={inputs.mentoring} onChange={(value) => setValue("mentoring", value)} />
                <RatingField label="简历加分度" low="弱" high="强" copyKey="resumeValue" value={inputs.resumeValue} onChange={(value) => setValue("resumeValue", value)} />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第六步" title="流动性">
            <RatingField label="外部机会密度" low="很少" high="很多" copyKey="externalOpportunities" value={inputs.externalOpportunities} onChange={(value) => setValue("externalOpportunities", value)} />
            <RatingField label="外部 JD 匹配度" low="低" high="高" copyKey="jdMatch" value={inputs.jdMatch} onChange={(value) => setValue("jdMatch", value)} />
            <RatingField label="项目可讲度" low="难讲" high="好讲" copyKey="projectExplainability" value={inputs.projectExplainability} onChange={(value) => setValue("projectExplainability", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="技能跨公司迁移能力" low="弱" high="强" copyKey="companyTransferability" value={inputs.companyTransferability} onChange={(value) => setValue("companyTransferability", value)} />
                <RatingField label="技能跨行业迁移能力" low="弱" high="强" copyKey="industryTransferability" value={inputs.industryTransferability} onChange={(value) => setValue("industryTransferability", value)} />
                <SelectField<OfferParity>
                  label="同薪 Offer 可得性"
                  options={[
                    { value: "high", label: "高" },
                    { value: "medium", label: "中" },
                    { value: "low", label: "低" },
                    { value: "unknown", label: "未知" },
                  ]}
                  value={inputs.offerParity}
                  onChange={(value) => setValue("offerParity", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第七步" title="匹配度">
            <RatingField label="长期目标符合度" low="不适合" high="很匹配" copyKey="longTermFit" value={inputs.longTermFit} onChange={(value) => setValue("longTermFit", value)} />
            <RatingField label="行业喜欢度" low="不喜欢" high="喜欢" copyKey="industryLove" value={inputs.industryLove} onChange={(value) => setValue("industryLove", value)} />
            <RatingField label="工作内容喜欢度" low="不喜欢" high="喜欢" copyKey="contentLove" value={inputs.contentLove} onChange={(value) => setValue("contentLove", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="额外学习意愿" low="不愿意" high="很愿意" copyKey="extraLearningWillingness" value={inputs.extraLearningWillingness} onChange={(value) => setValue("extraLearningWillingness", value)} />
              </>
            ) : null}
          </Section>

          <div className="rounded-[2rem] border border-stone-900/10 bg-stone-950 p-5 text-white shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mt-1 text-xl font-black">生成发疯性价比报告</p>
              </div>
              <button
                className="rounded-2xl bg-emerald-300 px-8 py-4 text-base font-black text-stone-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isCalculating}
                type="submit"
              >
                {isCalculating ? "计算中..." : "开始计算"}
              </button>
            </div>
          </div>
        </form>
        ) : (
          <div className="space-y-6">
            <div ref={shareCaptureRef} className="space-y-6 bg-[#f4efe4]">
            <header className="rounded-[2.5rem] border border-stone-900/10 bg-stone-950 p-7 text-white shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
                  <BriefcaseBusiness className="h-4 w-4" />
                  发疯报告
                </div>
              </div>
              <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_260px] md:items-center">
                <div>
                  <div className="flex items-center gap-5 md:gap-6">
                    <div className="flex h-28 w-24 shrink-0 items-center justify-center text-white md:h-36 md:w-32">
                      <span className="text-8xl font-black leading-none md:text-9xl">{result.rating.grade}</span>
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{result.rating.title}</h1>
                      <p className="mt-2 max-w-2xl text-base leading-7 text-stone-300 md:mt-3 md:text-lg md:leading-8">{result.rating.description}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[2rem] bg-white p-5 text-stone-950">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-stone-500">总得分</p>
                    <Gauge className="h-5 w-5 text-emerald-800" />
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-7xl font-black leading-none">{result.total}</span>
                    <span className="pb-2 text-xl font-bold text-stone-500">/ 100</span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-stone-500">约超过 {result.rating.percentile}% 的工作</p>
                </div>
              </div>
            </header>

            <div className="grid gap-6">
              <div className="space-y-4 rounded-[2.5rem] border border-stone-900/10 bg-white p-5 shadow-lg">
                <div className="flex justify-center overflow-hidden rounded-[2rem] bg-stone-50 px-2 py-2 md:p-4">
                  <div className="-my-6 w-full max-w-[680px] md:-my-8">
                    <RadarChart values={radarValues} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-stone-950 md:rounded-[2rem] md:p-5">
                    <p className="text-sm font-bold text-stone-600">综合收益</p>
                    <div className="mt-4 flex items-end gap-1.5 md:gap-2">
                      <span className="text-4xl font-black leading-none md:text-5xl">{result.aggregateScores.benefit}</span>
                      <span className="pb-1 text-sm font-bold text-stone-500">/ 100</span>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-stone-950 md:rounded-[2rem] md:p-5">
                    <p className="text-sm font-bold text-stone-600">综合成本</p>
                    <div className="mt-4 flex items-end gap-1.5 md:gap-2">
                      <span className="text-4xl font-black leading-none md:text-5xl">{result.aggregateScores.cost}</span>
                      <span className="pb-1 text-sm font-bold text-stone-500">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            </div>

            <div className="grid gap-6">
              <div className="space-y-4 rounded-[2.5rem] border border-stone-900/10 bg-white p-5 shadow-2xl">
                <div className="rounded-[1.5rem] border border-stone-200 p-4">
              <div className="flex items-center gap-2 text-sm font-black">
                <LineChart className="h-4 w-4 text-emerald-800" />
                先看结论
              </div>
              <div className="mt-3 grid gap-2 text-sm leading-6 text-stone-600">
                <p>最能打的是：{result.strengths.join("、")}。</p>
                <p>最拖后腿的是：{result.weaknesses.join("、")}。</p>
                <p>
                  退路指数：{result.optionValue} / 100，{result.optionValueDescription}
                </p>
                <p>
                  收入约基准 {result.incomeRatio} 倍，折合{" "}
                  {result.unitHourlyIncome.toLocaleString("zh-CN")} 元/小时。
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-emerald-50 p-4">
              <p className="text-sm font-black text-emerald-950">为什么是这个档</p>
              <div className="mt-3 space-y-2">
                {[...result.strengthReasons, ...result.weaknessReasons].map((reason) => (
                  <p className="text-sm leading-6 text-emerald-900" key={reason}>
                    {reason}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-orange-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-orange-950">
                <AlertTriangle className="h-4 w-4" />
                别忽略这些
              </div>
              <div className="mt-3 space-y-2">
                {result.warnings.slice(0, 4).map((warning) => (
                  <p className="flex gap-2 text-sm leading-6 text-orange-900" key={warning}>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0" />
                    {warning}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-sm font-black">接下来怎么做</p>
              <div className="mt-3 space-y-2">
                {result.suggestions.map((suggestion) => (
                  <p className="text-sm leading-6 text-stone-600" key={suggestion}>
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>

            <details className="rounded-[1.5rem] border border-stone-200 p-4">
              <summary className="cursor-pointer text-sm font-black">数据置信度与口径</summary>
              <div className="mt-3 space-y-3 text-sm leading-6 text-stone-600">
                {Object.entries(result.confidence).map(([key, item]) => (
                  <p key={key}>
                    <span className="font-bold text-stone-950">{dimensionLabels[key as keyof typeof dimensionLabels]}：</span>
                    置信度{item.level}，{item.reason}
                  </p>
                ))}
                {result.dataNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </details>
              </div>

            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-8 py-4 text-base font-black text-stone-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSharing}
                type="button"
                onClick={handleShareImage}
              >
                <Share2 className="h-5 w-5" />
                {isSharing ? "生成中..." : "分享"}
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-950 px-8 py-4 text-base font-black text-white transition hover:bg-emerald-900" type="button" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
                返回
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
