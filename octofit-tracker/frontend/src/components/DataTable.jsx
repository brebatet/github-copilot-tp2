import { useEffect, useState } from 'react'
import { endpointUrl, normalizeItems, valueForDisplay } from './api.js'

function DataTable({ collection, columns, description, title }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(endpointUrl(collection), { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeItems(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Failed to load data')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [collection])

  return (
    <section className="data-section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="badge rounded-pill text-bg-secondary">{items.length} records</span>
      </div>

      {isLoading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id || item.id || JSON.stringify(item)}>
                  {columns.map((column) => (
                    <td key={column.key}>{valueForDisplay(item[column.key])}</td>
                  ))}
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td className="text-muted" colSpan={columns.length}>
                    No records returned from the API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default DataTable