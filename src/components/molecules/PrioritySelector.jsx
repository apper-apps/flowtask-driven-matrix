import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const PrioritySelector = ({ value, onChange, className = "" }) => {
  const priorities = [
    { value: "all", label: "All Priorities", icon: "Filter" },
    { value: "high", label: "High Priority", icon: "AlertCircle" },
    { value: "medium", label: "Medium Priority", icon: "Clock" },
    { value: "low", label: "Low Priority", icon: "Circle" }
  ]
  
  return (
    <div className={className}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {priorities.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default PrioritySelector