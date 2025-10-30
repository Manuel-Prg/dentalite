"use client"

interface BarChartData {
  day: string
  citas: number
}

export function CustomBarChart({ data }: { data: BarChartData[] }) {
  const maxValue = Math.max(...data.map((d) => d.citas))

  return (
    <div className="w-full h-[250px] flex items-end justify-around gap-2 px-4">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full flex items-end justify-center" style={{ height: "200px" }}>
            <div
              className="w-full bg-linear-to-t from-primary to-blue-400 rounded-t-lg transition-all duration-500 hover:opacity-80 relative group"
              style={{
                height: `${(item.citas / maxValue) * 100}%`,
                minHeight: "20px",
              }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.citas}
              </span>
            </div>
          </div>
          <span className="text-sm text-slate-600 font-medium">{item.day}</span>
        </div>
      ))}
    </div>
  )
}

interface LineChartData {
  mes: string
  ingresos: number
}

export function CustomLineChart({ data }: { data: LineChartData[] }) {
  const maxValue = Math.max(...data.map((d) => d.ingresos))
  const minValue = Math.min(...data.map((d) => d.ingresos))
  const range = maxValue - minValue

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((item.ingresos - minValue) / range) * 80
    return { x, y, value: item.ingresos, label: item.mes }
  })

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <div className="w-full h-[250px] relative">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.2" />
        ))}

        {/* Line */}
        <path d={pathD} fill="none" stroke="#10b981" strokeWidth="0.8" className="animate-fade-in" />

        {/* Area under line */}
        <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#lineGradient)" opacity="0.2" className="animate-fade-in" />

        {/* Points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="1.5" fill="#10b981" className="hover:r-2 transition-all" />
            <circle cx={point.x} cy={point.y} r="0.8" fill="white" />
          </g>
        ))}

        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
        {data.map((item, index) => (
          <span key={index} className="text-xs text-slate-600">
            {item.mes}
          </span>
        ))}
      </div>

      {/* Hover tooltips */}
      <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
        {points.map((point, index) => (
          <div key={index} className="flex-1 h-full relative group">
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <p className="text-xs font-semibold text-slate-900">${point.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PieChartData {
  name: string
  value: number
  color: string
}

export function CustomPieChart({ data }: { data: PieChartData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const innerRadius = 60
    const outerRadius = 80

    const x1 = 100 + innerRadius * Math.cos(startRad)
    const y1 = 100 + innerRadius * Math.sin(startRad)
    const x2 = 100 + outerRadius * Math.cos(startRad)
    const y2 = 100 + outerRadius * Math.sin(startRad)
    const x3 = 100 + outerRadius * Math.cos(endRad)
    const y3 = 100 + outerRadius * Math.sin(endRad)
    const x4 = 100 + innerRadius * Math.cos(endRad)
    const y4 = 100 + innerRadius * Math.sin(endRad)

    const largeArc = angle > 180 ? 1 : 0

    const pathD = `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
      Z
    `

    return {
      ...item,
      pathD,
      percentage,
    }
  })

  return (
    <div className="w-full h-[250px] flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full max-w-[250px]">
        {slices.map((slice, index) => (
          <g key={index} className="group cursor-pointer">
            <path
              d={slice.pathD}
              fill={slice.color}
              className="transition-all duration-300 hover:opacity-80"
              style={{
                transformOrigin: "100px 100px",
              }}
            />
            <title>
              {slice.name}: {slice.value}%
            </title>
          </g>
        ))}
        {/* Center circle for donut effect */}
        <circle cx="100" cy="100" r="50" fill="white" />
      </svg>
    </div>
  )
}
