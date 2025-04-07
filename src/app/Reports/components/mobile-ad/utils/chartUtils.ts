import { ChartOptions } from "chart.js";

// Helper function to truncate label for mobile views
export const truncateLabel = (label: string | number | undefined, maxLength: number) => {
    if (label == null) return '';
    const labelString = String(label);
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
    const labels = chartData?.labels ?? [];

    const datasets: any = [
        {
            label: "Impressions",
            data: chartData?.impressionsData ?? [],
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            borderRadius: 5,
            type: "bar",
        },
    ];

    const hasCTRData = chartData?.ctrData && chartData.ctrData.length > 0;

    if (hasCTRData) {
        datasets.unshift({
            label: "CTR (%)",
            data: chartData.ctrData,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: theme.palette.text.disabled,
            borderWidth: 2,
            type: "line",
            fill: false,
            tension: 0.4,
            yAxisID: "y2",
        });
    }

    const data = {
        labels,
        datasets,
    };

    const options: any = {
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
                    callback: function (value: any) {
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
            ...(hasCTRData ? {
                y2: {
                    position: "right",
                    ticks: {
                        color: theme.palette.text.primary,
                        callback: function (value: number) {
                            return `${value}%`;
                        },
                    },
                    grid: {
                        display: false,
                    },
                },
            } : {}),
        },
    };

    return { data, options };
};

export const attributionChartDataAndOptions = (
    chartData: {
        labels: string[];
        attributeData?: number[];
    },
    theme: any,
    isMobile: boolean,
    chartColor?: string,
    percentageVal?: boolean
) => {
    const labels = chartData?.labels ?? [];

    const data = {
        labels,
        datasets: [
            {
                label: "Attribute",
                data: chartData?.attributeData ?? [],
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderRadius: 5,
                type: "bar",
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
                display: false,
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
                        return isMobile ? truncateLabel(value, 3) : percentageVal ? `${value}%` : value;
                    },
                },
                grid: {
                    display: false,
                    color: theme.palette.divider,
                },
                position: "left",
            },
        },
    };

    return { data, options };

}
