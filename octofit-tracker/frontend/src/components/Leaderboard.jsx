import DataTable from './DataTable.jsx'
import { codespaceName, endpointUrl } from './api.js'

const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : endpointUrl('leaderboard')

function Leaderboard() {
  return (
    <DataTable
      collection="leaderboard"
      endpoint={leaderboardEndpoint}
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