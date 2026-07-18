import { Link } from 'react-router-dom'
import { CLASSES } from '../constants'

export default function CrewmateCard({ crewmate }) {
  const classInfo = CLASSES[crewmate.class] || {}

  return (
    <div className="card" style={{ borderColor: crewmate.color }}>
      <div className="card-icon" style={{ background: crewmate.color }}>
        {classInfo.icon || '❓'}
      </div>
      <div className="card-body">
        <h3>{crewmate.name}</h3>
        <p className="card-sub">
          Level {crewmate.level} {crewmate.class}
        </p>
        <p className="card-spec">{crewmate.specialization}</p>
      </div>
      <div className="card-actions">
        <Link className="btn btn-small" to={`/crewmate/${crewmate.id}`}>
          View
        </Link>
        <Link className="btn btn-small btn-outline" to={`/edit/${crewmate.id}`}>
          Edit
        </Link>
      </div>
    </div>
  )
}