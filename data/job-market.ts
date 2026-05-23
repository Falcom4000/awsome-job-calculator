import {
  cityCommuteBenchmarks,
  cityIncomeBenchmarks,
  industrySalaryBenchmarks,
  industryStabilityBenchmarks,
  nationalIncomeBenchmarks,
  roleLiquidityBenchmarks,
  roleSalaryBenchmarks,
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
  demandScore: number;
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

function stabilityDemand(industryKey: string, fallback: number) {
  const stability = industryStabilityBenchmarks.find((item) => item.industryKey === industryKey);
  return firstNumber(stability?.growthScore, stability?.stabilityScore, fallback) ?? fallback;
}

function industryDatum(label: string, fallbackDemand: number, ...keys: string[]): IndustryDatum {
  const salary = industrySalary(...keys);
  return {
    label,
    annualIncomeBenchmark: firstNumber(salary?.annualSalaryAvg, salary?.annualSalaryMedian, nationalBenchmark.annualIncomeBenchmark) ?? nationalBenchmark.annualIncomeBenchmark,
    demandScore: stabilityDemand(keys[0] ?? "other", fallbackDemand),
    source: salary?.source ?? "数据缺失，使用全国基准兜底",
    year: salary?.year ?? nationalBenchmark.year,
    note: salary ? `${salary.methodology === "official_salary" ? "官方行业工资" : "招聘薪资"}口径；${salary.notes}` : "未匹配行业薪酬数据，使用全国基准退化计算。",
  };
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
  internet: industryDatum("互联网 / 软件", 58, "nbs_information_software_it", "internet"),
  finance: industryDatum("金融 / 量化", 74, "nbs_finance", "fund_securities_futures_investment", "banking"),
  manufacturing: industryDatum("制造业 / 硬件", 70, "nbs_manufacturing", "energy_mining_metallurgy"),
  consumer: industryDatum("消费 / 零售", 58, "nbs_wholesale_retail", "nbs_accommodation_catering"),
  education: industryDatum("教育 / 培训", 42, "nbs_education", "education"),
  healthcare: industryDatum("医疗健康", 68, "nbs_health_social_work"),
  public: industryDatum("公共部门 / 国企", 48, "nbs_public_management_social_security"),
  other: industryDatum("其他行业", 55, "nbs_public_management_social_security"),
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
