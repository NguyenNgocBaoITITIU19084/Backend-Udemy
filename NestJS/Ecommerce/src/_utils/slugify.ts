var slugify = require('slugify')

export function generateSlug(rawString: string) {
  return slugify(rawString)
}