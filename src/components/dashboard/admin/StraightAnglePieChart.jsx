"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

// charts er slicegular jonno color palate 
const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#EB5566", "#8B6666"];

export default function StraightAnglePieChart({ chartData = [] }) {


    return (
        <div className="w-full mt-8 h-80 rounded-2xl border p-5 bg-[#131B2E] border-slate-800 flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2 self-start">
                Genre Distribution
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={chartData}
                        cx="50%"
                        cy="70%"
                        outerRadius={100}
                        paddingAngle={4}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: "#0B0F17", borderColor: "#334155", borderRadius: "8px", color: "#fff" }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}