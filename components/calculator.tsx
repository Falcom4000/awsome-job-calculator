"use client";

import { AlertTriangle, ArrowLeft, BriefcaseBusiness, ChevronRight, Gauge, LineChart, Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import QRCode from "qrcode";
import type { ReactNode, FormEvent } from "react";
import { useState, useRef, useEffect } from "react";

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
  type RoleKey,
  type WeekendWork,
} from "@/lib/job-scoring";

type RatingOption = {
  score: number;
  title: string;
  description: string;
};

const SHARE_URL = "crazy.work";

const ratingThemes = {
  S: {
    hero: "border-amber-100/36 bg-[radial-gradient(circle_at_82%_0%,rgba(253,224,71,0.66),transparent_36%),radial-gradient(circle_at_18%_18%,rgba(245,158,11,0.34),transparent_32%),linear-gradient(135deg,#3f2405,#b87516_58%,#5a3208)] text-amber-50",
    badge: "bg-amber-100/22 text-amber-50 ring-1 ring-amber-100/26",
    grade: "text-amber-100 drop-shadow-[0_0_22px_rgba(252,211,77,0.48)]",
    description: "text-amber-50/78",
    gauge: "text-amber-600",
  },
  A: {
    hero: "border-violet-200/25 bg-[radial-gradient(circle_at_82%_0%,rgba(196,181,253,0.42),transparent_36%),linear-gradient(135deg,#211238,#56308a_62%,#2d1747)] text-violet-50",
    badge: "bg-violet-200/20 text-violet-50 ring-1 ring-violet-200/24",
    grade: "text-violet-100 drop-shadow-[0_0_20px_rgba(196,181,253,0.42)]",
    description: "text-violet-50/78",
    gauge: "text-violet-700",
  },
  B: {
    hero: "border-sky-100/30 bg-[radial-gradient(circle_at_82%_0%,rgba(125,211,252,0.48),transparent_36%),linear-gradient(135deg,#123a5f,#3b82c4_62%,#1a4f78)] text-sky-50",
    badge: "bg-sky-100/18 text-sky-50 ring-1 ring-sky-100/22",
    grade: "text-sky-100 drop-shadow-[0_0_20px_rgba(125,211,252,0.40)]",
    description: "text-sky-50/76",
    gauge: "text-blue-700",
  },
  C: {
    hero: "border-emerald-100/16 bg-[radial-gradient(circle_at_82%_0%,rgba(187,211,190,0.26),transparent_36%),linear-gradient(135deg,#202b26,#42584d_62%,#29342d)] text-stone-50",
    badge: "bg-emerald-100/13 text-emerald-50 ring-1 ring-emerald-100/16",
    grade: "text-[#d4e6d8] drop-shadow-[0_0_16px_rgba(212,230,216,0.26)]",
    description: "text-stone-300",
    gauge: "text-emerald-700",
  },
  D: {
    hero: "border-stone-200/16 bg-[radial-gradient(circle_at_82%_0%,rgba(214,211,209,0.22),transparent_36%),linear-gradient(135deg,#1f1f1f,#3a3936_62%,#252321)] text-stone-50",
    badge: "bg-stone-100/13 text-stone-100 ring-1 ring-stone-100/16",
    grade: "text-stone-200 drop-shadow-[0_0_14px_rgba(231,229,228,0.22)]",
    description: "text-stone-300",
    gauge: "text-stone-700",
  },
} as const;

type RatingCopyKey =
  | "stress"
  | "benefitsLevel"
  | "atmosphere"
  | "peopleHealth"
  | "healthImpact"
  | "lifeAndLearningTime"
  | "rhythmPredictability"
  | "safetyFeeling"
  | "roleCore"
  | "replacementDifficulty"
  | "criticalResourceControl"
  | "pastGrowth"
  | "futureGrowth"
  | "mentoring"
  | "promotionClarity"
  | "feedbackQuality"
  | "compoundingValue"
  | "resumeValue"
  | "externalOpportunities"
  | "jdMatch"
  | "projectExplainability"
  | "companyTransferability"
  | "industryTransferability"
  | "longTermFit"
  | "industryLove"
  | "contentLove"
  | "extraLearningWillingness"
  | "valueRecognition";

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
    { score: 5, title: "真香", description: "福利扎实，确实能提升体验。" },
  ],
  atmosphere: [
    { score: 1, title: "氛围很差", description: "有明显 PUA、甩锅、内斗或不尊重。" },
    { score: 2, title: "氛围偏差", description: "沟通成本高，人际关系消耗明显。" },
    { score: 3, title: "凑合活", description: "没明显问题，但也谈不上舒服。" },
    { score: 4, title: "还算阳间", description: "同事和老板基本正常，合作顺畅。" },
    { score: 5, title: "非常阳间", description: "氛围舒服，信任度高，沟通成本低。" },
  ],
  peopleHealth: [
    { score: 1, title: "很消耗", description: "甩锅、内斗、失信或情绪化管理明显。" },
    { score: 2, title: "偏消耗", description: "沟通和协作经常消耗精力。" },
    { score: 3, title: "凑合活", description: "有摩擦，但没有明显恶性问题。" },
    { score: 4, title: "还算省心", description: "大多数沟通直接、稳定、可预期。" },
    { score: 5, title: "非常省心", description: "尊重边界，合作省心，信任成本低。" },
  ],
  healthImpact: [
    { score: 1, title: "很伤身", description: "已经明显影响睡眠、情绪或身体状态。" },
    { score: 2, title: "有点伤", description: "经常疲惫，恢复成本偏高。" },
    { score: 3, title: "还行", description: "有消耗，但整体还能恢复。" },
    { score: 4, title: "还算抗造", description: "大多数时候状态稳定。" },
    { score: 5, title: "基本无伤", description: "基本不伤身，节奏可持续。" },
  ],
  lifeAndLearningTime: [
    { score: 1, title: "完全没有", description: "下班后只想恢复，生活和学习被挤掉。" },
    { score: 2, title: "很少", description: "偶尔有时间，但很难稳定安排。" },
    { score: 3, title: "一般", description: "能保住基本生活，但余量不多。" },
    { score: 4, title: "比较有", description: "有稳定时间生活、学习或运动。" },
    { score: 5, title: "很充足", description: "工作之外仍有明显自主时间。" },
  ],
  rhythmPredictability: [
    { score: 1, title: "天天炸锅", description: "需求、会议和救火随时砸脸。" },
    { score: 2, title: "经常诈尸", description: "计划总被打断，精神随叫随到。" },
    { score: 3, title: "偶尔爆雷", description: "有突发，但整体还能安排。" },
    { score: 4, title: "比较可控", description: "节奏大多能预判，不用天天拆弹。" },
    { score: 5, title: "节奏很稳", description: "提前量充足，很少临时炸工位。" },
  ],
  safetyFeeling: [
    { score: 1, title: "很悬", description: "随时可能出问题。" },
    { score: 2, title: "不太稳", description: "组织、业务或岗位有明显风险。" },
    { score: 3, title: "有点悬", description: "有风险，但还没到警报级别。" },
    { score: 4, title: "还算稳", description: "短中期看问题不大。" },
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
  criticalResourceControl: [
    { score: 1, title: "纯执行", description: "只接任务，不掌握关键上下文。" },
    { score: 2, title: "沾一点边", description: "知道部分信息，但资源不在手里。" },
    { score: 3, title: "有一部分", description: "掌握一些流程、客户、系统或关键关系。" },
    { score: 4, title: "比较关键", description: "不少关键上下文和协作资源依赖你。" },
    { score: 5, title: "资源在手", description: "关键流程、信息或关系明显在你手里。" },
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
    { score: 4, title: "有点盼头", description: "成长空间较好，有明确可学的东西。" },
    { score: 5, title: "盼头很大", description: "未来一年大概率继续显著升值。" },
  ],
  mentoring: [
    { score: 1, title: "没人带", description: "基本靠自己摸索，反馈和指导很少。" },
    { score: 2, title: "带得少", description: "偶尔有指导，但系统性不足。" },
    { score: 3, title: "凑合学", description: "能获得基本反馈和经验传递。" },
    { score: 4, title: "有人带飞", description: "有人能持续给方向、标准和反馈。" },
    { score: 5, title: "大佬带飞", description: "身边有高水平的人带，成长速度明显提升。" },
  ],
  promotionClarity: [
    { score: 1, title: "看不见", description: "完全不知道下一步怎么升。" },
    { score: 2, title: "很模糊", description: "偶尔画饼，但标准和路径不清楚。" },
    { score: 3, title: "有点影子", description: "大概知道方向，但不够确定。" },
    { score: 4, title: "比较清楚", description: "有明确能力要求、项目机会或晋升路径。" },
    { score: 5, title: "路很明", description: "下一阶段目标、标准和机会都比较清晰。" },
  ],
  feedbackQuality: [
    { score: 1, title: "没人反馈", description: "做完就完了，基本没人帮你纠偏。" },
    { score: 2, title: "反馈很虚", description: "有反馈，但大多是情绪或口号。" },
    { score: 3, title: "偶尔有用", description: "有时能得到有效建议，但不稳定。" },
    { score: 4, title: "反馈挺准", description: "能指出问题，也能帮你提升标准。" },
    { score: 5, title: "精准纠偏", description: "反馈及时、具体、专业，能明显加速成长。" },
  ],
  compoundingValue: [
    { score: 1, title: "一次性苦力", description: "干完就散，除了疲惫啥也不剩。" },
    { score: 2, title: "沉淀很少", description: "能攒一点，但大多是在重复燃烧。" },
    { score: 3, title: "有点复利", description: "部分经验、方法或成果以后还能用。" },
    { score: 4, title: "越干越值钱", description: "能沉淀能力、作品或方法论。" },
    { score: 5, title: "复利拉满", description: "每一轮发疯都在抬高你的市场价值。" },
  ],
  resumeValue: [
    { score: 1, title: "几乎不加分", description: "经历难以对外解释，简历价值弱。" },
    { score: 2, title: "加分有限", description: "能写一些，但市场识别度不高。" },
    { score: 3, title: "凑合能写", description: "能支撑基本履历，但亮点不突出。" },
    { score: 4, title: "能镀点金", description: "有明确成果、指标或难度。" },
    { score: 5, title: "很能镀金", description: "对外非常好讲，能明显提升市场定价。" },
  ],
  externalOpportunities: [
    { score: 1, title: "几乎没有", description: "几乎没人找，也很难匹配外部岗位。" },
    { score: 2, title: "偶尔有", description: "偶尔有机会，但质量一般或匹配度低。" },
    { score: 3, title: "有一些", description: "有一些机会，但不确定能否拿到好 offer。" },
    { score: 4, title: "有人来捞", description: "能匹配不少不错岗位。" },
    { score: 5, title: "抢着来捞", description: "容易获得高质量机会。" },
  ],
  jdMatch: [
    { score: 1, title: "很低", description: "外部 JD 关键要求大多不匹配。" },
    { score: 2, title: "偏低", description: "能匹配少量要求，但短板明显。" },
    { score: 3, title: "凑合能投", description: "能匹配常见要求，但优势不突出。" },
    { score: 4, title: "挺能打", description: "能匹配多数目标岗位要求。" },
    { score: 5, title: "高度对口", description: "与目标岗位高度契合，竞争力明确。" },
  ],
  projectExplainability: [
    { score: 1, title: "看不懂", description: "成果太内部，外面很难理解价值。" },
    { score: 2, title: "有点费劲", description: "能解释，但需要很多背景铺垫。" },
    { score: 3, title: "基本能懂", description: "外部能听懂大概价值，但亮点不够尖。" },
    { score: 4, title: "挺好懂", description: "成果、指标和难度都比较容易讲清。" },
    { score: 5, title: "一听就懂", description: "外部很容易理解价值，也容易认可含金量。" },
  ],
  companyTransferability: [
    { score: 1, title: "很弱", description: "强依赖当前公司上下文，换公司价值下降明显。" },
    { score: 2, title: "偏弱", description: "部分能力可迁移，但需要较长适应。" },
    { score: 3, title: "能挪窝", description: "基础能力可迁移，部分经验公司专用。" },
    { score: 4, title: "还能打", description: "换到同类公司仍容易被认可。" },
    { score: 5, title: "很能打", description: "跨公司复用度高，市场认可清晰。" },
  ],
  industryTransferability: [
    { score: 1, title: "很弱", description: "高度依赖当前行业，跨行业价值很低。" },
    { score: 2, title: "偏弱", description: "跨行业需要明显补课或降级。" },
    { score: 3, title: "能挪窝", description: "有部分通用能力可迁移。" },
    { score: 4, title: "还能打", description: "跨到相邻行业仍有竞争力。" },
    { score: 5, title: "很能打", description: "能力跨行业通用，选择面很宽。" },
  ],
  longTermFit: [
    { score: 1, title: "明显不适合", description: "明显不喜欢，不适合长期做。" },
    { score: 2, title: "不太喜欢", description: "不太喜欢，经常内耗。" },
    { score: 3, title: "凑合能过", description: "不讨厌但也谈不上喜欢。" },
    { score: 4, title: "挺合", description: "比较喜欢，适合当前阶段。" },
    { score: 5, title: "很合", description: "很喜欢，也愿意长期投入。" },
  ],
  industryLove: [
    { score: 1, title: "明显不喜欢", description: "对行业缺乏认同，长期做会消耗。" },
    { score: 2, title: "不太喜欢", description: "能做，但兴趣和认同感偏弱。" },
    { score: 3, title: "凑合", description: "不排斥，但也没有明显热情。" },
    { score: 4, title: "比较喜欢", description: "认可行业，愿意继续积累。" },
    { score: 5, title: "很喜欢", description: "高度认同行业，愿意长期投入。" },
  ],
  contentLove: [
    { score: 1, title: "明显不喜欢", description: "工作内容让人排斥或持续内耗。" },
    { score: 2, title: "不太喜欢", description: "能完成，但经常缺乏动力。" },
    { score: 3, title: "凑合", description: "不讨厌，但也没有明显兴趣。" },
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
  valueRecognition: [
    { score: 1, title: "隐形牛马", description: "活干了很多，但像没在组织里出现过。" },
    { score: 2, title: "偶尔露头", description: "价值有一点被看见，但认可很不稳定。" },
    { score: 3, title: "正常可见", description: "基本贡献能被看见，但不算突出。" },
    { score: 4, title: "比较被认", description: "你的价值经常被看见，也会带来机会。" },
    { score: 5, title: "很被接住", description: "贡献清楚、存在感强，组织愿意给你位置。" },
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
  const [draftValue, setDraftValue] = useState("");

  useEffect(() => {
    setDraftValue(value === 0 ? "" : String(value));
  }, [value]);

  return (
    <label className="grid content-start gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <input
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-stone-950 outline-none"
          min={min}
          type="number"
          placeholder="0"
          value={draftValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setDraftValue(nextValue);
            onChange(nextValue === "" ? 0 : Number(nextValue));
          }}
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
  const resultTheme =
    result && result.rating.grade in ratingThemes
      ? ratingThemes[result.rating.grade as keyof typeof ratingThemes]
      : ratingThemes.B;
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
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

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
      const captureScale = Math.min(Math.max(idealScale, 1), 1.28);
      const captureWidth = Math.round(captureImage.width * captureScale);
      const captureHeight = Math.round(captureImage.height * captureScale);
      const contentHeight = captureHeight + footerGap + footerHeight + outerPadding * 2;
      const baseCanvasWidth = captureWidth + outerPadding * 2;
      const minCanvasWidth = Math.ceil(contentHeight * deviceAspectRatio);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(baseCanvasWidth, minCanvasWidth);
      canvas.height = Math.max(contentHeight, Math.ceil(canvas.width / deviceAspectRatio));
      const contentX = Math.round((canvas.width - captureWidth) / 2);
      const contentY = Math.round((canvas.height - contentHeight) / 2);

      const context = canvas.getContext("2d");
      if (!context) return;

      context.fillStyle = "#f4efe4";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(captureImage, contentX, contentY + outerPadding, captureWidth, captureHeight);

      const footerY = contentY + outerPadding + captureHeight + footerGap;
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
      link.download = "crazy-value-report.png";
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
                <h1 className="mt-2 text-center text-3xl font-black">正在生成疯值报告</h1>
                <p className="mt-3 max-w-md text-center text-sm leading-6 text-stone-300">
                  正在盘老板给的钱，够不够抵你发的疯。
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
            <div className="relative flex flex-wrap items-end justify-start gap-x-6 gap-y-2 text-left md:gap-x-8">
              <h1 className="shrink-0 text-left text-[2.25rem] font-black leading-tight tracking-tight md:text-[3.5rem]">打工哪有不疯的</h1>
              <p className="w-full text-right text-[1.45rem] font-black leading-tight tracking-tight text-emerald-100 md:w-auto md:text-left md:text-[2.2rem]">
                测测这份工作疯得值不值
              </p>
            </div>
          </header>

          <section className="rounded-[2rem] border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur">
            <p className="mb-2 px-2 text-sm font-black text-stone-700">选择模式</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                ["brief", "快速发疯", "少填一点，先看这班值不值"],
                ["detailed", "深度发疯", "多填一点，把这班扒干净"],
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
              label="在哪打工"
              options={Object.entries(cityBenchmarks).map(([value, item]) => ({ value: value as CityKey, label: item.label }))}
              value={inputs.city}
              onChange={(value) => setValue("city", value)}
            />
            <SelectField
              label="在哪个坑"
              options={Object.entries(industryBenchmarks).map(([value, item]) => ({ value: value as IndustryKey, label: item.label }))}
              value={inputs.industry}
              onChange={(value) => setValue("industry", value)}
            />
            <SelectField<JobLevelInput>
              label="坑位等级"
              options={jobLevelOptions}
              value={inputs.jobLevel}
              onChange={(value) => setValue("jobLevel", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField
                  label="学历 buff"
                  options={educationOptions.map((item) => ({ value: item, label: item }))}
                  value={inputs.education}
                  onChange={(value) => setValue("education", value)}
                />
                <NumberField label="打工人年龄" suffix="岁" value={inputs.age} onChange={(value) => setValue("age", value)} />
                <NumberField label="打工年限" suffix="年" value={inputs.experienceYears} onChange={(value) => setValue("experienceYears", value)} />
                <SelectField
                  label="具体坑位"
                  options={Object.entries(roleBenchmarks).map(([value, item]) => ({ value: value as RoleKey, label: item.label }))}
                  value={inputs.role}
                  onChange={(value) => setValue("role", value)}
                />
                <SelectField<EnterpriseNatureInput>
                  label="公司段位"
                  options={enterpriseNatureOptions}
                  value={inputs.enterpriseNature}
                  onChange={(value) => setValue("enterpriseNature", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第二步" title="钱给够没">
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

          <Section eyebrow="第三步" title="这班是不是在吸命">
            <NumberField
              label="每周工时"
              suffix="小时"
              note="指从上班到下班的时间差，包括摸鱼和休息。"
              value={inputs.weeklyHours}
              onChange={(value) => setValue("weeklyHours", value)}
            />
            <NumberField label="单程通勤时间" suffix="分钟" value={inputs.commuteMinutes} onChange={(value) => setValue("commuteMinutes", value)} />
            <RatingField label="精神压强" low="压力大" high="从容" copyKey="stress" value={inputs.stress} onChange={(value) => setValue("stress", value)} />
            <RatingField label="福利厚度" low="弱" high="好" copyKey="benefitsLevel" value={inputs.benefitsLevel} onChange={(value) => setValue("benefitsLevel", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<WeekendWork>
                  label="周末被召唤频率"
                  options={[
                    { value: "never", label: "不召唤" },
                    { value: "sometimes", label: "偶尔诈尸" },
                    { value: "often", label: "周末也不放过" },
                  ]}
                  value={inputs.weekendWork}
                  onChange={(value) => setValue("weekendWork", value)}
                />
                <RatingField label="阴间程度" low="消耗" high="舒服" copyKey="atmosphere" value={inputs.atmosphere} onChange={(value) => setValue("atmosphere", value)} />
                <RatingField label="领导同事正常度" low="消耗" high="舒服" copyKey="peopleHealth" value={inputs.peopleHealth} onChange={(value) => setValue("peopleHealth", value)} />
                <RatingField label="伤身程度" low="伤身" high="健康" copyKey="healthImpact" value={inputs.healthImpact} onChange={(value) => setValue("healthImpact", value)} />
                <RatingField
                  label="下班回血时间"
                  low="没余量"
                  high="很充足"
                  copyKey="lifeAndLearningTime"
                  value={inputs.lifeAndLearningTime}
                  onChange={(value) => setValue("lifeAndLearningTime", value)}
                />
                <RatingField
                  label="工作节奏可不可预期"
                  low="随时爆炸"
                  high="节奏稳定"
                  copyKey="rhythmPredictability"
                  value={inputs.rhythmPredictability}
                  onChange={(value) => setValue("rhythmPredictability", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="第四步" title="这饭碗稳不稳">
            <SelectField<CompanySize>
              label="公司体量"
              options={[
                { value: "large", label: "大公司" },
                { value: "medium", label: "中型公司" },
                { value: "small", label: "小公司" },
                { value: "startup", label: "早期团队" },
              ]}
              value={inputs.companySize}
              onChange={(value) => setValue("companySize", value)}
            />
            <SelectField<BusinessState>
              label="公司状态"
              options={[
                { value: "good", label: "还挺能打" },
                { value: "average", label: "普普通通" },
                { value: "bad", label: "快塌了" },
                { value: "unknown", label: "不清楚" },
              ]}
              value={inputs.companyBusiness}
              onChange={(value) => setValue("companyBusiness", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<BusinessState>
                  label="行业状态"
                  options={[
                    { value: "good", label: "还在起飞" },
                    { value: "average", label: "不温不火" },
                    { value: "bad", label: "有点凉" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.industryOutlook}
                  onChange={(value) => setValue("industryOutlook", value)}
                />
                <SelectField<Certainty>
                  label="团队散架风险"
                  options={[
                    { value: "high", label: "不太会散" },
                    { value: "medium", label: "有点悬" },
                    { value: "low", label: "快散了" },
                    { value: "unknown", label: "不清楚" },
                  ]}
                  value={inputs.teamStability}
                  onChange={(value) => setValue("teamStability", value)}
                />
                <RatingField label="替身好不好找" low="容易替代" high="很难替代" copyKey="replacementDifficulty" value={inputs.replacementDifficulty} onChange={(value) => setValue("replacementDifficulty", value)} />
                <RatingField
                  label="关键资源在不在你手里"
                  low="纯执行"
                  high="关键上下文"
                  copyKey="criticalResourceControl"
                  value={inputs.criticalResourceControl}
                  onChange={(value) => setValue("criticalResourceControl", value)}
                />
              </>
            ) : null}
            <RatingField label="是不是核心牛马" low="边缘" high="核心" copyKey="roleCore" value={inputs.roleCore} onChange={(value) => setValue("roleCore", value)} />
            <RatingField label="饭碗安全感" low="不安全" high="很安全" copyKey="safetyFeeling" value={inputs.safetyFeeling} onChange={(value) => setValue("safetyFeeling", value)} />
          </Section>

          <Section eyebrow="第五步" title={inputs.mode === "detailed" ? "这班有没有盼头" : "这班有没有盼头，外面还有没有路"}>
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="过去半年有没有变强" low="停滞" high="变强很多" copyKey="pastGrowth" value={inputs.pastGrowth} onChange={(value) => setValue("pastGrowth", value)} />
                <RatingField label="未来一年有没有盼头" low="有限" high="空间大" copyKey="futureGrowth" value={inputs.futureGrowth} onChange={(value) => setValue("futureGrowth", value)} />
                <RatingField label="有没有清晰上升通道" low="看不见" high="很清楚" copyKey="promotionClarity" value={inputs.promotionClarity} onChange={(value) => setValue("promotionClarity", value)} />
                <RatingField label="有没有大佬带飞" low="没人带" high="学得快" copyKey="mentoring" value={inputs.mentoring} onChange={(value) => setValue("mentoring", value)} />
                <RatingField label="有没有高质量反馈" low="没人反馈" high="反馈很准" copyKey="feedbackQuality" value={inputs.feedbackQuality} onChange={(value) => setValue("feedbackQuality", value)} />
                <RatingField label="做的事有没有复利" low="一次性杂活" high="越做越值钱" copyKey="compoundingValue" value={inputs.compoundingValue} onChange={(value) => setValue("compoundingValue", value)} />
              </>
            ) : (
              <>
                <RatingField label="未来一年有没有盼头" low="有限" high="空间大" copyKey="futureGrowth" value={inputs.futureGrowth} onChange={(value) => setValue("futureGrowth", value)} />
                <RatingField label="有没有清晰上升通道" low="看不见" high="很清楚" copyKey="promotionClarity" value={inputs.promotionClarity} onChange={(value) => setValue("promotionClarity", value)} />
                <RatingField label="有没有人来捞你" low="很少" high="很多" copyKey="externalOpportunities" value={inputs.externalOpportunities} onChange={(value) => setValue("externalOpportunities", value)} />
              </>
            )}
          </Section>

          {inputs.mode === "detailed" ? (
            <Section eyebrow="第六步" title="外面还有没有路">
              <RatingField label="有没有人来捞你" low="很少" high="很多" copyKey="externalOpportunities" value={inputs.externalOpportunities} onChange={(value) => setValue("externalOpportunities", value)} />
              <RatingField label="目标岗位配不配你" low="低" high="高" copyKey="jdMatch" value={inputs.jdMatch} onChange={(value) => setValue("jdMatch", value)} />
              <RatingField label="简历能不能镀金" low="弱" high="强" copyKey="resumeValue" value={inputs.resumeValue} onChange={(value) => setValue("resumeValue", value)} />
              <RatingField
                label="成果能不能被外面看懂"
                low="看不懂"
                high="很好懂"
                copyKey="projectExplainability"
                value={inputs.projectExplainability}
                onChange={(value) => setValue("projectExplainability", value)}
              />
              <RatingField label="换家公司还能不能打" low="弱" high="强" copyKey="companyTransferability" value={inputs.companyTransferability} onChange={(value) => setValue("companyTransferability", value)} />
              <RatingField label="换个行业还能不能活" low="弱" high="强" copyKey="industryTransferability" value={inputs.industryTransferability} onChange={(value) => setValue("industryTransferability", value)} />
            </Section>
          ) : null}

          <Section eyebrow={inputs.mode === "detailed" ? "第七步" : "第六步"} title="你和这班八字合不合">
            <RatingField label="长期路线合不合" low="不适合" high="很匹配" copyKey="longTermFit" value={inputs.longTermFit} onChange={(value) => setValue("longTermFit", value)} />
            <RatingField label="对这个行业满意吗" low="不喜欢" high="喜欢" copyKey="industryLove" value={inputs.industryLove} onChange={(value) => setValue("industryLove", value)} />
            <RatingField label="对工作内容满意吗" low="不喜欢" high="喜欢" copyKey="contentLove" value={inputs.contentLove} onChange={(value) => setValue("contentLove", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="愿不愿意为它加练" low="不愿意" high="很愿意" copyKey="extraLearningWillingness" value={inputs.extraLearningWillingness} onChange={(value) => setValue("extraLearningWillingness", value)} />
                <RatingField label="你的价值有没有被看见" low="没人知道" high="很被认可" copyKey="valueRecognition" value={inputs.valueRecognition} onChange={(value) => setValue("valueRecognition", value)} />
              </>
            ) : null}
          </Section>

          <div className="rounded-[2rem] border border-stone-900/10 bg-stone-950 p-5 text-white shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mt-1 text-xl font-black">生成疯值报告</p>
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
            <div ref={shareCaptureRef} className="space-y-6">
            <header className={`rounded-[2.5rem] border p-7 ${resultTheme.hero} ${isSharing ? "shadow-none" : "shadow-xl"}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] ${resultTheme.badge}`}>
                  <BriefcaseBusiness className="h-4 w-4" />
                  疯值报告
                </div>
              </div>
              <div className="mt-5">
                <div>
                  <div className="flex items-center gap-5 md:gap-6">
                    <div className={`flex h-28 w-24 shrink-0 items-center justify-center md:h-36 md:w-32 ${resultTheme.grade}`}>
                      <span className="text-8xl font-black leading-none md:text-9xl">{result.rating.grade}</span>
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{result.rating.title}</h1>
                      <p className={`mt-2 max-w-2xl text-base leading-7 md:mt-3 md:text-lg md:leading-8 ${resultTheme.description}`}>{result.rating.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="grid gap-6">
              <div className={`space-y-4 rounded-[2.5rem] border border-stone-900/10 bg-white p-5 ${isSharing ? "shadow-none" : "shadow-lg"}`}>
                <div className="rounded-[2rem] bg-stone-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-stone-300">发疯性价比分</p>
                    <Gauge className={`h-5 w-5 ${resultTheme.gauge}`} />
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-7xl font-black leading-none">{result.total}</span>
                    <span className="pb-2 text-xl font-bold text-stone-400">/ 100</span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-stone-300">约超过 {result.rating.percentile}% 的工作</p>
                </div>

                <div className="flex justify-center overflow-hidden rounded-[2rem] bg-stone-50 px-2 py-2 md:p-4">
                  <div className="-my-6 w-full max-w-[680px] md:-my-8">
                    <RadarChart values={radarValues} />
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
                疯值诊断
              </div>
              <div className="mt-3 grid gap-2 text-sm leading-6 text-stone-600">
                {result.dimensionVerdicts.map((verdict) => (
                  <p key={verdict}>{verdict}</p>
                ))}
              </div>
            </div>

            {result.warnings.length > 0 ? (
              <div className="rounded-[1.5rem] bg-orange-50 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-orange-950">
                  <AlertTriangle className="h-4 w-4" />
                  雷区警报
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
            ) : null}

            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-sm font-black">自救指南</p>
              <div className="mt-3 space-y-2">
                {result.dimensionRescues.length > 0 ? (
                  result.dimensionRescues.map((rescue) => (
                    <p className="text-sm leading-6 text-stone-600" key={rescue}>
                      {rescue}
                    </p>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-stone-600">暂时不用急着自救，这班先稳住，别把好牌打烂。</p>
                )}
              </div>
            </div>

            <details className="rounded-[1.5rem] border border-stone-200 p-4">
              <summary className="cursor-pointer text-sm font-black">数据来源</summary>
              <div className="mt-3 text-sm leading-6 text-stone-600">
                <p>当前参考的数据来源包括：</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {result.dataNotes.slice(0, -1).map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
                <p className="mt-3">{result.dataNotes.at(-1)}</p>
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
                {isSharing ? "生成中..." : "分享疯值报告"}
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
