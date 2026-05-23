"use client";

import { ArrowRight, BriefcaseBusiness, Calculator, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const features = [
  ["Same stack", "Next.js 15, React 19, TypeScript, Tailwind CSS, and Lucide are ready.", Calculator],
  ["UI foundation", "A lightweight shadcn-style component layer is in place for buttons, cards, badges, and inputs.", Layers3],
  ["Ready to extend", "Replace this starter screen with your own calculator flow, forms, charts, and sharing logic.", Sparkles],
] as const;

export default function JobCalculator() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <section className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary">Starter Project</Badge>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Job Calculator</h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                This project now has the recommended UI baseline for your stack: Lucide icons plus a small
                shadcn-style component layer that you can keep extending without fighting the design system.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map(([title, description, Icon]) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Card className="self-start">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-white">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <CardTitle>First Screen Placeholder</CardTitle>
            <CardDescription>
              Use this panel as the seed for your first calculator form. The controls below are intentionally basic
              but production-usable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-700">
                Calculator name
              </label>
              <Input id="title" defaultValue="Job Calculator" />
            </div>
            <div className="space-y-2">
              <label htmlFor="audience" className="text-sm font-medium text-slate-700">
                Target audience
              </label>
              <Input id="audience" placeholder="Candidates, employees, freelancers..." />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button>Start building</Button>
              <Button variant="outline">
                View components
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
