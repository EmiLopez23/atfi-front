import { SimulationData } from '@/types/api'
import ReactECharts from 'echarts-for-react'
import styles from './simulation.module.scss'
import { useState } from 'react'
interface Props {
  data: SimulationData[]
}

export default function SimulationPanel({ data }: Props) {
  const formatNumber = (number: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(number))

  const [campaignYear, setCampaignYear] = useState(2024)

  const project = data.find((d) => d.year === campaignYear)

  if (!project) {
    return <h4>No hay datos para el año seleccionado</h4>
  }

  const {
    costs,
    funds,
    grossMarginPerHectare,
    investedHectares,
    investment,
    returnPercentage,
    totalCostPerHectare,
    totalGrossMargin
  } = project

  // @ts-ignore
  const isPositiveReturn = returnPercentage > 0
  // @ts-ignore
  const calculatedReturn = investment * (returnPercentage / 100)

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div
          className={`${styles.card} ${
            isPositiveReturn ? styles.up : styles.down
          }`}
        >
          <h4>Retorno:</h4>
          <p>{returnPercentage.toFixed(2)}%</p>
          <small>
            {formatNumber(investment + calculatedReturn)} (
            <span>
              {isPositiveReturn ? '+' : '-'}
              {formatNumber(calculatedReturn)}
            </span>
            )
          </small>
        </div>
        <div className={styles.card}>
          <h4>Fondos requeridos para la campaña:</h4>
          <p>{formatNumber(funds)}</p>
        </div>
        <div className={styles.card}>
          <h4>Costo total por hectárea:</h4>
          <p>{formatNumber(totalCostPerHectare)}</p>
        </div>
        <div className={styles.card}>
          <h4>Hectáreas invertidas:</h4>
          <p>{Math.abs(investedHectares).toFixed(2)}ha</p>
        </div>

        <div className={styles.card}>
          <h4>Margen Bruto por hectárea:</h4>
          <p>{formatNumber(grossMarginPerHectare)}</p>
        </div>
        <div className={styles.card}>
          <h4>Margen Bruto total:</h4>
          <p>{formatNumber(totalGrossMargin)}</p>
        </div>
      </div>
      <CostGraph
        data={costs.map((cost) => ({
          value: cost.value,
          name: cost.costName
        }))}
      />
    </div>
  )
}

const CostGraph = ({ data }: { data: { value: number; name: string }[] }) => {
  const options = {
    title: {
      text: 'Costos de producción',
      subtext: 'Agrupados por tipo',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 0
    },
    series: [
      {
        name: 'Tipo de Costo (U$S/ha)',
        type: 'pie',
        radius: '50%',
        data: data,
        color: [
          '#0f3d28', // Mucho más oscuro que #1c5739
          '#1c5739', // Color base
          '#2d7a51', // Lighter Green
          '#A5D6A7', // Pale Green
          '#C8E6C9', // Very Light Green
          '#34a968'
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  return (
    <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
  )
}
