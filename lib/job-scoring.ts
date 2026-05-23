import {
  cityBenchmarks,
  industryBenchmarks,
  nationalBenchmark,
  roleBenchmarks,
  type CityKey,
  type IndustryKey,
  type RoleKey,
} from "@/data/job-market";

export type { CityKey, IndustryKey, RoleKey } from "@/data/job-market";

export type InputMode = "brief" | "detailed";
export type Certainty = "high" | "medium" | "low" | "unknown";
export type WeekendWork = "never" | "sometimes" | "often";
export type HealthImpact = "none" | "minor" | "clear" | "severe";
export type TriState = "yes" | "average" | "no";
export type BusinessState = "good" | "average" | "bad" | "unknown";
export type OfferParity = "high" | "medium" | "low" | "unknown";
export type CompanySize = "large" | "medium" | "small" | "startup";
export type ResidentState = "yes" | "no" | "uncertain";

export type JobInputs = {
  mode: InputMode;
  city: CityKey;
  cityResident: ResidentState;
  afterTaxIncome: number;
  preTaxPackage: number;
  fixedPayRatio: number;
  bonusCertainty: Certainty;
  benefitsValue: number;
  raisePotential: number;
  weeklyHours: number;
  commuteMinutes: number;
  stress: number;
  weekendWork: WeekendWork;
  atmosphere: number;
  peopleHealth: number;
  healthImpact: HealthImpact;
  lifeAndLearningTime: TriState;
  safetyFeeling: number;
  companySize: CompanySize;
  companyBusiness: BusinessState;
  industryOutlook: BusinessState;
  teamStability: Certainty;
  roleCore: number;
  replacementDifficulty: number;
  layoffRisk: Certainty;
  pastGrowth: number;
  futureGrowth: number;
  mainWorkContent: string[];
  closeToCoreBusiness: number;
  qualityProjects: number;
  skillGenerality: number;
  mentoring: number;
  resumeValue: number;
  targetDirections: string[];
  externalOpportunities: number;
  externalKnown: boolean;
  jdMatch: number;
  projectExplainability: number;
  companyTransferability: number;
  industryTransferability: number;
  offerParity: OfferParity;
  jobSearchDifficulty: number;
  industryLove: number;
  contentLove: number;
  longTermFit: number;
  extraLearningWillingness: number;
  longTermDirections: string[];
  age: number;
  experienceYears: number;
  education: string;
  skillDirections: string[];
  industry: IndustryKey;
  role: RoleKey;
  note: string;
};

export type DimensionKey = "income" | "stability" | "holding" | "growth" | "liquidity" | "fit";

export type ScoreResult = {
  total: number;
  rating: {
    grade: string;
    title: string;
    description: string;
  };
  dimensions: Record<DimensionKey, number>;
  optionValue: number;
  unitHourlyIncome: number;
  benchmarkIncome: number;
  incomeRatio: number;
  strengths: string[];
  weaknesses: string[];
  warnings: string[];
  suggestions: string[];
  strengthReasons: string[];
  weaknessReasons: string[];
  optionValueDescription: string;
  confidence: Record<DimensionKey, { level: "高" | "中" | "低"; reason: string }>;
  dataNotes: string[];
};

export const dimensionLabels: Record<DimensionKey, string> = {
  income: "当前收益",
  stability: "稳定性",
  holding: "持有友好度",
  growth: "职业成长",
  liquidity: "流动性",
  fit: "个人匹配度",
};

export const scoringConfig = {
  weights: {
    income: 0.25,
    stability: 0.15,
    holding: 0.2,
    growth: 0.2,
    liquidity: 0.15,
    fit: 0.05,
  } satisfies Record<DimensionKey, number>,
  subjectiveMap: {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 95,
  } satisfies Record<number, number>,
  incomeCertaintyPenalty: {
    high: 0,
    medium: -4,
    low: -8,
    unknown: -3,
  } satisfies Record<Certainty, number>,
  healthPenalty: {
    none: 0,
    minor: -5,
    clear: -15,
    severe: -30,
  } satisfies Record<HealthImpact, number>,
  companySizeScore: {
    large: 82,
    medium: 70,
    small: 58,
    startup: 45,
  } satisfies Record<CompanySize, number>,
  businessScore: {
    good: 82,
    average: 62,
    bad: 35,
    unknown: 55,
  } satisfies Record<BusinessState, number>,
  certaintyScore: {
    high: 82,
    medium: 62,
    low: 38,
    unknown: 55,
  } satisfies Record<Certainty, number>,
  layoffRiskScore: {
    high: 32,
    medium: 58,
    low: 84,
    unknown: 55,
  } satisfies Record<Certainty, number>,
  offerParityScore: {
    high: 86,
    medium: 64,
    low: 36,
    unknown: 55,
  } satisfies Record<OfferParity, number>,
};

export const defaultInputs: JobInputs = {
  mode: "brief",
  city: "shenzhen",
  cityResident: "yes",
  afterTaxIncome: 360000,
  preTaxPackage: 450000,
  fixedPayRatio: 80,
  bonusCertainty: "medium",
  benefitsValue: 12000,
  raisePotential: 3,
  weeklyHours: 45,
  commuteMinutes: 35,
  stress: 3,
  weekendWork: "sometimes",
  atmosphere: 3,
  peopleHealth: 3,
  healthImpact: "none",
  lifeAndLearningTime: "average",
  safetyFeeling: 3,
  companySize: "medium",
  companyBusiness: "average",
  industryOutlook: "average",
  teamStability: "medium",
  roleCore: 3,
  replacementDifficulty: 3,
  layoffRisk: "unknown",
  pastGrowth: 3,
  futureGrowth: 3,
  mainWorkContent: [],
  closeToCoreBusiness: 3,
  qualityProjects: 3,
  skillGenerality: 3,
  mentoring: 3,
  resumeValue: 3,
  targetDirections: [],
  externalOpportunities: 3,
  externalKnown: false,
  jdMatch: 3,
  projectExplainability: 3,
  companyTransferability: 3,
  industryTransferability: 3,
  offerParity: "unknown",
  jobSearchDifficulty: 3,
  industryLove: 3,
  contentLove: 3,
  longTermFit: 3,
  extraLearningWillingness: 3,
  longTermDirections: [],
  age: 28,
  experienceYears: 5,
  education: "本科",
  skillDirections: [],
  industry: "internet",
  role: "engineering",
  note: "",
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function subjective(value: number) {
  const key = clamp(Math.round(value), 1, 5) as keyof typeof scoringConfig.subjectiveMap;
  return scoringConfig.subjectiveMap[key] ?? 60;
}

function weighted(items: Array<[number, number]>) {
  const totalWeight = items.reduce((sum, [, weight]) => sum + weight, 0);
  if (totalWeight === 0) return 60;
  return items.reduce((sum, [score, weight]) => sum + score * weight, 0) / totalWeight;
}

function scoreByRatio(ratio: number) {
  if (ratio < 0.8) return 30 + (ratio / 0.8) * 10;
  if (ratio < 1) return 40 + ((ratio - 0.8) / 0.2) * 10;
  if (ratio < 1.3) return 50 + ((ratio - 1) / 0.3) * 10;
  if (ratio < 1.7) return 60 + ((ratio - 1.3) / 0.4) * 10;
  if (ratio < 2.3) return 70 + ((ratio - 1.7) / 0.6) * 10;
  if (ratio < 3) return 80 + ((ratio - 2.3) / 0.7) * 10;
  return clamp(92 + Math.min((ratio - 3) * 2, 8));
}

function calculateBenchmark(inputs: JobInputs) {
  const city = cityBenchmarks[inputs.city];
  if (inputs.mode === "brief") {
    return city.annualIncomeBenchmark * 0.6 + nationalBenchmark.annualIncomeBenchmark * 0.4;
  }

  const industry = industryBenchmarks[inputs.industry];
  const role = roleBenchmarks[inputs.role];
  const stageFactor = inputs.experienceYears <= 2 ? 0.82 : inputs.experienceYears <= 5 ? 1 : inputs.experienceYears <= 10 ? 1.18 : 1.28;
  const roleIndustryBenchmark = (industry.annualIncomeBenchmark * 0.45 + role.annualIncomeBenchmark * 0.55) * stageFactor;
  const backgroundBenchmark = nationalBenchmark.annualIncomeBenchmark * stageFactor;

  return city.annualIncomeBenchmark * 0.3 + roleIndustryBenchmark * 0.4 + backgroundBenchmark * 0.3;
}

function calculateIncome(inputs: JobInputs) {
  const benchmark = calculateBenchmark(inputs);
  const annualIncome =
    inputs.mode === "brief" ? inputs.afterTaxIncome : Math.max(inputs.afterTaxIncome + inputs.benefitsValue, inputs.preTaxPackage * 0.72);
  const ratio = annualIncome / benchmark;
  let score = scoreByRatio(ratio);

  score += scoringConfig.incomeCertaintyPenalty[inputs.bonusCertainty];
  if (inputs.mode === "detailed") {
    if (inputs.fixedPayRatio > 0 && inputs.fixedPayRatio < 60) score -= 5;
    if (inputs.raisePotential >= 4) score += 3;
    if (inputs.raisePotential <= 2) score -= 3;
  }

  return { score: clamp(score), benchmark, ratio };
}

function calculateHolding(inputs: JobInputs) {
  const hours = inputs.weeklyHours;
  let score = hours <= 40 ? 98 : hours <= 45 ? 88 : hours <= 50 ? 76 : hours <= 55 ? 65 : hours <= 60 ? 52 : hours <= 70 ? 35 : 15;

  if (inputs.commuteMinutes <= 30) score += 5;
  if (inputs.commuteMinutes >= 60) score -= 8;

  score += (subjective(inputs.stress) - 60) * 0.18;
  if (inputs.mode === "detailed") {
    if (inputs.weekendWork === "sometimes") score -= 5;
    if (inputs.weekendWork === "often") score -= 14;
    score += (subjective(inputs.atmosphere) - 60) * 0.14;
    score += (subjective(inputs.peopleHealth) - 60) * 0.12;
    score += inputs.lifeAndLearningTime === "yes" ? 5 : inputs.lifeAndLearningTime === "no" ? -8 : 0;
    score += scoringConfig.healthPenalty[inputs.healthImpact];
  }
  return clamp(score);
}

function calculateStability(inputs: JobInputs) {
  if (inputs.mode === "brief") return subjective(inputs.safetyFeeling);

  return clamp(
    weighted([
      [weighted([[scoringConfig.companySizeScore[inputs.companySize], 0.45], [scoringConfig.businessScore[inputs.companyBusiness], 0.55]]), 0.25],
      [scoringConfig.businessScore[inputs.industryOutlook], 0.2],
      [scoringConfig.certaintyScore[inputs.teamStability], 0.15],
      [subjective(inputs.roleCore), 0.12],
      [subjective(inputs.replacementDifficulty), 0.08],
      [scoringConfig.layoffRiskScore[inputs.layoffRisk], 0.08],
      [subjective(inputs.safetyFeeling), 0.12],
    ])
  );
}

function calculateGrowth(inputs: JobInputs) {
  if (inputs.mode === "brief") {
    return clamp(weighted([[subjective(inputs.pastGrowth), 0.45], [subjective(inputs.futureGrowth), 0.55]]));
  }

  return clamp(
    weighted([
      [subjective(inputs.closeToCoreBusiness), 0.2],
      [subjective(inputs.skillGenerality), 0.22],
      [subjective(inputs.qualityProjects), 0.18],
      [subjective(inputs.pastGrowth), 0.15],
      [subjective(inputs.futureGrowth), 0.18],
      [weighted([[subjective(inputs.mentoring), 0.5], [subjective(inputs.resumeValue), 0.5]]), 0.07],
    ])
  );
}

function calculateLiquidity(inputs: JobInputs) {
  if (!inputs.externalKnown && inputs.mode === "brief") return clamp(subjective(inputs.externalOpportunities) - 8);

  const marketBase = inputs.mode === "detailed" ? (industryBenchmarks[inputs.industry].demandScore + roleBenchmarks[inputs.role].liquidityScore) / 2 : 60;
  const score = weighted([
    [inputs.externalKnown ? subjective(inputs.externalOpportunities) : 52, 0.18],
    [subjective(inputs.jdMatch), 0.18],
    [subjective(inputs.projectExplainability), 0.18],
    [subjective(inputs.companyTransferability), 0.13],
    [subjective(inputs.industryTransferability), 0.13],
    [scoringConfig.offerParityScore[inputs.offerParity], 0.1],
    [100 - subjective(inputs.jobSearchDifficulty) + 20, 0.05],
    [marketBase, 0.05],
  ]);

  return clamp(inputs.externalKnown ? score : score - 6);
}

function calculateFit(inputs: JobInputs) {
  if (inputs.mode === "brief") return subjective(inputs.longTermFit);
  return clamp(
    weighted([
      [subjective(inputs.industryLove), 0.25],
      [subjective(inputs.contentLove), 0.3],
      [subjective(inputs.longTermFit), 0.3],
      [subjective(inputs.extraLearningWillingness), 0.15],
    ])
  );
}

function getRating(total: number) {
  if (total >= 85) return { grade: "S", title: "顶级工作资产", description: "非常优质，除非有极好机会，否则应长期持有。" };
  if (total >= 75) return { grade: "A", title: "优质工作资产", description: "值得继续持有，同时优化短板。" };
  if (total >= 65) return { grade: "B", title: "中上工作资产", description: "性价比不错，但有明显短板，需要主动改造。" };
  if (total >= 55) return { grade: "C", title: "普通工作资产", description: "可以暂时持有，但应寻找改进或替代机会。" };
  return { grade: "D", title: "低质量工作资产", description: "不适合长期持有，除非有特殊短期目的。" };
}

function getOptionValueDescription(score: number) {
  if (score >= 80) return "未来选择权很强，越做越自由。";
  if (score >= 60) return "未来选择权还不错，但需要持续经营。";
  if (score >= 40) return "当前可以持有，但未来自由度不足。";
  return "未来可能被锁死或专用化，需要优先处理成长和流动性。";
}

function getDimensionReason(key: DimensionKey, score: number, inputs: JobInputs) {
  const level = score >= 80 ? "优势" : score >= 60 ? "中性" : "短板";
  const reasons: Record<DimensionKey, string> = {
    income:
      level === "优势"
        ? `当前收入约为基准 ${calculateIncome(inputs).ratio.toFixed(2)} 倍。`
        : `当前收入约为基准 ${calculateIncome(inputs).ratio.toFixed(2)} 倍，现金流优势不明显。`,
    stability: inputs.mode === "brief" ? "主要依据未来一年安全感判断。" : "综合公司经营、行业景气、团队稳定、岗位核心度和裁员风险判断。",
    holding:
      level === "优势"
        ? "工时、通勤、压力和健康损耗整体可控。"
        : "工时、通勤、压力或健康损耗拉低了可持续性。",
    growth: inputs.mode === "brief" ? "主要依据过去半年成长和未来一年成长预期。" : "综合核心业务、高质量项目、通用能力、带教和简历价值判断。",
    liquidity:
      inputs.externalKnown
        ? "已通过外部机会或沟通做过市场验证。"
        : "外部机会尚未验证，市场接盘能力不确定。",
    fit: inputs.mode === "brief" ? "主要依据总体匹配度判断。" : "综合行业偏好、内容偏好、长期目标和额外学习意愿判断。",
  };
  return `${dimensionLabels[key]}：${reasons[key]}`;
}

function getConfidence(inputs: JobInputs, dimensions: Record<DimensionKey, number>): ScoreResult["confidence"] {
  const briefReason = "简略模式缺少年龄、行业、岗位和经验等坐标系，使用城市与全国粗粒度基准。";
  return {
    income: inputs.mode === "detailed" ? { level: "中", reason: "已结合城市、行业、岗位和经验基准；当前仍使用内置演示数据。" } : { level: "中", reason: briefReason },
    stability: inputs.mode === "detailed" ? { level: "中", reason: "已提供公司、行业、团队和岗位风险信息。" } : { level: "低", reason: "主要依赖未来一年安全感，结构性风险字段较少。" },
    holding: { level: "高", reason: "工时、通勤和压力是持有成本的核心字段。" },
    growth: inputs.mode === "detailed" ? { level: "中", reason: "已提供项目、核心业务、能力通用性和成长预期。" } : { level: "低", reason: "主要依赖过去成长和未来预期两个主观字段。" },
    liquidity:
      inputs.externalKnown && dimensions.liquidity >= 0
        ? { level: inputs.mode === "detailed" ? "中" : "低", reason: "外部机会已做主观验证，但仍建议用投递和猎头沟通校准。" }
        : { level: "低", reason: "流动性尚未验证，建议用简历投递或猎头反馈测试市场定价。" },
    fit: inputs.mode === "detailed" ? { level: "中", reason: "已拆分行业、内容、长期目标和学习意愿。" } : { level: "低", reason: "简略模式只使用总体匹配度。" },
  };
}

export function calculateJobScore(inputs: JobInputs): ScoreResult {
  const income = calculateIncome(inputs);
  const dimensions: Record<DimensionKey, number> = {
    income: Math.round(income.score),
    stability: Math.round(calculateStability(inputs)),
    holding: Math.round(calculateHolding(inputs)),
    growth: Math.round(calculateGrowth(inputs)),
    liquidity: Math.round(calculateLiquidity(inputs)),
    fit: Math.round(calculateFit(inputs)),
  };

  const total = Math.round(
    Object.entries(scoringConfig.weights).reduce((sum, [key, weight]) => sum + dimensions[key as DimensionKey] * weight, 0)
  );
  const optionValue = Math.round(dimensions.growth * 0.5 + dimensions.liquidity * 0.5);
  const sorted = Object.entries(dimensions).sort((a, b) => b[1] - a[1]) as Array<[DimensionKey, number]>;
  const strengths = sorted.slice(0, 2).map(([key]) => dimensionLabels[key]);
  const weaknesses = sorted.slice(-2).reverse().map(([key]) => dimensionLabels[key]);
  const strengthReasons = sorted.slice(0, 2).map(([key, score]) => getDimensionReason(key, score, inputs));
  const weaknessReasons = sorted.slice(-2).reverse().map(([key, score]) => getDimensionReason(key, score, inputs));
  const warnings: string[] = [];

  Object.entries(dimensions).forEach(([key, score]) => {
    if (score < 40) warnings.push(`${dimensionLabels[key as DimensionKey]}低于 40，属于高风险短板。`);
    else if (score < 60) warnings.push(`${dimensionLabels[key as DimensionKey]}低于 60，需要重点关注。`);
  });
  if (dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("职业成长和流动性同时偏低，未来选择权不足。");
  if (dimensions.income >= 80 && dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("收益高但成长和流动性偏低，可能形成高现金流陷阱。");
  if (dimensions.income >= 80 && dimensions.holding < 60) warnings.push("收益高但持有友好度偏低，存在高薪高消耗风险。");
  if (!inputs.externalKnown) warnings.push("流动性尚未验证，建议通过简历、猎头沟通和小规模投递测试市场定价。");
  if (inputs.mode === "brief") warnings.push("当前为简略评估，未充分考虑年龄、专业、工作年限、行业和岗位机会集。");

  const suggestions = [
    total >= 75 ? "整体值得继续持有，优先经营最低分维度。" : "不建议只看当前收入，应尽快验证替代机会和可改造空间。",
    dimensions.holding < 60 ? "先处理工时、通勤、压力或健康损耗，否则收益不可持续。" : "持有成本目前可控，可以把精力放在成长和流动性经营上。",
    dimensions.liquidity < 65 ? "未来 1-2 个月做一次市场测试，更新简历并验证外部报价。" : "保持外部机会温度，避免长期只积累公司专用经验。",
  ];

  return {
    total,
    rating: getRating(total),
    dimensions,
    optionValue,
    unitHourlyIncome: Math.round(inputs.afterTaxIncome / Math.max(inputs.weeklyHours * 52, 1)),
    benchmarkIncome: Math.round(income.benchmark),
    incomeRatio: Number(income.ratio.toFixed(2)),
    strengths,
    weaknesses,
    warnings,
    suggestions,
    strengthReasons,
    weaknessReasons,
    optionValueDescription: getOptionValueDescription(optionValue),
    confidence: getConfidence(inputs, dimensions),
    dataNotes: [
      `${cityBenchmarks[inputs.city].label}基准：${cityBenchmarks[inputs.city].source}，${cityBenchmarks[inputs.city].year}，${cityBenchmarks[inputs.city].note}`,
      `全国基准：${nationalBenchmark.source}，${nationalBenchmark.year}，${nationalBenchmark.note}`,
      inputs.mode === "detailed"
        ? `${industryBenchmarks[inputs.industry].label}行业基准：${industryBenchmarks[inputs.industry].source}，${industryBenchmarks[inputs.industry].year}，${industryBenchmarks[inputs.industry].note}`
        : "详细行业、岗位、年龄、学历和专业数据暂未接入真实来源。",
      inputs.mode === "detailed"
        ? `${roleBenchmarks[inputs.role].label}岗位基准：${roleBenchmarks[inputs.role].source}，${roleBenchmarks[inputs.role].year}，${roleBenchmarks[inputs.role].note}`
        : "当前版本使用前端内置演示数据，真实统计数据将在后续阶段替换。",
    ],
  };
}
