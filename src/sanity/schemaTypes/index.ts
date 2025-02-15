import { type SchemaTypeDefinition } from 'sanity'
import { heroSchema } from './heroSchema'
import productSchema from './productSchema'
import orderSchema from './orderSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSchema, productSchema, orderSchema],
}
