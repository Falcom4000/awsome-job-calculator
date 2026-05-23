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

const industryPositionSalaryCsv = `
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|state_owned|国有企业|senior_management|高级管理|360869|564400|836427|1043055|1237956
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|state_owned|国有企业|middle_manager|中层经理|170906|287130|420562|591908|735199
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|state_owned|国有企业|senior_staff|高级职员|110886|170416|239846|328545|440358
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|state_owned|国有企业|general_staff|普通职员|66711|84192|123653|169125|232679
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|foreign|外资企业|senior_management|高级管理|473423|702942|1036020|1492930|1963485
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|foreign|外资企业|middle_manager|中层经理|225786|314553|546525|696283|906816
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|foreign|外资企业|senior_staff|高级职员|138899|195561|336263|433732|515374
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|foreign|外资企业|general_staff|普通职员|71326|105126|150339|192699|247023
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_leading|民营龙头|senior_management|高级管理|327606|527778|925844|1250123|1577142
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_leading|民营龙头|middle_manager|中层经理|192676|283086|528507|718241|894291
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_leading|民营龙头|senior_staff|高级职员|119646|175325|299115|408674|524838
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_leading|民营龙头|general_staff|普通职员|71991|89829|132116|177133|239419
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_general|民营普通|senior_management|高级管理|256498|433838|758772|971064|1244761
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_general|民营普通|middle_manager|中层经理|132076|203303|379659|510640|640888
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_general|民营普通|senior_staff|高级职员|84363|122937|213673|288997|380107
salary_survey_agriculture_forestry_animal_husbandry_fishery|农、林、牧、渔业|private_general|民营普通|general_staff|普通职员|50654|66995|95582|131286|172583
salary_survey_nonferrous_metals|有色金属业|state_owned|国有企业|senior_management|高级管理|430829|686130|959863|1229981|1507324
salary_survey_nonferrous_metals|有色金属业|state_owned|国有企业|middle_manager|中层经理|202886|342059|501336|690970|895545
salary_survey_nonferrous_metals|有色金属业|state_owned|国有企业|senior_staff|高级职员|132162|197621|291713|400864|529749
salary_survey_nonferrous_metals|有色金属业|state_owned|国有企业|general_staff|普通职员|79437|101184|144129|203950|272493
salary_survey_nonferrous_metals|有色金属业|foreign|外资企业|senior_management|高级管理|586915|805930|1189764|1753719|2389414
salary_survey_nonferrous_metals|有色金属业|foreign|外资企业|middle_manager|中层经理|286201|364506|639819|831567|1049894
salary_survey_nonferrous_metals|有色金属业|foreign|外资企业|senior_staff|高级职员|167725|231069|393720|501788|610033
salary_survey_nonferrous_metals|有色金属业|foreign|外资企业|general_staff|普通职员|84011|126900|177419|235334|310258
salary_survey_nonferrous_metals|有色金属业|private_leading|民营龙头|senior_management|高级管理|380558|662783|1115683|1398641|1809532
salary_survey_nonferrous_metals|有色金属业|private_leading|民营龙头|middle_manager|中层经理|219673|348777|589506|805145|1109294
salary_survey_nonferrous_metals|有色金属业|private_leading|民营龙头|senior_staff|高级职员|139089|206305|353188|481344|627157
salary_survey_nonferrous_metals|有色金属业|private_leading|民营龙头|general_staff|普通职员|86527|109487|157526|228372|291132
salary_survey_nonferrous_metals|有色金属业|private_general|民营普通|senior_management|高级管理|306179|527727|924194|1129349|1428533
salary_survey_nonferrous_metals|有色金属业|private_general|民营普通|middle_manager|中层经理|160050|247636|435163|595395|780626
salary_survey_nonferrous_metals|有色金属业|private_general|民营普通|senior_staff|高级职员|101619|150791|250717|348048|462300
salary_survey_nonferrous_metals|有色金属业|private_general|民营普通|general_staff|普通职员|58050|77978|108141|157953|206526
salary_survey_coal|煤炭业|state_owned|国有企业|senior_management|高级管理|389590|633526|894334|1122795|1376717
salary_survey_coal|煤炭业|state_owned|国有企业|middle_manager|中层经理|184859|309685|462347|605353|841491
salary_survey_coal|煤炭业|state_owned|国有企业|senior_staff|高级职员|118446|187327|274833|365380|479866
salary_survey_coal|煤炭业|state_owned|国有企业|general_staff|普通职员|70449|92970|127937|189528|254079
salary_survey_coal|煤炭业|foreign|外资企业|senior_management|高级管理|542573|804320|1131616|1647863|2161341
salary_survey_coal|煤炭业|foreign|外资企业|middle_manager|中层经理|266518|343418|579025|762806|988676
salary_survey_coal|煤炭业|foreign|外资企业|senior_staff|高级职员|156277|217959|363279|448142|567422
salary_survey_coal|煤炭业|foreign|外资企业|general_staff|普通职员|81845|117726|169589|213959|264312
salary_survey_coal|煤炭业|private_leading|民营龙头|senior_management|高级管理|347755|593633|1091964|1320996|1686128
salary_survey_coal|煤炭业|private_leading|民营龙头|middle_manager|中层经理|207683|312039|576265|802904|1004976
salary_survey_coal|煤炭业|private_leading|民营龙头|senior_staff|高级职员|133835|191135|316147|434036|583979
salary_survey_coal|煤炭业|private_leading|民营龙头|general_staff|普通职员|75096|99521|148702|212696|271575
salary_survey_coal|煤炭业|private_general|民营普通|senior_management|高级管理|284665|491750|836314|1026467|1292170
salary_survey_coal|煤炭业|private_general|民营普通|middle_manager|中层经理|140403|219241|412942|546593|685732
salary_survey_coal|煤炭业|private_general|民营普通|senior_staff|高级职员|92611|137796|240375|308976|403066
salary_survey_coal|煤炭业|private_general|民营普通|general_staff|普通职员|55763|71454|104636|141926|185571
salary_survey_petroleum_chemical|石油化工业|state_owned|国有企业|senior_management|高级管理|426403|679570|958485|1192216|1490444
salary_survey_petroleum_chemical|石油化工业|state_owned|国有企业|middle_manager|中层经理|192368|332015|486201|651354|859642
salary_survey_petroleum_chemical|石油化工业|state_owned|国有企业|senior_staff|高级职员|123171|200773|283921|392946|525215
salary_survey_petroleum_chemical|石油化工业|state_owned|国有企业|general_staff|普通职员|74049|96503|144543|196069|269290
salary_survey_petroleum_chemical|石油化工业|foreign|外资企业|senior_management|高级管理|564153|812893|1212019|1669788|2297627
salary_survey_petroleum_chemical|石油化工业|foreign|外资企业|middle_manager|中层经理|266821|353352|645729|803079|1029072
salary_survey_petroleum_chemical|石油化工业|foreign|外资企业|senior_staff|高级职员|164142|231336|377961|499159|615237
salary_survey_petroleum_chemical|石油化工业|foreign|外资企业|general_staff|普通职员|81538|127288|178192|233842|297436
salary_survey_petroleum_chemical|石油化工业|private_leading|民营龙头|senior_management|高级管理|380136|636902|1115008|1388021|1791003
salary_survey_petroleum_chemical|石油化工业|private_leading|民营龙头|middle_manager|中层经理|213539|325557|607071|818814|1034896
salary_survey_petroleum_chemical|石油化工业|private_leading|民营龙头|senior_staff|高级职员|137389|194361|349319|468264|596354
salary_survey_petroleum_chemical|石油化工业|private_leading|民营龙头|general_staff|普通职员|83934|106753|151729|204374|279417
salary_survey_petroleum_chemical|石油化工业|private_general|民营普通|senior_management|高级管理|303334|502149|887577|1089292|1384116
salary_survey_petroleum_chemical|石油化工业|private_general|民营普通|middle_manager|中层经理|153188|237824|426928|576066|756420
salary_survey_petroleum_chemical|石油化工业|private_general|民营普通|senior_staff|高级职员|100383|147020|245055|316492|431213
salary_survey_petroleum_chemical|石油化工业|private_general|民营普通|general_staff|普通职员|58271|76691|112453|153853|208606
salary_survey_it_manufacturing|IT制造业|state_owned|国有企业|senior_management|高级管理|497437|753146|1064662|1342492|1640115
salary_survey_it_manufacturing|IT制造业|state_owned|国有企业|middle_manager|中层经理|222389|368221|539880|739406|965128
salary_survey_it_manufacturing|IT制造业|state_owned|国有企业|senior_staff|高级职员|143366|221100|337241|463985|588610
salary_survey_it_manufacturing|IT制造业|state_owned|国有企业|general_staff|普通职员|80852|113400|162868|217993|298521
salary_survey_it_manufacturing|IT制造业|foreign|外资企业|senior_management|高级管理|638883|939120|1319093|2048917|2649388
salary_survey_it_manufacturing|IT制造业|foreign|外资企业|middle_manager|中层经理|305582|409420|716392|926650|1176969
salary_survey_it_manufacturing|IT制造业|foreign|外资企业|senior_staff|高级职员|189688|256843|424474|540119|702122
salary_survey_it_manufacturing|IT制造业|foreign|外资企业|general_staff|普通职员|96156|139587|205081|256322|340318
salary_survey_it_manufacturing|IT制造业|private_leading|民营龙头|senior_management|高级管理|439138|705872|1287598|1583732|1948638
salary_survey_it_manufacturing|IT制造业|private_leading|民营龙头|middle_manager|中层经理|242046|383264|666644|892627|1195411
salary_survey_it_manufacturing|IT制造业|private_leading|民营龙头|senior_staff|高级职员|160829|233347|391831|538358|689414
salary_survey_it_manufacturing|IT制造业|private_leading|民营龙头|general_staff|普通职员|94233|120691|171282|243259|320391
salary_survey_it_manufacturing|IT制造业|private_general|民营普通|senior_management|高级管理|349469|585243|1015414|1296447|1614914
salary_survey_it_manufacturing|IT制造业|private_general|民营普通|middle_manager|中层经理|176755|269381|459993|637979|865437
salary_survey_it_manufacturing|IT制造业|private_general|民营普通|senior_staff|高级职员|112579|165434|283046|376186|493174
salary_survey_it_manufacturing|IT制造业|private_general|民营普通|general_staff|普通职员|67689|92089|119521|166459|224849
salary_survey_mechanical_manufacturing|机械制造|state_owned|国有企业|senior_management|高级管理|392545|606058|847168|1071099|1304979
salary_survey_mechanical_manufacturing|机械制造|state_owned|国有企业|middle_manager|中层经理|176205|299763|435168|616071|777209
salary_survey_mechanical_manufacturing|机械制造|state_owned|国有企业|senior_staff|高级职员|113948|176522|248613|349526|478758
salary_survey_mechanical_manufacturing|机械制造|state_owned|国有企业|general_staff|普通职员|67149|87597|128060|181381|247909
salary_survey_mechanical_manufacturing|机械制造|foreign|外资企业|senior_management|高级管理|504955|734344|1073837|1558992|2095119
salary_survey_mechanical_manufacturing|机械制造|foreign|外资企业|middle_manager|中层经理|255542|335872|576936|726954|911516
salary_survey_mechanical_manufacturing|机械制造|foreign|外资企业|senior_staff|高级职员|151427|194537|338454|436967|544641
salary_survey_mechanical_manufacturing|机械制造|foreign|外资企业|general_staff|普通职员|76110|115438|164144|203914|258887
salary_survey_mechanical_manufacturing|机械制造|private_leading|民营龙头|senior_management|高级管理|346767|575280|1006515|1289451|1585946
salary_survey_mechanical_manufacturing|机械制造|private_leading|民营龙头|middle_manager|中层经理|196852|293339|558246|742029|953871
salary_survey_mechanical_manufacturing|机械制造|private_leading|民营龙头|senior_staff|高级职员|122841|180649|314907|441905|549316
salary_survey_mechanical_manufacturing|机械制造|private_leading|民营龙头|general_staff|普通职员|76961|96213|141797|190750|253130
salary_survey_mechanical_manufacturing|机械制造|private_general|民营普通|senior_management|高级管理|270153|449505|810314|1004802|1274916
salary_survey_mechanical_manufacturing|机械制造|private_general|民营普通|middle_manager|中层经理|142522|219380|389282|549813|703517
salary_survey_mechanical_manufacturing|机械制造|private_general|民营普通|senior_staff|高级职员|86163|128468|214751|301864|393765
salary_survey_mechanical_manufacturing|机械制造|private_general|民营普通|general_staff|普通职员|52441|70622|98938|139352|189727
salary_survey_processing_manufacturing|加工制造|state_owned|国有企业|senior_management|高级管理|393810|639859|894262|1098438|1361122
salary_survey_processing_manufacturing|加工制造|state_owned|国有企业|middle_manager|中层经理|183527|307504|436037|593746|808601
salary_survey_processing_manufacturing|加工制造|state_owned|国有企业|senior_staff|高级职员|120800|185871|269582|376844|493376
salary_survey_processing_manufacturing|加工制造|state_owned|国有企业|general_staff|普通职员|72147|94008|131960|189202|248034
salary_survey_processing_manufacturing|加工制造|foreign|外资企业|senior_management|高级管理|516073|759076|1055974|1654761|2226457
salary_survey_processing_manufacturing|加工制造|foreign|外资企业|middle_manager|中层经理|256164|336611|595792|780172|939710
salary_survey_processing_manufacturing|加工制造|foreign|外资企业|senior_staff|高级职员|160881|209562|359709|448220|584700
salary_survey_processing_manufacturing|加工制造|foreign|外资企业|general_staff|普通职员|79852|113772|165638|219718|269233
salary_survey_processing_manufacturing|加工制造|private_leading|民营龙头|senior_management|高级管理|340220|569850|1050487|1347501|1623123
salary_survey_processing_manufacturing|加工制造|private_leading|民营龙头|middle_manager|中层经理|199017|312708|559102|747964|994478
salary_survey_processing_manufacturing|加工制造|private_leading|民营龙头|senior_staff|高级职员|126082|191280|307091|421394|555135
salary_survey_processing_manufacturing|加工制造|private_leading|民营龙头|general_staff|普通职员|77667|99511|143479|203263|266340
salary_survey_processing_manufacturing|加工制造|private_general|民营普通|senior_management|高级管理|276438|477368|860567|1066797|1342934
salary_survey_processing_manufacturing|加工制造|private_general|民营普通|middle_manager|中层经理|141995|224262|405297|526635|699423
salary_survey_processing_manufacturing|加工制造|private_general|民营普通|senior_staff|高级职员|92359|138258|238457|303488|390793
salary_survey_processing_manufacturing|加工制造|private_general|民营普通|general_staff|普通职员|55587|69117|102289|142467|188563
salary_survey_fast_moving_consumer_goods|快速消费品|state_owned|国有企业|senior_management|高级管理|418967|699715|968841|1216007|1477883
salary_survey_fast_moving_consumer_goods|快速消费品|state_owned|国有企业|middle_manager|中层经理|202678|326612|476785|660614|895452
salary_survey_fast_moving_consumer_goods|快速消费品|state_owned|国有企业|senior_staff|高级职员|130392|202973|286759|403846|535528
salary_survey_fast_moving_consumer_goods|快速消费品|state_owned|国有企业|general_staff|普通职员|78489|100144|142071|199064|274851
salary_survey_fast_moving_consumer_goods|快速消费品|foreign|外资企业|senior_management|高级管理|548656|821466|1212824|1744209|2343945
salary_survey_fast_moving_consumer_goods|快速消费品|foreign|外资企业|middle_manager|中层经理|270236|368748|628026|808465|1060865
salary_survey_fast_moving_consumer_goods|快速消费品|foreign|外资企业|senior_staff|高级职员|166343|231560|378679|494339|615724
salary_survey_fast_moving_consumer_goods|快速消费品|foreign|外资企业|general_staff|普通职员|88036|125847|177664|228803|292254
salary_survey_fast_moving_consumer_goods|快速消费品|private_leading|民营龙头|senior_management|高级管理|380263|631307|1172677|1375305|1723726
salary_survey_fast_moving_consumer_goods|快速消费品|private_leading|民营龙头|middle_manager|中层经理|214221|345789|595194|794918|1098643
salary_survey_fast_moving_consumer_goods|快速消费品|private_leading|民营龙头|senior_staff|高级职员|138832|206771|345938|470022|639369
salary_survey_fast_moving_consumer_goods|快速消费品|private_leading|民营龙头|general_staff|普通职员|84361|106122|152573|208628|282304
salary_survey_fast_moving_consumer_goods|快速消费品|private_general|民营普通|senior_management|高级管理|306407|491925|925405|1190688|1428679
salary_survey_fast_moving_consumer_goods|快速消费品|private_general|民营普通|middle_manager|中层经理|151805|236031|426854|582290|788491
salary_survey_fast_moving_consumer_goods|快速消费品|private_general|民营普通|senior_staff|高级职员|97968|149851|245432|349198|440555
salary_survey_fast_moving_consumer_goods|快速消费品|private_general|民营普通|general_staff|普通职员|61850|80600|109090|158219|208699
salary_survey_durable_consumer_goods|耐用消费品|state_owned|国有企业|senior_management|高级管理|418671|660845|941374|1131559|1432649
salary_survey_durable_consumer_goods|耐用消费品|state_owned|国有企业|middle_manager|中层经理|192488|322537|454679|648263|869165
salary_survey_durable_consumer_goods|耐用消费品|state_owned|国有企业|senior_staff|高级职员|123260|193985|274837|397566|530604
salary_survey_durable_consumer_goods|耐用消费品|state_owned|国有企业|general_staff|普通职员|75172|95693|143430|203272|267011
salary_survey_durable_consumer_goods|耐用消费品|foreign|外资企业|senior_management|高级管理|554055|815348|1201451|1709307|2321319
salary_survey_durable_consumer_goods|耐用消费品|foreign|外资企业|middle_manager|中层经理|272842|354252|640477|788285|1019463
salary_survey_durable_consumer_goods|耐用消费品|foreign|外资企业|senior_staff|高级职员|158616|221972|359968|475773|597614
salary_survey_durable_consumer_goods|耐用消费品|foreign|外资企业|general_staff|普通职员|82584|123812|175986|231402|298239
salary_survey_durable_consumer_goods|耐用消费品|private_leading|民营龙头|senior_management|高级管理|365038|661590|1116221|1369067|1773865
salary_survey_durable_consumer_goods|耐用消费品|private_leading|民营龙头|middle_manager|中层经理|210493|325431|601393|790981|1056863
salary_survey_durable_consumer_goods|耐用消费品|private_leading|民营龙头|senior_staff|高级职员|136429|198480|339121|474739|585431
salary_survey_durable_consumer_goods|耐用消费品|private_leading|民营龙头|general_staff|普通职员|82701|105052|153270|218896|274863
salary_survey_durable_consumer_goods|耐用消费品|private_general|民营普通|senior_management|高级管理|297597|507151|881094|1126364|1414024
salary_survey_durable_consumer_goods|耐用消费品|private_general|民营普通|middle_manager|中层经理|147256|240335|426503|568491|722046
salary_survey_durable_consumer_goods|耐用消费品|private_general|民营普通|senior_staff|高级职员|95561|144945|248374|332204|440765
salary_survey_durable_consumer_goods|耐用消费品|private_general|民营普通|general_staff|普通职员|57851|77633|105256|145405|192508
salary_survey_medicine|医药|state_owned|国有企业|senior_management|高级管理|447311|692977|997017|1248651|1536061
salary_survey_medicine|医药|state_owned|国有企业|middle_manager|中层经理|213105|345676|490714|676393|939286
salary_survey_medicine|医药|state_owned|国有企业|senior_staff|高级职员|131038|205739|295022|415765|545280
salary_survey_medicine|医药|state_owned|国有企业|general_staff|普通职员|77407|99973|151572|222218|296571
salary_survey_medicine|医药|foreign|外资企业|senior_management|高级管理|598598|888603|1224972|1821683|2409907
salary_survey_medicine|医药|foreign|外资企业|middle_manager|中层经理|294040|386231|657600|856639|1112888
salary_survey_medicine|医药|foreign|外资企业|senior_staff|高级职员|169308|244615|381873|484266|633549
salary_survey_medicine|医药|foreign|外资企业|general_staff|普通职员|91086|127326|181779|234156|306712
salary_survey_medicine|医药|private_leading|民营龙头|senior_management|高级管理|376548|668591|1170786|1487629|1881224
salary_survey_medicine|医药|private_leading|民营龙头|middle_manager|中层经理|219910|362140|630674|871223|1131523
salary_survey_medicine|医药|private_leading|民营龙头|senior_staff|高级职员|142711|214225|359407|502129|626315
salary_survey_medicine|医药|private_leading|民营龙头|general_staff|普通职员|85437|110937|159886|217226|293460
salary_survey_medicine|医药|private_general|民营普通|senior_management|高级管理|311868|532770|923163|1182251|1454662
salary_survey_medicine|医药|private_general|民营普通|middle_manager|中层经理|162741|244974|474005|584349|771912
salary_survey_medicine|医药|private_general|民营普通|senior_staff|高级职员|105745|155832|262564|350362|485344
salary_survey_medicine|医药|private_general|民营普通|general_staff|普通职员|63453|79495|111991|159789|216722
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|state_owned|国有企业|senior_management|高级管理|456261|705874|988112|1169789|1463077
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|state_owned|国有企业|middle_manager|中层经理|205074|328876|495542|678269|893483
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|state_owned|国有企业|senior_staff|高级职员|126757|205172|297599|414952|552251
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|state_owned|国有企业|general_staff|普通职员|74297|103666|144327|203592|282540
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|foreign|外资企业|senior_management|高级管理|569613|837901|1188302|1770479|2482840
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|foreign|外资企业|middle_manager|中层经理|285756|382773|658966|814916|1049325
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|foreign|外资企业|senior_staff|高级职员|174991|230754|393807|482310|621623
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|foreign|外资企业|general_staff|普通职员|87499|127950|177731|240247|301055
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_leading|民营龙头|senior_management|高级管理|376790|644125|1172369|1497547|1790448
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_leading|民营龙头|middle_manager|中层经理|219985|349277|612642|860995|1087896
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_leading|民营龙头|senior_staff|高级职员|141757|212443|359853|480788|645374
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_leading|民营龙头|general_staff|普通职员|82384|113427|160556|220547|288555
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_general|民营普通|senior_management|高级管理|314595|511540|889583|1192965|1469904
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_general|民营普通|middle_manager|中层经理|157958|244855|435360|605630|771710
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_general|民营普通|senior_staff|高级职员|102875|156044|248067|333823|449154
salary_survey_electricity_heat_gas_water|电力、热力、燃气及水生产和供应业|private_general|民营普通|general_staff|普通职员|59551|81700|110659|151214|200388
salary_survey_construction|建筑业|state_owned|国有企业|senior_management|高级管理|426311|665687|987666|1144135|1448318
salary_survey_construction|建筑业|state_owned|国有企业|middle_manager|中层经理|196919|323252|473165|643491|843887
salary_survey_construction|建筑业|state_owned|国有企业|senior_staff|高级职员|126600|195528|283905|402901|520914
salary_survey_construction|建筑业|state_owned|国有企业|general_staff|普通职员|74974|96076|141235|201486|269636
salary_survey_construction|建筑业|foreign|外资企业|senior_management|高级管理|554457|830130|1144674|1707580|2322590
salary_survey_construction|建筑业|foreign|外资企业|middle_manager|中层经理|275116|371761|652757|838179|1039972
salary_survey_construction|建筑业|foreign|外资企业|senior_staff|高级职员|169794|225139|378523|494634|627337
salary_survey_construction|建筑业|foreign|外资企业|general_staff|普通职员|82409|119316|175923|236440|298550
salary_survey_construction|建筑业|private_leading|民营龙头|senior_management|高级管理|392437|619259|1106245|1418391|1724537
salary_survey_construction|建筑业|private_leading|民营龙头|middle_manager|中层经理|216813|334747|595748|822819|1047421
salary_survey_construction|建筑业|private_leading|民营龙头|senior_staff|高级职员|140176|202308|338840|461861|614810
salary_survey_construction|建筑业|private_leading|民营龙头|general_staff|普通职员|82481|107548|157733|217591|285959
salary_survey_construction|建筑业|private_general|民营普通|senior_management|高级管理|305736|512195|880201|1096271|1427048
salary_survey_construction|建筑业|private_general|民营普通|middle_manager|中层经理|158036|236049|430857|586640|757564
salary_survey_construction|建筑业|private_general|民营普通|senior_staff|高级职员|102295|144135|250587|329638|431919
salary_survey_construction|建筑业|private_general|民营普通|general_staff|普通职员|59175|74243|113289|151879|197213
salary_survey_wholesale_retail|批发和零售业|state_owned|国有企业|senior_management|高级管理|396720|620340|857128|1083713|1374320
salary_survey_wholesale_retail|批发和零售业|state_owned|国有企业|middle_manager|中层经理|184249|289213|426901|585708|800407
salary_survey_wholesale_retail|批发和零售业|state_owned|国有企业|senior_staff|高级职员|119863|181862|263469|353201|484303
salary_survey_wholesale_retail|批发和零售业|state_owned|国有企业|general_staff|普通职员|70224|90299|128134|186711|245429
salary_survey_wholesale_retail|批发和零售业|foreign|外资企业|senior_management|高级管理|510073|772321|1052809|1608148|2135129
salary_survey_wholesale_retail|批发和零售业|foreign|外资企业|middle_manager|中层经理|253259|335699|594948|763261|957434
salary_survey_wholesale_retail|批发和零售业|foreign|外资企业|senior_staff|高级职员|148560|206300|332138|433169|544982
salary_survey_wholesale_retail|批发和零售业|foreign|外资企业|general_staff|普通职员|77192|108910|159579|208857|271517
salary_survey_wholesale_retail|批发和零售业|private_leading|民营龙头|senior_management|高级管理|347563|568715|1027593|1311683|1649168
salary_survey_wholesale_retail|批发和零售业|private_leading|民营龙头|middle_manager|中层经理|195616|314622|531385|746636|945132
salary_survey_wholesale_retail|批发和零售业|private_leading|民营龙头|senior_staff|高级职员|128587|188967|312298|426153|560370
salary_survey_wholesale_retail|批发和零售业|private_leading|民营龙头|general_staff|普通职员|74645|99460|136615|186157|247590
salary_survey_wholesale_retail|批发和零售业|private_general|民营普通|senior_management|高级管理|271387|463014|803478|1010770|1288728
salary_survey_wholesale_retail|批发和零售业|private_general|民营普通|middle_manager|中层经理|140818|221633|396439|537937|691519
salary_survey_wholesale_retail|批发和零售业|private_general|民营普通|senior_staff|高级职员|92861|132367|217631|308093|394338
salary_survey_wholesale_retail|批发和零售业|private_general|民营普通|general_staff|普通职员|54575|70615|98367|143180|181698
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|state_owned|国有企业|senior_management|高级管理|385150|613500|892434|1117788|1415391
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|state_owned|国有企业|middle_manager|中层经理|175964|309579|426551|617487|801712
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|state_owned|国有企业|senior_staff|高级职员|122246|185355|271355|381302|488769
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|state_owned|国有企业|general_staff|普通职员|71062|89977|125698|180585|239172
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|foreign|外资企业|senior_management|高级管理|515339|736419|1117985|1633292|2181678
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|foreign|外资企业|middle_manager|中层经理|251047|349372|572232|740651|930479
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|foreign|外资企业|senior_staff|高级职员|151666|210667|338938|432681|556597
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|foreign|外资企业|general_staff|普通职员|75809|113164|155040|211742|272628
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_leading|民营龙头|senior_management|高级管理|337391|569251|980036|1248017|1604764
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_leading|民营龙头|middle_manager|中层经理|194991|312070|548434|750397|955778
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_leading|民营龙头|senior_staff|高级职员|132045|179779|306396|421611|549845
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_leading|民营龙头|general_staff|普通职员|72795|94634|141254|199310|270992
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_general|民营普通|senior_management|高级管理|279680|458691|843022|1031386|1316796
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_general|民营普通|middle_manager|中层经理|141298|216892|388525|534563|698054
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_general|民营普通|senior_staff|高级职员|93316|135437|230722|308170|394395
salary_survey_transport_storage_postal|交通运输、仓储和邮政业|private_general|民营普通|general_staff|普通职员|54565|70479|104921|141148|182855
salary_survey_accommodation_catering|住宿和餐饮业|state_owned|国有企业|senior_management|高级管理|380030|576856|872796|1077589|1280513
salary_survey_accommodation_catering|住宿和餐饮业|state_owned|国有企业|middle_manager|中层经理|173914|288057|426184|570933|767587
salary_survey_accommodation_catering|住宿和餐饮业|state_owned|国有企业|senior_staff|高级职员|113211|169298|253041|351912|464943
salary_survey_accommodation_catering|住宿和餐饮业|state_owned|国有企业|general_staff|普通职员|66158|88132|119519|185459|244873
salary_survey_accommodation_catering|住宿和餐饮业|foreign|外资企业|senior_management|高级管理|489520|705237|1020998|1506195|2050385
salary_survey_accommodation_catering|住宿和餐饮业|foreign|外资企业|middle_manager|中层经理|240670|322505|560739|721600|891612
salary_survey_accommodation_catering|住宿和餐饮业|foreign|外资企业|senior_staff|高级职员|149687|192311|330949|423987|533116
salary_survey_accommodation_catering|住宿和餐饮业|foreign|外资企业|general_staff|普通职员|75886|106257|152693|205478|265779
salary_survey_accommodation_catering|住宿和餐饮业|private_leading|民营龙头|senior_management|高级管理|329888|579421|996504|1285754|1538105
salary_survey_accommodation_catering|住宿和餐饮业|private_leading|民营龙头|middle_manager|中层经理|185119|291143|521213|695073|933250
salary_survey_accommodation_catering|住宿和餐饮业|private_leading|民营龙头|senior_staff|高级职员|119746|175859|305978|414813|553793
salary_survey_accommodation_catering|住宿和餐饮业|private_leading|民营龙头|general_staff|普通职员|70765|95185|135614|183563|245223
salary_survey_accommodation_catering|住宿和餐饮业|private_general|民营普通|senior_management|高级管理|273022|444446|786175|976043|1261323
salary_survey_accommodation_catering|住宿和餐饮业|private_general|民营普通|middle_manager|中层经理|131452|216007|369127|503290|663151
salary_survey_accommodation_catering|住宿和餐饮业|private_general|民营普通|senior_staff|高级职员|87630|129069|217445|295216|389092
salary_survey_accommodation_catering|住宿和餐饮业|private_general|民营普通|general_staff|普通职员|53582|67981|99773|137898|180632
internet|互联网|state_owned|国有企业|senior_management|高级管理|485116|736280|1092498|1352566|1647648
internet|互联网|state_owned|国有企业|middle_manager|中层经理|227888|360315|527712|758911|979829
internet|互联网|state_owned|国有企业|senior_staff|高级职员|147487|220890|316668|444027|586576
internet|互联网|state_owned|国有企业|general_staff|普通职员|88610|113118|163183|222684|315776
internet|互联网|foreign|外资企业|senior_management|高级管理|650106|973402|1341217|1952381|2720698
internet|互联网|foreign|外资企业|middle_manager|中层经理|320001|423617|713854|938608|1138571
internet|互联网|foreign|外资企业|senior_staff|高级职员|191225|254858|426795|546113|687482
internet|互联网|foreign|外资企业|general_staff|普通职员|97924|138940|197044|258415|342959
internet|互联网|private_leading|民营龙头|senior_management|高级管理|416767|690238|1222440|1588677|2019714
internet|互联网|private_leading|民营龙头|middle_manager|中层经理|238577|393291|691459|926151|1202834
internet|互联网|private_leading|民营龙头|senior_staff|高级职员|161930|235574|398340|557502|713449
internet|互联网|private_leading|民营龙头|general_staff|普通职员|93045|121665|177344|239413|316233
internet|互联网|private_general|民营普通|senior_management|高级管理|342082|555486|1002769|1289373|1594653
internet|互联网|private_general|民营普通|middle_manager|中层经理|178658|265387|499586|646834|846227
internet|互联网|private_general|民营普通|senior_staff|高级职员|112192|169173|279785|376440|496327
internet|互联网|private_general|民营普通|general_staff|普通职员|64185|86531|127333|176838|233373
salary_survey_ecommerce|电子商务|state_owned|国有企业|senior_management|高级管理|503166|785460|1107867|1413484|1673382
salary_survey_ecommerce|电子商务|state_owned|国有企业|middle_manager|中层经理|234601|388587|556886|791327|1023830
salary_survey_ecommerce|电子商务|state_owned|国有企业|senior_staff|高级职员|153741|230349|331110|462745|612371
salary_survey_ecommerce|电子商务|state_owned|国有企业|general_staff|普通职员|88908|114713|163359|238337|314405
salary_survey_ecommerce|电子商务|foreign|外资企业|senior_management|高级管理|659472|959503|1360007|1985321|2732040
salary_survey_ecommerce|电子商务|foreign|外资企业|middle_manager|中层经理|330001|437781|761271|971596|1200347
salary_survey_ecommerce|电子商务|foreign|外资企业|senior_staff|高级职员|195989|267606|441724|542639|724689
salary_survey_ecommerce|电子商务|foreign|外资企业|general_staff|普通职员|99869|148361|206297|266940|334682
salary_survey_ecommerce|电子商务|private_leading|民营龙头|senior_management|高级管理|443280|742335|1354757|1721004|2091871
salary_survey_ecommerce|电子商务|private_leading|民营龙头|middle_manager|中层经理|265119|399594|708260|923684|1208732
salary_survey_ecommerce|电子商务|private_leading|民营龙头|senior_staff|高级职员|160541|236306|403507|568129|731078
salary_survey_ecommerce|电子商务|private_leading|民营龙头|general_staff|普通职员|97094|125111|180590|249088|332899
salary_survey_ecommerce|电子商务|private_general|民营普通|senior_management|高级管理|343611|603900|1047316|1345795|1666940
salary_survey_ecommerce|电子商务|private_general|民营普通|middle_manager|中层经理|182863|286362|517485|687484|892803
salary_survey_ecommerce|电子商务|private_general|民营普通|senior_staff|高级职员|113836|178485|286830|392191|519133
salary_survey_ecommerce|电子商务|private_general|民营普通|general_staff|普通职员|68949|91748|136939|188843|240893
salary_survey_software_system_integration|软件系统集成|state_owned|国有企业|senior_management|高级管理|491614|767886|1083814|1333915|1605873
salary_survey_software_system_integration|软件系统集成|state_owned|国有企业|middle_manager|中层经理|219703|368359|534510|719562|980272
salary_survey_software_system_integration|软件系统集成|state_owned|国有企业|senior_staff|高级职员|144617|227041|316914|441286|592842
salary_survey_software_system_integration|软件系统集成|state_owned|国有企业|general_staff|普通职员|85425|111627|158020|234880|309723
salary_survey_software_system_integration|软件系统集成|foreign|外资企业|senior_management|高级管理|645089|918255|1331074|1950481|2594041
salary_survey_software_system_integration|软件系统集成|foreign|外资企业|middle_manager|中层经理|304333|415795|715922|914977|1141180
salary_survey_software_system_integration|软件系统集成|foreign|外资企业|senior_staff|高级职员|189648|254011|423456|544766|687788
salary_survey_software_system_integration|软件系统集成|foreign|外资企业|general_staff|普通职员|96230|137998|195049|250495|329496
salary_survey_software_system_integration|软件系统集成|private_leading|民营龙头|senior_management|高级管理|442335|706044|1310337|1604623|1964800
salary_survey_software_system_integration|软件系统集成|private_leading|民营龙头|middle_manager|中层经理|234311|378654|685605|917692|1194464
salary_survey_software_system_integration|软件系统集成|private_leading|民营龙头|senior_staff|高级职员|161921|233444|402669|532628|694852
salary_survey_software_system_integration|软件系统集成|private_leading|民营龙头|general_staff|普通职员|91626|118882|170647|240591|323002
salary_survey_software_system_integration|软件系统集成|private_general|民营普通|senior_management|高级管理|345333|568094|984911|1283546|1536528
salary_survey_software_system_integration|软件系统集成|private_general|民营普通|middle_manager|中层经理|178745|265700|480884|641823|854213
salary_survey_software_system_integration|软件系统集成|private_general|民营普通|senior_staff|高级职员|112076|167570|280837|377031|478252
salary_survey_software_system_integration|软件系统集成|private_general|民营普通|general_staff|普通职员|66321|84208|120875|164528|216246
finance|金融业|state_owned|国有企业|senior_management|高级管理|488330|816664|1119737|1424457|1759262
finance|金融业|state_owned|国有企业|middle_manager|中层经理|238839|384969|573710|796702|1034559
finance|金融业|state_owned|国有企业|senior_staff|高级职员|145308|228151|337513|469271|631294
finance|金融业|state_owned|国有企业|general_staff|普通职员|89992|119413|160241|242860|317566
finance|金融业|foreign|外资企业|senior_management|高级管理|666313|970684|1416828|2111229|2791219
finance|金融业|foreign|外资企业|middle_manager|中层经理|327157|430782|785124|983953|1214955
finance|金融业|foreign|外资企业|senior_staff|高级职员|194030|272328|451166|584413|726034
finance|金融业|foreign|外资企业|general_staff|普通职员|96898|143740|203508|266413|344676
finance|金融业|private_leading|民营龙头|senior_management|高级管理|448421|751577|1316550|1659350|2113833
finance|金融业|private_leading|民营龙头|middle_manager|中层经理|262255|391845|730494|955166|1271757
finance|金融业|private_leading|民营龙头|senior_staff|高级职员|167644|234400|408568|571935|739109
finance|金融业|private_leading|民营龙头|general_staff|普通职员|99840|129900|187841|262339|337226
finance|金融业|private_general|民营普通|senior_management|高级管理|360808|597562|1058254|1318260|1650243
finance|金融业|private_general|民营普通|middle_manager|中层经理|181309|277814|512881|675962|875561
finance|金融业|private_general|民营普通|senior_staff|高级职员|122339|164495|292569|399734|534120
finance|金融业|private_general|民营普通|general_staff|普通职员|70435|87376|135867|187661|239508
real_estate|房地产业|state_owned|国有企业|senior_management|高级管理|471798|734803|1069486|1285062|1598588
real_estate|房地产业|state_owned|国有企业|middle_manager|中层经理|223605|356850|543229|720423|979087
real_estate|房地产业|state_owned|国有企业|senior_staff|高级职员|141412|218234|328580|431133|573781
real_estate|房地产业|state_owned|国有企业|general_staff|普通职员|82794|107929|153493|224814|303176
real_estate|房地产业|foreign|外资企业|senior_management|高级管理|611435|935391|1338157|1895195|2613789
real_estate|房地产业|foreign|外资企业|middle_manager|中层经理|301348|399491|700136|895651|1171718
real_estate|房地产业|foreign|外资企业|senior_staff|高级职员|182314|247492|402148|506288|665540
real_estate|房地产业|foreign|外资企业|general_staff|普通职员|92029|141452|193326|251994|329534
real_estate|房地产业|private_leading|民营龙头|senior_management|高级管理|408373|690723|1257349|1533669|1941817
real_estate|房地产业|private_leading|民营龙头|middle_manager|中层经理|239305|363514|662916|856864|1123140
real_estate|房地产业|private_leading|民营龙头|senior_staff|高级职员|155534|226050|382085|515669|685973
real_estate|房地产业|private_leading|民营龙头|general_staff|普通职员|91383|119123|172410|240452|309462
real_estate|房地产业|private_general|民营普通|senior_management|高级管理|328470|543901|982284|1273455|1547040
real_estate|房地产业|private_general|民营普通|middle_manager|中层经理|169908|265867|475810|633314|828103
real_estate|房地产业|private_general|民营普通|senior_staff|高级职员|108122|163980|271596|373865|486477
real_estate|房地产业|private_general|民营普通|general_staff|普通职员|68755|84185|117479|170054|225897
salary_survey_leasing_business_services|租赁和商务服务业|state_owned|国有企业|senior_management|高级管理|377317|581362|813420|1023968|1265176
salary_survey_leasing_business_services|租赁和商务服务业|state_owned|国有企业|middle_manager|中层经理|168736|290752|425275|570463|765857
salary_survey_leasing_business_services|租赁和商务服务业|state_owned|国有企业|senior_staff|高级职员|110137|167220|250044|342832|449542
salary_survey_leasing_business_services|租赁和商务服务业|state_owned|国有企业|general_staff|普通职员|65259|84420|122343|172315|237905
salary_survey_leasing_business_services|租赁和商务服务业|foreign|外资企业|senior_management|高级管理|508711|711245|1039586|1521907|2109034
salary_survey_leasing_business_services|租赁和商务服务业|foreign|外资企业|middle_manager|中层经理|231695|319247|558379|713046|890790
salary_survey_leasing_business_services|租赁和商务服务业|foreign|外资企业|senior_staff|高级职员|149344|194753|324640|424222|527419
salary_survey_leasing_business_services|租赁和商务服务业|foreign|外资企业|general_staff|普通职员|73304|108694|152623|201903|262684
salary_survey_leasing_business_services|租赁和商务服务业|private_leading|民营龙头|senior_management|高级管理|328736|550448|984037|1207832|1550107
salary_survey_leasing_business_services|租赁和商务服务业|private_leading|民营龙头|middle_manager|中层经理|181321|287583|525438|730560|924402
salary_survey_leasing_business_services|租赁和商务服务业|private_leading|民营龙头|senior_staff|高级职员|120091|175270|296990|407367|516915
salary_survey_leasing_business_services|租赁和商务服务业|private_leading|民营龙头|general_staff|普通职员|73845|91764|133876|185118|240221
salary_survey_leasing_business_services|租赁和商务服务业|private_general|民营普通|senior_management|高级管理|267631|452561|784778|957508|1223049
salary_survey_leasing_business_services|租赁和商务服务业|private_general|民营普通|middle_manager|中层经理|133749|210488|387522|509134|674790
salary_survey_leasing_business_services|租赁和商务服务业|private_general|民营普通|senior_staff|高级职员|86201|129944|212484|293730|374249
salary_survey_leasing_business_services|租赁和商务服务业|private_general|民营普通|general_staff|普通职员|51199|64645|98767|134717|171677
salary_survey_scientific_research_technical_services|科学研究和技术服务业|state_owned|国有企业|senior_management|高级管理|435282|712932|997829|1216829|1491919
salary_survey_scientific_research_technical_services|科学研究和技术服务业|state_owned|国有企业|middle_manager|中层经理|197019|345938|500606|687215|948766
salary_survey_scientific_research_technical_services|科学研究和技术服务业|state_owned|国有企业|senior_staff|高级职员|130096|195896|297372|420891|567592
salary_survey_scientific_research_technical_services|科学研究和技术服务业|state_owned|国有企业|general_staff|普通职员|75624|102586|143045|214098|288761
salary_survey_scientific_research_technical_services|科学研究和技术服务业|foreign|外资企业|senior_management|高级管理|565169|862371|1211652|1851907|2483776
salary_survey_scientific_research_technical_services|科学研究和技术服务业|foreign|外资企业|middle_manager|中层经理|285917|378611|658742|846536|1071062
salary_survey_scientific_research_technical_services|科学研究和技术服务业|foreign|外资企业|senior_staff|高级职员|167589|235564|374729|498409|633671
salary_survey_scientific_research_technical_services|科学研究和技术服务业|foreign|外资企业|general_staff|普通职员|85356|130889|181007|241471|307088
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_leading|民营龙头|senior_management|高级管理|387808|662531|1171788|1463598|1827441
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_leading|民营龙头|middle_manager|中层经理|230826|355575|612397|810997|1065917
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_leading|民营龙头|senior_staff|高级职员|147415|211022|360176|502019|627041
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_leading|民营龙头|general_staff|普通职员|84236|111735|155692|224977|296596
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_general|民营普通|senior_management|高级管理|311779|548517|942681|1190897|1440439
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_general|民营普通|middle_manager|中层经理|159741|255086|430311|583015|779041
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_general|民营普通|senior_staff|高级职员|107920|147163|252376|344962|444362
salary_survey_scientific_research_technical_services|科学研究和技术服务业|private_general|民营普通|general_staff|普通职员|58662|78368|111339|154106|202988
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|state_owned|国有企业|senior_management|高级管理|434083|677960|1035909|1230696|1565309
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|state_owned|国有企业|middle_manager|中层经理|202095|342698|491130|699629|919676
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|state_owned|国有企业|senior_staff|高级职员|138424|205172|306381|425379|551109
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|state_owned|国有企业|general_staff|普通职员|80059|100457|142678|218363|285441
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|foreign|外资企业|senior_management|高级管理|568977|845764|1259996|1843435|2387652
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|foreign|外资企业|middle_manager|中层经理|288211|378992|651732|870053|1100616
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|foreign|外资企业|senior_staff|高级职员|174808|235450|404815|500471|645871
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|foreign|外资企业|general_staff|普通职员|87770|130484|185018|237489|300395
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_leading|民营龙头|senior_management|高级管理|390948|667733|1159342|1454298|1915014
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_leading|民营龙头|middle_manager|中层经理|231703|347575|636300|822080|1075473
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_leading|民营龙头|senior_staff|高级职员|141264|210193|366672|494630|638158
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_leading|民营龙头|general_staff|普通职员|84224|116482|155946|219440|290632
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_general|民营普通|senior_management|高级管理|306126|526251|950032|1139350|1439416
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_general|民营普通|middle_manager|中层经理|162507|244941|448034|619765|787189
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_general|民营普通|senior_staff|高级职员|102229|154314|262429|339673|449011
salary_survey_water_environment_public_facilities|水利、环境和公共设施管理业|private_general|民营普通|general_staff|普通职员|64370|77678|115823|163238|214969
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|state_owned|国有企业|senior_management|高级管理|372079|593577|837252|1018464|1227383
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|state_owned|国有企业|middle_manager|中层经理|177312|273582|420572|564264|766294
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|state_owned|国有企业|senior_staff|高级职员|109734|171155|235989|335462|444514
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|state_owned|国有企业|general_staff|普通职员|68424|83061|122783|178253|232693
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|foreign|外资企业|senior_management|高级管理|488121|711358|1038640|1481475|2043289
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|foreign|外资企业|middle_manager|中层经理|236166|305693|564635|738647|906989
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|foreign|外资企业|senior_staff|高级职员|140799|193872|314946|414609|521966
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|foreign|外资企业|general_staff|普通职员|72322|104469|149799|200879|255753
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_leading|民营龙头|senior_management|高级管理|319528|544804|944965|1257338|1520013
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_leading|民营龙头|middle_manager|中层经理|180915|283813|524182|695007|914094
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_leading|民营龙头|senior_staff|高级职员|119159|177313|301928|419945|531937
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_leading|民营龙头|general_staff|普通职员|73441|90194|133493|182478|239947
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_general|民营普通|senior_management|高级管理|259129|443264|753136|958302|1269514
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_general|民营普通|middle_manager|中层经理|132314|203966|379273|516378|642320
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_general|民营普通|senior_staff|高级职员|84871|124298|206590|294967|384103
salary_survey_resident_repair_other_services|居民服务、修理和其他服务业|private_general|民营普通|general_staff|普通职员|51500|65854|94155|135138|177213
salary_survey_education_training|教育培训|state_owned|国有企业|senior_management|高级管理|451151|705970|1016633|1231655|1490255
salary_survey_education_training|教育培训|state_owned|国有企业|middle_manager|中层经理|205677|355385|491012|685217|938898
salary_survey_education_training|教育培训|state_owned|国有企业|senior_staff|高级职员|132602|206895|306856|427994|572724
salary_survey_education_training|教育培训|state_owned|国有企业|general_staff|普通职员|81639|106872|146116|214352|296805
salary_survey_education_training|教育培训|foreign|外资企业|senior_management|高级管理|558614|871165|1235084|1822820|2509057
salary_survey_education_training|教育培训|foreign|外资企业|middle_manager|中层经理|297803|397570|665284|832412|1091570
salary_survey_education_training|教育培训|foreign|外资企业|senior_staff|高级职员|181330|232905|397368|525177|665285
salary_survey_education_training|教育培训|foreign|外资企业|general_staff|普通职员|88464|131558|186484|242166|309757
salary_survey_education_training|教育培训|private_leading|民营龙头|senior_management|高级管理|395378|656196|1182986|1530441|1881020
salary_survey_education_training|教育培训|private_leading|民营龙头|middle_manager|中层经理|235558|354979|618798|850236|1066483
salary_survey_education_training|教育培训|private_leading|民营龙头|senior_staff|高级职员|146547|223204|362893|490130|657600
salary_survey_education_training|教育培训|private_leading|民营龙头|general_staff|普通职员|86996|109489|160794|231242|293800
salary_survey_education_training|教育培训|private_general|民营普通|senior_management|高级管理|308759|532270|941467|1219691|1527638
salary_survey_education_training|教育培训|private_general|民营普通|middle_manager|中层经理|164834|249253|442368|602402|778701
salary_survey_education_training|教育培训|private_general|民营普通|senior_staff|高级职员|105941|158218|265348|352193|475973
salary_survey_education_training|教育培训|private_general|民营普通|general_staff|普通职员|62057|78254|121996|160172|221493
salary_survey_health_social_work|卫生和社会工作|state_owned|国有企业|senior_management|高级管理|474799|740327|1005823|1241267|1549509
salary_survey_health_social_work|卫生和社会工作|state_owned|国有企业|middle_manager|中层经理|212370|342348|519911|730375|920259
salary_survey_health_social_work|卫生和社会工作|state_owned|国有企业|senior_staff|高级职员|134973|210360|314984|420035|556015
salary_survey_health_social_work|卫生和社会工作|state_owned|国有企业|general_staff|普通职员|78002|102068|148393|218193|290536
salary_survey_health_social_work|卫生和社会工作|foreign|外资企业|senior_management|高级管理|598364|861236|1223091|1848923|2553061
salary_survey_health_social_work|卫生和社会工作|foreign|外资企业|middle_manager|中层经理|285946|390150|690497|875233|1144181
salary_survey_health_social_work|卫生和社会工作|foreign|外资企业|senior_staff|高级职员|174053|245178|412736|519057|626888
salary_survey_health_social_work|卫生和社会工作|foreign|外资企业|general_staff|普通职员|92557|134953|186289|243748|318496
salary_survey_health_social_work|卫生和社会工作|private_leading|民营龙头|senior_management|高级管理|398545|667575|1205040|1498595|1842580
salary_survey_health_social_work|卫生和社会工作|private_leading|民营龙头|middle_manager|中层经理|240478|354513|648417|866367|1140998
salary_survey_health_social_work|卫生和社会工作|private_leading|民营龙头|senior_staff|高级职员|148829|218652|366528|499175|657452
salary_survey_health_social_work|卫生和社会工作|private_leading|民营龙头|general_staff|普通职员|90677|111825|166868|227185|296181
salary_survey_health_social_work|卫生和社会工作|private_general|民营普通|senior_management|高级管理|315326|531956|941935|1205681|1540504
salary_survey_health_social_work|卫生和社会工作|private_general|民营普通|middle_manager|中层经理|158765|264809|447169|603424|793846
salary_survey_health_social_work|卫生和社会工作|private_general|民营普通|senior_staff|高级职员|106719|155683|265684|359647|470792
salary_survey_health_social_work|卫生和社会工作|private_general|民营普通|general_staff|普通职员|58401|73962|103216|140971|188981
salary_survey_culture_media|文化传媒|state_owned|国有企业|senior_management|高级管理|402058|640417|895331|1146793|1364061
salary_survey_culture_media|文化传媒|state_owned|国有企业|middle_manager|中层经理|189161|316802|449582|627755|851545
salary_survey_culture_media|文化传媒|state_owned|国有企业|senior_staff|高级职员|121764|182828|264836|377115|499704
salary_survey_culture_media|文化传媒|state_owned|国有企业|general_staff|普通职员|72872|90380|133421|193922|261032
salary_survey_culture_media|文化传媒|foreign|外资企业|senior_management|高级管理|516030|805236|1108943|1664522|2339793
salary_survey_culture_media|文化传媒|foreign|外资企业|middle_manager|中层经理|259315|353679|608569|760812|1008226
salary_survey_culture_media|文化传媒|foreign|外资企业|senior_staff|高级职员|158023|211367|356909|462633|579309
salary_survey_culture_media|文化传媒|foreign|外资企业|general_staff|普通职员|80176|115574|167559|227296|288678
salary_survey_culture_media|文化传媒|private_leading|民营龙头|senior_management|高级管理|351523|606012|1072002|1351122|1654516
salary_survey_culture_media|文化传媒|private_leading|民营龙头|middle_manager|中层经理|201300|322380|572187|752247|985554
salary_survey_culture_media|文化传媒|private_leading|民营龙头|senior_staff|高级职员|136665|202363|325983|465713|595755
salary_survey_culture_media|文化传媒|private_leading|民营龙头|general_staff|普通职员|75713|105330|147033|202604|277038
salary_survey_culture_media|文化传媒|private_general|民营普通|senior_management|高级管理|283032|473054|836371|1032497|1305194
salary_survey_culture_media|文化传媒|private_general|民营普通|middle_manager|中层经理|143236|222524|413773|542433|713362
salary_survey_culture_media|文化传媒|private_general|民营普通|senior_staff|高级职员|93740|140638|227174|317823|423224
salary_survey_culture_media|文化传媒|private_general|民营普通|general_staff|普通职员|55982|72829|103491|136115|186877
salary_survey_film_television|影视|state_owned|国有企业|senior_management|高级管理|458330|767027|1062064|1309988|1604269
salary_survey_film_television|影视|state_owned|国有企业|middle_manager|中层经理|218222|361015|503407|714975|943419
salary_survey_film_television|影视|state_owned|国有企业|senior_staff|高级职员|141020|223389|307652|423706|569984
salary_survey_film_television|影视|state_owned|国有企业|general_staff|普通职员|82986|109468|150888|226126|295882
salary_survey_film_television|影视|foreign|外资企业|senior_management|高级管理|612830|919371|1329758|1898472|2542118
salary_survey_film_television|影视|foreign|外资企业|middle_manager|中层经理|298868|395656|701245|895285|1118915
salary_survey_film_television|影视|foreign|外资企业|senior_staff|高级职员|177025|248695|419536|523788|680659
salary_survey_film_television|影视|foreign|外资企业|general_staff|普通职员|94565|137025|187207|250064|314362
salary_survey_film_television|影视|private_leading|民营龙头|senior_management|高级管理|412281|697883|1210242|1590417|1889522
salary_survey_film_television|影视|private_leading|民营龙头|middle_manager|中层经理|232267|353273|646144|852726|1157688
salary_survey_film_television|影视|private_leading|民营龙头|senior_staff|高级职员|153011|229182|383563|523678|674262
salary_survey_film_television|影视|private_leading|民营龙头|general_staff|普通职员|90559|116509|164686|232936|304230
salary_survey_film_television|影视|private_general|民营普通|senior_management|高级管理|318930|551289|973952|1295109|1565409
salary_survey_film_television|影视|private_general|民营普通|middle_manager|中层经理|169269|266581|459269|615751|814416
salary_survey_film_television|影视|private_general|民营普通|senior_staff|高级职员|109760|165155|269270|369694|478415
salary_survey_film_television|影视|private_general|民营普通|general_staff|普通职员|65529|84125|123031|164660|219903
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|state_owned|国有企业|senior_management|高级管理|413602|640427|940646|1140678|1378355
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|state_owned|国有企业|middle_manager|中层经理|198148|313755|463378|642309|861218
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|state_owned|国有企业|senior_staff|高级职员|123514|189814|278290|381587|514219
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|state_owned|国有企业|general_staff|普通职员|75035|97078|139092|193884|263571
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|foreign|外资企业|senior_management|高级管理|532412|822255|1155272|1770826|2299707
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|foreign|外资企业|middle_manager|中层经理|257082|344671|645363|781691|999977
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|foreign|外资企业|senior_staff|高级职员|161781|222271|378472|483362|591894
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|foreign|外资企业|general_staff|普通职员|86466|121372|174817|235239|297883
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_leading|民营龙头|senior_management|高级管理|365656|636844|1072698|1399068|1724059
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_leading|民营龙头|middle_manager|中层经理|220806|331807|589483|806108|1066664
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_leading|民营龙头|senior_staff|高级职员|134940|196900|333040|456601|602729
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_leading|民营龙头|general_staff|普通职员|78569|103837|149876|212478|277063
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_general|民营普通|senior_management|高级管理|285975|497859|870337|1050760|1385916
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_general|民营普通|middle_manager|中层经理|144574|231164|426459|558771|749479
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_general|民营普通|senior_staff|高级职员|100646|142172|238244|322539|415203
salary_survey_public_management_social_security|公共管理、社会保障和社会组织|private_general|民营普通|general_staff|普通职员|59173|76685|109842|150132|194804
salary_survey_international_organizations|国际组织|state_owned|国有企业|senior_management|高级管理|450062|753032|1041957|1289976|1621734
salary_survey_international_organizations|国际组织|state_owned|国有企业|middle_manager|中层经理|220054|368995|534476|713923|945341
salary_survey_international_organizations|国际组织|state_owned|国有企业|senior_staff|高级职员|137207|218969|302380|421688|570661
salary_survey_international_organizations|国际组织|state_owned|国有企业|general_staff|普通职员|82205|106507|153905|224278|301725
salary_survey_international_organizations|国际组织|foreign|外资企业|senior_management|高级管理|620812|929324|1268105|1844142|2546477
salary_survey_international_organizations|国际组织|foreign|外资企业|middle_manager|中层经理|290860|400391|696594|907006|1142242
salary_survey_international_organizations|国际组织|foreign|外资企业|senior_staff|高级职员|180248|246385|407339|523043|656298
salary_survey_international_organizations|国际组织|foreign|外资企业|general_staff|普通职员|95420|137965|186602|247951|321054
salary_survey_international_organizations|国际组织|private_leading|民营龙头|senior_management|高级管理|390176|693080|1250901|1556731|2027263
salary_survey_international_organizations|国际组织|private_leading|民营龙头|middle_manager|中层经理|235381|367789|679441|889224|1171347
salary_survey_international_organizations|国际组织|private_leading|民营龙头|senior_staff|高级职员|152991|222402|379683|513650|674995
salary_survey_international_organizations|国际组织|private_leading|民营龙头|general_staff|普通职员|93116|120585|164258|235983|323370
salary_survey_international_organizations|国际组织|private_general|民营普通|senior_management|高级管理|325551|551792|986240|1240666|1508122
salary_survey_international_organizations|国际组织|private_general|民营普通|middle_manager|中层经理|168452|269120|473675|634039|814898
salary_survey_international_organizations|国际组织|private_general|民营普通|senior_staff|高级职员|110543|161312|277867|357454|456246
salary_survey_international_organizations|国际组织|private_general|民营普通|general_staff|普通职员|66603|82243|119298|163558|220410
`.trim();

export const industryPositionSalaryBenchmarks: IndustryPositionSalaryBenchmark[] = industryPositionSalaryCsv.split("\n").map((line) => {
  const [
    industryKey,
    industryName,
    enterpriseNature,
    enterpriseNatureName,
    jobLevel,
    jobLevelName,
    annualSalaryP10,
    annualSalaryP25,
    annualSalaryP50,
    annualSalaryP75,
    annualSalaryP90,
  ] = line.split("|");

  return {
    ...enterpriseSalarySurvey2026Meta,
    industryKey,
    industryName,
    enterpriseNature: enterpriseNature as EnterpriseNature,
    enterpriseNatureName,
    jobLevel: jobLevel as JobLevel,
    jobLevelName,
    annualSalaryP10: Number(annualSalaryP10),
    annualSalaryP25: Number(annualSalaryP25),
    annualSalaryP50: Number(annualSalaryP50),
    annualSalaryP75: Number(annualSalaryP75),
    annualSalaryP90: Number(annualSalaryP90),
  };
});

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
