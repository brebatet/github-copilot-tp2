import DataTable from './DataTable.jsx'
import { codespaceName, endpointUrl } from './api.js'

const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : endpointUrl('users')

function Users() {
  return (
    <DataTable
      collection="users"
      endpoint={usersEndpoint}
      title="Users"
      description="Authenticated profiles and account details."
      columns={[
        { key: 'displayName', label: 'Display name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'profile', label: 'Profile' },
      ]}
    />
  )
}

export default Users