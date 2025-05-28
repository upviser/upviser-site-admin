"use client"
import { Button, ButtonSubmit, Input } from "@/components/ui"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Page () {

  const { data: session } = useSession()

  const [userData, setUserData] = useState({ _id: session?.user._id, name: session?.user.name, email: session?.user.email, password: '' })
  const [loading, setLoading] = useState(false) 
  
  return (
    <>
      <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
        <div className='w-full flex flex-col gap-4 max-w-[1280px] mx-auto'>
          <h1 className='text-2xl font-medium'>Mis datos</h1>
          <div className="flex flex-col gap-2">
            <p>Nombre</p>
            <Input change={(e: any) => setUserData({ ...userData, name: e.target.value })} placeholder="Nombre" value={userData.name} config="w-full max-w-[600px]" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Email</p>
            <Input change={(e: any) => setUserData({ ...userData, email: e.target.value })} placeholder="Email" value={userData.email} config="w-full max-w-[600px]" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Contraseña</p>
            <Input change={(e: any) => setUserData({ ...userData, password: e.target.value })} placeholder="Contraseña" value={userData.password} config="w-full max-w-[600px]" />
          </div>
          <ButtonSubmit action={async (e: any) => {
            e.preventDefault()
            if (!loading) {
              setLoading(true)
              await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shop-login`, userData)
              await signOut()
            }
          }} config="w-40" submitLoading={loading} textButton="Guardar datos" color="main" />
        </div>
      </div>
    </>
  )
}