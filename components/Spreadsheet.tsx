"use client"

import type React from "react"
import { useState } from "react"
import {
  Search,
  Bell,
  ChevronDown,
  EyeOff,
  ArrowUpDown,
  Filter,
  Grid3X3,
  Plus,
  ChevronRight,
} from "lucide-react"
import { SpreadsheetTable } from "./SpreadsheetTable"
import { mockTasks } from "../data/mockData"

export const Spreadsheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders")
  const [searchQuery, setSearchQuery] = useState("")
  const [toolbarExpanded, setToolbarExpanded] = useState(true)

  const handleAction = (action: string, value?: unknown) => {
    console.log("Action Triggered:", action, value)
  }

  const handleCellClick = (rowIndex: number, columnKey: string, value: unknown) => {
  console.log("Cell clicked:", { rowIndex, columnKey, value })
  }

  import type { Task } from "../types"

  const handleRowClick = (task: Task) => {
  console.log("Row clicked:", task.id)
  }

  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"]

  return (
    <div className="w-full max-w-[1400px] overflow-auto bg-white mx-auto">

      {/* Top Navigation */}
      <div
        className="flex items-center justify-between w-[1440px] h-[56px] px-4 py-2"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EEEEEE",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >

        <div className="flex items-center text-sm text-gray-600 w-[343px] h-[24px] gap-[8px]">
          <div className="flex items-center space-x-1">
            <img
              src="/Panel.svg"
              alt="Panel Icon"
              className="w-[24px] h-[24px] mr-[16px]"

            />
            <button
              className="w-[76px] h-[20px] text-[14px] font-medium leading-[20px] tracking-normal text-[#AFAFAF] whitespace-nowrap hover:text-[#AFAFAF] transition-colors"
              onClick={() => handleAction("Navigate to Workspace")}
            >
              Workspace
            </button>
          </div>
          <ChevronRight className="w-[12px] h-[12px] flex-shrink-0" />
          <button
            className="w-[56px] h-[20px] text-[14px] font-medium leading-[10px] tracking-normal text-[#AFAFAF] whitespace-nowrap hover:text-[#AFAFAF] transition-colors"
            onClick={() => handleAction("Navigate to Folder 2")}
          >
            Folder 2
          </button>
          <ChevronRight className="w-[12px] h-[12px] flex-shrink-0" />
          <span className="w-[99px] h-[20px] text-[14px] font-medium leading-[20px] tracking-normal text-[#121212] whitespace-nowrap">
            Spreadsheet 3
          </span>
        </div>

        {/* SEARCH SPACE */}
        <div className="flex items-center space-x-4">
          <div className="relative w-[165px] h-[40px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleAction("Search", e.target.value)
              }}
              className="pl-10 pr-3 bg-[#F6F6F6] border border-gray-300 text-[13px] rounded-[6px] h-[40px] w-full py-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>


          {/* BELL ICON */}
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => handleAction("Open notifications")}
            >
              <Bell className="w-24px h-24px text-gray-600" />
              <span
                style={{ backgroundColor: "rgba(75, 106, 79, 1)" }}
                className="absolute -top-0.5 -right-0.5 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* USER PROFILE */}
          <button
            onClick={() => handleAction("Open user menu", "John Doe")}
            aria-label="User Profile"
            className="transition hover:opacity-90"
          >
            <img
              src="/Profile_Block.svg" alt="User Profile" className="h-40px w-112px"
            />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between w-[1440px] h-[48px] gap-[8px]"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EEEEEE",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors h-[36px] w-[91px]"
              onClick={() => {
                setToolbarExpanded(!toolbarExpanded)
                handleAction("Toggle toolbar", !toolbarExpanded)
              }}
            >
              <span>Tool bar</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${toolbarExpanded ? "" : "rotate-180"}`} />
            </button>

            {toolbarExpanded && (
              <div className="flex items-center space-x-3 w-[871px] h-[36px]">
                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors w-[118px] h-[36px]"
                  onClick={() => handleAction("Hide fields")}
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Hide fields</span>
                </button>

                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors w-[73px] h-[36px]"
                  onClick={() => handleAction("Sort")}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort</span>
                </button>

                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors w-[80px] h-[36px]"
                  onClick={() => handleAction("Filter")}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                <button
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors w-105px] h-[36px]"
                  onClick={() => handleAction("Cell view")}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span>Cell view</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 h-[36px] w-[437px]">
            {/* IMPORT BUTTON */}
            <button
              onClick={() => handleAction("Import")}
              className="transition-all hover:opacity-80"
            >
              <img
                src="/Button_Neutral_Import.svg" alt="Import Button" className="h-[36px] w-[90px]"
              />
            </button>


            {/* EXPORT BUTTON */}
            <button
              onClick={() => handleAction("Export")}
              className="transition-all hover:opacity-80"
            >
              <img
                src="/Button_Neutral_Export.svg" alt="Export Button" className="h-[36px] w-[89px]"
              />
            </button>

            {/* SHARE BUTTON */}
            <button
              onClick={() => handleAction("Share")}
              className="transition-all hover:opacity-80"
            >
              <img
                src="/Button_Neutral_Share.svg" alt="Share Button" className="h-[36px] w-[84px]"
              />
            </button>


            {/* NEW ACTION BUTTON */}
            <button onClick={() => handleAction("New Action")}>
              <img
                src="/Button.svg"
                alt="New Action"
                className="h-[36px] w-[150px]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-[40px] bg-white border-b border-gray-200">
        <div className="w-[1440px] flex items-center space-x-0.5">
          {/* SVG Financial Overview */}
          <div
            className="w-[610px] h-[32px] bg-[#E2E2E2] opacity-100 rotate-0 flex items-center p1-[2px]"
            onClick={() => handleAction("Q3 Financial Overview")}
          >
            <img
              src="/financial_overview.svg"
              alt="Financial Overview"
              style={{
                width: "180px",
                height: "28px",
                borderRadius: "4px",
                padding: "2px 4px",
                background: "#E2E2E2",
                opacity: 1,
              }}
            />

            <img
              src="/Arrow Sync.svg"
              alt="Financial Overview"
              style={{
                width: "25px",
                height: "28px",
                borderRadius: "4px",
                padding: "1px 4px",
                background: "#E2E2E2",
                opacity: 1,
              }}
            />
          </div>

          {/* ABC */}
          <div
            className="w-[134px] h-[32px] ml-[152px] flex items-center justify-start bg-[#D2E0D4] opacity-100 rotate-0 px-4"
            style={{ gap: "8px" }}
            onClick={() => handleAction("ABC")}
          >
            <img
              src="/ABC.svg"
              alt="Green Label"
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
                transform: "rotate(0deg)",
              }}
            />
          </div>

          {/* ANSWER A QUESTION */}
          <div
            className="w-[207px] h-[32px] flex items-center justify-start bg-[#DCCFFC] opacity-100 rotate-0 px-4"
            style={{ gap: "8px" }}
            onClick={() => handleAction("Answer A Question")}
          >
            <img
              src="/AnswerQuestion.svg"
              alt="Answer a Question"
              style={{
                width: "100%",
                height: "100%",
                opacity: 1,
                transform: "rotate(0deg)",
              }}
            />
          </div>

          {/* EXTRACT */}
          <div
            className="w-[118px] h-[32px] bg-[#FAC2AF] px-4 flex items-center justify-center opacity-100 rotate-0"
            onClick={() => handleAction("Extract")}
          >
            <img
              src="/extract.svg"
              alt="Extract"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* PLUS */}
          <div
            className="w-[101px] h-[32px] bg-[#EEEEEE] px-4 flex items-center justify-center opacity-100 rotate-0"
            onClick={() => handleAction("Add New Row")}
          >
            <img
              src="/plus.svg"
              alt="Plus"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <SpreadsheetTable data={mockTasks} onCellClick={handleCellClick} onRowClick={handleRowClick} />

      {/* Bottom Tabs */}
      <div className="border-t border-gray-200 bg-white">
        <div className="flex items-center px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              onClick={() => {
                setActiveTab(tab)
                handleAction("Switch tab", tab)
              }}
            >
              {tab}
            </button>
          ))}

          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleAction("Add new tab")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
