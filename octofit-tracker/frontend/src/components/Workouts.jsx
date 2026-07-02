import DataTable from './DataTable.jsx'
import { codespaceName, endpointUrl } from './api.js'

const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : endpointUrl('workouts')

function Workouts() {
  return (
    <DataTable
      collection="workouts"
      endpoint={workoutsEndpoint}
      title="Workouts"
      description="Personalized workout suggestions and programmed activities."
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'durationMinutes', label: 'Duration' },
        { key: 'activities', label: 'Activities' },
        { key: 'description', label: 'Description' },
      ]}
    />
  )
}

export default Workouts