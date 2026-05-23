"use client";

import { AlertTriangle, BarChart3, BriefcaseBusiness, ChevronRight, Gauge, LineChart, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { cityBenchmarks, industryBenchmarks, roleBenchmarks } from "@/data/job-market";
import {
  calculateJobScore,
  defaultInputs,
  dimensionLabels,
  type Certainty,
  type CityKey,
  type CompanySize,
  type HealthImpact,
  type IndustryKey,
  type InputMode,
  type JobInputs,
  type OfferParity,
  type RoleKey,
  type TriState,
  type WeekendWork,
} from "@/lib/job-scoring";

const scoreOptions = [1, 2, 3, 4, 5];

function formatMoney(value: number) {
  if (value >= 10000) return `${Math.round(value / 10000)} 万`;
  return value.toLocaleString("zh-CN");
}

function NumberField({
  label,
  value,
  suffix,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <input
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-stone-950 outline-none"
          min={min}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix ? <span className="flex items-center bg-stone-100 px-3 text-sm text-stone-500">{suffix}</span> : null}
      </div>
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
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <select
        className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-semibold text-stone-950 shadow-sm outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
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
  onChange,
}: {
  label: string;
  value: number;
  low: string;
  high: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-stone-700">{label}</span>
        <span className="text-xs text-stone-500">
          {low} / {high}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {scoreOptions.map((score) => (
          <button
            className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${
              value === score
                ? "border-emerald-900 bg-emerald-900 text-white shadow-sm"
                : "border-stone-200 bg-white text-stone-600 hover:border-emerald-300"
            }`}
            key={score}
            type="button"
            onClick={() => onChange(score)}
          >
            {score}
          </button>
        ))}
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
  const size = 300;
  const center = size / 2;
  const radius = 108;
  const points = values.map((item, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
    const itemRadius = (item.value / 100) * radius;
    return {
      ...item,
      x: center + Math.cos(angle) * itemRadius,
      y: center + Math.sin(angle) * itemRadius,
      labelX: center + Math.cos(angle) * (radius + 26),
      labelY: center + Math.sin(angle) * (radius + 26),
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <svg className="h-auto w-full max-w-[360px]" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="六维雷达图">
      {[0.25, 0.5, 0.75, 1].map((level) => {
        const ring = values
          .map((_, index) => {
            const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
            return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
          })
          .join(" ");
        return <polygon className="fill-none stroke-stone-200" key={level} points={ring} />;
      })}
      {points.map((point) => (
        <line className="stroke-stone-200" key={point.label} x1={center} x2={point.axisX} y1={center} y2={point.axisY} />
      ))}
      <polygon className="fill-emerald-500/25 stroke-emerald-800 stroke-2" points={polygon} />
      {points.map((point) => (
        <g key={point.label}>
          <circle className="fill-emerald-900" cx={point.x} cy={point.y} r="4" />
          <text
            className="fill-stone-700 text-[10px] font-bold"
            textAnchor={point.labelX < center - 8 ? "end" : point.labelX > center + 8 ? "start" : "middle"}
            x={point.labelX}
            y={point.labelY}
          >
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function JobCalculator() {
  const [inputs, setInputs] = useState<JobInputs>(defaultInputs);
  const result = calculateJobScore(inputs);
  const setValue = <K extends keyof JobInputs>(key: K, value: JobInputs[K]) => {
    setInputs((current) => ({ ...current, [key]: value }));
  };
  const radarValues = Object.entries(result.dimensions).map(([key, value]) => ({
    label: dimensionLabels[key as keyof typeof dimensionLabels],
    value,
  }));

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4efe4] text-stone-950">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:px-8">
        <div className="space-y-6">
          <header className="rounded-[2.5rem] border border-stone-900/10 bg-stone-950 p-7 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">
                <BriefcaseBusiness className="h-4 w-4" />
                Job Asset Calculator
              </div>
              <div className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-black text-stone-950">
                本地计算，不上传数据
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_220px]">
              <div>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">工作资产自动评分程序</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300">
                  把一份工作当作人力资本资产，综合当前收益、稳定性、持有成本、职业成长、流动性和个人匹配度，输出总分、评级、雷达图和行动建议。
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-4 text-stone-950">
                <p className="text-sm font-bold text-stone-500">当前评级</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-7xl font-black leading-none">{result.rating.grade}</span>
                  <span className="pb-2 text-lg font-black">{result.rating.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">{result.rating.description}</p>
              </div>
            </div>
          </header>

          <section className="rounded-[2rem] border border-stone-200 bg-white/80 p-3 shadow-sm backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["brief", "简略模式", "快速评估，使用城市与全国基准"],
                ["detailed", "详细模式", "补充背景、行业、岗位和风险字段"],
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
                  <p className="text-lg font-black">{title}</p>
                  <p className={`mt-1 text-sm ${inputs.mode === mode ? "text-emerald-100" : "text-stone-500"}`}>
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <Section eyebrow="01 / basic" title="基础坐标与收益">
            <SelectField
              label="所在城市"
              options={Object.entries(cityBenchmarks).map(([value, item]) => ({ value: value as CityKey, label: item.label }))}
              value={inputs.city}
              onChange={(value) => setValue("city", value)}
            />
            <NumberField label="税后到手年收入" suffix="元/年" value={inputs.afterTaxIncome} onChange={(value) => setValue("afterTaxIncome", value)} />
            <SelectField<Certainty>
              label="奖金确定性"
              options={[
                { value: "high", label: "高" },
                { value: "medium", label: "中" },
                { value: "low", label: "低" },
                { value: "unknown", label: "不清楚" },
              ]}
              value={inputs.bonusCertainty}
              onChange={(value) => setValue("bonusCertainty", value)}
            />
            <RatingField label="未来 1-2 年涨薪空间" low="低" high="高" value={inputs.raisePotential} onChange={(value) => setValue("raisePotential", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <NumberField label="税前年包" suffix="元/年" value={inputs.preTaxPackage} onChange={(value) => setValue("preTaxPackage", value)} />
                <NumberField label="固定工资占比" suffix="%" value={inputs.fixedPayRatio} onChange={(value) => setValue("fixedPayRatio", value)} />
                <NumberField label="福利价值" suffix="元/年" value={inputs.benefitsValue} onChange={(value) => setValue("benefitsValue", value)} />
                <NumberField label="年龄" suffix="岁" value={inputs.age} onChange={(value) => setValue("age", value)} />
                <NumberField label="工作年限" suffix="年" value={inputs.experienceYears} onChange={(value) => setValue("experienceYears", value)} />
                <SelectField
                  label="行业"
                  options={Object.entries(industryBenchmarks).map(([value, item]) => ({ value: value as IndustryKey, label: item.label }))}
                  value={inputs.industry}
                  onChange={(value) => setValue("industry", value)}
                />
                <SelectField
                  label="岗位"
                  options={Object.entries(roleBenchmarks).map(([value, item]) => ({ value: value as RoleKey, label: item.label }))}
                  value={inputs.role}
                  onChange={(value) => setValue("role", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="02 / cost" title="持有成本">
            <NumberField label="每周实际工作小时数" suffix="小时" value={inputs.weeklyHours} onChange={(value) => setValue("weeklyHours", value)} />
            <NumberField label="通勤单程时间" suffix="分钟" value={inputs.commuteMinutes} onChange={(value) => setValue("commuteMinutes", value)} />
            <RatingField label="工作压力" low="压力大" high="从容" value={inputs.stress} onChange={(value) => setValue("stress", value)} />
            <SelectField<WeekendWork>
              label="是否经常周末工作"
              options={[
                { value: "never", label: "从不" },
                { value: "sometimes", label: "偶尔" },
                { value: "often", label: "经常" },
              ]}
              value={inputs.weekendWork}
              onChange={(value) => setValue("weekendWork", value)}
            />
            {inputs.mode === "detailed" ? (
              <>
                <RatingField label="工作氛围" low="消耗" high="舒服" value={inputs.atmosphere} onChange={(value) => setValue("atmosphere", value)} />
                <RatingField label="老板同事正常程度" low="不正常" high="正常" value={inputs.peopleHealth} onChange={(value) => setValue("peopleHealth", value)} />
                <SelectField<HealthImpact>
                  label="健康影响"
                  options={[
                    { value: "none", label: "无" },
                    { value: "minor", label: "轻微" },
                    { value: "clear", label: "明显" },
                    { value: "severe", label: "严重" },
                  ]}
                  value={inputs.healthImpact}
                  onChange={(value) => setValue("healthImpact", value)}
                />
                <SelectField<TriState>
                  label="是否有时间学习和生活"
                  options={[
                    { value: "yes", label: "是" },
                    { value: "average", label: "一般" },
                    { value: "no", label: "否" },
                  ]}
                  value={inputs.lifeAndLearningTime}
                  onChange={(value) => setValue("lifeAndLearningTime", value)}
                />
              </>
            ) : null}
          </Section>

          <Section eyebrow="03 / risk & upside" title="稳定性、成长和流动性">
            <RatingField label="未来一年安全感" low="不安全" high="很安全" value={inputs.safetyFeeling} onChange={(value) => setValue("safetyFeeling", value)} />
            <RatingField label="过去半年成长" low="停滞" high="变强很多" value={inputs.pastGrowth} onChange={(value) => setValue("pastGrowth", value)} />
            <RatingField label="未来一年成长预期" low="有限" high="空间大" value={inputs.futureGrowth} onChange={(value) => setValue("futureGrowth", value)} />
            <RatingField label="最近外部机会情况" low="很少" high="很多" value={inputs.externalOpportunities} onChange={(value) => setValue("externalOpportunities", value)} />
            <SelectField
              label="外部机会是否验证"
              options={[
                { value: "false", label: "未知 / 未验证" },
                { value: "true", label: "已通过投递或沟通验证" },
              ]}
              value={String(inputs.externalKnown)}
              onChange={(value) => setValue("externalKnown", value === "true")}
            />
            <RatingField label="个人匹配度 / 长期目标符合度" low="不适合" high="很匹配" value={inputs.longTermFit} onChange={(value) => setValue("longTermFit", value)} />
            {inputs.mode === "detailed" ? (
              <>
                <SelectField<CompanySize>
                  label="公司规模"
                  options={[
                    { value: "large", label: "大公司 / 平台型" },
                    { value: "medium", label: "中型公司" },
                    { value: "small", label: "小公司" },
                    { value: "startup", label: "早期团队" },
                  ]}
                  value={inputs.companySize}
                  onChange={(value) => setValue("companySize", value)}
                />
                <RatingField label="岗位核心度" low="边缘" high="核心" value={inputs.roleCore} onChange={(value) => setValue("roleCore", value)} />
                <RatingField label="能力通用性" low="公司专用" high="高度通用" value={inputs.skillGenerality} onChange={(value) => setValue("skillGenerality", value)} />
                <RatingField label="高质量项目" low="少" high="多" value={inputs.qualityProjects} onChange={(value) => setValue("qualityProjects", value)} />
                <RatingField label="简历项目可表达性" low="难讲" high="好讲" value={inputs.projectExplainability} onChange={(value) => setValue("projectExplainability", value)} />
                <RatingField label="外部 JD 匹配度" low="低" high="高" value={inputs.jdMatch} onChange={(value) => setValue("jdMatch", value)} />
                <SelectField<OfferParity>
                  label="能否拿到接近当前收入 offer"
                  options={[
                    { value: "high", label: "高" },
                    { value: "medium", label: "中" },
                    { value: "low", label: "低" },
                    { value: "unknown", label: "未知" },
                  ]}
                  value={inputs.offerParity}
                  onChange={(value) => setValue("offerParity", value)}
                />
                <RatingField label="是否喜欢当前工作内容" low="不喜欢" high="喜欢" value={inputs.contentLove} onChange={(value) => setValue("contentLove", value)} />
              </>
            ) : null}
          </Section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-4 rounded-[2.5rem] border border-stone-900/10 bg-white p-5 shadow-2xl">
            <div className="rounded-[2rem] bg-stone-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-300">总得分</span>
                <Gauge className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-7xl font-black leading-none">{result.total}</span>
                <span className="pb-2 text-xl font-bold text-stone-300">/ 100</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                {result.rating.grade} 档：{result.rating.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-emerald-50 p-4">
                <BarChart3 className="mb-3 h-5 w-5 text-emerald-800" />
                <p className="text-xs font-bold text-emerald-900">收益评分</p>
                <p className="mt-1 text-3xl font-black">{result.dimensions.income}</p>
              </div>
              <div className="rounded-3xl bg-amber-50 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-amber-800" />
                <p className="text-xs font-bold text-amber-900">持有友好度</p>
                <p className="mt-1 text-3xl font-black">{result.dimensions.holding}</p>
              </div>
            </div>

            <div className="flex justify-center rounded-[2rem] bg-stone-50 p-3">
              <RadarChart values={radarValues} />
            </div>

            <div className="grid gap-2">
              {Object.entries(result.dimensions).map(([key, score]) => (
                <div className="grid grid-cols-[92px_1fr_38px] items-center gap-3" key={key}>
                  <span className="text-sm font-bold text-stone-700">{dimensionLabels[key as keyof typeof dimensionLabels]}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-emerald-800" style={{ width: `${score}%` }} />
                  </div>
                  <span className="text-right text-sm font-black">{score}</span>
                </div>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-stone-200 p-4">
              <div className="flex items-center gap-2 text-sm font-black">
                <LineChart className="h-4 w-4 text-emerald-800" />
                资产摘要
              </div>
              <div className="mt-3 grid gap-2 text-sm leading-6 text-stone-600">
                <p>最大优势：{result.strengths.join("、")}。</p>
                <p>最大短板：{result.weaknesses.join("、")}。</p>
                <p>未来选择权分：{result.optionValue} / 100。</p>
                <p>
                  收入基准约 {formatMoney(result.benchmarkIncome)}，当前约为基准 {result.incomeRatio} 倍；单位时间收入约{" "}
                  {result.unitHourlyIncome.toLocaleString("zh-CN")} 元/小时。
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-orange-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-orange-950">
                <AlertTriangle className="h-4 w-4" />
                短板预警
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

            <div className="rounded-[1.5rem] bg-stone-50 p-4">
              <p className="text-sm font-black">建议</p>
              <div className="mt-3 space-y-2">
                {result.suggestions.map((suggestion) => (
                  <p className="text-sm leading-6 text-stone-600" key={suggestion}>
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>

            <details className="rounded-[1.5rem] border border-stone-200 p-4">
              <summary className="cursor-pointer text-sm font-black">数据置信度与口径</summary>
              <div className="mt-3 space-y-3 text-sm leading-6 text-stone-600">
                {Object.entries(result.confidence).map(([key, item]) => (
                  <p key={key}>
                    <span className="font-bold text-stone-950">{dimensionLabels[key as keyof typeof dimensionLabels]}：</span>
                    置信度{item.level}，{item.reason}
                  </p>
                ))}
                {result.dataNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </details>
          </div>
        </aside>
      </div>
    </main>
  );
}
