import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import { CLASSES } from '../constants'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      setCrewmate(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return <div className="form-page"><h1>Loading…</h1></div>
  if (!crewmate) return (
    <div className="form-page">
      <h1>Adventurer not found</h1>
      <Link className="btn btn-outline" to="/gallery">← Back to party</Link>
    </div>
  )

  const info = CLASSES[crewmate.class] || {}

  return (
    <div className="detail-page">
      <div className="detail-header" style={{ background: crewmate.color }}>
        <span className="detail-icon">{info.icon}</span>
        <h1>{crewmate.name}</h1>
        <p>Level {crewmate.level} {crewmate.class}</p>
      </div>

      <div className="detail-body">
        <p className="class-blurb">{info.blurb}</p>

        <div className="detail-grid">
          <div className="detail-item"><strong>Class</strong><span>{crewmate.class}</span></div>
          <div className="detail-item"><strong>Specialization</strong><span>{crewmate.specialization}</span></div>
          <div className="detail-item"><strong>Level</strong><span>{crewmate.level}</span></div>
          <div className="detail-item"><strong>Alignment</strong><span>{crewmate.alignment}</span></div>
          <div className="detail-item"><strong>Spellcaster</strong><span>{info.isCaster ? 'Yes' : 'No'}</span></div>
          <div className="detail-item"><strong>Can Heal</strong><span>{info.isHealer ? 'Yes' : 'No'}</span></div>
          <div className="detail-item">
            <strong>Recruited</strong>
            <span>{new Date(crewmate.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link className="btn btn-primary" to={`/edit/${crewmate.id}`}>✏️ Edit Adventurer</Link>
          <Link className="btn btn-outline" to="/gallery">← Back to Party</Link>
        </div>
      </div>
    </div>
  )
}