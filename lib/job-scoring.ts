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
export type BusinessState = "" | "good" | "average" | "bad" | "unknown";
export type OfferParity = "" | "high" | "medium" | "low" | "unknown";
export type CompanySize = "" | "large" | "medium" | "small" | "startup";
export type EnterpriseNatureInput = "" | "state_owned" | "foreign" | "private_leading" | "private_general" | "unknown";
export type JobLevelInput = "" | "senior_management" | "middle_manager" | "senior_staff" | "general_staff" | "unknown";
type RatingValue = number | null;

export type JobInputs = {
  mode: InputMode;
  city: CityKey | "";
  annualCashIncome: number;
  annualEquityIncome: number;
  weeklyHours: number;
  commuteMinutes: number;
  stress: RatingValue;
  benefitsLevel: RatingValue;
  weekendWork: WeekendWork;
  atmosphere: RatingValue;
  peopleHealth: RatingValue;
  healthImpact: RatingValue;
  lifeAndLearningTime: RatingValue;
  safetyFeeling: RatingValue;
  companySize: CompanySize;
  companyBusiness: BusinessState;
  industryOutlook: BusinessState;
  teamStability: Certainty;
  roleCore: RatingValue;
  replacementDifficulty: RatingValue;
  layoffRisk: RatingValue;
  pastGrowth: RatingValue;
  futureGrowth: RatingValue;
  closeToCoreBusiness: RatingValue;
  mentoring: RatingValue;
  resumeValue: RatingValue;
  externalOpportunities: RatingValue;
  jdMatch: RatingValue;
  projectExplainability: RatingValue;
  companyTransferability: RatingValue;
  industryTransferability: RatingValue;
  offerParity: OfferParity;
  industryLove: RatingValue;
  contentLove: RatingValue;
  longTermFit: RatingValue;
  extraLearningWillingness: RatingValue;
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
    percentile: number;
  };
  dimensions: Record<DimensionKey, number>;
  aggregateScores: {
    benefit: number;
    cost: number;
  };
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
  income: "回报水平",
  stability: "稳定性",
  holding: "舒适度",
  growth: "成长性",
  liquidity: "流动性",
  fit: "匹配度",
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
    1: 20,
    2: 45,
    3: 70,
    4: 84,
    5: 96,
  } satisfies Record<number, number>,
  subjectivePrior: {
    1: 0.1,
    2: 0.2,
    3: 0.4,
    4: 0.2,
    5: 0.1,
  } satisfies Record<number, number>,
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
  annualCashIncome: 0,
  annualEquityIncome: 0,
  weeklyHours: 45,
  commuteMinutes: 35,
  stress: null,
  benefitsLevel: null,
  weekendWork: "",
  atmosphere: null,
  peopleHealth: null,
  healthImpact: null,
  lifeAndLearningTime: null,
  safetyFeeling: null,
  companySize: "",
  companyBusiness: "",
  industryOutlook: "",
  teamStability: "",
  roleCore: null,
  replacementDifficulty: null,
  layoffRisk: null,
  pastGrowth: null,
  futureGrowth: null,
  closeToCoreBusiness: null,
  mentoring: null,
  resumeValue: null,
  externalOpportunities: null,
  jdMatch: null,
  projectExplainability: null,
  companyTransferability: null,
  industryTransferability: null,
  offerParity: "",
  industryLove: null,
  contentLove: null,
  longTermFit: null,
  extraLearningWillingness: null,
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
  if (ratio <= 0) return 0;
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
  const comparableIncome = inputs.annualCashIncome + (isDetailedMode(inputs) ? inputs.annualEquityIncome : 0);
  const industry = getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs));
  if (comparableIncome <= 0) {
    return { score: 0, benchmark, ratio: 0 };
  }
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

  score += (subjective(inputs.stress) - 50) * 0.18;
  score += (subjective(inputs.benefitsLevel) - 50) * 0.1;
  if (isDetailedMode(inputs)) {
    if (inputs.weekendWork === "sometimes") score -= 5;
    if (inputs.weekendWork === "often") score -= 14;
    score += (subjective(inputs.atmosphere) - 50) * 0.14;
    score += (subjective(inputs.peopleHealth) - 50) * 0.12;
    score += (subjective(inputs.healthImpact) - 50) * 0.24;
    score += (subjective(inputs.lifeAndLearningTime) - 50) * 0.16;
  }
  return clamp(score);
}

function calculateStability(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(
      weighted([
        [scoringConfig.companySizeScore[inputs.companySize], 0.35],
        [scoringConfig.businessScore[inputs.companyBusiness], 0.35],
        [subjective(inputs.safetyFeeling), 0.3],
      ])
    );
  }
  const marketStability = getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)).stabilityScore;

  return clamp(
    weighted([
      [weighted([[scoringConfig.companySizeScore[inputs.companySize], 0.45], [scoringConfig.businessScore[inputs.companyBusiness], 0.55]]), 0.22],
      [scoringConfig.businessScore[inputs.industryOutlook], 0.16],
      [marketStability, 0.1],
      [scoringConfig.certaintyScore[inputs.teamStability], 0.15],
      [subjective(inputs.roleCore), 0.12],
      [subjective(inputs.replacementDifficulty), 0.08],
      [subjective(inputs.layoffRisk), 0.08],
      [subjective(inputs.safetyFeeling), 0.12],
    ])
  );
}

function calculateGrowth(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(weighted([[subjective(inputs.closeToCoreBusiness), 0.25], [subjective(inputs.pastGrowth), 0.35], [subjective(inputs.futureGrowth), 0.4]]));
  }

  return clamp(
    weighted([
      [subjective(inputs.closeToCoreBusiness), 0.2],
      [subjective(inputs.pastGrowth), 0.24],
      [subjective(inputs.futureGrowth), 0.28],
      [subjective(inputs.mentoring), 0.14],
      [subjective(inputs.resumeValue), 0.14],
    ])
  );
}

function calculateLiquidity(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(weighted([[subjective(inputs.externalOpportunities), 0.4], [subjective(inputs.jdMatch), 0.3], [subjective(inputs.projectExplainability), 0.3]]));
  }

  const marketBase = isDetailedMode(inputs)
    ? (getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)).demandScore + roleBenchmarks[roleKey(inputs)].liquidityScore) / 2
    : 60;
  const score = weighted([
    [subjective(inputs.externalOpportunities), 0.2],
    [subjective(inputs.jdMatch), 0.2],
    [subjective(inputs.projectExplainability), 0.2],
    [subjective(inputs.companyTransferability), 0.14],
    [subjective(inputs.industryTransferability), 0.14],
    [scoringConfig.offerParityScore[inputs.offerParity], 0.07],
    [marketBase, 0.05],
  ]);

  return clamp(score);
}

function calculateFit(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(weighted([[subjective(inputs.industryLove), 0.33], [subjective(inputs.contentLove), 0.33], [subjective(inputs.longTermFit), 0.34]]));
  }
  return clamp(
    weighted([
      [subjective(inputs.industryLove), 0.25],
      [subjective(inputs.contentLove), 0.3],
      [subjective(inputs.longTermFit), 0.3],
      [subjective(inputs.extraLearningWillingness), 0.15],
    ])
  );
}

function getSubjectivePercentileAnchors() {
  let cumulative = 0;
  return Object.entries(scoringConfig.subjectivePrior).map(([choice, probability]) => {
    const score = scoringConfig.subjectiveMap[Number(choice) as keyof typeof scoringConfig.subjectiveMap];
    const percentile = (cumulative + probability / 2) * 100;
    cumulative += probability;
    return { score, percentile };
  });
}

function getTotalPercentile(total: number) {
  const anchors = getSubjectivePercentileAnchors();
  if (total <= anchors[0].score) return Math.max(1, Math.round((total / anchors[0].score) * anchors[0].percentile));

  for (let index = 1; index < anchors.length; index += 1) {
    const previous = anchors[index - 1];
    const current = anchors[index];
    if (total <= current.score) {
      const ratio = (total - previous.score) / (current.score - previous.score);
      return clamp(Math.round(previous.percentile + (current.percentile - previous.percentile) * ratio), 1, 99);
    }
  }

  const last = anchors[anchors.length - 1];
  return clamp(Math.round(last.percentile + ((total - last.score) / (100 - last.score)) * (99 - last.percentile)), 1, 99);
}

function getRating(total: number) {
  const percentile = getTotalPercentile(total);
  if (percentile >= 90) return { grade: "S", title: "这班真能上", description: "钱、成长、消耗都在线，疯得很值。", percentile };
  if (percentile >= 70) return { grade: "A", title: "这班可以上", description: "整体划算，有短板但不影响大局。", percentile };
  if (percentile >= 30) return { grade: "B", title: "这班先上着", description: "不是梦中情班，但暂时不算亏。", percentile };
  if (percentile >= 10) return { grade: "C", title: "这班边上边看", description: "能上，但别太上头，边干边找解法。", percentile };
  return { grade: "D", title: "这班就上到这里吧", description: "疯得不太值，该认真准备退路了。", percentile };
}

function getOptionValueDescription(score: number) {
  if (score >= 80) return "退路很宽，越做越自由。";
  if (score >= 60) return "退路还可以，但要持续经营。";
  if (score >= 40) return "现在能上，但退路不算宽。";
  return "有点容易被锁住，要先补成长和流动性。";
}

function getDimensionReason(key: DimensionKey, score: number, inputs: JobInputs) {
  const level = score >= 80 ? "优势" : score >= 60 ? "中性" : "短板";
  const income = calculateIncome(inputs);
  const reasons: Record<DimensionKey, string> = {
    income:
      level === "优势"
        ? `当前年化收入约为基准 ${income.ratio.toFixed(2)} 倍。`
        : `当前年化收入约为基准 ${income.ratio.toFixed(2)} 倍，收益优势不明显。`,
    stability: !isDetailedMode(inputs) ? "主要依据公司规模、经营情况和未来一年安全感判断。" : "综合公司经营、行业景气、团队稳定、岗位核心度和裁员风险判断。",
    holding:
      level === "优势"
        ? "工时、通勤、压力、福利和健康损耗整体可控。"
        : "工时、通勤、压力、福利或健康损耗拉低了可持续性。",
    growth: !isDetailedMode(inputs) ? "主要依据过去半年成长和未来一年成长预期。" : "综合核心业务、成长速度、带教和简历价值判断。",
    liquidity: "综合外部机会、JD 匹配、项目可讲程度和迁移能力判断。",
    fit: !isDetailedMode(inputs) ? "主要依据总体匹配度判断。" : "综合行业偏好、内容偏好、长期目标和额外学习意愿判断。",
  };
  return `${dimensionLabels[key]}：${reasons[key]}`;
}

function getConfidence(inputs: JobInputs): ScoreResult["confidence"] {
  const briefIncomeReason = "已使用城市、行业和岗位层级；未填写企业性质时按民营普通口径兜底，未填写工作年限时按默认经验阶段兜底。";
  return {
    income: isDetailedMode(inputs) ? { level: "中", reason: "已结合城市、行业、岗位、经验、企业性质和岗位层级基准；行业层级薪酬仍依赖报告分位和兜底规则。" } : { level: "中", reason: briefIncomeReason },
    stability: isDetailedMode(inputs) ? { level: "中", reason: "已结合公司、团队、岗位风险和行业稳定性基准。" } : { level: "低", reason: "主要依赖公司规模、经营情况和未来一年安全感。" },
    holding: { level: "高", reason: "工时、通勤、压力、福利水平和所在城市通勤基准是舒适度的核心字段。" },
    growth: isDetailedMode(inputs) ? { level: "中", reason: "已提供核心业务、成长预期、带教和简历价值。" } : { level: "低", reason: "主要依赖核心业务、过去成长和未来预期。" },
    liquidity: isDetailedMode(inputs)
      ? { level: "中", reason: "已结合外部机会、JD 匹配、项目表达和迁移能力。" }
      : { level: "低", reason: "主要依赖外部机会、JD 匹配和项目可讲程度。" },
    fit: isDetailedMode(inputs) ? { level: "中", reason: "已拆分行业、内容、长期目标和学习意愿。" } : { level: "低", reason: "主要依赖行业偏好、内容偏好和长期目标。" },
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
  const aggregateScores = {
    benefit: Math.round(
      weighted([
        [dimensions.income, scoringConfig.weights.income],
        [dimensions.growth, scoringConfig.weights.growth],
      ])
    ),
    cost: Math.round(
      weighted([
        [dimensions.stability, scoringConfig.weights.stability],
        [dimensions.holding, scoringConfig.weights.holding],
        [dimensions.liquidity, scoringConfig.weights.liquidity],
        [dimensions.fit, scoringConfig.weights.fit],
      ])
    ),
  };
  const optionValue = Math.round(dimensions.growth * 0.5 + dimensions.liquidity * 0.5);
  const sorted = Object.entries(dimensions).sort((a, b) => b[1] - a[1]) as Array<[DimensionKey, number]>;
  const strengths = sorted.slice(0, 2).map(([key]) => dimensionLabels[key]);
  const weaknesses = sorted.slice(-2).reverse().map(([key]) => dimensionLabels[key]);
  const strengthReasons = sorted.slice(0, 2).map(([key, score]) => getDimensionReason(key, score, inputs));
  const weaknessReasons = sorted.slice(-2).reverse().map(([key, score]) => getDimensionReason(key, score, inputs));
  const warnings: string[] = [];

  Object.entries(dimensions).forEach(([key, score]) => {
    if (score < 40) warnings.push(`${dimensionLabels[key as DimensionKey]}低于 40，是高风险短板。`);
    else if (score < 60) warnings.push(`${dimensionLabels[key as DimensionKey]}低于 60，需要盯紧。`);
  });
  if (dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("成长性和流动性都偏低，后面可能不好换。");
  if (dimensions.income >= 80 && dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("钱给得不错，但成长和退路偏弱，警惕高薪陷阱。");
  if (dimensions.income >= 80 && dimensions.holding < 60) warnings.push("回报高但舒适度低，可能是高薪高消耗。");
  if (!isDetailedMode(inputs)) warnings.push("当前是快速评估，结果适合先看方向。");

  const suggestions = [
    total >= 75 ? "先继续上，把最低分那一项补起来。" : "别只看工资，先验证外面有没有更好的解法。",
    dimensions.holding < 60 ? "先处理工时、通勤、压力、福利或健康损耗，不然很难长期扛。" : "舒适度还可以，把精力放到成长和退路上。",
    dimensions.liquidity < 65 ? "未来 1-2 个月投一轮简历，看看市场真实反馈。" : "保持外部机会不断线，别只攒公司内部经验。",
  ];

  return {
    total,
    rating: getRating(total),
    dimensions,
    aggregateScores,
    optionValue,
    unitHourlyIncome: Math.round((inputs.annualCashIncome + (isDetailedMode(inputs) ? inputs.annualEquityIncome : 0)) / Math.max(inputs.weeklyHours * 52, 1)),
    benchmarkIncome: Math.round(income.benchmark),
    incomeRatio: Number(income.ratio.toFixed(2)),
    strengths,
    weaknesses,
    warnings,
    suggestions,
    strengthReasons,
    weaknessReasons,
    optionValueDescription: getOptionValueDescription(optionValue),
    confidence: getConfidence(inputs),
    dataNotes: [
      `${cityBenchmarks[cityKey(inputs)].label}基准：${cityBenchmarks[cityKey(inputs)].source}，${cityBenchmarks[cityKey(inputs)].year}，${cityBenchmarks[cityKey(inputs)].note}`,
      `全国基准：${nationalBenchmark.source}，${nationalBenchmark.year}，${nationalBenchmark.note}`,
      isDetailedMode(inputs)
        ? `${activeIndustryBenchmark.label}行业基准：${activeIndustryBenchmark.source}，${activeIndustryBenchmark.year}，${activeIndustryBenchmark.note}`
        : `${activeIndustryBenchmark.label}行业 / 岗位层级基准：${activeIndustryBenchmark.source}，${activeIndustryBenchmark.year}，${activeIndustryBenchmark.note}`,
      isDetailedMode(inputs)
        ? `${roleBenchmarks[roleKey(inputs)].label}岗位基准：${roleBenchmarks[roleKey(inputs)].source}，${roleBenchmarks[roleKey(inputs)].year}，${roleBenchmarks[roleKey(inputs)].note}`
        : "当前版本已接入公开统计和报告数据；缺失细分字段会退化到全国或岗位大类基准。",
      isDetailedMode(inputs)
        ? `经验倍率：${activeExperienceFactor.label ?? `${inputs.experienceYears}年`}，${activeExperienceFactor.factor} 倍，${activeExperienceFactor.source}，${activeExperienceFactor.notes}`
        : "简略模式未使用经验倍率。",
      !isDetailedMode(inputs)
        ? "简略模式已使用行业和岗位层级；企业性质按民营普通口径兜底。"
        : !inputs.enterpriseNature || inputs.enterpriseNature === "unknown" || !inputs.jobLevel || inputs.jobLevel === "unknown"
        ? "未完整选择企业性质或岗位层级时，行业薪酬分位会按工作年限和民营普通企业口径兜底。"
        : "详细模式已使用企业性质和岗位层级校准行业薪酬分位。",
    ],
  };
}
