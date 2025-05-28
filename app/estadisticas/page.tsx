"use client"
import { Button, Input, Select, Spinner } from '@/components/ui'
import { IClient, IFunnel, IService } from '@/interfaces'
import { IStadistics } from '@/interfaces/stadistics'
import { NumberFormat } from '@/utils'
import axios from 'axios'
import Head from 'next/head'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function Page () {

  const [stadistics, setStadistics] = useState<IStadistics>()
  const [filter, setFilter] = useState({
    dateInitial: undefined,
    dateLast: undefined
  })
  const [loading, setLoading] = useState(true)
  const [funnels, setFunnels] = useState<IFunnel[]>([])
  const [selectFunnel, setSelectFunnel] = useState('')
  const [selectService, setSelectService] = useState('')
  const [services, setServices] = useState<IService[]>([])
  const [clients, setClients] = useState<IClient[]>([])

  const getStadistics = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`)
    setStadistics(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getStadistics()
  }, [])

  const getFunnels = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/funnels`)
    setFunnels(res.data)
  }

  useEffect(() => {
    getFunnels()
  }, [])

  const getServices = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`)
    setServices(res.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const getClients = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/clients`)
    setClients(res.data)
  }

  useEffect(() => {
    getClients()
  }, [])

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleFilter = async () => {
    if (!loading) {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stadistics`, filter)
      setStadistics(response.data)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Estadisticas</title>
      </Head>
        <div className='p-6 bg-bg flex flex-col gap-6 w-full h-full overflow-y-auto dark:bg-neutral-900'>
          <div className='flex flex-col gap-4 w-full max-w-[1280px] mx-auto'>
            <h1 className='text-lg font-medium'>Estadisticas</h1>
            <p className='text-[15px] font-medium'>Estadisticas del sitio</p>
            <div className='flex gap-2 flex-col lg:flex-row'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Desde</p>
                <Input type='date' change={inputChange} name='dateInitial' />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'>Hasta</p>
                <Input type='date' change={inputChange} name='dateLast' />
              </div>
              <Button action={handleFilter} config='mt-auto'>Filtrar</Button>
            </div>
          </div>
          <div className='flex gap-6 w-full flex-wrap max-w-[1280px] mx-auto overflow-auto min-h-[550px]'>
            {
              loading
                ? (
                  <div className='w-full flex mt-20'>
                    <div className='w-fit m-auto'>
                      <Spinner />
                    </div>
                  </div>
                )
                : stadistics?.checkouts.length || stadistics?.clients.length || stadistics?.leads.length || stadistics?.pages.length || stadistics?.pays.length || stadistics?.sessions.length
                  ? (
                    <>
                      <div className='flex flex-col gap-4 w-full max-w-[1280px] min-w-[800px]'>
                        {
                          stadistics.pays.length || stadistics.sells.length
                            ? (
                              <div className='col-span-4 p-6 w-full h-fit flex flex-col gap-3 border border-black/5 bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700 shadow-card dark:shadow-card-dark'>
                                <p className='font-medium text-[15px]'>Tasa de conversion</p>
                                <div className='flex gap-2 justify-around flex-wrap'>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.pages.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.pages.length)) * 100) : 0}%</p>
                                    <p className='mx-auto text-center text-sm'>Paginas visitadas</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.sessions.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.sessions.length)) * 100) : 0}%</p>
                                    <p className='mx-auto text-center text-sm'>Sesiones</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.viewContents.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.viewContents.length)) * 100) : 0}%</p>
                                    <p className='mx-auto text-center text-sm'>Productos visitados</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.addCarts.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.addCarts.length)) * 100) : 0}%</p>
                                    <p className='mx-auto text-center text-sm'>Añadidos al carrito</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{stadistics.leads.length ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.leads.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.leads.length)) * 100) : 0 : '-'}{stadistics.leads.length ? '%' : ''}</p>
                                    <p className='mx-auto text-center text-sm'>Registros completados</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{stadistics.meetings.length ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.meetings.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.meetings.length)) * 100) : 0 : '-'}{stadistics.meetings.length ? '%' : ''}</p>
                                    <p className='mx-auto text-center text-sm'>Reuniones agendadas</p>
                                  </div>
                                  <div className='flex flex-col gap-2 justify-between min-w-32'>
                                    <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.checkouts.length + stadistics.informations.length)) * 100) ? Math.round((Number(stadistics.pays.length + stadistics.sells.length) / Number(stadistics.checkouts.length + stadistics.informations.length)) * 100) : 0}%</p>
                                    <p className='mx-auto text-center text-sm'>Checkout</p>
                                  </div>
                                </div>
                              </div>
                            )
                            : ''
                        }
                        <div className='grid grid-cols-4 gap-4'>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Total vendido</p>
                            <p className='text-2xl font-medium m-auto'>${NumberFormat(Number(stadistics.pays.reduce((prev, curr) => prev + Number(curr.price), 0)) + Number(stadistics.sells.reduce((prev, curr) => prev + Number(curr.total), 0)))}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Ventas</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.pays.length + stadistics.sells.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Checkout</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.checkouts.length + stadistics.informations.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Reuniones agendadas</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.meetings.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Registros completados</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.leads.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Añadidos al carrito</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.addCarts.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Productos visitados</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.viewContents.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Sesiones totales</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.sessions.length}</p>
                          </div>
                          <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                            <p className='font-medium text-[15px]'>Paginas visitadas</p>
                            <p className='text-2xl font-medium m-auto'>{stadistics.pages.length}</p>
                          </div>
                        </div>
                      </div>
                      {
                        funnels.length
                          ? (
                            <>
                              <p className='font-medium my-auto'>Embudos</p>
                                <Select change={(e: any) => setSelectFunnel(e.target.value)} config='w-fit'>
                                  <option value=''>Todos</option>
                                  {
                                    funnels.map(funnel => <option key={funnel._id} value={funnel._id}>{funnel.funnel}</option>)
                                  }
                                </Select>
                                {
                                  selectFunnel !== ''
                                    ? (
                                      <div className='col-span-4 p-6 w-full flex flex-col gap-3 border border-black/5 bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700 shadow-card dark:shadow-card-dark'>
                                        <p className='font-medium text-[15px]'>Tasa de conversion</p>
                                        <div className={`overflow-y-auto grid grid-cols-${funnels.find(funnel => funnel._id === selectFunnel)?.steps.length} divide-x divide-black/5 dark:divide-neutral-700`}>
                                          {
                                            funnels.find(funnel => funnel._id === selectFunnel)?.steps.map((step, index, steps) => (
                                              <div key={step._id} className='flex flex-col gap-2 justify-between min-w-28'>
                                                <p className='text-center my-auto'>{step.step}</p>
                                                <p className='text-2xl font-medium mx-auto text-center'>
                                                  {
                                                    clients.filter(client => 
                                                      client.funnels?.some(funnel => 
                                                        funnel.funnel === selectFunnel && 
                                                        steps.findIndex(s => s._id === funnel.step) >= index
                                                      )
                                                    ).length
                                                  }
                                                </p>
                                                <p className='text-center text-lg font-medium'>
                                                {
                                                  (() => {
                                                    // Clientes en el último paso del embudo
                                                    const clientsInLastStep = clients.filter(client => 
                                                      client.funnels?.some(funn => 
                                                        funn.funnel === selectFunnel && 
                                                        funn.step === steps.slice(-1)[0]._id
                                                      )
                                                    ).length;

                                                    // Clientes en el paso actual o posterior
                                                    const clientsInCurrentOrLaterStep = clients.filter(client => 
                                                      client.funnels?.some(funn => 
                                                        funn.funnel === selectFunnel && 
                                                        steps.findIndex(s => s._id === funn.step) >= index
                                                      )
                                                    ).length;

                                                    // Si no hay clientes en el último paso, mostrar '0%'
                                                    if (clientsInLastStep === 0) {
                                                      return '0%';
                                                    }

                                                    // Calcular el porcentaje
                                                    const percentage = (clientsInCurrentOrLaterStep / clientsInLastStep) * 100;
                                                    return `${percentage.toFixed(2)}%`; // Mostrar con 2 decimales
                                                  })()
                                                }
                                                </p>
                                              </div>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    )
                                    : ''
                                }
                                <div className='grid grid-cols-4 gap-4 w-full max-w-[1280px] min-w-[800px]'>
                                  <div className='col-span-4 p-6 w-full flex flex-col gap-3 border border-black/5 bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700 shadow-card dark:shadow-card-dark'>
                                    <p className='font-medium text-[15px]'>Tasa de conversion</p>
                                    <div className='grid grid-cols-5 divide-x divide-black/5 dark:divide-neutral-700'>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.pages.filter(page => selectFunnel ? page.funnel === selectFunnel : page.funnel).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.pages.filter(page => selectFunnel ? page.funnel === selectFunnel : page.funnel).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Paginas visitadas</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.sessions.filter(session => selectFunnel ? session.funnel === selectFunnel : session.funnel).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.sessions.filter(session => selectFunnel ? session.funnel === selectFunnel : session.funnel).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Sesiones</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.leads.filter(lead => selectFunnel ? lead.funnel === selectFunnel : lead.funnel).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.leads.filter(lead => selectFunnel ? lead.funnel === selectFunnel : lead.funnel).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Registros completados</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.meetings.filter(meeting => selectFunnel ? meeting.funnel === selectFunnel : meeting.funnel).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.meetings.filter(meeting => selectFunnel ? meeting.funnel === selectFunnel : meeting.funnel).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Reuniones agendadas</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.checkouts.filter(checkout => selectFunnel ? checkout.funnel === selectFunnel : checkout.funnel).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length) / Number(stadistics.checkouts.filter(checkout => selectFunnel ? checkout.funnel === selectFunnel : checkout.funnel).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Checkout</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Total vendido</p>
                                    <p className='text-2xl font-medium m-auto'>${NumberFormat(Number(stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).reduce((prev, curr) => prev + Number(curr.price), 0)))}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Ventas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.pays.filter(pay => selectFunnel ? pay.funnel === selectFunnel : pay.funnel).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Checkout</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.checkouts.filter(checkout => selectFunnel ? checkout.funnel === selectFunnel : checkout.funnel).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Reuniones agendadas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.meetings.filter(meeting => selectFunnel ? meeting.funnel === selectFunnel : meeting.funnel).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Registros completados</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.leads.filter(lead => selectFunnel ? lead.funnel === selectFunnel : lead.funnel).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Sesiones totales</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.sessions.filter(session => selectFunnel ? session.funnel === selectFunnel : session.funnel).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Paginas visitadas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.pages.filter(page => selectFunnel ? page.funnel === selectFunnel : page.funnel).length}</p>
                                  </div>
                                </div>
                            </>
                          )
                          : ''
                      }
                      {
                        services.length
                          ? (
                            <>
                              <p className='font-medium my-auto'>Servicios</p>
                                <Select change={(e: any) => setSelectService(e.target.value)} config='w-fit'>
                                  <option value=''>Todos</option>
                                  {
                                    services.map(service => <option key={service._id} value={service._id}>{service.name}</option>)
                                  }
                                </Select>
                                {
                                  selectService !== ''
                                    ? (
                                      <div className='col-span-4 p-6 w-full flex flex-col gap-3 border border-black/5 bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700 shadow-card dark:shadow-card-dark'>
                                        <p className='font-medium text-[15px]'>Tasa de conversion</p>
                                        <div className={`overflow-y-auto grid grid-cols-${services.find(service => service._id === selectService)?.steps.length} divide-x divide-black/5 dark:divide-neutral-700`}>
                                          {
                                            services.find(service => service._id === selectService)?.steps.map((step, index, steps) => (
                                              <div key={step._id} className='flex flex-col gap-2 justify-between min-w-28'>
                                                <p className='text-center my-auto'>{step.step}</p>
                                                <p className='text-2xl font-medium mx-auto text-center'>
                                                  {
                                                    clients.filter(client => 
                                                      client.services?.some(service => 
                                                        service.service === selectService && 
                                                        steps.findIndex(s => s._id === service.step) >= index
                                                      )
                                                    ).length
                                                  }
                                                </p>
                                                <p className='text-center text-lg font-medium'>
                                                  {
                                                    (() => {
                                                      // Clientes en el último paso del embudo
                                                      const clientsInLastStep = clients.filter(client => 
                                                        client.services?.some(service => 
                                                          service.service === selectService && 
                                                          service.step === steps.slice(-1)[0]._id
                                                        )
                                                      ).length;

                                                      // Clientes en el paso actual o posterior
                                                      const clientsInCurrentOrLaterStep = clients.filter(client => 
                                                        client.services?.some(service => 
                                                          service.service === selectService && 
                                                          steps.findIndex(s => s._id === service.step) >= index
                                                        )
                                                      ).length;

                                                      // Si no hay clientes en el último paso, mostrar '0%'
                                                      if (clientsInLastStep === 0) {
                                                        return '0%';
                                                      }

                                                      // Calcular el porcentaje
                                                      const percentage = (clientsInCurrentOrLaterStep / clientsInLastStep) * 100;
                                                      return `${percentage.toFixed(2)}%`; // Mostrar con 2 decimales
                                                    })()
                                                  }
                                                </p>
                                              </div>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    )
                                    : ''
                                }
                                <div className='grid grid-cols-4 gap-4 w-full max-w-[1280px] min-w-[800px]'>
                                  <div className='col-span-4 p-6 w-full flex flex-col gap-3 border border-black/5  bg-white rounded-xl dark:bg-neutral-800 dark:border-neutral-700 shadow-card dark:shadow-card-dark'>
                                    <p className='font-medium text-[15px]'>Tasa de conversion</p>
                                    <div className='grid grid-cols-5 divide-x divide-black/5 dark:divide-neutral-700'>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.pages.filter(page => selectService ? page.service === selectService : page.service).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.pages.filter(page => selectService ? page.service === selectService : page.service).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Paginas visitadas</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.sessions.filter(session => selectService ? session.service === selectService : session.service).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.sessions.filter(session => selectService ? session.service === selectService : session.service).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Sesiones</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.leads.filter(lead => selectService ? lead.service === selectService : lead.service).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.leads.filter(lead => selectService ? lead.service === selectService : lead.service).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Registros completados</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.meetings.filter(meeting => selectService ? meeting.service === selectService : meeting.service).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.meetings.filter(meeting => selectService ? meeting.service === selectService : meeting.service).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Reuniones agendadas</p>
                                      </div>
                                      <div className='flex flex-col gap-2 justify-between'>
                                        <p className='text-2xl font-medium mx-auto'>{Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.checkouts.filter(checkout => selectService ? checkout.service === selectService : checkout.service).length)) * 100) ? Math.round((Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length) / Number(stadistics.checkouts.filter(checkout => selectService ? checkout.service === selectService : checkout.service).length)) * 100) : 0}%</p>
                                        <p className='mx-auto text-center text-sm'>Checkout</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Total vendido</p>
                                    <p className='text-2xl font-medium m-auto'>${NumberFormat(Number(stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).reduce((prev, curr) => prev + Number(curr.price), 0)))}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Ventas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.pays.filter(pay => selectService ? pay.service === selectService : pay.service).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Checkout</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.checkouts.filter(checkout => selectService ? checkout.service === selectService : checkout.service).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Reuniones agendadas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.meetings.filter(meeting => selectService ? meeting.service === selectService : meeting.service).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Registros completados</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.leads.filter(lead => selectService ? lead.service === selectService : lead.service).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Sesiones totales</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.sessions.filter(session => selectService ? session.service === selectService : session.service).length}</p>
                                  </div>
                                  <div className='p-6 col-span-1 h-[150px] flex flex-col gap-3 border border-black/5 bg-white rounded-xl shadow-card dark:shadow-card-dark dark:bg-neutral-800 dark:border-neutral-700'>
                                    <p className='font-medium text-[15px]'>Paginas visitadas</p>
                                    <p className='text-2xl font-medium m-auto'>{stadistics.pages.filter(page => selectService ? page.service === selectService : page.service).length}</p>
                                  </div>
                                </div>
                            </>
                          )
                          : ''
                      }
                    </>
                  )
                  : <p>No hay estadisticas disponibles</p>
            }
          </div>
        </div>
    </>
  )
}