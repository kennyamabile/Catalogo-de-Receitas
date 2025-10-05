const STORAGE_KEY = 'healthy_recipes_v1'

export function readRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.error('Erro ao ler storage', e)
    return []
  }
}

export function saveRecipes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []))
}
