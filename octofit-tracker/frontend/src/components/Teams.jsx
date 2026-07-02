import DataTable from './DataTable.jsx'
import { codespaceName, endpointUrl } from './api.js'

const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : endpointUrl('teams')

function Teams() {
  return (
    <DataTable
      collection="teams"
      endpoint={teamsEndpoint}
      title="Teams"
      description="Team creation, membership, and group descriptions."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}

export default Teams