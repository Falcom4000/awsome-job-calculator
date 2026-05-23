export type DataConfidence = "high" | "medium" | "low";

export type DataMethodology =
  | "official_salary"
  | "recruiting_salary"
  | "survey_salary"
  | "graduate_report"
  | "mobility_big_data"
  | "estimated_index";

export type DataMeta = {
  source: string;
  sourceUrl: string;
  year: number;
  publishedAt: string;
  methodology: DataMethodology;
  sampleScope: string;
  confidence: DataConfidence;
  notes: string;
};

export type NationalIncomeBenchmark = DataMeta & {
  id: string;
  label: string;
  annualIncomeAvg: number | null;
  urbanNonPrivateAvg: number | null;
  urbanPrivateAvg: number | null;
  medianIncome: number | null;
  weeklyHoursAvg: number | null;
};

export type CityIncomeBenchmark = DataMeta & {
  cityKey: string;
  cityName: string;
  annualIncomeAvg: number | null;
  medianIncome: number | null;
  socialAverageSalary: number | null;
  urbanPrivateAvg: number | null;
  recruitingSalaryMedian: number | null;
  recruitingSalaryP75: number | null;
  recruitingSalaryP90: number | null;
};

export type IndustrySalaryBenchmark = DataMeta & {
  industryKey: string;
  industryName: string;
  annualSalaryAvg: number | null;
  annualSalaryMedian: number | null;
  annualSalaryP75: number | null;
  annualSalaryP90: number | null;
  demandScore: number | null;
};

export type EnterpriseNature = "state_owned" | "foreign" | "private_leading" | "private_general";

export type JobLevel = "senior_management" | "middle_manager" | "senior_staff" | "general_staff";

export type IndustryPositionSalaryBenchmark = DataMeta & {
  industryKey: string;
  industryName: string;
  enterpriseNature: EnterpriseNature;
  enterpriseNatureName: string;
  jobLevel: JobLevel;
  jobLevelName: string;
  annualSalaryP10: number;
  annualSalaryP25: number;
  annualSalaryP50: number;
  annualSalaryP75: number;
  annualSalaryP90: number;
};

export type RoleSalaryBenchmark = DataMeta & {
  roleKey: string;
  roleName: string;
  annualSalaryAvg: number | null;
  annualSalaryMedian: number | null;
  annualSalaryP75: number | null;
  annualSalaryP90: number | null;
  liquidityScore: number | null;
};

export type ExperienceIncomeFactor = DataMeta & {
  id: string;
  experienceMin: number;
  experienceMax: number | null;
  label: string;
  factor: number;
  medianIncome: number | null;
  p75Income: number | null;
  p90Income: number | null;
};

export type CityCommuteBenchmark = DataMeta & {
  cityKey: string;
  cityName: string;
  commuteMinutesAvg: number | null;
  commuteMinutesMedian: number | null;
  longCommuteRatio: number | null;
};

export type IndustryStabilityBenchmark = DataMeta & {
  industryKey: string;
  industryName: string;
  stabilityScore: number | null;
  growthScore: number | null;
  layoffRiskScore: number | null;
  cycleStatus: "expanding" | "stable" | "contracting" | "unknown";
};

export type RoleLiquidityBenchmark = DataMeta & {
  roleKey: string;
  roleName: string;
  jobPostingCount: number | null;
  demandScore: number | null;
  competitionScore: number | null;
  liquidityScore: number | null;
};

export type IndustryMapping = {
  industryKey: string;
  displayName: string;
  aliases: string[];
  nationalStatCategory: string | null;
  recruitingCategories: string[];
  notes: string;
};

export type RoleMapping = {
  roleKey: string;
  displayName: string;
  aliases: string[];
  recruitingKeywords: string[];
  roleFamily: string;
  notes: string;
};

export const coverageScope = {
  version: "v3-complete-data-scope",
  countryScope: "中国大陆",
  yearPriority: [2025, 2024],
  cities: ["全国", "北京", "上海", "深圳", "广州", "杭州", "南京", "苏州", "成都", "武汉", "西安", "重庆", "天津", "青岛", "长沙", "郑州"],
  experienceBands: [
    { min: 0, max: 1, label: "0-1年" },
    { min: 1, max: 3, label: "1-3年" },
    { min: 3, max: 5, label: "3-5年" },
    { min: 5, max: 8, label: "5-8年" },
    { min: 8, max: 10, label: "8-10年" },
    { min: 10, max: null, label: "10年以上" },
  ],
  roles: [
    "后端开发工程师",
    "前端开发工程师",
    "算法工程师",
    "数据分析师",
    "数据工程师",
    "产品经理",
    "项目经理",
    "测试工程师",
    "运维工程师",
    "UI/UX设计师",
    "销售",
    "大客户销售",
    "商务拓展",
    "市场营销",
    "品牌/公关",
    "运营",
    "内容运营",
    "人力资源",
    "财务",
    "会计",
    "法务",
    "行政",
    "客户服务",
    "供应链/采购",
    "物流/仓储",
    "机械工程师",
    "电气工程师",
    "土木工程师",
    "教师",
    "医生/医疗专业人员",
  ],
};

const demoEstimatedMeta: DataMeta = {
  source: "前端内置估算规则",
  sourceUrl: "",
  year: 2024,
  publishedAt: "",
  methodology: "estimated_index",
  sampleScope: "人工估算样本",
  confidence: "low",
  notes: "占位指数，仅用于验证评分链路，不能视为官方结论。",
};

const nbsIncome2025Meta: DataMeta = {
  source: "国家统计局：2025年城镇单位就业人员年平均工资情况",
  sourceUrl: "https://www.stats.gov.cn/sj/zxfb/202605/t20260515_1963707.html",
  year: 2025,
  publishedAt: "2026-05-15",
  methodology: "official_salary",
  sampleScope: "全国城镇单位就业人员与规模以上企业就业人员",
  confidence: "high",
  notes: "官方工资统计口径；平均工资不等于中位数或税后收入。",
};

const nbsIncome2024Meta: DataMeta = {
  source: "国家统计局：2024年城镇单位就业人员年平均工资情况",
  sourceUrl: "https://www.stats.gov.cn/sj/zxfb/202505/t20250516_1959826.html",
  year: 2024,
  publishedAt: "2025-05-16",
  methodology: "official_salary",
  sampleScope: "全国城镇单位就业人员与规模以上企业就业人员",
  confidence: "high",
  notes: "官方工资统计口径；平均工资不等于中位数或税后收入。",
};

const shenzhenIncome2024Meta: DataMeta = {
  source: "深圳市统计局：2024年深圳市城镇单位就业人员年平均工资情况",
  sourceUrl: "https://tjj.sz.gov.cn/zwgk/zfxxgkml/tjsj/tjgb/content/post_12253352.html",
  year: 2024,
  publishedAt: "2025-06-30",
  methodology: "official_salary",
  sampleScope: "深圳市城镇单位就业人员",
  confidence: "high",
  notes: "官方工资统计口径；不等同于招聘薪资和税后收入。",
};

const guangzhouIncome2024Meta: DataMeta = {
  source: "广州市统计局：2024年广州市城镇单位就业人员年平均工资情况",
  sourceUrl: "https://tjj.gz.gov.cn/stats_newtjyw/tjsj/tjgb/qtgb/content/post_10330995.html",
  year: 2024,
  publishedAt: "2025-06-29",
  methodology: "official_salary",
  sampleScope: "广州市城镇非私营单位、城镇私营单位就业人员",
  confidence: "high",
  notes: "官方工资统计口径；非私营、在岗职工和私营单位口径分开记录。",
};

const nanjingIncome2024Meta: DataMeta = {
  source: "南京市统计局：2024年南京市城镇单位就业人员年平均工资情况",
  sourceUrl: "https://tjj.nanjing.gov.cn/bmfw/njsj/202506/t20250624_5592134.html",
  year: 2024,
  publishedAt: "2025-06-24",
  methodology: "official_salary",
  sampleScope: "南京市城镇非私营单位、城镇私营单位就业人员",
  confidence: "high",
  notes: "官方工资统计口径；非私营、在岗职工和私营单位口径分开记录。",
};

const beijingIncome2024Meta: DataMeta = {
  source: "北京市统计局 / 北京市人力资源和社会保障局：2024年北京市城镇单位就业人员平均工资数据",
  sourceUrl: "https://rsj.beijing.gov.cn/bm/ywml/202007/t20200717_1950961.html",
  year: 2024,
  publishedAt: "2025",
  methodology: "official_salary",
  sampleScope: "北京市城镇非私营单位、城镇私营单位和全口径城镇单位就业人员",
  confidence: "high",
  notes: "全口径城镇单位就业人员平均工资用于社保缴费基数；非私营、私营与规上企业工资来自北京市统计口径公开数据。",
};

const tianjinIncome2024Meta: DataMeta = {
  source: "天津市统计局：2024年天津市城镇单位就业人员平均工资情况",
  sourceUrl: "https://stats.tj.gov.cn/sy_51953/jjxx/202506/t20250606_6948917.html",
  year: 2024,
  publishedAt: "2025-06-06",
  methodology: "official_salary",
  sampleScope: "天津市城镇非私营单位就业人员",
  confidence: "high",
  notes: "已核验城镇非私营单位就业人员年平均工资；私营单位和全口径字段待补。",
};

const chongqingIncome2024Meta: DataMeta = {
  source: "重庆市统计局：2024年重庆市城镇单位就业人员年平均工资情况",
  sourceUrl: "https://tjj.cq.gov.cn/zwgk_233/fdzdgknr/tjxx/sjjd_55469/202506/t20250620_14731980.html",
  year: 2024,
  publishedAt: "2025-06-20",
  methodology: "official_salary",
  sampleScope: "重庆市城镇非私营单位、城镇私营单位、规模以上企业就业人员",
  confidence: "high",
  notes: "官方工资统计口径；非私营、私营和规上企业口径分开记录。",
};

const wuhanIncome2024Meta: DataMeta = {
  source: "武汉市统计局：2024年武汉市城镇单位就业人员平均工资答复",
  sourceUrl: "https://tjj.wuhan.gov.cn/hdjl_49/lxxd/lxxd_details.shtml?metadataId=57489&siteId=49",
  year: 2024,
  publishedAt: "2025",
  methodology: "official_salary",
  sampleScope: "武汉市城镇单位在岗职工、城镇非私营单位就业人员",
  confidence: "high",
  notes: "统计局公开答复口径；已核验城镇非私营单位就业人员和在岗职工年平均工资。",
};

const zhengzhouIncome2024Meta: DataMeta = {
  source: "郑州市统计局：2024年郑州市城镇单位就业人员年平均工资情况",
  sourceUrl: "https://tjj.zhengzhou.gov.cn/tjxx/9445366.jhtml",
  year: 2024,
  publishedAt: "2025-07-04",
  methodology: "official_salary",
  sampleScope: "郑州市城镇非私营单位、城镇私营单位就业人员",
  confidence: "high",
  notes: "官方工资统计口径；非私营和私营单位口径分开记录。",
};

const suzhouIncome2024Meta: DataMeta = {
  source: "苏州市统计局：2024年度苏州市城镇非私营单位在岗职工年平均工资答复",
  sourceUrl: "https://tjj.suzhou.gov.cn/sztjj/rdwd/202506/67e7a65c402f45f796436d45da431c03.shtml",
  year: 2024,
  publishedAt: "2025-06-27",
  methodology: "official_salary",
  sampleScope: "苏州市城镇非私营单位在岗职工",
  confidence: "high",
  notes: "统计局公开答复口径；仅核验到城镇非私营单位在岗职工年平均工资。",
};

const chengduIncome2024Meta: DataMeta = {
  source: "成都市统计局：2024年成都市城镇单位就业人员年平均工资公告（公开转载）",
  sourceUrl: "https://m.cd.bendibao.com/live/199463.shtm",
  year: 2024,
  publishedAt: "2025-07-04",
  methodology: "official_salary",
  sampleScope: "成都市城镇非私营单位、城镇私营单位就业人员",
  confidence: "medium",
  notes: "公开转载成都市统计局公告；需后续替换为统计局原始链接。",
};

const qingdaoIncome2024Meta: DataMeta = {
  source: "青岛市统计局：2024年青岛市单位就业人员年平均工资统计公告（公开转载）",
  sourceUrl: "https://www.thepaper.cn/newsDetail_forward_31202539",
  year: 2024,
  publishedAt: "2025-07-16",
  methodology: "official_salary",
  sampleScope: "青岛市单位就业人员、城镇非私营单位、城镇私营单位就业人员",
  confidence: "medium",
  notes: "公开转载青岛市统计局公告；需后续替换为统计局原始链接。",
};

const hangzhouIncome2024Meta: DataMeta = {
  source: "杭州市统计局：2024年杭州市单位就业人员年平均工资统计公报（公开转载）",
  sourceUrl: "https://zc.51shebao.com/detail/837176",
  year: 2024,
  publishedAt: "2025",
  methodology: "official_salary",
  sampleScope: "杭州市城镇非私营单位、城镇私营单位就业人员",
  confidence: "medium",
  notes: "公开转载杭州市统计局数据；需后续替换为统计局原始链接。",
};

const xianIncome2024Meta: DataMeta = {
  source: "西安市统计局 / 西安市医保局：2024年西安市城镇单位就业人员平均工资公开信息",
  sourceUrl: "https://tjj.xa.gov.cn/tjsj/tjsj/ndsj/1.html",
  year: 2024,
  publishedAt: "2025-09-30",
  methodology: "official_salary",
  sampleScope: "西安市城镇非私营单位就业人员、全口径城镇单位就业人员",
  confidence: "medium",
  notes: "统计局目录已定位到2024年工资数据；非私营数值来自公开转载，需后续抽取原始详情页。",
};

const zhilian2024Q3Meta: DataMeta = {
  source: "智联招聘：2024年第三季度《中国企业招聘薪酬报告》",
  sourceUrl: "reports/zhilian_2024_q3_salary_report.pdf",
  year: 2024,
  publishedAt: "2024-10-14",
  methodology: "recruiting_salary",
  sampleScope: "智联招聘监测的38个核心城市企业招聘职位样本",
  confidence: "medium",
  notes: "招聘薪资口径，已将月薪乘以12折算成年薪；不等同于真实成交薪资。",
};

const nbsScaleEnterpriseRole2025Meta: DataMeta = {
  source: "国家统计局：2025年规模以上企业分岗位就业人员年平均工资",
  sourceUrl: "https://www.stats.gov.cn/sj/zxfb/202605/t20260515_1963707.html",
  year: 2025,
  publishedAt: "2026-05-15",
  methodology: "official_salary",
  sampleScope: "全国规模以上企业就业人员，按岗位大类分组",
  confidence: "high",
  notes: "官方岗位大类工资口径，可作为详细岗位薪资缺失时的粗粒度兜底，不等同于互联网招聘岗位薪资。",
};

const enterpriseSalarySurvey2026Meta: DataMeta = {
  source: "2026年度企业薪酬调研报告",
  sourceUrl: "salary/PixPin_2026-05-23_*.png",
  year: 2026,
  publishedAt: "2026",
  methodology: "survey_salary",
  sampleScope: "用户提供薪酬调研截图；按行业、企业性质、岗位层级统计年度现金收入分位数",
  confidence: "medium",
  notes: "截图数据包含10/25/50/75/90分位；未经原始报告全文校验，不应与官方平均工资口径混用。",
};

const baiduCommute2022Meta: DataMeta = {
  source: "百度地图 / 中国城市规划设计研究院：2022年度中国主要城市通勤监测报告",
  sourceUrl: "reports/baidu_cacp_2022_commute_report.pdf",
  year: 2021,
  publishedAt: "2022-07-28",
  methodology: "mobility_big_data",
  sampleScope: "44个中国主要城市中心城区通勤人口",
  confidence: "high",
  notes: "通勤大数据口径；字段使用报告中的2021年单程平均通勤时耗和60分钟以上通勤比重。",
};

const iresearchRecruiting2023Meta: DataMeta = {
  source: "艾瑞咨询：中国网络招聘市场发展研究报告",
  sourceUrl: "reports/iresearch_2023_online_recruitment_market.pdf",
  year: 2023,
  publishedAt: "2023-05-29",
  methodology: "estimated_index",
  sampleScope: "网络招聘行业研究、公开资料与艾瑞研究院自主研究",
  confidence: "medium",
  notes: "用于行业稳定性和招聘需求趋势的定性依据，指数为内部估算。",
};

export const nationalIncomeBenchmarks: NationalIncomeBenchmark[] = [
  {
    ...nbsIncome2025Meta,
    id: "china_2025_nbs",
    label: "全国总体",
    annualIncomeAvg: 106080,
    urbanNonPrivateAvg: 129441,
    urbanPrivateAvg: 71590,
    medianIncome: null,
    weeklyHoursAvg: null,
  },
  {
    ...nbsIncome2024Meta,
    id: "china_2024_nbs",
    label: "全国总体",
    annualIncomeAvg: 102452,
    urbanNonPrivateAvg: 124110,
    urbanPrivateAvg: 69476,
    medianIncome: null,
    weeklyHoursAvg: null,
  },
];

export const cityIncomeBenchmarks: CityIncomeBenchmark[] = [
  {
    ...beijingIncome2024Meta,
    cityKey: "beijing",
    cityName: "北京",
    annualIncomeAvg: 224608,
    medianIncome: null,
    socialAverageSalary: 143244,
    urbanPrivateAvg: 106905,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...shenzhenIncome2024Meta,
    cityKey: "shenzhen",
    cityName: "深圳",
    annualIncomeAvg: 174478,
    medianIncome: null,
    socialAverageSalary: 177057,
    urbanPrivateAvg: 95217,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...guangzhouIncome2024Meta,
    cityKey: "guangzhou",
    cityName: "广州",
    annualIncomeAvg: 159312,
    medianIncome: null,
    socialAverageSalary: 164443,
    urbanPrivateAvg: 82907,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...nanjingIncome2024Meta,
    cityKey: "nanjing",
    cityName: "南京",
    annualIncomeAvg: 160374,
    medianIncome: null,
    socialAverageSalary: 165726,
    urbanPrivateAvg: 83388,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...tianjinIncome2024Meta,
    cityKey: "tianjin",
    cityName: "天津",
    annualIncomeAvg: 142437,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...chongqingIncome2024Meta,
    cityKey: "chongqing",
    cityName: "重庆",
    annualIncomeAvg: 117546,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: 65098,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...wuhanIncome2024Meta,
    cityKey: "wuhan",
    cityName: "武汉",
    annualIncomeAvg: 138241,
    medianIncome: null,
    socialAverageSalary: 143776,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...zhengzhouIncome2024Meta,
    cityKey: "zhengzhou",
    cityName: "郑州",
    annualIncomeAvg: 106674,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: 57738,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...suzhouIncome2024Meta,
    cityKey: "suzhou",
    cityName: "苏州",
    annualIncomeAvg: null,
    medianIncome: null,
    socialAverageSalary: 143611,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...chengduIncome2024Meta,
    cityKey: "chengdu",
    cityName: "成都",
    annualIncomeAvg: 125512,
    medianIncome: null,
    socialAverageSalary: 127793,
    urbanPrivateAvg: 68954,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...qingdaoIncome2024Meta,
    cityKey: "qingdao",
    cityName: "青岛",
    annualIncomeAvg: 129816,
    medianIncome: null,
    socialAverageSalary: 132372,
    urbanPrivateAvg: 68273,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...hangzhouIncome2024Meta,
    cityKey: "hangzhou",
    cityName: "杭州",
    annualIncomeAvg: 162774,
    medianIncome: null,
    socialAverageSalary: 167177,
    urbanPrivateAvg: 92054,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...xianIncome2024Meta,
    cityKey: "xian",
    cityName: "西安",
    annualIncomeAvg: 127045,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: null,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...zhilian2024Q3Meta,
    cityKey: "hangzhou",
    cityName: "杭州",
    annualIncomeAvg: null,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: 9500 * 12,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...zhilian2024Q3Meta,
    cityKey: "guangzhou",
    cityName: "广州",
    annualIncomeAvg: null,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: 9000 * 12,
    recruitingSalaryP75: null,
    recruitingSalaryP90: null,
  },
  {
    ...zhilian2024Q3Meta,
    cityKey: "all_38_core_cities",
    cityName: "38个核心城市",
    annualIncomeAvg: null,
    medianIncome: null,
    socialAverageSalary: null,
    urbanPrivateAvg: null,
    recruitingSalaryMedian: 8000 * 12,
    recruitingSalaryP75: 11665 * 12,
    recruitingSalaryP90: null,
  },
];

export const industrySalaryBenchmarks: IndustrySalaryBenchmark[] = [
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_agriculture_forestry_animal_husbandry_fishery",
    industryName: "农、林、牧、渔业",
    annualSalaryAvg: 74424,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_mining",
    industryName: "采矿业",
    annualSalaryAvg: 143361,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_manufacturing",
    industryName: "制造业",
    annualSalaryAvg: 113594,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_power_heat_gas_water",
    industryName: "电力、热力、燃气及水生产和供应业",
    annualSalaryAvg: 160897,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_construction",
    industryName: "建筑业",
    annualSalaryAvg: 92036,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_wholesale_retail",
    industryName: "批发和零售业",
    annualSalaryAvg: 135749,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_transport_storage_post",
    industryName: "交通运输、仓储和邮政业",
    annualSalaryAvg: 133981,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_accommodation_catering",
    industryName: "住宿和餐饮业",
    annualSalaryAvg: 62461,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_information_software_it",
    industryName: "信息传输、软件和信息技术服务业",
    annualSalaryAvg: 248752,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_finance",
    industryName: "金融业",
    annualSalaryAvg: 211164,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_real_estate",
    industryName: "房地产业",
    annualSalaryAvg: 89679,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_leasing_business_services",
    industryName: "租赁和商务服务业",
    annualSalaryAvg: 110162,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_scientific_research_technical_services",
    industryName: "科学研究和技术服务业",
    annualSalaryAvg: 182064,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_water_environment_public_facilities",
    industryName: "水利、环境和公共设施管理业",
    annualSalaryAvg: 70172,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_resident_services_repairs_other",
    industryName: "居民服务、修理和其他服务业",
    annualSalaryAvg: 70226,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_education",
    industryName: "教育",
    annualSalaryAvg: 133539,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_health_social_work",
    industryName: "卫生和社会工作",
    annualSalaryAvg: 146266,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_culture_sports_entertainment",
    industryName: "文化、体育和娱乐业",
    annualSalaryAvg: 129447,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...nbsIncome2025Meta,
    industryKey: "nbs_public_management_social_security",
    industryName: "公共管理、社会保障和社会组织",
    annualSalaryAvg: 119465,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    industryKey: "fund_securities_futures_investment",
    industryName: "基金 / 证券 / 期货 / 投资",
    annualSalaryAvg: 13353 * 12,
    annualSalaryMedian: 10000 * 12,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    industryKey: "insurance",
    industryName: "保险",
    annualSalaryAvg: 12541 * 12,
    annualSalaryMedian: 10000 * 12,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    industryKey: "banking",
    industryName: "银行",
    annualSalaryAvg: 11467 * 12,
    annualSalaryMedian: 10000 * 12,
    annualSalaryP75: null,
    annualSalaryP90: null,
    demandScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    industryKey: "energy_mining_metallurgy",
    industryName: "能源 / 矿产 / 采掘 / 冶炼",
    annualSalaryAvg: null,
    annualSalaryMedian: 8940 * 12,
    annualSalaryP75: 14727 * 12,
    annualSalaryP90: null,
    demandScore: null,
  },
];

export const roleSalaryBenchmarks: RoleSalaryBenchmark[] = [
  {
    ...nbsScaleEnterpriseRole2025Meta,
    roleKey: "nbs_management",
    roleName: "中层及以上管理人员",
    annualSalaryAvg: 210016,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...nbsScaleEnterpriseRole2025Meta,
    roleKey: "nbs_professional_technical",
    roleName: "专业技术人员",
    annualSalaryAvg: 155491,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...nbsScaleEnterpriseRole2025Meta,
    roleKey: "nbs_clerical",
    roleName: "办事人员和有关人员",
    annualSalaryAvg: 94936,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...nbsScaleEnterpriseRole2025Meta,
    roleKey: "nbs_service",
    roleName: "社会生产服务和生活服务人员",
    annualSalaryAvg: 79857,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...nbsScaleEnterpriseRole2025Meta,
    roleKey: "nbs_production_manufacturing",
    roleName: "生产制造及有关人员",
    annualSalaryAvg: 80739,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    roleKey: "ai_engineer",
    roleName: "人工智能工程师",
    annualSalaryAvg: 21930 * 12,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    roleKey: "auto_electronics_engineer",
    roleName: "汽车电子工程师",
    annualSalaryAvg: 14860 * 12,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
  {
    ...zhilian2024Q3Meta,
    roleKey: "powertrain_engineer",
    roleName: "动力系统工程师",
    annualSalaryAvg: 20000 * 12,
    annualSalaryMedian: null,
    annualSalaryP75: null,
    annualSalaryP90: null,
    liquidityScore: null,
  },
];

export const industryPositionSalaryBenchmarks: IndustryPositionSalaryBenchmark[] = [
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_it_manufacturing",
    industryName: "IT制造业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 112579,
    annualSalaryP25: 165434,
    annualSalaryP50: 283046,
    annualSalaryP75: 376186,
    annualSalaryP90: 493174,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_it_manufacturing",
    industryName: "IT制造业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 67689,
    annualSalaryP25: 92089,
    annualSalaryP50: 119521,
    annualSalaryP75: 166459,
    annualSalaryP90: 224849,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_mechanical_manufacturing",
    industryName: "机械制造",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 86163,
    annualSalaryP25: 128468,
    annualSalaryP50: 214751,
    annualSalaryP75: 301864,
    annualSalaryP90: 393765,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_mechanical_manufacturing",
    industryName: "机械制造",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 52441,
    annualSalaryP25: 70622,
    annualSalaryP50: 98938,
    annualSalaryP75: 139352,
    annualSalaryP90: 189727,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_real_estate",
    industryName: "房地产业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 108122,
    annualSalaryP25: 163980,
    annualSalaryP50: 271596,
    annualSalaryP75: 373865,
    annualSalaryP90: 486477,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_real_estate",
    industryName: "房地产业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 68755,
    annualSalaryP25: 84185,
    annualSalaryP50: 117479,
    annualSalaryP75: 170054,
    annualSalaryP90: 225897,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_agriculture_forestry_animal_husbandry_fishery",
    industryName: "农、林、牧、渔业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 84363,
    annualSalaryP25: 122937,
    annualSalaryP50: 213673,
    annualSalaryP75: 288997,
    annualSalaryP90: 380107,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_agriculture_forestry_animal_husbandry_fishery",
    industryName: "农、林、牧、渔业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 50654,
    annualSalaryP25: 66995,
    annualSalaryP50: 95582,
    annualSalaryP75: 131286,
    annualSalaryP90: 172583,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_nonferrous_metals",
    industryName: "有色金属业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 101619,
    annualSalaryP25: 150791,
    annualSalaryP50: 250717,
    annualSalaryP75: 348048,
    annualSalaryP90: 462300,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_nonferrous_metals",
    industryName: "有色金属业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 58050,
    annualSalaryP25: 77978,
    annualSalaryP50: 108141,
    annualSalaryP75: 157953,
    annualSalaryP90: 206526,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_software_system_integration",
    industryName: "软件系统集成",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 112076,
    annualSalaryP25: 167570,
    annualSalaryP50: 280837,
    annualSalaryP75: 377031,
    annualSalaryP90: 478252,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_software_system_integration",
    industryName: "软件系统集成",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 66321,
    annualSalaryP25: 84208,
    annualSalaryP50: 120875,
    annualSalaryP75: 164528,
    annualSalaryP90: 216246,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_water_environment_public_facilities",
    industryName: "水利、环境和公共设施管理业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 102229,
    annualSalaryP25: 154314,
    annualSalaryP50: 262429,
    annualSalaryP75: 339673,
    annualSalaryP90: 449011,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_water_environment_public_facilities",
    industryName: "水利、环境和公共设施管理业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 64370,
    annualSalaryP25: 77678,
    annualSalaryP50: 115823,
    annualSalaryP75: 163238,
    annualSalaryP90: 214969,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_education_training",
    industryName: "教育培训",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 105941,
    annualSalaryP25: 158218,
    annualSalaryP50: 265348,
    annualSalaryP75: 352193,
    annualSalaryP90: 475973,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_education_training",
    industryName: "教育培训",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 62057,
    annualSalaryP25: 78254,
    annualSalaryP50: 121996,
    annualSalaryP75: 160172,
    annualSalaryP90: 221493,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_construction",
    industryName: "建筑业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 102295,
    annualSalaryP25: 144135,
    annualSalaryP50: 250587,
    annualSalaryP75: 329638,
    annualSalaryP90: 431919,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_construction",
    industryName: "建筑业",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 59175,
    annualSalaryP25: 74243,
    annualSalaryP50: 113289,
    annualSalaryP75: 151879,
    annualSalaryP90: 197213,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_public_management_social_security",
    industryName: "公共管理、社会保障和社会组织",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "senior_staff",
    jobLevelName: "高级职员",
    annualSalaryP10: 100646,
    annualSalaryP25: 142172,
    annualSalaryP50: 238244,
    annualSalaryP75: 322539,
    annualSalaryP90: 415203,
  },
  {
    ...enterpriseSalarySurvey2026Meta,
    industryKey: "salary_survey_public_management_social_security",
    industryName: "公共管理、社会保障和社会组织",
    enterpriseNature: "private_general",
    enterpriseNatureName: "民营普通",
    jobLevel: "general_staff",
    jobLevelName: "普通职员",
    annualSalaryP10: 59173,
    annualSalaryP25: 76685,
    annualSalaryP50: 109842,
    annualSalaryP75: 150132,
    annualSalaryP90: 194804,
  },
];

export const experienceIncomeFactors: ExperienceIncomeFactor[] = [
  { ...demoEstimatedMeta, id: "exp_0_1", experienceMin: 0, experienceMax: 1, label: "应届 / 初级", factor: 0.72, medianIncome: null, p75Income: null, p90Income: null },
  { ...demoEstimatedMeta, id: "exp_1_3", experienceMin: 1, experienceMax: 3, label: "初级到中级", factor: 0.9, medianIncome: null, p75Income: null, p90Income: null },
  { ...demoEstimatedMeta, id: "exp_3_5", experienceMin: 3, experienceMax: 5, label: "中级", factor: 1, medianIncome: null, p75Income: null, p90Income: null },
  { ...demoEstimatedMeta, id: "exp_5_8", experienceMin: 5, experienceMax: 8, label: "高级", factor: 1.18, medianIncome: null, p75Income: null, p90Income: null },
  { ...demoEstimatedMeta, id: "exp_8_10", experienceMin: 8, experienceMax: 10, label: "资深", factor: 1.32, medianIncome: null, p75Income: null, p90Income: null },
  { ...demoEstimatedMeta, id: "exp_10_plus", experienceMin: 10, experienceMax: null, label: "专家 / 管理层", factor: 1.45, medianIncome: null, p75Income: null, p90Income: null },
];

export const cityCommuteBenchmarks: CityCommuteBenchmark[] = [
  { ...baiduCommute2022Meta, cityKey: "beijing", cityName: "北京", commuteMinutesAvg: 48, commuteMinutesMedian: null, longCommuteRatio: 0.3 },
  { ...baiduCommute2022Meta, cityKey: "shanghai", cityName: "上海", commuteMinutesAvg: 40, commuteMinutesMedian: null, longCommuteRatio: 0.18 },
  { ...baiduCommute2022Meta, cityKey: "shenzhen", cityName: "深圳", commuteMinutesAvg: 36, commuteMinutesMedian: null, longCommuteRatio: 0.12 },
  { ...baiduCommute2022Meta, cityKey: "guangzhou", cityName: "广州", commuteMinutesAvg: 39, commuteMinutesMedian: null, longCommuteRatio: 0.15 },
  { ...baiduCommute2022Meta, cityKey: "hangzhou", cityName: "杭州", commuteMinutesAvg: 35, commuteMinutesMedian: null, longCommuteRatio: 0.11 },
  { ...baiduCommute2022Meta, cityKey: "nanjing", cityName: "南京", commuteMinutesAvg: 37, commuteMinutesMedian: null, longCommuteRatio: 0.13 },
  { ...baiduCommute2022Meta, cityKey: "wuhan", cityName: "武汉", commuteMinutesAvg: 38, commuteMinutesMedian: null, longCommuteRatio: 0.14 },
  { ...baiduCommute2022Meta, cityKey: "chengdu", cityName: "成都", commuteMinutesAvg: 39, commuteMinutesMedian: null, longCommuteRatio: 0.14 },
];

export const industryStabilityBenchmarks: IndustryStabilityBenchmark[] = [
  { ...iresearchRecruiting2023Meta, industryKey: "internet", industryName: "互联网 / 软件", stabilityScore: 56, growthScore: 58, layoffRiskScore: 48, cycleStatus: "contracting" },
  { ...iresearchRecruiting2023Meta, industryKey: "real_estate", industryName: "房地产", stabilityScore: 42, growthScore: 38, layoffRiskScore: 35, cycleStatus: "contracting" },
  { ...iresearchRecruiting2023Meta, industryKey: "education", industryName: "教育 / 培训", stabilityScore: 48, growthScore: 42, layoffRiskScore: 42, cycleStatus: "contracting" },
  { ...iresearchRecruiting2023Meta, industryKey: "new_energy_vehicle", industryName: "新能源汽车", stabilityScore: 72, growthScore: 86, layoffRiskScore: 70, cycleStatus: "expanding" },
  { ...iresearchRecruiting2023Meta, industryKey: "integrated_circuit", industryName: "集成电路", stabilityScore: 70, growthScore: 84, layoffRiskScore: 68, cycleStatus: "expanding" },
];

export const roleLiquidityBenchmarks: RoleLiquidityBenchmark[] = [
  { ...iresearchRecruiting2023Meta, roleKey: "ai_engineer", roleName: "人工智能工程师", jobPostingCount: null, demandScore: 86, competitionScore: null, liquidityScore: 82 },
  { ...iresearchRecruiting2023Meta, roleKey: "manufacturing_technical", roleName: "制造业技术人才", jobPostingCount: null, demandScore: 82, competitionScore: null, liquidityScore: 76 },
  { ...iresearchRecruiting2023Meta, roleKey: "new_energy_vehicle", roleName: "新能源汽车相关岗位", jobPostingCount: null, demandScore: 88, competitionScore: null, liquidityScore: 80 },
  { ...iresearchRecruiting2023Meta, roleKey: "internet_general", roleName: "互联网通用岗位", jobPostingCount: null, demandScore: 58, competitionScore: null, liquidityScore: 60 },
];

export const industryMappings: IndustryMapping[] = [
  {
    industryKey: "internet",
    displayName: "互联网 / 软件",
    aliases: ["互联网", "软件", "IT", "SaaS", "信息技术"],
    nationalStatCategory: "信息传输、软件和信息技术服务业",
    recruitingCategories: ["互联网/IT/电子/通信", "计算机软件"],
    notes: "用户选择行业，映射官方统计行业门类和招聘平台分类。",
  },
  {
    industryKey: "finance",
    displayName: "金融 / 量化",
    aliases: ["金融", "证券", "基金", "量化", "私募"],
    nationalStatCategory: "金融业",
    recruitingCategories: ["金融业", "基金/证券/期货/投资"],
    notes: "量化岗位通常同时参考金融行业和技术岗位薪酬。",
  },
  {
    industryKey: "manufacturing",
    displayName: "制造业 / 硬件",
    aliases: ["制造业", "硬件", "新能源", "汽车", "半导体"],
    nationalStatCategory: "制造业",
    recruitingCategories: ["制造业", "汽车", "电子/半导体/集成电路"],
    notes: "后续可拆分为新能源、汽车、半导体等子行业。",
  },
];

export const roleMappings: RoleMapping[] = [
  {
    roleKey: "engineering",
    displayName: "技术 / 工程",
    aliases: ["后端开发", "前端开发", "Java开发", "服务端开发", "算法工程师", "软件工程师"],
    recruitingKeywords: ["后端", "前端", "Java", "Go", "算法", "软件工程师"],
    roleFamily: "technical",
    notes: "工程类岗位，后续可拆分前端、后端、算法、测试、运维。",
  },
  {
    roleKey: "product",
    displayName: "产品 / 项目",
    aliases: ["产品经理", "项目经理", "产品负责人"],
    recruitingKeywords: ["产品经理", "项目经理", "产品运营"],
    roleFamily: "product",
    notes: "产品和项目岗位第一版合并处理。",
  },
  {
    roleKey: "research",
    displayName: "研究 / 分析",
    aliases: ["行业研究", "数据分析", "量化研究", "投研", "商业分析"],
    recruitingKeywords: ["研究员", "数据分析", "商业分析", "量化研究"],
    roleFamily: "research",
    notes: "研究分析类岗位，后续可按金融投研、数据分析、商业分析拆分。",
  },
];
