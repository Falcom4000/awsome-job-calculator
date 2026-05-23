import {
  cityBenchmarks,
  getExperienceIncomeFactor,
  getIndustryBenchmark,
  nationalBenchmark,
  roleBenchmarks,
  type CityKey,
  type IndustryKey,
  type RoleKey,
} from "@/data/job-market";

export type { CityKey, IndustryKey, RoleKey } from "@/data/job-market";

export type InputMode = "" | "brief" | "detailed";
export type Certainty = "" | "high" | "medium" | "low" | "unknown";
export type WeekendWork = "" | "never" | "sometimes" | "often";
export type HealthImpact = "" | "none" | "minor" | "clear" | "severe";
export type TriState = "" | "yes" | "average" | "no";
export type BusinessState = "" | "good" | "average" | "bad" | "unknown";
export type OfferParity = "" | "high" | "medium" | "low" | "unknown";
export type CompanySize = "" | "large" | "medium" | "small" | "startup";
export type ResidentState = "" | "yes" | "no" | "uncertain";
export type EnterpriseNatureInput = "" | "state_owned" | "foreign" | "private_leading" | "private_general" | "unknown";
export type JobLevelInput = "" | "senior_management" | "middle_manager" | "senior_staff" | "general_staff" | "unknown";
type RatingValue = number | null;

export type JobInputs = {
  mode: InputMode;
  city: CityKey | "";
  cityResident: ResidentState;
  annualCashIncome: number;
  weeklyHours: number;
  commuteMinutes: number;
  stress: RatingValue;
  weekendWork: WeekendWork;
  atmosphere: RatingValue;
  peopleHealth: RatingValue;
  healthImpact: HealthImpact;
  lifeAndLearningTime: TriState;
  safetyFeeling: RatingValue;
  companySize: CompanySize;
  companyBusiness: BusinessState;
  industryOutlook: BusinessState;
  teamStability: Certainty;
  roleCore: RatingValue;
  replacementDifficulty: RatingValue;
  layoffRisk: Certainty;
  pastGrowth: RatingValue;
  futureGrowth: RatingValue;
  mainWorkContent: string[];
  closeToCoreBusiness: RatingValue;
  qualityProjects: RatingValue;
  skillGenerality: RatingValue;
  mentoring: RatingValue;
  resumeValue: RatingValue;
  targetDirections: string[];
  externalOpportunities: RatingValue;
  externalKnown: boolean | "";
  jdMatch: RatingValue;
  projectExplainability: RatingValue;
  companyTransferability: RatingValue;
  industryTransferability: RatingValue;
  offerParity: OfferParity;
  jobSearchDifficulty: RatingValue;
  industryLove: RatingValue;
  contentLove: RatingValue;
  longTermFit: RatingValue;
  extraLearningWillingness: RatingValue;
  longTermDirections: string[];
  age: number;
  experienceYears: number;
  education: string;
  industry: IndustryKey | "";
  role: RoleKey | "";
  enterpriseNature: EnterpriseNatureInput;
  jobLevel: JobLevelInput;
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

type SalaryQuantiles = {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
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
    income: 0.32,
    stability: 0.16,
    holding: 0.22,
    growth: 0.16,
    liquidity: 0.06,
    fit: 0.08,
  } satisfies Record<DimensionKey, number>,
  subjectiveMap: {
    1: 8,
    2: 31,
    3: 50,
    4: 69,
    5: 92,
  } satisfies Record<number, number>,
  healthPenalty: {
    "": 0,
    none: 0,
    minor: -5,
    clear: -15,
    severe: -30,
  } satisfies Record<HealthImpact, number>,
  companySizeScore: {
    "": 55,
    large: 82,
    medium: 70,
    small: 58,
    startup: 45,
  } satisfies Record<CompanySize, number>,
  businessScore: {
    "": 55,
    good: 82,
    average: 62,
    bad: 35,
    unknown: 55,
  } satisfies Record<BusinessState, number>,
  certaintyScore: {
    "": 55,
    high: 82,
    medium: 62,
    low: 38,
    unknown: 55,
  } satisfies Record<Certainty, number>,
  layoffRiskScore: {
    "": 55,
    high: 32,
    medium: 58,
    low: 84,
    unknown: 55,
  } satisfies Record<Certainty, number>,
  offerParityScore: {
    "": 55,
    high: 86,
    medium: 64,
    low: 36,
    unknown: 55,
  } satisfies Record<OfferParity, number>,
};

export const defaultInputs: JobInputs = {
  mode: "brief",
  city: "",
  cityResident: "",
  annualCashIncome: 450000,
  weeklyHours: 45,
  commuteMinutes: 35,
  stress: null,
  weekendWork: "",
  atmosphere: null,
  peopleHealth: null,
  healthImpact: "",
  lifeAndLearningTime: "",
  safetyFeeling: null,
  companySize: "",
  companyBusiness: "",
  industryOutlook: "",
  teamStability: "",
  roleCore: null,
  replacementDifficulty: null,
  layoffRisk: "",
  pastGrowth: null,
  futureGrowth: null,
  mainWorkContent: [],
  closeToCoreBusiness: null,
  qualityProjects: null,
  skillGenerality: null,
  mentoring: null,
  resumeValue: null,
  targetDirections: [],
  externalOpportunities: null,
  externalKnown: "",
  jdMatch: null,
  projectExplainability: null,
  companyTransferability: null,
  industryTransferability: null,
  offerParity: "",
  jobSearchDifficulty: null,
  industryLove: null,
  contentLove: null,
  longTermFit: null,
  extraLearningWillingness: null,
  longTermDirections: [],
  age: 28,
  experienceYears: 5,
  education: "",
  industry: "",
  role: "",
  enterpriseNature: "",
  jobLevel: "",
  note: "",
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function subjective(value: RatingValue) {
  const key = clamp(Math.round(value ?? 3), 1, 5) as keyof typeof scoringConfig.subjectiveMap;
  return scoringConfig.subjectiveMap[key] ?? 60;
}

function isDetailedMode(inputs: JobInputs) {
  return inputs.mode === "detailed";
}

function cityKey(inputs: JobInputs): CityKey {
  return inputs.city || "other";
}

function industryKey(inputs: JobInputs): IndustryKey {
  return inputs.industry || "other";
}

function roleKey(inputs: JobInputs): RoleKey {
  return inputs.role || "other";
}

function industryBenchmarkOptions(inputs: JobInputs) {
  return {
    enterpriseNature: inputs.enterpriseNature,
    jobLevel: inputs.jobLevel,
  };
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

function erf(value: number) {
  const sign = value < 0 ? -1 : 1;
  const x = Math.abs(value);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x));
  return sign * y;
}

function normalCdf(value: number) {
  return 0.5 * (1 + erf(value / Math.SQRT2));
}

function fitLogNormalPercentile(income: number, quantiles?: SalaryQuantiles) {
  if (!quantiles || income <= 0) return null;
  const points = [
    { z: -1.281551565545, value: quantiles.p10 },
    { z: -0.674489750196, value: quantiles.p25 },
    { z: 0, value: quantiles.p50 },
    { z: 0.674489750196, value: quantiles.p75 },
    { z: 1.281551565545, value: quantiles.p90 },
  ].filter((point) => Number.isFinite(point.value) && point.value > 0);

  if (points.length < 2) return null;

  const meanZ = points.reduce((sum, point) => sum + point.z, 0) / points.length;
  const meanLogIncome = points.reduce((sum, point) => sum + Math.log(point.value), 0) / points.length;
  const varianceZ = points.reduce((sum, point) => sum + (point.z - meanZ) ** 2, 0);
  if (varianceZ <= 0) return null;

  const sigma = points.reduce((sum, point) => sum + (point.z - meanZ) * (Math.log(point.value) - meanLogIncome), 0) / varianceZ;
  if (!Number.isFinite(sigma) || sigma <= 0.01) return null;

  const mu = meanLogIncome - sigma * meanZ;
  return normalCdf((Math.log(income) - mu) / sigma);
}

function calculateBenchmark(inputs: JobInputs) {
  const city = cityBenchmarks[cityKey(inputs)];
  if (!isDetailedMode(inputs)) {
    return city.annualIncomeBenchmark * 0.6 + nationalBenchmark.annualIncomeBenchmark * 0.4;
  }

  const experienceFactor = getExperienceIncomeFactor(inputs.experienceYears).factor;
  const industry = getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs));
  const role = roleBenchmarks[roleKey(inputs)];
  const roleIndustryBenchmark = (industry.annualIncomeBenchmark * 0.45 + role.annualIncomeBenchmark * 0.55) * experienceFactor;
  const backgroundBenchmark = nationalBenchmark.annualIncomeBenchmark * experienceFactor;

  return city.annualIncomeBenchmark * 0.3 + roleIndustryBenchmark * 0.4 + backgroundBenchmark * 0.3;
}

function calculateIncome(inputs: JobInputs) {
  const benchmark = calculateBenchmark(inputs);
  const comparableIncome = inputs.annualCashIncome;
  const industry = isDetailedMode(inputs) ? getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)) : null;
  const fittedPercentile = fitLogNormalPercentile(comparableIncome, industry?.salaryQuantiles);
  const activeBenchmark = fittedPercentile === null ? benchmark : industry?.salaryQuantiles?.p50 ?? benchmark;
  const ratio = comparableIncome / activeBenchmark;
  const score = fittedPercentile === null ? scoreByRatio(comparableIncome / benchmark) : fittedPercentile * 100;

  return { score: clamp(score), benchmark: activeBenchmark, ratio };
}

function calculateHolding(inputs: JobInputs) {
  const hours = inputs.weeklyHours;
  const cityCommute = cityBenchmarks[cityKey(inputs)].commuteMinutes;
  let score = hours <= 40 ? 98 : hours <= 45 ? 88 : hours <= 50 ? 76 : hours <= 55 ? 65 : hours <= 60 ? 52 : hours <= 70 ? 35 : 15;

  if (inputs.commuteMinutes <= 30) score += 5;
  if (inputs.commuteMinutes >= 60) score -= 8;
  if (inputs.commuteMinutes <= cityCommute - 10) score += 4;
  if (inputs.commuteMinutes >= cityCommute + 15) score -= 5;
  if (inputs.commuteMinutes >= cityCommute + 30) score -= 6;

  score += (subjective(inputs.stress) - 60) * 0.18;
  if (isDetailedMode(inputs)) {
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
  if (!isDetailedMode(inputs)) return subjective(inputs.safetyFeeling);
  const marketStability = getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)).stabilityScore;

  return clamp(
    weighted([
      [weighted([[scoringConfig.companySizeScore[inputs.companySize], 0.45], [scoringConfig.businessScore[inputs.companyBusiness], 0.55]]), 0.22],
      [scoringConfig.businessScore[inputs.industryOutlook], 0.16],
      [marketStability, 0.1],
      [scoringConfig.certaintyScore[inputs.teamStability], 0.15],
      [subjective(inputs.roleCore), 0.12],
      [subjective(inputs.replacementDifficulty), 0.08],
      [scoringConfig.layoffRiskScore[inputs.layoffRisk], 0.08],
      [subjective(inputs.safetyFeeling), 0.12],
    ])
  );
}

function calculateGrowth(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
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
  if (!inputs.externalKnown && !isDetailedMode(inputs)) return clamp(subjective(inputs.externalOpportunities) - 8);

  const marketBase = isDetailedMode(inputs)
    ? (getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)).demandScore + roleBenchmarks[roleKey(inputs)].liquidityScore) / 2
    : 60;
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
  if (!isDetailedMode(inputs)) return subjective(inputs.longTermFit);
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
  if (total >= 85) return { grade: "S", title: "这班真能上", description: "收益、消耗、成长和选择权都在线，疯得比较值。" };
  if (total >= 75) return { grade: "A", title: "这班可以上", description: "整体是划算的，继续上班可以，但别忘了修补短板。" };
  if (total >= 65) return { grade: "B", title: "这班先上着", description: "有一些性价比，但不适合闭眼上，最低分维度要盯住。" };
  if (total >= 55) return { grade: "C", title: "这班边上边看", description: "能上，但别太上头，建议同步看机会和改造空间。" };
  return { grade: "D", title: "这班就上到这里吧", description: "疯得不太值，除非有明确短期目的，否则该准备退路。" };
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
    stability: !isDetailedMode(inputs) ? "主要依据未来一年安全感判断。" : "综合公司经营、行业景气、团队稳定、岗位核心度和裁员风险判断。",
    holding:
      level === "优势"
        ? "工时、通勤、压力和健康损耗整体可控。"
        : "工时、通勤、压力或健康损耗拉低了可持续性。",
    growth: !isDetailedMode(inputs) ? "主要依据过去半年成长和未来一年成长预期。" : "综合核心业务、高质量项目、通用能力、带教和简历价值判断。",
    liquidity:
      inputs.externalKnown
        ? "已通过外部机会或沟通做过市场验证。"
        : "外部机会尚未验证，市场接盘能力不确定。",
    fit: !isDetailedMode(inputs) ? "主要依据总体匹配度判断。" : "综合行业偏好、内容偏好、长期目标和额外学习意愿判断。",
  };
  return `${dimensionLabels[key]}：${reasons[key]}`;
}

function getConfidence(inputs: JobInputs, dimensions: Record<DimensionKey, number>): ScoreResult["confidence"] {
  const briefReason = "简略模式缺少年龄、行业、岗位和经验等坐标系，使用城市与全国公开数据粗粒度基准。";
  return {
    income: isDetailedMode(inputs) ? { level: "中", reason: "已结合城市、行业、岗位、经验、企业性质和岗位层级基准；行业层级薪酬仍依赖报告分位和兜底规则。" } : { level: "中", reason: briefReason },
    stability: isDetailedMode(inputs) ? { level: "中", reason: "已结合公司、团队、岗位风险和行业稳定性基准。" } : { level: "低", reason: "主要依赖未来一年安全感，结构性风险字段较少。" },
    holding: { level: "高", reason: "工时、通勤、压力和所在城市通勤基准是持有成本的核心字段。" },
    growth: isDetailedMode(inputs) ? { level: "中", reason: "已提供项目、核心业务、能力通用性和成长预期。" } : { level: "低", reason: "主要依赖过去成长和未来预期两个主观字段。" },
    liquidity:
      inputs.externalKnown && dimensions.liquidity >= 0
        ? { level: isDetailedMode(inputs) ? "中" : "低", reason: "外部机会已做主观验证，但仍建议用投递和猎头沟通校准。" }
        : { level: "低", reason: "流动性尚未验证，建议用简历投递或猎头反馈测试市场定价。" },
    fit: isDetailedMode(inputs) ? { level: "中", reason: "已拆分行业、内容、长期目标和学习意愿。" } : { level: "低", reason: "简略模式只使用总体匹配度。" },
  };
}

export function calculateJobScore(inputs: JobInputs): ScoreResult {
  const income = calculateIncome(inputs);
  const activeIndustryBenchmark = getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs));
  const activeExperienceFactor = getExperienceIncomeFactor(inputs.experienceYears);
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
  if (!isDetailedMode(inputs)) warnings.push("当前为简略评估，未充分考虑年龄、工作年限、行业和岗位机会集。");

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
    unitHourlyIncome: Math.round(inputs.annualCashIncome / Math.max(inputs.weeklyHours * 52, 1)),
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
      `${cityBenchmarks[cityKey(inputs)].label}基准：${cityBenchmarks[cityKey(inputs)].source}，${cityBenchmarks[cityKey(inputs)].year}，${cityBenchmarks[cityKey(inputs)].note}`,
      `全国基准：${nationalBenchmark.source}，${nationalBenchmark.year}，${nationalBenchmark.note}`,
      isDetailedMode(inputs)
        ? `${activeIndustryBenchmark.label}行业基准：${activeIndustryBenchmark.source}，${activeIndustryBenchmark.year}，${activeIndustryBenchmark.note}`
        : "简略模式未使用行业、岗位、年龄和学历细分基准。",
      isDetailedMode(inputs)
        ? `${roleBenchmarks[roleKey(inputs)].label}岗位基准：${roleBenchmarks[roleKey(inputs)].source}，${roleBenchmarks[roleKey(inputs)].year}，${roleBenchmarks[roleKey(inputs)].note}`
        : "当前版本已接入公开统计和报告数据；缺失细分字段会退化到全国或岗位大类基准。",
      isDetailedMode(inputs)
        ? `经验倍率：${activeExperienceFactor.label ?? `${inputs.experienceYears}年`}，${activeExperienceFactor.factor} 倍，${activeExperienceFactor.source}，${activeExperienceFactor.notes}`
        : "简略模式未使用经验倍率。",
      !isDetailedMode(inputs)
        ? "简略模式未使用企业性质和岗位层级。"
        : !inputs.enterpriseNature || inputs.enterpriseNature === "unknown" || !inputs.jobLevel || inputs.jobLevel === "unknown"
        ? "未完整选择企业性质或岗位层级时，行业薪酬分位会按工作年限和民营普通企业口径兜底。"
        : "详细模式已使用企业性质和岗位层级校准行业薪酬分位。",
    ],
  };
}
