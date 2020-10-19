import React, { useRef, useEffect } from "react";
import classes from "./index.module.scss";
import Chart from "chart.js"
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const Visual = (props) => {
    const ref = useRef();
    const {data, years} = props;
    const draw = () => {
        
        const datasets = [];
        const labels = [];
        if (ref.current.children) {
            [...ref.current.children].forEach(child => ref.current.removeChild(child));
        }

        const canvas = document.createElement("canvas");
              canvas.className = classes.canvas;

        ref.current.appendChild(canvas);
        const ctx = canvas.getContext("2d");

        const colors = ['#2196F3', '#E4572E', '#29335C', '#F3A712', '#A8C686'];

        years.forEach((year, index) => {
            const dt = [];
            data[year].forEach (
                dayInfo => {
                    const {eto, mm, dd} = dayInfo;
                    if (mm === 2 && dd === 29) {
                        return;
                    }
                    if (index === 0) {
                        labels.push(`${dd}-${months[mm-1]}`);
                    }
                    dt.push(eto);
                }
            );

            datasets.push({
                label: year,
                data: dt,
                borderColor: [colors[index % colors.length]],
                pointBorderColor: [colors[index % colors.length]],
                borderWidth: 1.2,
                backgroundColor: ['transparent']
            });
            
        });

    


        const options = {
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 24.1
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false,
            responsive: true
        };

        const chart = new Chart(ctx, {
            type: 'line',
            data : {
                labels,
                datasets
            },
            options
        });
        
        void(chart);  
    }

    useEffect (() => {
        draw();
    })


    return <div className={classes.visual} >
        <div className={classes.container} ref={ref} ><canvas  className={classes.canvas} ></canvas></div>
    </div>;
}