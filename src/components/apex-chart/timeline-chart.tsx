"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/** TimeLineChart 데이터입니다. */
interface TimeLineChartProps {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  width: number;
  height: number;
  options?: ApexOptions;
  series?: ApexOptions["series"];
}

/** timeline chart입니다. */
const TimeLineChart = ({ type, width, height, options, series }: TimeLineChartProps) => {
  return <ApexChart type={type} options={options} series={series} height={height} width={width} />;
};

export default TimeLineChart;
