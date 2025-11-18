"use client"
import { useEffect, useState } from "react"
import { getClientDb } from "@/lib/firebase/client"
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"

export default function Page() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      const db = getClientDb()
      if (!db) return
      const q = query(collection(db, "admins"), orderBy("createdAt","desc"), limit(100))
      const snap = await getDocs(q)
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })()
  }, [])
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Admins</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">uid</th>
            <th className="border p-2">email</th>
            <th className="border p-2">displayName</th>
            <th className="border p-2">role</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td className="border p-2">{i.uid}</td>
              <td className="border p-2">{i.email}</td>
              <td className="border p-2">{i.displayName}</td>
              <td className="border p-2">{i.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
