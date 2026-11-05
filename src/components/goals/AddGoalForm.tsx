import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'

interface AddGoalFormProps {
  adding: boolean
  onAdd: (text: string) => Promise<boolean>
}

export function AddGoalForm({ adding, onAdd }: AddGoalFormProps) {
  const [input, setInput] = useState('')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!input.trim() || adding) return
    if (await onAdd(input)) setInput('')
  }

  return (
    <form className="add-form" onSubmit={event => void submit(event)}>
      <label className="add-input-wrap"><Plus size={22} /><input value={input} onChange={event => setInput(event.target.value)} placeholder="Add a new goal..." aria-label="New goal" /></label>
      <button className="add-button" type="submit" disabled={!input.trim() || adding}>{adding ? 'Adding…' : 'Add'}</button>
    </form>
  )
}
