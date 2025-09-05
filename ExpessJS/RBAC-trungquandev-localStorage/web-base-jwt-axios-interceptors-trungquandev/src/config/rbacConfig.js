'use strict'

// định nghĩa role trong dự án

export const roles = {
  ADMIN: 'admin',
  CLIENT: 'client',
  MODERATOR: 'moderator'
}

// định nghĩa quyền - Permission

export const permissions = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_SUPPORT: 'view_support',
  VIEW_MESSAGES: 'view_messages',
  VIEW_ADMIN: 'view_admin',
  VIEW_REVENUE: 'view_revenue'
}

// kết hợp giữa Roles và Permission

export const rolePermissions = {
  [roles.CLIENT]: [permissions.VIEW_DASHBOARD, permissions.VIEW_SUPPORT],
  [roles.MODERATOR]: [permissions.VIEW_DASHBOARD, permissions.VIEW_SUPPORT, permissions.VIEW_MESSAGES],
  [roles.ADMIN]: Object.values(permissions)
}
