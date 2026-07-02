import DataTable from './DataTable.jsx'

function Teams() {
  return (
    <DataTable
      collection="teams"
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