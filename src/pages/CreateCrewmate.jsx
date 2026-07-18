import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { CLASSES, CLASS_NAMES, LEVELS, ALIGNMENTS } from '../constants'

export default function CreateCrewmate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    class: '',
    specialization: '',
    level: 1,
    alignment: '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // When class changes, reset specialization since options change
  const handleClassSelect = (className) => {
    setForm((prev) => ({ ...prev, class: className, specialization: '' }))
  }

  const availableSpecs = form.class ? CLASSES[form.class].specializations : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Your adventurer needs a name!')
    if (!form.class) return setError('Please choose a class.')
    if (!form.specialization) return setError('Please choose a specialization.')
    if (!form.alignment) return setError('Please choose an alignment.')

    setSaving(true)
    const { error } = await supabase.from('crewmates').insert({
      name: form.name.trim(),
      class: form.class,
      specialization: form.specialization,
      level: form.level,
      alignment: form.alignment,
      color: CLASSES[form.class].color,
    })
    setSaving(false)

    if (error) {
      setError(error.message)
    } else {
      navigate('/gallery')
    }
  }

  return (
    <div className="form-page">
      <h1>⚔️ Recruit a New Adventurer</h1>
      <p className="subtitle">Choose a class to unlock its specializations.</p>

      <form onSubmit={handleSubmit} className="crew-form">
        {/* Name */}
        <label className="field-label">Name</label>
        <input
          type="text"
          className="text-input"
          placeholder="e.g., Thoradin Ironshield"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Class (category) */}
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

        {/* Specialization (restricted by class) */}
        <label className="field-label">
          Specialization {form.class && `(${form.class})`}
        </label>
        {form.class ? (
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
        ) : (
          <p className="hint">Select a class first to see specializations.</p>
        )}

        {/* Level */}
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

        {/* Alignment */}
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

        <button type="submit" className="btn btn-primary btn-full" disabled={saving}>
          {saving ? 'Recruiting…' : '✅ Add to Party'}
        </button>
      </form>
    </div>
  )
}