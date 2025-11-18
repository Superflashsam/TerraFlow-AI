"use client"
import { useEffect, useState } from "react"
import { getClientAuth } from "@/lib/firebase/client"
import { getIdToken } from "firebase/auth"
import { useForm } from "react-hook-form"

export default function Page() {
  const [items, setItems] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm<{ leadId: string; propertyId: string; agentUid: string; amount: number }>()
  async function load() {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    const res = await fetch("/api/deals", { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    setItems(json.items || [])
  }
  useEffect(() => { load() }, [])
  async function onSubmit(v: any) {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    await fetch("/api/deals", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...v, stage: "prospecting" }) })
    reset()
    load()
  }
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Deals</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <input className="border p-2" placeholder="leadId" {...register("leadId")} />
        <input className="border p-2" placeholder="propertyId" {...register("propertyId")} />
        <input className="border p-2" placeholder="agentUid" {...register("agentUid")} />
        <input className="border p-2" placeholder="amount" type="number" {...register("amount", { valueAsNumber: true })} />
        <button className="bg-black text-white" type="submit">Create</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">leadId</th>
            <th className="border p-2">propertyId</th>
            <th className="border p-2">agentUid</th>
            <th className="border p-2">stage</th>
            <th className="border p-2">amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td className="border p-2">{i.leadId}</td>
              <td className="border p-2">{i.propertyId}</td>
              <td className="border p-2">{i.agentUid}</td>
              <td className="border p-2">{i.stage}</td>
              <td className="border p-2">{i.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
