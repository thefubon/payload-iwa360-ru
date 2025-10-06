// Общие функции контроля доступа для Payload CMS
import type { Access } from 'payload'

/**
 * Проверяет, является ли пользователь администратором
 */
export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

/**
 * Проверяет, является ли пользователь редактором или администратором
 * Также включает устаревшую роль 'user' для обратной совместимости
 */
export const isEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor' || user?.role === 'user'
}

/**
 * Проверяет, авторизован ли пользователь (любая роль)
 */
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Публичный доступ для чтения (для фронтенда)
 */
export const isPublic = () => true

/**
 * Только для чтения для наблюдателей, полный доступ для редакторов и администраторов
 */
export const canReadAll = isLoggedIn
export const canCreate = isEditor
export const canUpdate = isEditor
export const canDelete = isAdmin

