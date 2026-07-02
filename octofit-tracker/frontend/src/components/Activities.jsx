import DataTable from './DataTable.jsx'
import { codespaceName, endpointUrl } from './api.js'

const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : endpointUrl('activities')

function Activities() {
  return (
    <DataTable
      collection="activities"
      endpoint={activitiesEndpoint}
      title="Activities"
      description="Activity logging across users, duration, calories, and dates."
      columns={[
        { key: 'activityType', label: 'Activity' },
        { key: 'user', label: 'User' },
        { key: 'durationMinutes', label: 'Duration' },
        { key: 'caloriesBurned', label: 'Calories' },
        { key: 'activityDate', label: 'Date' },
      ]}
    />
  )
}

export default Activities