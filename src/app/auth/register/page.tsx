"use client"
import { useForm } from "react-hook-form"
import { getClientAuth } from "@/lib/firebase/client"
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const { toast } = useToast()
  async function onSubmit(values: { email: string; password: string }) {
    try {
      const auth = getClientAuth()
      if (!auth) return
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const token = await getIdToken(userCred.user, true)
      await fetch("/api/admin/claim", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ uid: userCred.user.uid }) })
      toast({ title: "Registered", description: "Admin privileges requested." })
    } catch (e) {
      toast({ title: "Error", description: "Registration failed." })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-2 p-4">
      <input className="w-full border p-2" placeholder="Email" type="email" {...register("email")} />
      <input className="w-full border p-2" placeholder="Password" type="password" {...register("password")} />
      <button className="w-full bg-black text-white p-2" type="submit">Register</button>
    </form>
  )
}
