import {
  cityCommuteBenchmarks,
  cityIncomeBenchmarks,
  experienceIncomeFactors,
  industrySalaryBenchmarks,
  industryPositionSalaryBenchmarks,
  industryStabilityBenchmarks,
  nationalIncomeBenchmarks,
  roleLiquidityBenchmarks,
  roleSalaryBenchmarks,
  type EnterpriseNature,
  type JobLevel,
} from "@/data/work-asset-datasets";

export type CityKey =
  | "beijing"
  | "shanghai"
  | "shenzhen"
  | "guangzhou"
  | "hangzhou"
  | "nanjing"
  | "suzhou"
  | "chengdu"
  | "wuhan"
  | "xian"
  | "chongqing"
  | "tianjin"
  | "qingdao"
  | "changsha"
  | "zhengzhou"
  | "other";

export type IndustryKey =
  | "internet"
  | "finance"
  | "manufacturing"
  | "consumer"
  | "education"
  | "healthcare"
  | "public"
  | "other";

export type RoleKey =
  | "engineering"
  | "product"
  | "operations"
  | "research"
  | "sales"
  | "finance_role"
  | "design"
  | "other";

export type MarketDatum = {
  label: string;
  annualIncomeBenchmark: number;
  commuteMinutes: number;
  source: string;
  year: number;
  note: string;
};

export type IndustryDatum = {
  label: string;
  annualIncomeBenchmark: number;
  salaryQuantiles?: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
  demandScore: number;
  stabilityScore: number;
  source: string;
  year: number;
  note: string;
};

export type RoleDatum = {
  label: string;
  annualIncomeBenchmark: number;
  liquidityScore: number;
  source: string;
  year: number;
  note: string;
};

export type IndustryBenchmarkOptions = {
  enterpriseNature?: EnterpriseNature | "unknown" | "";
  jobLevel?: JobLevel | "unknown" | "";
};

function firstNumber(...values: Array<number | null | undefined>) {
  return values.find((value): value is number => typeof value === "number" && Number.isFinite(value));
}

function latestNationalBenchmark() {
  return [...nationalIncomeBenchmarks].sort((a, b) => b.year - a.year)[0];
}

function findCityIncome(cityKey: string) {
  const records = cityIncomeBenchmarks.filter((item) => item.cityKey === cityKey);
  return records.find((item) => item.methodology === "official_salary" && firstNumber(item.annualIncomeAvg, item.socialAverageSalary, item.recruitingSalaryMedian))
    ?? records.find((item) => firstNumber(item.annualIncomeAvg, item.socialAverageSalary, item.recruitingSalaryMedian));
}

function findCommute(cityKey: string) {
  return cityCommuteBenchmarks.find((item) => item.cityKey === cityKey);
}

function commuteValue(cityKey: string, fallback = 38) {
  return firstNumber(findCommute(cityKey)?.commuteMinutesAvg, fallback) ?? fallback;
}

function cityDatum(cityKey: string, label: string, fallbackIncome?: number): MarketDatum {
  const city = findCityIncome(cityKey);
  const income = firstNumber(city?.annualIncomeAvg, city?.socialAverageSalary, city?.recruitingSalaryMedian, fallbackIncome, nationalBenchmark.annualIncomeBenchmark);
  const source = city?.source ?? nationalBenchmark.source;
  const year = city?.year ?? nationalBenchmark.year;
  const note = city
    ? `${city.methodology === "official_salary" ? "官方工资" : "招聘薪资"}口径；${city.notes}`
    : "城市数据缺失，退化到全国基准。";

  return {
    label,
    annualIncomeBenchmark: income ?? nationalBenchmark.annualIncomeBenchmark,
    commuteMinutes: commuteValue(cityKey),
    source,
    year,
    note,
  };
}

function industrySalary(...keys: string[]) {
  return keys
    .map((key) => industrySalaryBenchmarks.find((item) => item.industryKey === key))
    .find((item) => item && firstNumber(item.annualSalaryAvg, item.annualSalaryMedian));
}

function jobLevelByExperience(experienceYears: number): JobLevel {
  return experienceYears <= 3 ? "general_staff" : "senior_staff";
}

function usableEnterpriseNature(value?: EnterpriseNature | "unknown" | ""): EnterpriseNature {
  return value && value !== "unknown" ? value : "private_general";
}

function usableJobLevel(value: JobLevel | "unknown" | "" | undefined, experienceYears: number): JobLevel {
  return value && value !== "unknown" ? value : jobLevelByExperience(experienceYears);
}

function industryPositionSalary(experienceYears: number, options: IndustryBenchmarkOptions, ...keys: string[]) {
  const preferredNature = usableEnterpriseNature(options.enterpriseNature);
  const preferredLevel = usableJobLevel(options.jobLevel, experienceYears);
  return keys
    .map((key) => {
      const records = industryPositionSalaryBenchmarks.filter((item) => item.industryKey === key);
      return (
        records.find((item) => item.enterpriseNature === preferredNature && item.jobLevel === preferredLevel)
        ?? records.find((item) => item.enterpriseNature === preferredNature && item.jobLevel === jobLevelByExperience(experienceYears))
        ?? records.find((item) => item.enterpriseNature === "private_general" && item.jobLevel === preferredLevel)
        ?? records.find((item) => item.enterpriseNature === "private_general" && item.jobLevel === "senior_staff")
        ?? records.find((item) => firstNumber(item.annualSalaryP50, item.annualSalaryP75))
      );
    })
    .find((item) => item && firstNumber(item.annualSalaryP50, item.annualSalaryP75));
}

function industryStability(...keys: string[]) {
  return keys.map((key) => industryStabilityBenchmarks.find((item) => item.industryKey === key)).find(Boolean);
}

function industryDatum(label: string, fallbackDemand: number, experienceYears: number, options: IndustryBenchmarkOptions, ...keys: string[]): IndustryDatum {
  const salary = industrySalary(...keys);
  const positionSalary = industryPositionSalary(experienceYears, options, ...keys);
  const stability = industryStability(...keys);
  const benchmark = salary && positionSalary
    ? salary.annualSalaryAvg && salary.annualSalaryAvg > positionSalary.annualSalaryP50 * 1.4
      ? salary.annualSalaryAvg * 0.65 + positionSalary.annualSalaryP50 * 0.35
      : firstNumber(salary.annualSalaryAvg, salary.annualSalaryMedian, positionSalary.annualSalaryP50)
    : firstNumber(salary?.annualSalaryAvg, salary?.annualSalaryMedian, positionSalary?.annualSalaryP50, nationalBenchmark.annualIncomeBenchmark);
  return {
    label,
    annualIncomeBenchmark: benchmark ?? nationalBenchmark.annualIncomeBenchmark,
    salaryQuantiles: positionSalary
      ? {
          p10: positionSalary.annualSalaryP10,
          p25: positionSalary.annualSalaryP25,
          p50: positionSalary.annualSalaryP50,
          p75: positionSalary.annualSalaryP75,
          p90: positionSalary.annualSalaryP90,
        }
      : undefined,
    demandScore: firstNumber(stability?.growthScore, fallbackDemand) ?? fallbackDemand,
    stabilityScore: firstNumber(stability?.stabilityScore, stability?.layoffRiskScore, 60) ?? 60,
    source: salary && positionSalary ? `${salary.source}；${positionSalary.source}` : salary?.source ?? positionSalary?.source ?? "数据缺失，使用全国基准兜底",
    year: Math.max(salary?.year ?? 0, positionSalary?.year ?? 0, nationalBenchmark.year),
    note: [
      salary ? `${salary.methodology === "official_salary" ? "官方行业工资" : "招聘薪资"}口径；${salary.notes}` : null,
      positionSalary ? `薪酬调研分位：${positionSalary.enterpriseNatureName}${positionSalary.jobLevelName} P50 ${positionSalary.annualSalaryP50} / P75 ${positionSalary.annualSalaryP75}；${positionSalary.notes}` : null,
    ].filter(Boolean).join("；") || "未匹配行业薪酬数据，使用全国基准退化计算。",
  };
}

const industryConfigs = {
  internet: ["互联网 / 软件", 58, ["nbs_information_software_it", "internet", "salary_survey_ecommerce", "salary_survey_software_system_integration", "salary_survey_it_manufacturing"]],
  finance: ["金融 / 量化", 74, ["nbs_finance", "finance", "fund_securities_futures_investment", "banking"]],
  manufacturing: ["制造业 / 硬件", 70, ["nbs_manufacturing", "salary_survey_it_manufacturing", "salary_survey_mechanical_manufacturing", "salary_survey_processing_manufacturing", "salary_survey_nonferrous_metals", "salary_survey_petroleum_chemical", "energy_mining_metallurgy"]],
  consumer: ["消费 / 零售", 58, ["nbs_wholesale_retail", "salary_survey_fast_moving_consumer_goods", "salary_survey_durable_consumer_goods", "salary_survey_wholesale_retail", "salary_survey_accommodation_catering", "nbs_accommodation_catering"]],
  education: ["教育 / 培训", 42, ["nbs_education", "salary_survey_education_training", "education"]],
  healthcare: ["医疗健康", 68, ["nbs_health_social_work", "salary_survey_medicine", "salary_survey_health_social_work"]],
  public: ["公共部门 / 国企", 48, ["nbs_public_management_social_security", "salary_survey_public_management_social_security", "salary_survey_water_environment_public_facilities", "salary_survey_international_organizations"]],
  other: ["其他行业", 55, ["salary_survey_scientific_research_technical_services", "salary_survey_leasing_business_services", "salary_survey_resident_repair_other_services", "salary_survey_culture_media", "salary_survey_film_television", "nbs_public_management_social_security"]],
} satisfies Record<IndustryKey, [string, number, string[]]>;

export function getIndustryBenchmark(industryKey: IndustryKey, experienceYears: number, options: IndustryBenchmarkOptions = {}): IndustryDatum {
  const [label, fallbackDemand, keys] = industryConfigs[industryKey];
  return industryDatum(label, fallbackDemand, experienceYears, options, ...keys);
}

export function getExperienceIncomeFactor(experienceYears: number) {
  return (
    experienceIncomeFactors.find((item) => experienceYears >= item.experienceMin && (item.experienceMax === null || experienceYears < item.experienceMax))
    ?? experienceIncomeFactors.find((item) => item.id === "exp_3_5")
    ?? { label: `${experienceYears}年`, factor: 1, source: "默认经验倍率", year: nationalBenchmark.year, notes: "经验数据缺失，使用1倍兜底。" }
  );
}

function roleSalary(...keys: string[]) {
  return keys
    .map((key) => roleSalaryBenchmarks.find((item) => item.roleKey === key))
    .find((item) => item && firstNumber(item.annualSalaryAvg, item.annualSalaryMedian));
}

function roleLiquidity(...keys: string[]) {
  return keys
    .map((key) => roleLiquidityBenchmarks.find((item) => item.roleKey === key))
    .find((item) => item && firstNumber(item.liquidityScore, item.demandScore));
}

function roleDatum(label: string, fallbackLiquidity: number, ...keys: string[]): RoleDatum {
  const salary = roleSalary(...keys);
  const liquidity = roleLiquidity(...keys);
  return {
    label,
    annualIncomeBenchmark: firstNumber(salary?.annualSalaryAvg, salary?.annualSalaryMedian, nationalBenchmark.annualIncomeBenchmark) ?? nationalBenchmark.annualIncomeBenchmark,
    liquidityScore: firstNumber(liquidity?.liquidityScore, liquidity?.demandScore, fallbackLiquidity) ?? fallbackLiquidity,
    source: salary?.source ?? liquidity?.source ?? "数据缺失，使用全国基准兜底",
    year: salary?.year ?? liquidity?.year ?? nationalBenchmark.year,
    note: salary
      ? `${salary.methodology === "official_salary" ? "官方岗位大类工资" : "招聘岗位薪资"}口径；${salary.notes}`
      : "未匹配岗位薪酬数据，使用全国基准退化计算。",
  };
}

const national = latestNationalBenchmark();

export const nationalBenchmark = {
  label: national.label,
  annualIncomeBenchmark: firstNumber(national.annualIncomeAvg, national.urbanNonPrivateAvg, national.urbanPrivateAvg) ?? 106080,
  weeklyHours: firstNumber(national.weeklyHoursAvg, 48) ?? 48,
  source: national.source,
  year: national.year,
  note: national.notes,
};

export const cityBenchmarks: Record<CityKey, MarketDatum> = {
  beijing: cityDatum("beijing", "北京"),
  shanghai: cityDatum("shanghai", "上海", 210000),
  shenzhen: cityDatum("shenzhen", "深圳"),
  guangzhou: cityDatum("guangzhou", "广州"),
  hangzhou: cityDatum("hangzhou", "杭州"),
  nanjing: cityDatum("nanjing", "南京"),
  suzhou: cityDatum("suzhou", "苏州"),
  chengdu: cityDatum("chengdu", "成都"),
  wuhan: cityDatum("wuhan", "武汉"),
  xian: cityDatum("xian", "西安"),
  chongqing: cityDatum("chongqing", "重庆"),
  tianjin: cityDatum("tianjin", "天津"),
  qingdao: cityDatum("qingdao", "青岛"),
  changsha: cityDatum("changsha", "长沙"),
  zhengzhou: cityDatum("zhengzhou", "郑州"),
  other: cityDatum("other", "其他城市"),
};

export const industryBenchmarks: Record<IndustryKey, IndustryDatum> = {
  internet: getIndustryBenchmark("internet", 5),
  finance: getIndustryBenchmark("finance", 5),
  manufacturing: getIndustryBenchmark("manufacturing", 5),
  consumer: getIndustryBenchmark("consumer", 5),
  education: getIndustryBenchmark("education", 5),
  healthcare: getIndustryBenchmark("healthcare", 5),
  public: getIndustryBenchmark("public", 5),
  other: getIndustryBenchmark("other", 5),
};

export const roleBenchmarks: Record<RoleKey, RoleDatum> = {
  engineering: roleDatum("技术 / 工程", 78, "ai_engineer", "nbs_professional_technical", "internet_general"),
  product: roleDatum("产品 / 项目", 68, "nbs_professional_technical", "internet_general"),
  operations: roleDatum("运营 / 增长", 58, "nbs_clerical", "nbs_service", "internet_general"),
  research: roleDatum("研究 / 分析", 66, "nbs_professional_technical", "ai_engineer"),
  sales: roleDatum("销售 / 商务", 62, "nbs_service", "nbs_clerical"),
  finance_role: roleDatum("财务 / 风控", 60, "nbs_professional_technical"),
  design: roleDatum("设计 / 创意", 56, "nbs_professional_technical"),
  other: roleDatum("其他岗位", 55, "nbs_clerical"),
};
