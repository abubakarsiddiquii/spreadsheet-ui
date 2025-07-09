"use client"

import { useState } from "react"
import {
  Search,
  Bell,
  ChevronDown,
  EyeOff,
  ArrowUpDown,
  Filter,
  Grid3X3,
  Upload,
  Download,
  Share2,
  Plus,
  Star,
} from "lucide-react"

interface Task {
  id: number
  name: string
  submissionDate: string
  status: "In-progress" | "Need to start" | "Complete" | "Blocked"
  submitter: string
  url: string
  assigned: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  value: string
}

const tasks: Task[] = [
  {
    id: 1,
    name: "Launch social media campaign for product launch",
    submissionDate: "15-10-2024",
    status: "In-progress",
    submitter: "John Patel",
    url: "www.johnpatel...",
    assigned: "Sophie Chandler",
    priority: "Medium",
    dueDate: "20-11-2024",
    value: "6,200,000",
  },
  {
    id: 2,
    name: "Update press kit for company redesign",
    submissionDate: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhan...",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    value: "3,500,000",
  },
  {
    id: 3,
    name: "Finalize user testing feedback for app...",
    submissionDate: "05-12-2024",
    status: "In-progress",
    submitter: "Mark Johnson",
    url: "www.markjohns...",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    value: "4,750,000",
  },
  {
    id: 4,
    name: "Design new features for the website",
    submissionDate: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen...",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    value: "5,900,000",
  },
  {
    id: 5,
    name: "Prepare financial report for Q4",
    submissionDate: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabro...",
    assigned: "Kevin Smith",
    priority: "Low",
    dueDate: "30-01-2025",
    value: "2,800,000",
  },
]

const StatusBadge = ({ status }: { status: Task["status"] }) => {
  const getStatusColor = () => {
    switch (status) {
      case "In-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Need to start":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Complete":
        return "bg-green-100 text-green-800 border-green-200"
      case "Blocked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor()}`}>{status}</span>
}

const PriorityBadge = ({ priority }: { priority: Task["priority"] }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "text-red-600 font-semibold"
      case "Medium":
        return "text-yellow-600 font-semibold"
      case "Low":
        return "text-blue-600 font-semibold"
      default:
        return "text-gray-600"
    }
  }

  return <span className={`text-sm ${getPriorityColor()}`}>{priority}</span>
}

export default function SpreadsheetInterface() {
  const [activeTab, setActiveTab] = useState("All Orders")
  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"]

  const handleButtonClick = (action: string, data?: any) => {
    console.log(`${action} clicked`, data || "")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span
              className="cursor-pointer hover:text-gray-900"
              onClick={() => handleButtonClick("Workspace navigation")}
            >
              📊 Workspace
            </span>
            <span>›</span>
            <span
              className="cursor-pointer hover:text-gray-900"
              onClick={() => handleButtonClick("Folder 2 navigation")}
            >
              Folder 2
            </span>
            <span>›</span>
            <span className="font-medium text-gray-900">Spreadsheet 3</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search within sheet"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleButtonClick("Search", e.target.value)}
              />
            </div>

            <div className="relative">
              <Bell
                className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900"
                onClick={() => handleButtonClick("Notifications")}
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>

            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
              onClick={() => handleButtonClick("User profile", "John Doe")}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => handleButtonClick("Tool bar toggle")}
            >
              <span>Tool bar</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => handleButtonClick("Hide fields")}
              >
                <EyeOff className="w-4 h-4" />
                <span>Hide fields</span>
              </button>

              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => handleButtonClick("Sort")}
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>

              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => handleButtonClick("Filter")}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>

              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => handleButtonClick("Cell view")}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Cell view</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => handleButtonClick("Import")}
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>

            <button
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => handleButtonClick("Export")}
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => handleButtonClick("Share")}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button
              className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 flex items-center space-x-1"
              onClick={() => handleButtonClick("New Action")}
            >
              <span>New Action</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center space-x-2">
          <button
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200"
            onClick={() => handleButtonClick("Q3 Financial Overview")}
          >
            <Star className="w-3 h-3 inline mr-1" />
            Q3 Financial Overview
          </button>

          <button
            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-200"
            onClick={() => handleButtonClick("Answer a question")}
          >
            Answer a question
          </button>

          <button
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-200"
            onClick={() => handleButtonClick("Extract")}
          >
            Extract
          </button>

          <button
            className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-gray-400"
            onClick={() => handleButtonClick("Add new action button")}
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleButtonClick("Sort by Job Request")}
                  >
                    <span>Job Request</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleButtonClick("Sort by Submitted")}
                  >
                    <span>Submitted</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleButtonClick("Sort by Status")}
                  >
                    <span>Status</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleButtonClick("Sort by Submitter")}
                  >
                    <span>Submitter</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleButtonClick("Sort by Assigned")}
                  >
                    <span>Assigned</span>
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task, index) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleButtonClick("Row clicked", task)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">{task.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{task.submissionDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{task.submitter}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 underline"
                      onClick={(e) => {
                        e.preventDefault()
                        handleButtonClick("URL clicked", task.url)
                      }}
                    >
                      {task.url}
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{task.assigned}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{task.value}</td>
                </tr>
              ))}

              {/* Empty rows */}
              {Array.from({ length: 15 }, (_, i) => (
                <tr key={`empty-${i}`} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{tasks.length + i + 1}</td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="bg-white border-t border-gray-200 px-4">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab(tab)
                handleButtonClick("Tab clicked", tab)
              }}
            >
              {tab}
            </button>
          ))}

          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => handleButtonClick("Add new tab")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
