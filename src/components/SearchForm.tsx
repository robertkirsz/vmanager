import { useState } from 'react'

type Props = {
  onSubmit: (value: string) => void
  onClear: () => void
}

export default function SearchForm({ onSubmit, onClear }: Props) {
  const [value, setValue] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(value)
  }

  function handleClear() {
    setValue('')
    onClear()
  }

  return (
    <form className="flex space-x-4 self-start my-4 items-center" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Search video names"
        value={value}
        onChange={handleChange}
      />
      <button className="btn btn-primary">Search</button>

      {value !== '' && (
        <button type="button" className="btn" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  )
}
