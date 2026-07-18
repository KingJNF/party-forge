import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import Gallery from './pages/Gallery'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
        </Routes>
      </main>
      <footer className="footer">
        ⚔️ Party Forge — Forge your legend, one adventurer at a time.
      </footer>
    </div>
  )
}

export default App