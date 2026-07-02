import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName } from './components/api.js'
import './App.css'

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-semibold" to="/users">
            Octofit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} className="nav-link px-2" to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <header className="app-header">
        <div>
          <p className="eyebrow">React 19 presentation tier</p>
          <h1>Octofit Tracker</h1>
          <p className="header-copy">
            Track teams, activities, leaderboard standings, user profiles, and workout suggestions.
          </p>
        </div>
        <div className="api-status" aria-live="polite">
          <span className={codespaceName ? 'status-dot ready' : 'status-dot'}></span>
          <span>{apiBaseUrl}</span>
        </div>
      </header>

      {!codespaceName && (
        <div className="alert alert-warning mx-3" role="alert">
          VITE_CODESPACE_NAME is not set. The app is using the local API fallback instead of a Codespaces URL.
        </div>
      )}

      <main className="container-fluid pb-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
