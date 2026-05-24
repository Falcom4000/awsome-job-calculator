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
  criticalResourceControl: RatingValue;
  pastGrowth: RatingValue;
  futureGrowth: RatingValue;
  closeToCoreBusiness: RatingValue;
  mentoring: RatingValue;
  promotionClarity: RatingValue;
  resumeValue: RatingValue;
  externalOpportunities: RatingValue;
  jdMatch: RatingValue;
  projectExplainability: RatingValue;
  companyTransferability: RatingValue;
  industryTransferability: RatingValue;
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
  dimensionVerdicts: string[];
  dimensionRescues: string[];
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

const dataSourceNotes = [
  "国家统计局：《2025 年城镇单位就业人员年平均工资情况》",
  "国家统计局：《2024 年城镇单位就业人员年平均工资情况》",
  "北京市人力资源和社会保障局：历年北京市全口径城镇单位就业人员平均工资",
  "深圳市统计局：《2024 年深圳市城镇单位就业人员年平均工资情况》",
  "广州市统计局：《2024 年广州市城镇单位就业人员年平均工资情况》",
  "南京市统计局：《2024 年南京市城镇单位就业人员年平均工资情况》",
  "天津市统计局：《2024 年天津市城镇单位就业人员平均工资情况》",
  "重庆市统计局：《2024 年重庆市城镇单位就业人员年平均工资情况》",
  "武汉市统计局：2024 年武汉市城镇单位就业人员平均工资公开答复",
  "郑州市统计局：《2024 年郑州市城镇单位就业人员年平均工资情况》",
  "苏州市统计局：2024 年苏州市城镇非私营单位在岗职工年平均工资公开答复",
  "成都市统计局：《2024 年成都市城镇单位就业人员年平均工资公告》",
  "青岛市统计局：《2024 年青岛市单位就业人员年平均工资统计公告》",
  "杭州市统计局：《2024 年杭州市单位就业人员年平均工资统计公报》",
  "西安市统计局：2024 年西安市城镇单位就业人员年平均工资公开信息",
  "智联招聘：2024 年第三季度《中国企业招聘薪酬报告》",
  "PERSOLKELLY：《China Salary Guide 2025》",
  "LHH FESCO：《2025 年度薪酬指南》",
  "Morgan Philips：《2025 中国大陆市场薪酬指南》",
  "Hays：《2025 Asia Salary Guide》",
  "科锐国际：《2025 人才市场洞察及薪酬指南》",
  "Robert Walters：《中国大陆地区薪酬指南 2026》",
  "百度地图 / 中国城市规划设计研究院：《2022 年度中国主要城市通勤监测报告》",
  "艾瑞咨询：《中国网络招聘市场发展研究报告》",
  "说明：排名和分数仅供参考。",
];

type RatingGrade = "S" | "A" | "B" | "C" | "D";
type DimensionCopy = Record<RatingGrade, { verdicts: string[]; rescues?: string[] }>;

const dimensionCopy: Record<DimensionKey, DimensionCopy> = {
  income: {
    S: {
      verdicts: ["钱这块老板确实没抠，工资单看着不寒碜。", "回报水平很能打，这班在钱上没怎么亏待你。", "这份工作最硬的底气就是钱，发疯也算有补偿。"],
    },
    A: {
      verdicts: ["钱给得还算像话，不是暴富，但也不算白干。", "收入水平有点竞争力，至少不是纯靠情怀发电。", "工资单能稍微安抚一下灵魂。"],
    },
    B: {
      verdicts: ["钱不算太离谱，但也没到让人闭嘴的程度。", "这份收入能撑住基本盘，但别指望太多惊喜。", "回报就是普通班，能发工资，但不负责治愈人生。"],
      rescues: ["先确认市场价，明显低于同类岗位就该准备谈或走。", "把核心产出整理出来，给下一次谈钱留证据。", "继续干可以，但别停止找更高定价的机会。"],
    },
    C: {
      verdicts: ["钱给得有点虚，像是在用梦想抵工资。", "回报已经开始拖后腿，性价比被工资按住了。", "收入不太撑得住消耗，再上头就有点自我感动。"],
      rescues: ["尽快做市场比价，别靠老板一句以后会涨续命。", "如果短期涨不了，就把这份工作当跳板，不要当归宿。", "准备可展示成果，别让低工资和低议价权一起锁死你。"],
    },
    D: {
      verdicts: ["钱这块已经很危险，像是在给老板做慈善。", "回报水平严重不够看，再谈热爱就有点伤身。", "这班在钱上亏得明显，发疯都缺经费支持。"],
      rescues: ["优先考虑谈薪、换岗或换工作，别让低收入长期固化。", "如果没有强成长收益，尽快把退出计划提上日程。", "先保现金流，再找机会，不要被低薪耗到没力气翻身。"],
    },
  },
  stability: {
    S: {
      verdicts: ["饭碗看起来很稳，短期不太像要塌。", "稳定性很强，不像随时要通知你收拾东西。", "公司和岗位安全感不错，精神内耗能少一大截。"],
    },
    A: {
      verdicts: ["稳定性还可以，暂时不用每天怀疑公司明天没了。", "饭碗还算稳，不是铁饭碗，但也不是纸糊的。", "组织风险不算高，至少能让人睡个整觉。"],
    },
    B: {
      verdicts: ["稳定性一般，暂时没塌，但也别太放心。", "饭碗有点悬但还没红灯，适合边干边观察。", "安全感不算厚，别把希望全押在公司身上。"],
      rescues: ["开始准备备选项，别等风吹到脸上才找伞。", "关注业务、现金流、团队变动和岗位边缘化信号。", "提升可替代难度，别做最先被优化的那批人。"],
    },
    C: {
      verdicts: ["稳定性偏虚，这饭碗拿着有点烫手。", "公司或岗位信号不太稳，不能只靠侥幸续命。", "这班有塌方风险，继续上也得给自己留逃生口。"],
      rescues: ["立刻更新简历，先让自己拥有外部选项。", "别把关键资源只押在当前团队，尽快拓宽退路。", "重要成果和人脉都整理好，别临走才手忙脚乱。"],
    },
    D: {
      verdicts: ["稳定性高危，像坐在火山口旁边打卡。", "饭碗已经很悬，别把希望押在公司突然变好。", "这不是安全感低，是警报器已经在响。"],
      rescues: ["优先启动求职和内部转岗，别等通知来了才动。", "降低债务和大额支出，给自己留现金缓冲。", "把所有可迁移成果打包好，准备随时撤离。"],
    },
  },
  holding: {
    S: {
      verdicts: ["这班消耗很低，像打工界少见的低噪音模式。", "舒适度很强，没有天天把人榨成纸片。", "工时、通勤和压力都比较友好，这班不太吸命。"],
    },
    A: {
      verdicts: ["这班还算阳间，累归累，但没到天天崩溃。", "生活没被工作完全吃掉，还能留点人样。", "消耗整体可控，暂时不算吸命型岗位。"],
    },
    B: {
      verdicts: ["舒适度凑合，能扛，但需要定期回血。", "这班有消耗，但还没到不能活的程度。", "工作体验普通，谈不上舒服，也不算彻底阴间。"],
      rescues: ["找出最吸命的一项，先处理工时、通勤或压力中的最大头。", "固定休息和运动时间，不要把恢复完全交给周末。", "如果消耗持续升高，就别再用最近比较忙糊弄自己。"],
    },
    C: {
      verdicts: ["舒适度偏低，这班已经开始明显吸命。", "工时、压力或通勤有点过量，身体和情绪都在交税。", "这不是单纯累，是恢复速度追不上消耗速度。"],
      rescues: ["先砍最伤身的消耗源，不然其他分再高也难长期扛。", "明确拒绝无效加班，把边界说出来，而不是默默硬吞。", "如果调整不了，就把这份工作纳入短期过渡。"],
    },
    D: {
      verdicts: ["舒适度高危，这班像在按小时扣血。", "消耗已经严重超标，再撑下去可能人比工资先没。", "这不是累，是持续性献祭。"],
      rescues: ["优先保健康和睡眠，必要时认真考虑离开。", "先降低工作强度或请假恢复，不要等身体强制关机。", "如果公司不允许你像个人一样活，就该找下一个出口。"],
    },
  },
  growth: {
    S: {
      verdicts: ["成长性很强，这班确实能让你升级。", "这份工作有盼头，不只是重复搬砖。", "你在这里能涨经验值，不是原地打转。"],
    },
    A: {
      verdicts: ["成长性不错，这班还能给你一点未来。", "这里有东西可学，不算纯消耗型岗位。", "这班不只是发工资，也能给履历加点料。"],
    },
    B: {
      verdicts: ["成长性一般，有点东西，但不多。", "还能学到一些，但可能很快进入重复模式。", "盼头不算没有，只是需要自己主动捞。"],
      rescues: ["主动找新项目、新责任或新技能点，不然容易原地磨损。", "给自己设成长期限，过期没变化就重新评估。", "不要只做熟悉的活，熟练不等于升值。"],
    },
    C: {
      verdicts: ["成长性偏低，这班可能让你越上越钝。", "这里的活有点重复，技能增值不明显。", "盼头不太足，继续耗着容易变成履历空转。"],
      rescues: ["尽快补一个外部可识别的技能或项目，别被岗位困住。", "主动争取更核心的工作，如果争取不到就准备换环境。", "把当前工作当现金流，不要当成长主线。"],
    },
    D: {
      verdicts: ["成长性高危，这班像经验值黑洞。", "继续待下去，可能不是成长，是退化。", "这班在升值这件事上几乎没给你留路。"],
      rescues: ["立刻寻找新的成长来源，内部没有就去外部找。", "不要让低成长工作长期占满你的黄金时间。", "如果无法获得项目、反馈和技能提升，就该启动退出计划。"],
    },
  },
  liquidity: {
    S: {
      verdicts: ["外面的路很宽，你不是被这班锁死的人。", "流动性很强，真想动的时候大概率有人接。", "你在市场上还有牌，不是只能困在当前公司。"],
    },
    A: {
      verdicts: ["外面还有路，想动不算太难。", "流动性不错，这班还没把你焊死。", "市场上还有人能看懂你，不算孤岛型岗位。"],
    },
    B: {
      verdicts: ["流动性一般，能动，但不算丝滑。", "外面不是没路，但可能要多准备几步。", "这班还没锁死你，但选择权也没多宽。"],
      rescues: ["先明确目标岗位，再对照 JD 补短板。", "把项目经历讲清楚，别让好东西卡在表达上。", "试投一轮，拿真实市场反馈，不要靠想象判断行情。"],
    },
    C: {
      verdicts: ["外面的路偏窄，这班有点锁人。", "流动性偏低，想走可能会遇到不少阻力。", "当前经验对外不够好卖，换工作会比较费劲。"],
      rescues: ["先补可迁移技能，再包装可讲项目。", "不要继续只做公司内部限定任务，市场听不懂就很亏。", "提前准备半年，不要等被迫离开才发现不好卖。"],
    },
    D: {
      verdicts: ["流动性高危，这班快把你焊在工位上了。", "外面的路很窄，想走可能要先拆锁。", "这份经历对外不好卖，风险已经不小。"],
      rescues: ["立刻开始补市场通用能力，先把锁撬开。", "做一个能对外展示的项目或成果，给自己制造出口。", "不要继续加深单一公司依赖，否则越待越难动。"],
    },
  },
  fit: {
    S: {
      verdicts: ["匹配度很高，这班和你确实有点八字合。", "你对行业和内容都比较买账，内耗会少很多。", "这班不只是能上，还比较像你的路。"],
    },
    A: {
      verdicts: ["匹配度不错，这班至少不是天天和你对着干。", "你和这份工作还算合拍，长期做有一定可能。", "这班不算违背天性，干起来没那么拧巴。"],
    },
    B: {
      verdicts: ["匹配度一般，不讨厌，但也谈不上天选。", "这班能上，但不一定是你的命定工位。", "你和这份工作还算能处，只是火花不多。"],
      rescues: ["找出你真正喜欢和真正排斥的部分，别糊着过。", "试着调整职责，让工作更靠近你的长期方向。", "如果长期目标不合，要尽早承认，不要硬凑。"],
    },
    C: {
      verdicts: ["匹配度偏低，这班和你有点八字不合。", "干得下去不代表适合，内耗已经开始露头。", "这份工作可能不是你的菜，硬吃容易反胃。"],
      rescues: ["先判断是不喜欢行业、内容，还是当前公司环境。", "把不匹配点拆清楚，下一份工作别重复踩坑。", "如果每天都在说服自己喜欢，那大概率就不喜欢。"],
    },
    D: {
      verdicts: ["匹配度高危，这班和你像硬凑的孽缘。", "这份工作明显不对味，继续硬上会很消耗。", "不是你不行，是这班可能真的不适合你。"],
      rescues: ["尽快重新确认职业方向，不要把人生耗在不合适里。", "先找相邻方向试水，别一边痛苦一边原地不动。", "如果已经持续排斥，就别再用责任感绑架自己。"],
    },
  },
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
};

export const defaultInputs: JobInputs = {
  mode: "brief",
  city: "",
  annualCashIncome: 0,
  annualEquityIncome: 0,
  weeklyHours: 0,
  commuteMinutes: 0,
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
  criticalResourceControl: null,
  pastGrowth: null,
  futureGrowth: null,
  closeToCoreBusiness: null,
  mentoring: null,
  promotionClarity: null,
  resumeValue: null,
  externalOpportunities: null,
  jdMatch: null,
  projectExplainability: null,
  companyTransferability: null,
  industryTransferability: null,
  industryLove: null,
  contentLove: null,
  longTermFit: null,
  extraLearningWillingness: null,
  age: 0,
  experienceYears: 0,
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
        [scoringConfig.companySizeScore[inputs.companySize], 0.3],
        [scoringConfig.businessScore[inputs.companyBusiness], 0.3],
        [subjective(inputs.roleCore), 0.18],
        [subjective(inputs.safetyFeeling), 0.22],
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
      [subjective(inputs.roleCore), 0.13],
      [subjective(inputs.replacementDifficulty), 0.08],
      [subjective(inputs.criticalResourceControl), 0.12],
      [subjective(inputs.safetyFeeling), 0.15],
    ])
  );
}

function calculateGrowth(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(weighted([[subjective(inputs.closeToCoreBusiness), 0.25], [subjective(inputs.pastGrowth), 0.35], [subjective(inputs.futureGrowth), 0.4]]));
  }

  return clamp(
    weighted([
      [subjective(inputs.closeToCoreBusiness), 0.22],
      [subjective(inputs.pastGrowth), 0.26],
      [subjective(inputs.futureGrowth), 0.32],
      [subjective(inputs.mentoring), 0.1],
      [subjective(inputs.promotionClarity), 0.1],
    ])
  );
}

function calculateLiquidity(inputs: JobInputs) {
  if (!isDetailedMode(inputs)) {
    return clamp(weighted([[subjective(inputs.externalOpportunities), 0.4], [subjective(inputs.jdMatch), 0.3], [subjective(inputs.resumeValue), 0.3]]));
  }

  const marketBase = isDetailedMode(inputs)
    ? (getIndustryBenchmark(industryKey(inputs), inputs.experienceYears, industryBenchmarkOptions(inputs)).demandScore + roleBenchmarks[roleKey(inputs)].liquidityScore) / 2
    : 60;
  const score = weighted([
    [subjective(inputs.externalOpportunities), 0.18],
    [subjective(inputs.jdMatch), 0.18],
    [subjective(inputs.resumeValue), 0.2],
    [subjective(inputs.projectExplainability), 0.18],
    [subjective(inputs.companyTransferability), 0.12],
    [subjective(inputs.industryTransferability), 0.12],
    [marketBase, 0.04],
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
  if (percentile >= 90) return { grade: "S", title: "这班是仙品", description: "钱到位、成长有、消耗低，这种班建议供起来。", percentile };
  if (percentile >= 70) return { grade: "A", title: "这班能处", description: "有短板，但总体不坑，属于打工人可以暂时握手言和的班。", percentile };
  if (percentile >= 30) return { grade: "B", title: "这班先苟着", description: "不是梦中情班，但还能苟，别把它当人生归宿。", percentile };
  if (percentile >= 10) return { grade: "C", title: "这班有毒", description: "能上，但毒性不低，建议一边回血一边找解药。", percentile };
  return { grade: "D", title: "这班别上头", description: "亏得有点明显了，再撑下去可能人比工资先没。", percentile };
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
    stability: !isDetailedMode(inputs) ? "主要依据公司规模、经营情况和未来一年安全感判断。" : "综合公司经营、行业景气、团队稳定、岗位核心度、资源掌握和安全感判断。",
    holding:
      level === "优势"
        ? "工时、通勤、压力、福利和健康损耗整体可控。"
        : "工时、通勤、压力、福利或健康损耗拉低了可持续性。",
    growth: !isDetailedMode(inputs) ? "主要依据过去半年成长和未来一年成长预期。" : "综合核心业务、成长速度、带教和上升通道判断。",
    liquidity: "综合外部机会、JD 匹配、简历价值、成果可理解度和迁移能力判断。",
    fit: !isDetailedMode(inputs) ? "主要依据总体匹配度判断。" : "综合行业偏好、内容偏好、长期目标和额外学习意愿判断。",
  };
  return `${dimensionLabels[key]}：${reasons[key]}`;
}

function getConfidence(inputs: JobInputs): ScoreResult["confidence"] {
  const briefIncomeReason = "已使用城市、行业和岗位层级；未填写企业性质时按民营普通口径兜底，未填写工作年限时按默认经验阶段兜底。";
  return {
    income: isDetailedMode(inputs) ? { level: "中", reason: "已结合城市、行业、岗位、经验、企业性质和岗位层级基准；行业层级薪酬仍依赖报告分位和兜底规则。" } : { level: "中", reason: briefIncomeReason },
    stability: isDetailedMode(inputs) ? { level: "中", reason: "已结合公司、团队、岗位核心度、资源掌握和行业稳定性基准。" } : { level: "低", reason: "主要依赖公司规模、经营情况和未来一年安全感。" },
    holding: { level: "高", reason: "工时、通勤、压力、福利水平和所在城市通勤基准是舒适度的核心字段。" },
    growth: isDetailedMode(inputs) ? { level: "中", reason: "已提供核心业务、成长预期、带教和上升通道。" } : { level: "低", reason: "主要依赖核心业务、过去成长和未来预期。" },
    liquidity: isDetailedMode(inputs)
      ? { level: "中", reason: "已结合外部机会、JD 匹配、简历价值、成果表达和迁移能力。" }
      : { level: "低", reason: "主要依赖外部机会、JD 匹配和简历价值。" },
    fit: isDetailedMode(inputs) ? { level: "中", reason: "已拆分行业、内容、长期目标和学习意愿。" } : { level: "低", reason: "主要依赖行业偏好、内容偏好和长期目标。" },
  };
}

function pickDimensionCopy(options: string[], total: number, score: number, index: number) {
  return options[(total + score + index) % options.length];
}

function getDimensionNarratives(dimensions: Record<DimensionKey, number>, total: number) {
  const verdicts: string[] = [];
  const rescues: string[] = [];
  const dimensionKeys = Object.keys(scoringConfig.weights) as DimensionKey[];

  dimensionKeys.forEach((key, index) => {
    const score = dimensions[key];
    const grade = getRating(score).grade as RatingGrade;
    const copy = dimensionCopy[key][grade];
    verdicts.push(`${dimensionLabels[key]}：${pickDimensionCopy(copy.verdicts, total, score, index)}`);

    if (copy.rescues?.length) {
      rescues.push(`${dimensionLabels[key]}：${pickDimensionCopy(copy.rescues, total, score, index + 17)}`);
    }
  });

  return { verdicts, rescues };
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
    if (score < 40) warnings.push(`${dimensionLabels[key as DimensionKey]}已经跌破 40，是这班的高危雷区。`);
    else if (score < 60) warnings.push(`${dimensionLabels[key as DimensionKey]}低于 60，别装没看见。`);
  });
  if (dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("成长和外面的路都偏窄，这班可能越上越锁。");
  if (dimensions.income >= 80 && dimensions.growth < 60 && dimensions.liquidity < 60) warnings.push("钱给得不错，但成长和退路偏弱，小心高薪陷阱把人焊住。");
  if (dimensions.income >= 80 && dimensions.holding < 60) warnings.push("钱是给了，但吸命程度也上来了，可能是高薪高消耗。");
  const dimensionNarratives = getDimensionNarratives(dimensions, total);

  const suggestions = [
    total >= 75 ? "这班暂时能处，先把最低分那块补一补，别让短板偷偷发烂。" : "别只盯着工资，先去外面试试水，看看有没有更像人的活法。",
    dimensions.holding < 60 ? "先把工时、通勤、压力这些吸命项压下来，不然迟早被榨干。" : "消耗暂时还扛得住，把精力放到成长和外部选择权上。",
    dimensions.liquidity < 65 ? "未来 1-2 个月可以投一轮简历，看看有没有人来捞你。" : "外面的路别断，别只攒公司内部限定皮肤。",
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
    dimensionVerdicts: dimensionNarratives.verdicts,
    dimensionRescues: dimensionNarratives.rescues,
    strengthReasons,
    weaknessReasons,
    optionValueDescription: getOptionValueDescription(optionValue),
    confidence: getConfidence(inputs),
    dataNotes: dataSourceNotes,
  };
}
