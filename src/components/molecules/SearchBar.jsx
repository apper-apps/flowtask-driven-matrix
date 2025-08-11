import { useState } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }
  
  const clearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-12"
        />
        
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="w-5 h-5 text-slate-400" />
        </div>
        
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="p-1 h-8 w-8"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchBar