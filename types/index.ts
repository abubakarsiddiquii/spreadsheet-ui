export interface Task {
  id: number
  jobRequest: string
  submitted: string
  status: "In-process" | "Need to start" | "Complete" | "Blocked"
  submitter: string
  url: string
  assigned: string
  priority: "High" | "Medium" | "Low"
  dueDate: string
  estValue: string
}

export interface Column {
  key: keyof Task
  label: string
  width: string
  sortable: boolean
}
