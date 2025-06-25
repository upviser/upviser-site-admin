import { ButtonLink, Table } from "@/components/ui";

export default function Page () {
  return (
    <>
      <div className='p-4 lg:p-6 bg-bg w-full h-full flex flex-col gap-6 dark:bg-neutral-900' style={{ overflow: 'overlay' }}>
        <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
          <h1 className='text-lg my-auto font-medium'>Inicio</h1>
        </div>
        <div className='flex flex-col gap-6 w-full max-w-[1280px] mx-auto mb-4'>
          <h2 className='text-xl font-medium'>¡Hola! Te damos la bienvenida al panel administrativo de tu sitio web</h2>
        </div>
        <div className="flex flex-col gap-4 w-fit">
          <h3 className='font-medium'>Tareas iniciales</h3>
          <Table th={['Tarea', '']}>
            <tr>
              <td className="p-2">Completar datos del negocio</td>
              <td className="p-2"><ButtonLink href={"/configuracion"}>Completar</ButtonLink></td>
            </tr>
            <tr>
              <td className="p-2">Elegir color y estilo del sitio web</td>
              <td className="p-2"><ButtonLink href={"/diseno?page=Estilo"}>Completar</ButtonLink></td>
            </tr>
            <tr>
              <td className="p-2">Agregar productos</td>
              <td className="p-2"><ButtonLink href={"/productos"}>Completar</ButtonLink></td>
            </tr>
            <tr>
              <td className="p-2">Agregar servicios</td>
              <td className="p-2"><ButtonLink href={"/servicios"}>Completar</ButtonLink></td>
            </tr>
            <tr>
              <td className="p-2">Agregar paginas y diseñar cada una</td>
              <td className="p-2"><ButtonLink href={"/diseno"}>Completar</ButtonLink></td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  )
}
