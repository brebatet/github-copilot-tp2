import DataTable from './DataTable.jsx'

function Leaderboard() {
  return (
    <DataTable
      collection="leaderboard"
      title="Leaderboard"
      description="Competitive standings ranked by score."
      columns={[
        { key: 'user', label: 'User' },
        { key: 'team', label: 'Team' },
        { key: 'score', label: 'Score' },
      ]}
    />
  )
}

export default Leaderboard