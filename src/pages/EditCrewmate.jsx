import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'
import { CLASSES, CLASS_NAMES, LEVELS, ALIGNMENTS } from '../constants'

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      setForm(data)
    }
    fetch()
  }, [id])

  if (!form) return <div className="form-page"><h1>Loading…</h1></div>

  const handleClassSelect = (className) => {
    setForm((prev) => ({ ...prev, class: className, specialization: '' }))
  }

  const availableSpecs = form.class ? CLASSES[form.class].specializations : []

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Your adventurer needs a name!')
    if (!form.specialization) return setError('Please choose a specialization.')

    const { error } = await supabase
      .from('crewmates')
      .update({
        name: form.name.trim(),
        class: form.class,
        specialization: form.specialization,
        level: form.level,
        alignment: form.alignment,
        color: CLASSES[form.class].color,
      })
      .eq('id', id)

    if (error) setError(error.message)
    else {
      setStatus('✅ Changes saved!')
      setTimeout(() => navigate('/gallery'), 700)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Remove ${form.name} from the party? This cannot be undone.`)) return
    const { error } = await supabase.from('crewmates').delete().eq('id', id)
    if (error) setError(error.message)
    else navigate('/gallery')
  }

  return (
    <div className="form-page">
      <h1>✏️ Edit {form.name}</h1>

      <form onSubmit={handleUpdate} className="crew-form">
        <label className="field-label">Name</label>
        <input
          type="text"
          className="text-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="field-label">Class (Category)</label>
        <div className="option-grid">
          {CLASS_NAMES.map((c) => (
            <button
              type="button"
              key={c}
              className={`option-btn ${form.class === c ? 'selected' : ''}`}
              style={form.class === c ? { background: CLASSES[c].color, borderColor: CLASSES[c].color } : {}}
              onClick={() => handleClassSelect(c)}
            >
              {CLASSES[c].icon} {c}
            </button>
          ))}
        </div>

        <label className="field-label">Specialization ({form.class})</label>
        <div className="option-grid">
          {availableSpecs.map((s) => (
            <button
              type="button"
              key={s}
              className={`option-btn ${form.specialization === s ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, specialization: s })}
            >
              {s}
            </button>
          ))}
        </div>

        <label className="field-label">Level</label>
        <div className="option-grid">
          {LEVELS.map((lvl) => (
            <button
              type="button"
              key={lvl}
              className={`option-btn ${form.level === lvl ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, level: lvl })}
            >
              {lvl}
            </button>
          ))}
        </div>

        <label className="field-label">Alignment</label>
        <div className="option-grid">
          {ALIGNMENTS.map((a) => (
            <button
              type="button"
              key={a}
              className={`option-btn ${form.alignment === a ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, alignment: a })}
            >
              {a}
            </button>
          ))}
        </div>

        {error && <p className="error">{error}</p>}
        {status && <p className="success-msg">{status}</p>}

        <div className="edit-actions">
          <button type="submit" className="btn btn-primary">💾 Update Adventurer</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            🗑️ Delete Adventurer
          </button>
          <Link className="btn btn-outline" to={`/crewmate/${id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}