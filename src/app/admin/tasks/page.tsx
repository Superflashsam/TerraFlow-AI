"use client"
import { useEffect, useState } from "react"
import { getClientAuth } from "@/lib/firebase/client"
import { getIdToken } from "firebase/auth"
import { useForm } from "react-hook-form"

export default function Page() {
  const [items, setItems] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm<{ title: string; assignedUid: string; dueDate?: number }>()
  async function load() {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    const res = await fetch("/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
    const json = await res.json()
    setItems(json.items || [])
  }
  useEffect(() => { load() }, [])
  async function onSubmit(v: any) {
    const auth = getClientAuth()
    const user = auth?.currentUser
    if (!user) return
    const token = await getIdToken(user, true)
    await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...v, status: "open" }) })
    reset()
    load()
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Tasks</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
        <input className="border p-2" placeholder="title" {...register("title")} />
        <input className="border p-2" placeholder="assignedUid" {...register("assignedUid")} />
        <input className="border p-2" placeholder="dueDate (ms)" type="number" {...register("dueDate", { valueAsNumber: true })} />
        <button className="bg-black text-white" type="submit">Create</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">title</th>
            <th className="border p-2">assignedUid</th>
            <th className="border p-2">status</th>
            <th className="border p-2">dueDate</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td className="border p-2">{i.title}</td>
              <td className="border p-2">{i.assignedUid}</td>
              <td className="border p-2">{i.status}</td>
              <td className="border p-2">{i.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
