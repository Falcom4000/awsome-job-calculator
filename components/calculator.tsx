"use client";

import { AlertTriangle, BarChart3, BriefcaseBusiness, ChevronRight, Gauge, LineChart, ShieldCheck } from "lucide-react";
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
  type HealthImpact,
  type IndustryKey,
  type InputMode,
  type JobInputs,
  type JobLevelInput,
  type OfferParity,
  type ResidentState,
  type RoleKey,
  type TriState,
  type WeekendWork,
} from "@/lib/job-scoring";

type RatingOption = {
  score: number;
  title: string;
  description: string;
};

type RatingCopyKey =
  | "raisePotential"
  | "stress"
  | "atmosphere"
  | "peopleHealth"
  | "safetyFeeling"
  | "roleCore"
  | "replacementDifficulty"
  | "pastGrowth"
  | "futureGrowth"
  | "closeToCoreBusiness"
  | "qualityProjects"
  | "skillGenerality"
  | "mentoring"
  | "resumeValue"
  | "externalOpportunities"
  | "jdMatch"
  | "projectExplainability"
  | "companyTransferability"
  | "industryTransferability"
  | "jobSearchDifficulty"
  | "longTermFit"
  | "industryLove"
  | "contentLove"
  | "extraLearningWillingness";

const genericRatingOptions: RatingOption[] = [
  { score: 1, title: "很差", description: "明显负面，已经形成主要短板。" },
  { score: 2, title: "偏差", description: "有明显不足，需要主动处理。" },
  { score: 3, title: "中等", description: "普通水平，有好有坏但总体可接受。" },
  { score: 4, title: "较好", description: "明显优于平均，是当前工作的加分项。" },
  { score: 5, title: "很好", description: "非常优秀，是这份工作的核心优势。" },
];

const ratingCopy: Record<RatingCopyKey, RatingOption[]> = {
  raisePotential: [
    { score: 1, title: "几乎没有", description: "未来 1-2 年基本看不到涨薪空间。" },
    { score: 2, title: "偏低", description: "可能小幅上涨，但空间有限或不确定。" },
    { score: 3, title: "一般", description: "有正常调薪机会，但不会明显改变收入水平。" },
    { score: 4, title: "较高", description: "有明确晋升、调薪或奖金提升机会。" },
    { score: 5, title: "很高", description: "未来 1-2 年大概率显著提升收入。" },
  ],
  stress: [
    { score: 1, title: "压力很大", description: "经常焦虑，明显影响情绪或生活。" },
    { score: 2, title: "压力偏大", description: "经常需要硬撑，恢复成本较高。" },
    { score: 3, title: "压力一般", description: "有忙的时候，但总体可接受。" },
    { score: 4, title: "压力较小", description: "大多数时候比较从容。" },
    { score: 5, title: "压力很低", description: "节奏舒适，几乎不内耗。" },
  ],
  atmosphere: [
    { score: 1, title: "氛围很差", description: "有明显 PUA、甩锅、内斗或不尊重。" },
    { score: 2, title: "氛围偏差", description: "沟通成本高，人际关系消耗明显。" },
    { score: 3, title: "普通", description: "没明显问题，但也谈不上舒服。" },
    { score: 4, title: "较好", description: "同事和老板基本正常，合作顺畅。" },
    { score: 5, title: "很好", description: "氛围舒服，信任度高，沟通成本低。" },
  ],
  peopleHealth: [
    { score: 1, title: "很不正常", description: "频繁甩锅、压榨、失信或情绪化管理。" },
    { score: 2, title: "偏不正常", description: "沟通和协作经常消耗精力。" },
    { score: 3, title: "普通", description: "有摩擦，但没有明显恶性问题。" },
    { score: 4, title: "较正常", description: "大多数沟通直接、稳定、可预期。" },
    { score: 5, title: "很正常", description: "尊重边界，合作省心，信任成本低。" },
  ],
  safetyFeeling: [
    { score: 1, title: "很不安全", description: "随时可能出问题。" },
    { score: 2, title: "偏不安全", description: "有明显组织、业务或岗位风险。" },
    { score: 3, title: "一般", description: "有风险但可接受。" },
    { score: 4, title: "比较安全", description: "短中期问题不大。" },
    { score: 5, title: "很安全", description: "公司、团队和岗位都比较稳。" },
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
  qualityProjects: [
    { score: 1, title: "几乎没有", description: "主要是杂事、维护或低价值重复工作。" },
    { score: 2, title: "偏少", description: "有项目，但质量、难度或影响力有限。" },
    { score: 3, title: "一般", description: "有正常项目积累，但亮点不多。" },
    { score: 4, title: "较多", description: "有明确成果、难度或业务影响。" },
    { score: 5, title: "很多", description: "持续接触高质量、高影响力项目。" },
  ],
  skillGenerality: [
    { score: 1, title: "高度绑定", description: "高度绑定当前公司，离开后价值大幅下降。" },
    { score: 2, title: "较多内部经验", description: "外部迁移有难度。" },
    { score: 3, title: "一部分通用", description: "一部分通用，一部分公司专用。" },
    { score: 4, title: "较通用", description: "外部公司容易理解和认可。" },
    { score: 5, title: "非常通用", description: "可迁移到多个公司、岗位或行业。" },
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
  jobSearchDifficulty: [
    { score: 1, title: "很容易", description: "裸辞后预计很快能找到合适机会。" },
    { score: 2, title: "偏容易", description: "有一定难度，但风险可控。" },
    { score: 3, title: "中等", description: "需要认真准备，周期不确定。" },
    { score: 4, title: "偏难", description: "可能遇到较长空窗或明显降级。" },
    { score: 5, title: "很难", description: "裸辞风险很高，5 表示找工作很难。" },
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
const workContentOptions = ["研究分析", "工程开发", "数据/回测", "业务运营", "客户/销售", "管理协调", "内部支持", "低价值维护"];
const targetDirectionOptions = ["同岗位跳槽", "同岗位升档", "转管理", "转技术专家", "转产品/业务", "转行业", "创业/自由职业"];
const longTermDirectionOptions = ["高收入", "稳定生活", "专业深耕", "管理路线", "行业影响力", "自由度", "低消耗"];

function formatMoney(value: number) {
  if (value >= 10000) return `${Math.round(value / 10000)} 万`;
  return value.toLocaleString("zh-CN");
}

function NumberField({
  label,
  value,
  suffix,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <input
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-stone-950 outline-none"
          min={min}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix ? <span className="flex items-center bg-stone-100 px-3 text-sm text-stone-500">{suffix}</span> : null}
      </div>
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

function MultiSelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
}) {
  const toggle = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div className="grid gap-2 md:col-span-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              className={`rounded-full border px-3 py-2 text-sm font-bold transition ${
                selected ? "border-emerald-900 bg-emerald-900 text-white" : "border-stone-200 bg-white text-stone-600 hover:border-emerald-300"
              }`}
              key={option}
              type="button"
              onClick={() => toggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
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

  return (
    <div className="grid gap-2 md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-stone-700">{label}</span>
        <span className="text-xs text-stone-500">
          {low} / {high}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {options.map((option) => {
          const selected = value === option.score;
          return (
            <button
              className={`rounded-2xl border p-3 text-left transition ${
                selected
                  ? "border-emerald-900 bg-emerald-900 text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:border-emerald-300"
              }`}
              key={option.score}
              type="button"
              onClick={() => onChange(option.score)}
            >
              <span className={`block text-lg font-black ${selected ? "text-white" : "text-stone-950"}`}>{option.score}</span>
              <span className={`mt-1 block text-sm font-black ${selected ? "text-emerald-50" : "text-stone-800"}`}>{option.title}</span>
              <span className={`mt-1 block text-xs leading-5 ${selected ? "text-emerald-100" : "text-stone-500"}`}>{option.description}</span>
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
  const size = 420;
  const center = size / 2;
  const radius = 120;
  const labelRadius = 172;
  const points = values.map((item, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
    const itemRadius = (item.value / 100) * radius;
    return {
      ...item,
      x: center + Math.cos(angle) * itemRadius,
      y: center + Math.sin(angle) * itemRadius,
      labelX: center + Math.cos(angle) * labelRadius,
      labelY: center + Math.sin(angle) * labelRadius,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg className="h-auto w-full max-w-[520px] overflow-visible" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="六维雷达图">
      {[0.25, 0.5, 0.75, 1].map((level) => {
        const ring = values
          .map((_, index) => {
            const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
            return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
          })
          .join(" ");
        return <polygon className="fill-none stroke-stone-200" key={level} points={ring} />;
      })}
      {points.map((point) => (
        <line className="stroke-stone-200" key={point.label} x1={center} x2={point.axisX} y1={center} y2={point.axisY} />
      ))}
      <polygon className="fill-emerald-500/25 stroke-emerald-800 stroke-2" points={polygon} />
      {points.map((point) => (
        <g key={point.label}>
          <circle className="fill-emerald-900" cx={point.x} cy={point.y} r="4" />
          <text
            className="fill-stone-700 text-[15px] font-black"
            dominantBaseline="middle"
            textAnchor={point.labelX < center - 12 ? "end" : point.labelX > center + 12 ? "start" : "middle"}
            x={point.labelX}
            y={point.labelY}
          >
            {point.label}
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
  const [calculationProgress, setCalculationProgress] = useState(0);
  const calculationTimerRef = useRef<number | null>(null);
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
    const duration = 2000;

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
    }, 1000);
  };
  const handleBack = () => {
    setSubmittedInputs(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                <p className="mt-6 text-center text-xs font-bold tracking-[0.24em] text-emerald-200">正在评估</p>
                <h1 className="mt-2 text-center text-3xl font-black">正在生成工作资产报告</h1>
                <p className="mt-3 max-w-md text-center text-sm leading-6 text-stone-300">
                  正在匹配薪酬分位、城市基准和六个维度的评分规则。
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
          <header className="rounded-[2.5rem] border border-stone-900/10 bg-stone-950 p-7 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
                <BriefcaseBusiness className="h-4 w-4" />
                工作资产评估
              </div>
            </div>
            <div className="mt-8">
              <div>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">工作资产评估</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                  把一份工作当作人力资本资产，结合公开薪酬数据和你的实际情况，评估当前收益、稳定性、持有友好度、成长、流动性和个人匹配度。
                </p>
              </div>
            </div>
          </header>

          <section className="rounded-[2rem] border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["brief", "快速评估", "填写核心字段，适合先获得一个方向性判断"],
                ["detailed", "完整评估", "补充行业、岗位、企业性质和风险信息，结果更接近真实对标"],
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
                  <p className="text-lg font-black">{title}</p>
                  <p className={`mt-1 text-sm ${inputs.mode === mode ? "text-emerald-100" : "text-stone-500"}`}>
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
            {inputs.mode === "detailed" ? (
              <>
                <NumberField label="年龄" suffix="岁" value={inputs.age} onChange={(value) => setValue("age", value)} />
                <NumberField label="工作年限" suffix="年" value={inputs.experienceYears} onChange={(value) => setValue("experienceYears", value)} />
                <SelectField
                  label="学历"
                  options={educationOptions.map((item) => ({ value: item, label: item }))}
                  value={inputs.education}
                  onChange={(value) => setValue("education", value)}
                />
                <SelectField<ResidentState>
                  label="城市是否常驻"
                  options={[
                    { value: "yes", label: "是" },
                    { value: "no", label: "否" },
                    { value: "uncertain", label: "不确定" },
                  ]}
                  value={inputs.cityResident}
                  onChange={(value) => setValue("cityResident", value)}
                />
                <SelectField
                  label="行业"
                  options={Object.entries(industryBenchmarks).map(([value, item]) => ({ value: value as IndustryKey, label: item.label }))}
                  value={inputs.industry}
                  onChange={(value) => setValue("industry", value)}
                />
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
                <SelectField<JobLevelInput>
                  label="岗位层级"
                  options={jobLevelOptions}
                  value={inputs.jobLevel}
                  onChange={(value) => setValue("jobLevel", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第二步" title="当前收益">
            <NumberField label="税后到手年收入" suffix="元/年" value={inputs.afterTaxIncome} onChange={(value) => setValue("afterTaxIncome", value)} />
            <SelectField<Certainty>
              label="奖金确定性"
              options={[
                { value: "high", label: "高" },
                { value: "medium", label: "中" },
                { value: "low", label: "低" },
                { value: "unknown", label: "不清楚" },
              ]}
              value={inputs.bonusCertainty}
              onChange={(value) => setValue("bonusCertainty", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <NumberField label="税前年现金包" suffix="元/年" value={inputs.preTaxPackage} onChange={(value) => setValue("preTaxPackage", value)} />
                <NumberField label="固定工资占比" suffix="%" value={inputs.fixedPayRatio} onChange={(value) => setValue("fixedPayRatio", value)} />
                <NumberField label="年度福利折算" suffix="元/年" value={inputs.benefitsValue} onChange={(value) => setValue("benefitsValue", value)} />
                <RatingField label="未来 1-2 年涨薪空间" low="低" high="高" copyKey="raisePotential" value={inputs.raisePotential} onChange={(value) => setValue("raisePotential", value)} />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第三步" title="持有友好度">
            <NumberField label="每周实际工作小时数" suffix="小时" value={inputs.weeklyHours} onChange={(value) => setValue("weeklyHours", value)} />
            <NumberField label="通勤单程时间" suffix="分钟" value={inputs.commuteMinutes} onChange={(value) => setValue("commuteMinutes", value)} />
            <RatingField label="工作压力" low="压力大" high="从容" copyKey="stress" value={inputs.stress} onChange={(value) => setValue("stress", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<WeekendWork>
                  label="是否经常周末工作"
                  options={[
                    { value: "never", label: "从不" },
                    { value: "sometimes", label: "偶尔" },
                    { value: "often", label: "经常" },
                  ]}
                  value={inputs.weekendWork}
                  onChange={(value) => setValue("weekendWork", value)}
                />
                <RatingField label="工作氛围" low="消耗" high="舒服" copyKey="atmosphere" value={inputs.atmosphere} onChange={(value) => setValue("atmosphere", value)} />
                <RatingField label="老板同事正常程度" low="不正常" high="正常" copyKey="peopleHealth" value={inputs.peopleHealth} onChange={(value) => setValue("peopleHealth", value)} />
                <SelectField<HealthImpact>
                  label="健康影响"
                  options={[
                    { value: "none", label: "无" },
                    { value: "minor", label: "轻微" },
                    { value: "clear", label: "明显" },
                    { value: "severe", label: "严重" },
                  ]}
                  value={inputs.healthImpact}
                  onChange={(value) => setValue("healthImpact", value)}
                />
                <SelectField<TriState>
                  label="是否有时间学习和生活"
                  options={[
                    { value: "yes", label: "是" },
                    { value: "average", label: "一般" },
                    { value: "no", label: "否" },
                  ]}
                  value={inputs.lifeAndLearningTime}
                  onChange={(value) => setValue("lifeAndLearningTime", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第四步" title="稳定性">
            <RatingField label="未来一年安全感" low="不安全" high="很安全" copyKey="safetyFeeling" value={inputs.safetyFeeling} onChange={(value) => setValue("safetyFeeling", value)} />
            {inputs.mode === "detailed" ? (
              <>
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
                  label="公司经营情况"
                  options={[
                    { value: "good", label: "好" },
                    { value: "average", label: "一般" },
                    { value: "bad", label: "差" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.companyBusiness}
                  onChange={(value) => setValue("companyBusiness", value)}
                />
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
                <SelectField<Certainty>
                  label="裁员 / 优化风险"
                  options={[
                    { value: "high", label: "高" },
                    { value: "medium", label: "中" },
                    { value: "low", label: "低" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.layoffRisk}
                  onChange={(value) => setValue("layoffRisk", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第五步" title="职业成长">
            <RatingField label="过去半年成长" low="停滞" high="变强很多" copyKey="pastGrowth" value={inputs.pastGrowth} onChange={(value) => setValue("pastGrowth", value)} />
            <RatingField label="未来一年成长预期" low="有限" high="空间大" copyKey="futureGrowth" value={inputs.futureGrowth} onChange={(value) => setValue("futureGrowth", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <MultiSelectField label="主要工作内容" options={workContentOptions} value={inputs.mainWorkContent} onChange={(value) => setValue("mainWorkContent", value)} />
                <RatingField label="是否接近核心业务" low="边缘" high="核心" copyKey="closeToCoreBusiness" value={inputs.closeToCoreBusiness} onChange={(value) => setValue("closeToCoreBusiness", value)} />
                <RatingField label="是否有高质量项目" low="少" high="多" copyKey="qualityProjects" value={inputs.qualityProjects} onChange={(value) => setValue("qualityProjects", value)} />
                <RatingField label="技术 / 能力通用性" low="公司专用" high="高度通用" copyKey="skillGenerality" value={inputs.skillGenerality} onChange={(value) => setValue("skillGenerality", value)} />
                <RatingField label="是否有人带 / 能学到东西" low="没人带" high="学得快" copyKey="mentoring" value={inputs.mentoring} onChange={(value) => setValue("mentoring", value)} />
                <RatingField label="这段经历对简历加分程度" low="弱" high="强" copyKey="resumeValue" value={inputs.resumeValue} onChange={(value) => setValue("resumeValue", value)} />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第六步" title="流动性">
            <RatingField label="最近外部机会情况" low="很少" high="很多" copyKey="externalOpportunities" value={inputs.externalOpportunities} onChange={(value) => setValue("externalOpportunities", value)} />
            <SelectField
              label="外部机会是否验证"
              options={[
                { value: "false", label: "未知 / 未验证" },
                { value: "true", label: "已通过投递或沟通验证" },
              ]}
              value={inputs.externalKnown === "" ? "" : String(inputs.externalKnown)}
              onChange={(value) => setValue("externalKnown", value === "" ? "" : value === "true")}
            />
            {inputs.mode === "detailed" ? (
              <>
                <MultiSelectField label="目标跳槽方向" options={targetDirectionOptions} value={inputs.targetDirections} onChange={(value) => setValue("targetDirections", value)} />
                <RatingField label="外部 JD 匹配度" low="低" high="高" copyKey="jdMatch" value={inputs.jdMatch} onChange={(value) => setValue("jdMatch", value)} />
                <RatingField label="简历项目对外可讲程度" low="难讲" high="好讲" copyKey="projectExplainability" value={inputs.projectExplainability} onChange={(value) => setValue("projectExplainability", value)} />
                <RatingField label="技能跨公司迁移能力" low="弱" high="强" copyKey="companyTransferability" value={inputs.companyTransferability} onChange={(value) => setValue("companyTransferability", value)} />
                <RatingField label="技能跨行业迁移能力" low="弱" high="强" copyKey="industryTransferability" value={inputs.industryTransferability} onChange={(value) => setValue("industryTransferability", value)} />
                <SelectField<OfferParity>
                  label="能否拿到接近当前收入 offer"
                  options={[
                    { value: "high", label: "高" },
                    { value: "medium", label: "中" },
                    { value: "low", label: "低" },
                    { value: "unknown", label: "未知" },
                  ]}
                  value={inputs.offerParity}
                  onChange={(value) => setValue("offerParity", value)}
                />
                <RatingField label="裸辞找工作难度" low="容易" high="很难" copyKey="jobSearchDifficulty" value={inputs.jobSearchDifficulty} onChange={(value) => setValue("jobSearchDifficulty", value)} />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第七步" title="个人匹配度">
            <RatingField label="个人匹配度 / 长期目标符合度" low="不适合" high="很匹配" copyKey="longTermFit" value={inputs.longTermFit} onChange={(value) => setValue("longTermFit", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="是否喜欢当前行业" low="不喜欢" high="喜欢" copyKey="industryLove" value={inputs.industryLove} onChange={(value) => setValue("industryLove", value)} />
                <RatingField label="是否喜欢当前工作内容" low="不喜欢" high="喜欢" copyKey="contentLove" value={inputs.contentLove} onChange={(value) => setValue("contentLove", value)} />
                <RatingField label="是否愿意额外投入学习" low="不愿意" high="很愿意" copyKey="extraLearningWillingness" value={inputs.extraLearningWillingness} onChange={(value) => setValue("extraLearningWillingness", value)} />
                <MultiSelectField label="长期目标方向" options={longTermDirectionOptions} value={inputs.longTermDirections} onChange={(value) => setValue("longTermDirections", value)} />
              </>
            ) : null}
          </Section>

          <div className="rounded-[2rem] border border-stone-900/10 bg-stone-950 p-5 text-white shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.24em] text-emerald-200">生成报告</p>
                <p className="mt-1 text-xl font-black">根据当前输入生成工作资产报告</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">评估在本地完成，会展示总分、评级、雷达图、优势短板和数据口径。</p>
              </div>
              <button
                className="rounded-2xl bg-emerald-300 px-8 py-4 text-base font-black text-stone-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isCalculating}
                type="submit"
              >
                {isCalculating ? "正在生成..." : "生成报告"}
              </button>
            </div>
          </div>
        </form>
        ) : (
          <div className="space-y-6">
            <header className="rounded-[2.5rem] border border-stone-900/10 bg-stone-950 p-7 text-white shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
                  <BriefcaseBusiness className="h-4 w-4" />
                  评估报告
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-[1fr_240px]">
                <div>
                  <p className="text-sm font-bold tracking-[0.24em] text-emerald-200">评估结果</p>
                  <h1 className="mt-2 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">工作资产评分报告</h1>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                    结果基于你本次填写的信息生成，可返回修改输入后重新计算。
                  </p>
                </div>
                <div className="rounded-[2rem] bg-white p-4 text-stone-950">
                  <p className="text-sm font-bold text-stone-500">综合评级</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-7xl font-black leading-none">{result.rating.grade}</span>
                    <span className="pb-2 text-lg font-black">{result.rating.title}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{result.rating.description}</p>
                </div>
              </div>
            </header>

            <div className="grid gap-6">
              <div className="space-y-4 rounded-[2.5rem] border border-stone-900/10 bg-white p-5 shadow-2xl">
            <div className="rounded-[2rem] bg-stone-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-300">总得分</span>
                <Gauge className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-7xl font-black leading-none">{result.total}</span>
                <span className="pb-2 text-xl font-bold text-stone-300">/ 100</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                {result.rating.grade} 档：{result.rating.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-emerald-50 p-4">
                <BarChart3 className="mb-3 h-5 w-5 text-emerald-800" />
                <p className="text-xs font-bold text-emerald-900">收益评分</p>
                <p className="mt-1 text-3xl font-black">{result.dimensions.income}</p>
              </div>
              <div className="rounded-3xl bg-amber-50 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-amber-800" />
                <p className="text-xs font-bold text-amber-900">持有友好度</p>
                <p className="mt-1 text-3xl font-black">{result.dimensions.holding}</p>
              </div>
            </div>

            <div className="flex justify-center rounded-[2rem] bg-stone-50 p-3">
              <RadarChart values={radarValues} />
            </div>

            <div className="grid gap-2">
              {Object.entries(result.dimensions).map(([key, score]) => (
                <div className="grid grid-cols-[92px_1fr_38px] items-center gap-3" key={key}>
                  <span className="text-sm font-bold text-stone-700">{dimensionLabels[key as keyof typeof dimensionLabels]}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-emerald-800" style={{ width: `${score}%` }} />
                  </div>
                  <span className="text-right text-sm font-black">{score}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-stone-200 p-4">
              <div className="flex items-center gap-2 text-sm font-black">
                <LineChart className="h-4 w-4 text-emerald-800" />
                资产摘要
              </div>
              <div className="mt-3 grid gap-2 text-sm leading-6 text-stone-600">
                <p>最大优势：{result.strengths.join("、")}。</p>
                <p>最大短板：{result.weaknesses.join("、")}。</p>
                <p>
                  未来选择权分：{result.optionValue} / 100，{result.optionValueDescription}
                </p>
                <p>
                  收入基准约 {formatMoney(result.benchmarkIncome)}，当前约为基准 {result.incomeRatio} 倍；单位时间收入约{" "}
                  {result.unitHourlyIncome.toLocaleString("zh-CN")} 元/小时。
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-emerald-50 p-4">
              <p className="text-sm font-black text-emerald-950">优势与短板原因</p>
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
                短板预警
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
              <p className="text-sm font-black">建议</p>
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

            <div className="rounded-[2rem] border border-stone-900/10 bg-white/85 p-5 text-center shadow-sm backdrop-blur">
              <button className="rounded-2xl bg-stone-950 px-8 py-4 text-base font-black text-white transition hover:bg-emerald-900" type="button" onClick={handleBack}>
                返回重新输入
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
