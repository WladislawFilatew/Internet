import React, {useContext, useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { Line, Chart } from "react-chartjs-2";
import "chart.js/auto";
import { getGraf } from "../http/mainerAPI";
import { useParams } from 'react-router-dom';
import { Context } from "../index";
import { observer } from "mobx-react-lite";



const Graf = observer(() => {
    const {graf} = useContext(Context)
    const profit = []
    const expend = []
    const time = []
    const cost = []
    const {id} = useParams()

    useEffect(()=>{
      getGraf(id).then(data => {
        for (var index = 0; index < data.length; ++index) {
          profit.push(data[index].profit)
          expend.push(data[index].expend)
          time.push(data[index].createdAt)
          cost.push(data[index].profit - data[index].expend)
        }
        graf.setProfit(profit)
        graf.setExpend(expend)
        graf.setTime(time)
        graf.setCost(cost)
      })
    }, [])
    
    const lineChartData = {
        labels: graf.time,
        datasets: [
          {
            data: graf.profit,
            label: "Доход",
            borderColor: "#3333ff",
            backgroundColor: "#3333ff",
            lineTension: 0.5
          },
          {
            data: graf.expend,
            label: "Расход",
            borderColor: "#ff3333",
            backgroundColor: "#ff3333",
            lineTension: 0.5
          },
          {
            data: graf.cost,
            label: "Прибыль",
            borderColor: "#0DFC00",
            backgroundColor: "#0DFC00",
            lineTension: 0.5
          }
        ]
      };

    return (
        <div style={{marginTop: 100}}>
            <Card>
              <Line
                type="line"
                options={{
                  title: {
                  display: true,
                  text: "График работы машины:",
                  fontSize: 20
                },
                  legend: {
                  display: true, //Is the legend shown?
                  position: "top" //Position of the legend.
                }
                }}
                data={lineChartData}
              />
            </Card>
        </div>
    )
})

export default Graf;