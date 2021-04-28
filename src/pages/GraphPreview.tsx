import React, { useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Chart, ChartData, ChartDataset, ChartOptions, registerables} from 'chart.js';
import { iDataProps } from './GetData';
import { months } from 'Months';
import { colors, getHighConstrastColors, hexColorToRGBA } from 'colors';
import { shuffle, ucFirst } from 'goodAlgorithms';



export const GraphView = (props: iGraphPreview) => {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!props.data) {
            return;
        }
        const data = createDatasets(props.data, props.monthlyLabel);
        draw(ref, data, props.title || '');
    }, [props]);

    return  <CanvasContainer  ><CanvasEle ref={ref} ></CanvasEle></CanvasContainer>
}

const draw = (function () {
    (window as any).OurChart = null;
    Chart.register(...registerables);

    return (ref: React.RefObject<HTMLCanvasElement>, data: ChartData, title: string) => {

        if (ref.current === null) {
            return;
        }

        const ctx = ref.current.getContext("2d");

        if (ctx === null) {
            return;
        }

        ctx.clearRect(0, 0, ref.current.width, ref.current.height);

        if (!ctx) {
            return;
        }

        if ((window as any).OurChart !== null) {
            (window as any).OurChart.destroy();
        }
        if (graphOptions.plugins && graphOptions.plugins.title) {
            graphOptions.plugins.title.text = title;
        }
        
        (window as any).OurChart = new Chart(ctx, {
            type: 'line',
            data,
            options: graphOptions
        });
        
        
    }
    }()
)


const createDatasets = (data: iData, monthlyLabel: boolean) : ChartData => {
    const datasets: ChartDataset[] = [];
    const labels: string[] = [];

    const newColors = shuffle(getHighConstrastColors());

    Object.keys(data).forEach((year: string, index: number) => {
        const dt: number[] = [];
        data[year].forEach (
            (dayInfo: iDataProps) => {
                const {ETO, MM, DD} = dayInfo;
                if (MM === 2 && DD === 29) {
                    return;
                }
                if (index === 0) {
                    const label: string = monthlyLabel ? ucFirst(months[MM-1]) : DD.toString();
                    labels.push(label);
                    //labels.push(`${months[MM-1]}`);
                }
                dt.push(ETO ? ETO : 0);
            }
        );
        const color = newColors[index % newColors.length];
        datasets.push({
            label: year.toString(),
            data: dt,
            pointBorderColor: [color],
            pointBackgroundColor: [color],
            pointHoverBorderColor: [ colors.primary ],
            pointHoverBackgroundColor: [ colors.primary ],
            pointHoverRadius: 5,
            borderWidth: 1.4,
            backgroundColor: [hexColorToRGBA(color, 20)],
            fill: true
        });
        
    });

    return {labels, datasets};


};

const graphOptions: ChartOptions = {
    elements: {
        point: {
            radius: 3
        },
        line: {
            tension: 0.5,
            borderWidth: 1
        }
    },
    scales: {
        /*x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 24.1
            }
        },
        y: {
            ticks: {
                beginAtZero: true
            }
        }*/
        y: {
            title: {
                display: true,
                text: 'ETO'
            },
            ticks: {
                autoSkip: true,
            }
        },
        x: {
            title: {
                display: true,
                text: 'Days'
            },
            grid: {
                display: true
            }
            ,
            ticks: {
                autoSkip: true,
                maxTicksLimit: 12
            }
        }
    },
    plugins: {
        title: {
            display: true,
        }
    },
    maintainAspectRatio: false,
    responsive: true,
};

interface iData {
    [key: string] : iDataProps[]
}

export interface iGraphPreview {
    data?: iData;
    title?: string;
    monthlyLabel: boolean;
}


const CanvasContainer = styled.div`
    position: relative;
    height: 100%;
`

const CanvasEle = styled.canvas`

`