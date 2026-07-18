import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import { CLASSES } from '../constants'
import CrewmateCard from '../components/CrewmateCard'

export default function Gallery() {
  const [crew, setCrew] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCrew()
  }, [])

  const fetchCrew = async () => {
    setLoading(true)
    // Sorted by creation date, most recent first (required feature)
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setCrew(data)
    setLoading(false)
  }

  // ---- Summary statistics (stretch feature 2) ----
  const total = crew.length
  const avgLevel = total
    ? (crew.reduce((sum, c) => sum + (c.level || 0), 0) / total).toFixed(1)
    : 0
  const casters = crew.filter((c) => CLASSES[c.class]?.isCaster).length
  const casterPct = total ? Math.round((casters / total) * 100) : 0
  const hasHealer = crew.some((c) => CLASSES[c.class]?.isHealer)
  const uniqueClasses = new Set(crew.map((c) => c.class)).size

  // ---- Custom "Quest Success" metric (stretch feature 3) ----
  // Score based on party size, average level, class diversity, and a healer.
  let successScore = 0
  if (total > 0) {
    const sizeScore = Math.min(total, 4) * 10          // up to 40
    const levelScore = Math.min(avgLevel / 20, 1) * 30 // up to 30
    const diversityScore = Math.min(uniqueClasses, 4) * 5 // up to 20
    const healerScore = hasHealer ? 10 : 0             // up to 10
    successScore = Math.round(sizeScore + levelScore + diversityScore + healerScore)
  }

  let successTier = 'doomed'
  let successLabel = 'Doomed'
  if (successScore >= 80) { successTier = 'legendary'; successLabel = 'Legendary' }
  else if (successScore >= 55) { successTier = 'heroic'; successLabel = 'Heroic' }
  else if (successScore >= 30) { successTier = 'risky'; successLabel = 'Risky' }

  if (loading) return <div className="form-page"><h1>Loading the party…</h1></div>

  return (
    <div className={`gallery tier-${successTier}`}>
      <h1>📜 The Party</h1>

      {total === 0 ? (
        <div className="empty">
          <p>Your party is empty. Every legend starts with a single hero.</p>
          <Link className="btn btn-primary" to="/create">⚔️ Recruit your first adventurer</Link>
        </div>
      ) : (
        <>
          {/* Success banner — changes look of the list based on the metric */}
          <div className={`success-banner banner-${successTier}`}>
            <div>
              <span className="success-label">Quest Success: {successLabel}</span>
              <div className="success-bar">
                <div className="success-fill" style={{ width: `${successScore}%` }} />
              </div>
            </div>
            <span className="success-score">{successScore}%</span>
          </div>

          {/* Summary statistics */}
          <div className="stats">
            <div className="stat"><span className="stat-num">{total}</span><span>Members</span></div>
            <div className="stat"><span className="stat-num">{avgLevel}</span><span>Avg. Level</span></div>
            <div className="stat"><span className="stat-num">{casterPct}%</span><span>Spellcasters</span></div>
            <div className="stat"><span className="stat-num">{uniqueClasses}</span><span>Unique Classes</span></div>
            <div className="stat"><span className="stat-num">{hasHealer ? 'Yes' : 'No'}</span><span>Has Healer</span></div>
          </div>

          <div className="card-grid">
            {crew.map((c) => (
              <CrewmateCard key={c.id} crewmate={c} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}