import { type SchemaTypeDefinition } from 'sanity'
import { heroSchema } from './heroSchema'
import productSchema from './productSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSchema, productSchema],
}
