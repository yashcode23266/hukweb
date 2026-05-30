import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product, size = product.sizes?.[0] || 'Standard', quantity = 1) =>
    set((state) => {
      const productId = product._id || product.id
      const hasStockLimit = typeof product.stock === 'number'
      const stock = hasStockLimit ? product.stock : 9999
      const safeQuantity = Math.max(1, Number(quantity || 1))
      const existing = state.items.find((item) => item.productId === productId && item.size === size)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: Math.min(stock, item.quantity + safeQuantity) }
              : item,
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            quantity: Math.min(stock, safeQuantity),
            stock: hasStockLimit ? stock : undefined,
          },
        ],
      }
    }),
  removeItem: (productId, size) =>
    set((state) => ({ items: state.items.filter((item) => item.productId !== productId || item.size !== size) })),
  setQuantity: (productId, size, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Math.min(item.stock ?? 9999, Math.max(1, quantity)) }
          : item,
      ),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))

export default useCartStore
