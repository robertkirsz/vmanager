import type { AuthorType } from 'types'

async function fetchCategories() {
  const response = await fetch('http://localhost:3333/categories')
  return response.json()
}

async function fetchAuthors() {
  const response = await fetch('http://localhost:3333/authors')
  return response.json()
}

async function editAuthor(author: AuthorType) {
  const response = await fetch(`http://localhost:3333/authors/${author.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
  })

  return response.json()
}

const api = { fetchCategories, fetchAuthors, editAuthor }

export default api
