import DataTable from './DataTable.jsx'

function Users() {
  return (
    <DataTable
      collection="users"
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