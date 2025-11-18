"use client"
import { useEffect, useState } from "react"
import { getClientAuth } from "@/lib/firebase/client"
import { getIdToken } from "firebase/auth"
import { useForm } from "react-hook-form"

export default function Page() {
  const [items, setItems] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm<{ agentUid: string; title: string; propertyType: string; location: string; bedrooms: number; bathrooms: number; squareFootage: number; price: number }>()
  async function load() {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    const res = await fetch("/api/properties", { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    setItems(json.items || [])
  }
  useEffect(() => { load() }, [])
  async function onSubmit(v: any) {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...v, amenities: [], uniqueFeatures: [], status: "listed" }) })
    reset()
    load()
  }
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Properties</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <input className="border p-2" placeholder="agentUid" {...register("agentUid")} />
        <input className="border p-2" placeholder="title" {...register("title")} />
        <input className="border p-2" placeholder="propertyType" {...register("propertyType")} />
        <input className="border p-2" placeholder="location" {...register("location")} />
        <input className="border p-2" placeholder="bedrooms" type="number" {...register("bedrooms", { valueAsNumber: true })} />
        <input className="border p-2" placeholder="bathrooms" type="number" {...register("bathrooms", { valueAsNumber: true })} />
        <input className="border p-2" placeholder="squareFootage" type="number" {...register("squareFootage", { valueAsNumber: true })} />
        <input className="border p-2" placeholder="price" type="number" {...register("price", { valueAsNumber: true })} />
        <button className="bg-black text-white" type="submit">Create</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">title</th>
            <th className="border p-2">type</th>
            <th className="border p-2">location</th>
            <th className="border p-2">bed/bath</th>
            <th className="border p-2">sqft</th>
            <th className="border p-2">price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td className="border p-2">{i.title}</td>
              <td className="border p-2">{i.propertyType}</td>
              <td className="border p-2">{i.location}</td>
              <td className="border p-2">{i.bedrooms}/{i.bathrooms}</td>
              <td className="border p-2">{i.squareFootage}</td>
              <td className="border p-2">{i.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
