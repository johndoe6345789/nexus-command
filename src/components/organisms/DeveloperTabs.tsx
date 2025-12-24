import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import { ChartLine, Gear, Lightning, Terminal, Eye, Cube, CircleNotch } from '@phosphor-icons/react'

interface DeveloperTabsProps {
  activeTab: number
  onTabChange: (value: number) => void
}

export function DeveloperTabs({ activeTab, onTabChange }: DeveloperTabsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'rgba(74, 158, 255, 0.2)', mb: 4 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => onTabChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: isMobile ? '0.875rem' : '1rem',
            fontWeight: 600,
            minHeight: isMobile ? '48px' : '56px',
            minWidth: isMobile ? 'auto' : '90px',
            px: isMobile ? 2 : 3,
          },
          '& .MuiTabs-scrollButtons': {
            color: 'oklch(0.75 0.20 220)',
            '&.Mui-disabled': {
              opacity: 0.3,
            },
          },
        }}
      >
        <Tab 
          icon={<ChartLine size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Overview"}
          iconPosition="start"
        />
        <Tab 
          icon={<Gear size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Debug Options"}
          iconPosition="start"
        />
        <Tab 
          icon={<Lightning size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Cheat Codes"}
          iconPosition="start"
        />
        <Tab 
          icon={<Terminal size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Console"}
          iconPosition="start"
        />
        <Tab 
          icon={<Eye size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Render Stats"}
          iconPosition="start"
        />
        <Tab 
          icon={<Cube size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Proc Gen"}
          iconPosition="start"
        />
        <Tab 
          icon={<CircleNotch size={isMobile ? 20 : 24} />} 
          label={isTablet ? undefined : "Loading"}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  )
}
