// chartUtils.ts

import { ChartOptions } from "chart.js";

// Helper function to truncate label for mobile views
export const truncateLabel = (label: string | number | undefined, maxLength: number) => {
    const labelString = label != null ? String(label) : '';

    return labelString.length > maxLength ? `${labelString.slice(0, maxLength)}...` : labelString;
};

export const mobileAdChartDataAndOptions = (
    chartData: {
        labels: string[];
        clicksData: number[];
        impressionsData?: number[];
        ctrData?: number[];
    },
    theme: any,
    isMobile: boolean
) => {
    const labels = chartData?.labels.map((label) =>
        label
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: "CTR (%)",
                data: chartData?.ctrData || [],
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderColor: theme.palette.text.disabled,
                borderWidth: 2,
                type: "line",
                fill: false,
                tension: 0.4,
                yAxisID: "y2",
            },
            {
                label: "Impressions",
                data: chartData?.impressionsData,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                borderRadius: 5,
                type: "bar", // Bar chart for clicks
            },
        ],
    };

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                font: {
                    size: 44,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme.palette.text.primary,
                    callback: function (value) {
                        const label = labels[value as number];
                        return isMobile ? truncateLabel(label, 3) : label;
                    },
                },
                grid: {
                    display: false,
                    color: theme.palette.divider,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: theme.palette.text.primary,
                    callback: function (value: any) {
                        return isMobile ? truncateLabel(value, 3) : value;
                    },
                },
                grid: {
                    display: false,
                    color: theme.palette.divider,
                },
                position: "left",
            },
            y2: {
                // Secondary Y-axis for CTR
                position: "right",
                ticks: {
                    color: theme.palette.text.primary,
                    callback: function (value) {
                        return `${value}%`; // Display % for CTR
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return { data, options };
};
