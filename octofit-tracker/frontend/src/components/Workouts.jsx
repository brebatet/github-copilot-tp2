import DataTable from './DataTable.jsx'

function Workouts() {
  return (
    <DataTable
      collection="workouts"
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