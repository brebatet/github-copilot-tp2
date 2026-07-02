export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function endpointUrl(collection) {
  return `${apiBaseUrl}/${collection}/`
}

export function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const paginatedKeys = ['results', 'items', 'data', 'docs']
  const key = paginatedKeys.find((candidate) => Array.isArray(payload[candidate]))

  return key ? payload[key] : []
}

export function valueForDisplay(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'None'
  }

  if (value && typeof value === 'object') {
    return value.displayName || value.name || value.username || value.title || value._id || JSON.stringify(value)
  }

  if (value === undefined || value === null || value === '') {
    return 'None'
  }

  return String(value)
}