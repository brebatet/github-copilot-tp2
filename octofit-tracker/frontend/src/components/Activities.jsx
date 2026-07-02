import DataTable from './DataTable.jsx'

function Activities() {
  return (
    <DataTable
      collection="activities"
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