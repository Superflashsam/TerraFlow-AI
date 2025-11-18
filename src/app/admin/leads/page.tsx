"use client"
import { useEffect, useState } from "react"
import { getClientAuth } from "@/lib/firebase/client"
import { getIdToken } from "firebase/auth"
import { useForm } from "react-hook-form"

export default function Page() {
  const [items, setItems] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm<{ ownerUid: string; firstName: string; lastName: string }>()
  async function load() {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    const res = await fetch("/api/leads", { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    setItems(json.items || [])
  }
  useEffect(() => { load() }, [])
  async function onSubmit(v: { ownerUid: string; firstName: string; lastName: string }) {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(v) })
    reset()
    load()
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Leads</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <input className="border p-2" placeholder="ownerUid" {...register("ownerUid")} />
        <input className="border p-2" placeholder="firstName" {...register("firstName")} />
        <input className="border p-2" placeholder="lastName" {...register("lastName")} />
        <button className="bg-black text-white" type="submit">Create</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">name</th>
            <th className="border p-2">ownerUid</th>
            <th className="border p-2">status</th>
            <th className="border p-2">score</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td className="border p-2">{i.firstName} {i.lastName}</td>
              <td className="border p-2">{i.ownerUid}</td>
              <td className="border p-2">{i.status}</td>
              <td className="border p-2">{i.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
