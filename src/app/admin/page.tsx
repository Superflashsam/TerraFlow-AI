"use client"
import Link from "next/link"

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/users" className="border p-4">Users</Link>
        <Link href="/admin/leads" className="border p-4">Leads</Link>
        <Link href="/admin/properties" className="border p-4">Properties</Link>
        <Link href="/admin/deals" className="border p-4">Deals</Link>
        <Link href="/admin/tasks" className="border p-4">Tasks</Link>
      </div>
    </div>
  )
}