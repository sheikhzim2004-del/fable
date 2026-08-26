"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// dashboard er theme color plate
const colors = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6", "#14B8A6", "#F43F5E", "#A855F7", "#6366F1", "#22C55E"];

// trayangel bar shep creat function 
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { x, y, width, height, index } = props;
    const color = colors[index % colors.length];

    return (
        <path
            d={getPath(Number(x), Number(y), Number(width), Number(height))}
            stroke={color}
            fill={color}
            className="transition-all duration-300 hover:opacity-80"
        />
    );
};

export default function MonthlySalesBarChart({ monthlySalesData: data = [] }) {
    return (
        <div className="w-full h-80 mt-8 rounded-2xl border p-5 bg-[#131B2E] border-slate-800 flex flex-col justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Monthly Sales Overview
            </h3>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#64748B"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                            contentStyle={{
                                backgroundColor: "#0B0F17",
                                borderColor: "#334155",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                            formatter={(value) => [`$${value}`, "Sales"]}
                        />
                        <Bar
                            dataKey="sales"
                            shape={<TriangleBar />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}