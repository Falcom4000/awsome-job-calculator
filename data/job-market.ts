export type CityKey = "beijing" | "shanghai" | "shenzhen" | "guangzhou" | "hangzhou" | "chengdu" | "wuhan" | "other";

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

export const nationalBenchmark = {
  label: "全国总体",
  annualIncomeBenchmark: 120000,
  weeklyHours: 48,
  source: "前端内置演示基准，后续可替换为统计局与招聘报告数据",
  year: 2024,
  note: "粗粒度市场口径，用于缺少细分数据时退化计算。",
};

export const cityBenchmarks: Record<CityKey, MarketDatum> = {
  beijing: {
    label: "北京",
    annualIncomeBenchmark: 210000,
    commuteMinutes: 48,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  shanghai: {
    label: "上海",
    annualIncomeBenchmark: 205000,
    commuteMinutes: 46,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  shenzhen: {
    label: "深圳",
    annualIncomeBenchmark: 220000,
    commuteMinutes: 42,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  guangzhou: {
    label: "广州",
    annualIncomeBenchmark: 170000,
    commuteMinutes: 41,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  hangzhou: {
    label: "杭州",
    annualIncomeBenchmark: 180000,
    commuteMinutes: 38,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  chengdu: {
    label: "成都",
    annualIncomeBenchmark: 130000,
    commuteMinutes: 35,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  wuhan: {
    label: "武汉",
    annualIncomeBenchmark: 125000,
    commuteMinutes: 36,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "综合城镇工资与招聘薪资口径的前端示例数据。",
  },
  other: {
    label: "其他城市",
    annualIncomeBenchmark: 110000,
    commuteMinutes: 35,
    source: "演示城市薪酬基准",
    year: 2024,
    note: "未匹配城市时使用全国附近的保守基准。",
  },
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

const demoSource = "前端内置演示基准";
const demoYear = 2024;
const demoIndustryNote = "演示行业薪酬和需求口径，后续替换为统计局、招聘报告或行业报告数据。";
const demoRoleNote = "演示岗位薪酬和流动性口径，后续替换为招聘平台与行业薪酬报告数据。";

export const industryBenchmarks: Record<IndustryKey, IndustryDatum> = {
  internet: { label: "互联网 / 软件", annualIncomeBenchmark: 260000, demandScore: 78, source: demoSource, year: demoYear, note: demoIndustryNote },
  finance: { label: "金融 / 量化", annualIncomeBenchmark: 300000, demandScore: 74, source: demoSource, year: demoYear, note: demoIndustryNote },
  manufacturing: { label: "制造业 / 硬件", annualIncomeBenchmark: 180000, demandScore: 66, source: demoSource, year: demoYear, note: demoIndustryNote },
  consumer: { label: "消费 / 零售", annualIncomeBenchmark: 150000, demandScore: 58, source: demoSource, year: demoYear, note: demoIndustryNote },
  education: { label: "教育 / 培训", annualIncomeBenchmark: 135000, demandScore: 52, source: demoSource, year: demoYear, note: demoIndustryNote },
  healthcare: { label: "医疗健康", annualIncomeBenchmark: 190000, demandScore: 68, source: demoSource, year: demoYear, note: demoIndustryNote },
  public: { label: "公共部门 / 国企", annualIncomeBenchmark: 160000, demandScore: 48, source: demoSource, year: demoYear, note: demoIndustryNote },
  other: { label: "其他行业", annualIncomeBenchmark: 150000, demandScore: 55, source: demoSource, year: demoYear, note: demoIndustryNote },
};

export const roleBenchmarks: Record<RoleKey, RoleDatum> = {
  engineering: { label: "技术 / 工程", annualIncomeBenchmark: 280000, liquidityScore: 78, source: demoSource, year: demoYear, note: demoRoleNote },
  product: { label: "产品 / 项目", annualIncomeBenchmark: 230000, liquidityScore: 68, source: demoSource, year: demoYear, note: demoRoleNote },
  operations: { label: "运营 / 增长", annualIncomeBenchmark: 170000, liquidityScore: 58, source: demoSource, year: demoYear, note: demoRoleNote },
  research: { label: "研究 / 分析", annualIncomeBenchmark: 260000, liquidityScore: 66, source: demoSource, year: demoYear, note: demoRoleNote },
  sales: { label: "销售 / 商务", annualIncomeBenchmark: 190000, liquidityScore: 62, source: demoSource, year: demoYear, note: demoRoleNote },
  finance_role: { label: "财务 / 风控", annualIncomeBenchmark: 180000, liquidityScore: 60, source: demoSource, year: demoYear, note: demoRoleNote },
  design: { label: "设计 / 创意", annualIncomeBenchmark: 170000, liquidityScore: 56, source: demoSource, year: demoYear, note: demoRoleNote },
  other: { label: "其他岗位", annualIncomeBenchmark: 155000, liquidityScore: 55, source: demoSource, year: demoYear, note: demoRoleNote },
};
