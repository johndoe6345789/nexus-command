import { Tabs as MuiTabs, Tab, Box } from '@mui/material'
import { Icon } from '../atoms'
import { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'

interface TabConfig {
  label: string
  icon: PhosphorIcon
  content: ReactNode
}

interface TabbedPanelProps {
  tabs: TabConfig[]
  defaultTab?: number
}

export function TabbedPanel({ tabs, defaultTab = 0 }: TabbedPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <Box>
      <MuiTabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 4 }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={<Icon icon={tab.icon} size={20} weight="bold" />}
            iconPosition="start"
            label={tab.label}
          />
        ))}
      </MuiTabs>
      
      {tabs.map((tab, index) => (
        <Box
          key={index}
          role="tabpanel"
          hidden={activeTab !== index}
          sx={{ display: activeTab === index ? 'block' : 'none' }}
        >
          {tab.content}
        </Box>
      ))}
    </Box>
  )
}
