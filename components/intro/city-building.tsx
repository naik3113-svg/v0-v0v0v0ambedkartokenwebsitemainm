"use client"

interface CityBuildingProps {
  building: {
    id: number
    x: number
    y: number
    targetX: number
    targetY: number
    height: number
    width: number
  }
  animationPhase: "scatter" | "forming" | "complete"
}

export function CityBuilding({ building, animationPhase }: CityBuildingProps) {
  return (
    <div
      className="absolute transition-all duration-6000 ease-in-out z-10"
      style={{
        left: animationPhase === "scatter" ? `${building.x}%` : `${building.targetX}%`,
        top: animationPhase === "scatter" ? `${building.y}%` : `${building.targetY}%`,
        width: `${Math.max(building.width, 4)}%`,
        height: `${Math.max(building.height, 8)}%`,
        transform: "translate(-50%, -100%)",
        transitionDelay: `${building.id * 100}ms`,
      }}
    >
      <div className="w-full h-full bg-gradient-to-t from-amber-600 to-amber-400 shadow-lg border border-amber-500 relative">
        <div className="absolute inset-1 grid grid-cols-2 gap-1">
          <div className="bg-yellow-300 opacity-60 rounded-sm"></div>
          <div className="bg-yellow-300 opacity-40 rounded-sm"></div>
          <div className="bg-yellow-300 opacity-80 rounded-sm"></div>
          <div className="bg-yellow-300 opacity-30 rounded-sm"></div>
        </div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    </div>
  )
}
