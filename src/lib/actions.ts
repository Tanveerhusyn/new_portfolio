'use server'
import { revalidatePath } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'
import * as Wakatime from '@/types/wakatimeResponse'
 

export const weeklyCodingActivity = async () => {
  const res = await fetch('https://wakatime.com/share/@018e5b22-78e4-40ad-9547-584697ca728a/8efef587-5c3b-4519-bb45-92e0b4d5cea4.json', {
    cache: 'no-store'
  })
  console.log("Fetch",res)
  return res.json() as Promise<Wakatime.WeeklyCodingActivity>
}

export const weeklyCodingLanguanges = async () => {
  const res = await fetch('https://wakatime.com/share/@018e5b22-78e4-40ad-9547-584697ca728a/0a848370-db4b-46fd-b5ee-0e440ec25d73.json', {
    cache: 'no-store'
  })
  console.log("Language",res)

  return res.json() as Promise<Wakatime.WeeklyCodingLanguanges>
}

export const weeklyCodeEditor = async () => {
  const res = await fetch('https://wakatime.com/share/@018e5b22-78e4-40ad-9547-584697ca728a/7daa3b8b-ef3e-453e-9ac2-5d7fb8e7d286.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}

export const weeklyOperatingSystems = async () => {
  const res = await fetch('https://wakatime.com/share/@018e5b22-78e4-40ad-9547-584697ca728a/3b0f6b63-cc1d-4f29-8211-2da530f01f74.json', {
    cache: 'no-store'
  })
  return res.json() as Promise<Wakatime.WeeklyCodeEditor>
}
