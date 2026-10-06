// Cliente de la API de la tienda (/tienda/api/ del sistema de gestión).
// `fetchJson(path)` resuelve a { status, body }: en el servidor va directo a
// gestión con caché, en el navegador pasa por /api/tienda/ del mismo dominio.

export class ApiError extends Error {
  constructor(status) {
    super(`La API de la tienda respondió ${status}`)
    this.status = status
  }
}

export function createApi(fetchJson) {
  async function get(path, params = {}) {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue
      if (key === 'page' && Number(value) === 1) continue
      query.set(key, value)
    }
    const qs = query.toString()
    const { status, body } = await fetchJson(qs ? `${path}?${qs}` : path)
    if (status !== 200) throw new ApiError(status)
    return body
  }

  return {
    productos: (params) => get('productos/', params),
    producto: (id) => get(`productos/${encodeURIComponent(id)}/`),
  }
}

export const browserApi = createApi(async (path) => {
  const response = await fetch(`/api/tienda/${path}`, { headers: { accept: 'application/json' } })
  return { status: response.status, body: response.ok ? await response.json() : null }
})
