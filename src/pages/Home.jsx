import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>🐉 Party Forge</h1>
        <p className="tagline">
          Assemble your ultimate Dungeons &amp; Dragons adventuring party.
          Recruit heroes, choose their class and specialization, and see if
          your crew has what it takes to survive the dungeon.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/create">
            ⚔️ Recruit an Adventurer
          </Link>
          <Link className="btn btn-outline" to="/gallery">
            📜 View the Party
          </Link>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <p>Recruit a hero and pick their <strong>class</strong>.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>The class unlocks unique <strong>specializations</strong>.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <p>Build your party and check its <strong>Quest Success</strong> rating.</p>
          </div>
        </div>
      </div>
    </div>
  )
}