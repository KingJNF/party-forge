import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="nav">
      <NavLink to="/" className="brand">
        🐉 Party Forge
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/create">Recruit</NavLink>
        <NavLink to="/gallery">The Party</NavLink>
      </nav>
    </header>
  )
}