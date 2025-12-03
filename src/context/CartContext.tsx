import React, { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem,'quantity'>, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('zwanski_cart_v1')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(()=>{
    try { localStorage.setItem('zwanski_cart_v1', JSON.stringify(items)) } catch(e){}
  },[items])

  const add = (item: Omit<CartItem,'quantity'>, qty = 1) => {
    setItems(prev=>{
      const exists = prev.find(p=>p.id === item.id)
      if(exists) return prev.map(p=> p.id===item.id ? {...p, quantity: p.quantity + qty} : p)
      return [...prev, {...item, quantity: qty}]
    })
  }

  const update = (id:string, quantity:number) => {
    setItems(prev => prev.map(p => p.id === id ? {...p, quantity: Math.max(0, quantity)} : p).filter(p=> p.quantity > 0))
  }

  const remove = (id:string) => setItems(prev=> prev.filter(p=>p.id!==id))
  const clear = () => setItems([])
  const total = () => items.reduce((s,i)=> s + i.price * i.quantity, 0)

  return <CartContext.Provider value={{items, add, remove, update, clear, total}}>{children}</CartContext.Provider>
}
