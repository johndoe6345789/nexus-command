import { useEffect } from 'react'

export function useGlobalSpringyScroll() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        scroll-behavior: smooth !important;
        overscroll-behavior: contain !important;
        -webkit-overflow-scrolling: touch !important;
      }

      [data-radix-scroll-area-viewport],
      .MuiBox-root[style*="overflow"],
      .overflow-auto,
      .overflow-y-auto,
      .overflow-x-auto {
        scroll-behavior: smooth !important;
        overscroll-behavior: contain !important;
        -webkit-overflow-scrolling: touch !important;
      }
    `
    document.head.appendChild(style)

    const applySpringyBehavior = (element: HTMLElement) => {
      if (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      ) {
        element.style.scrollBehavior = 'smooth'
        element.style.overscrollBehavior = 'contain'
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            applySpringyBehavior(node)
            node.querySelectorAll('*').forEach((child) => {
              if (child instanceof HTMLElement) {
                applySpringyBehavior(child)
              }
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    document.querySelectorAll('*').forEach((element) => {
      if (element instanceof HTMLElement) {
        applySpringyBehavior(element)
      }
    })

    return () => {
      style.remove()
      observer.disconnect()
    }
  }, [])
}
