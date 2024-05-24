import { SECTIONS } from './dynamicRoutes'

export const filteredSections = SECTIONS.filter(
  (s) => s.path !== '/admin' && s.path !== '/pip'
)
export const filteredPip = SECTIONS.filter((s) => s.path !== '/pip')
export const PA = SECTIONS.find((s) => s.path === '/admin')
