"use client"
import { useForm } from "react-hook-form"
import { getClientAuth } from "@/lib/firebase/client"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const { toast } = useToast()
  async function onSubmit(values: { email: string; password: string }) {
    try {
      const auth = getClientAuth()
      if (!auth) return
      await signInWithEmailAndPassword(auth, values.email, values.password)
      toast({ title: "Logged in", description: "Welcome back." })
    } catch (e) {
      toast({ title: "Error", description: "Login failed." })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-2 p-4">
      <input className="w-full border p-2" placeholder="Email" type="email" {...register("email")} />
      <input className="w-full border p-2" placeholder="Password" type="password" {...register("password")} />
      <button className="w-full bg-black text-white p-2" type="submit">Login</button>
    </form>
  )
}
