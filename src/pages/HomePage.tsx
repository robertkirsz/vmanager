import { useState } from 'react'

import VideosTable from 'components/VideosTable'
import GlobalSpinner from 'components/GlobalSpinner'
import SearchForm from 'components/SearchForm'

import { version } from '../../package.json'

export default function HomePage() {
  const [query, setQuery] = useState('')

  function handleSearch(query: string) {
    setQuery(query)
  }

  function clearSearch() {
    setQuery('')
  }

  return (
    <div className="content-wrapper flex-col relative flex-1">
      <h1 className="text-2xl my-2 md:text-4xl md:my-4">VManager Demo v{version}</h1>
      <SearchForm onSubmit={handleSearch} onClear={clearSearch} />

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <VideosTable searchQuery={query} />
      </div>

      <GlobalSpinner />
    </div>
  )
}
