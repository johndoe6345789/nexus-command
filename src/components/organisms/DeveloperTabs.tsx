import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import { ChartLine, Gear, Lightning, Terminal, Eye, Cube, CircleNotch } from '@phosphor-icons/react'
import { useRef, useEffect } from 'react'

interface DeveloperTabsProps {
  activeTab: number
  onTabChange: (value: number) => void
}

export function DeveloperTabs({ activeTab, onTabChange }: DeveloperTabsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tabsRef.current) {
      const indicator = tabsRef.current.querySelector('.MuiTabs-indicator') as HTMLElement
      const activeTabElement = tabsRef.current.querySelector(`[aria-selected="true"]`) as HTMLElement
      
      if (indicator && activeTabElement) {
        const rect = activeTabElement.getBoundingClientRect()
        const containerRect = tabsRef.current.getBoundingClientRect()
        
        indicator.style.left = `${activeTabElement.offsetLeft}px`
        indicator.style.width = `${rect.width}px`
        indicator.style.bottom = '0px'
      }
    }
  }, [activeTab, isMobile, isTablet])

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'rgba(74, 158, 255, 0.2)', mb: 4 }}>
      <Tabs
        ref={tabsRef}
        value={activeTab}
        onChange={(_, newValue) => onTabChange(newValue)}
        variant="standard"
        sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
            gap: isMobile ? '4px' : '8px',
          },
          '& .MuiTabs-indicator': {
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            fontWeight: 600,
            minHeight: isMobile ? '44px' : '48px',
            minWidth: isMobile ? 'auto' : '80px',
            px: isMobile ? 1.5 : 2,
            py: 1,
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
