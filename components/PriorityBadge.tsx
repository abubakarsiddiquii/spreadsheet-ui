import type React from "react"

interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low"
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case "High":
        return "text-red-600 font-medium"
      case "Medium":
        return "text-yellow-600 font-medium"
      case "Low":
        return "text-blue-600 font-medium"
      default:
        return "text-gray-600"
    }
  }

  return <span className={`text-sm ${getPriorityStyles()}`}>{priority}</span>
}

