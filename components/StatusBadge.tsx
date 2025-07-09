interface StatusBadgeProps {
  status: "In-process" | "Need to start" | "Complete" | "Blocked"
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "In-process":
        return "bg-[#FFF3D6] text-[#85640B]"
      case "Need to start":
        return "bg-[#E2E8F0] text-[#475569]"
      case "Complete":
        return "bg-[#D3F2E3] text-[#0A6E3D]"
      case "Blocked":
        return "bg-[#FFE1DE] text-[#C22219]"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  )
}
