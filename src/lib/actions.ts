'use server'
import { revalidatePath } from 'next/cache'

import { db } from './prisma'
import { auth } from './auth'
import * as Wakatime from '@/types/wakatimeResponse'

export const createPost = async (formData: FormData) => {
  const session = await auth()
  const desc = formData.get('desc') as string
  if (!session || !desc) return
  await db.post.create({
    data: {
      desc: desc,
      userId: session.user.id
    }
  })

  revalidatePath('/guest-book')
}

export const deletePost = async (id: number) => {
  await db.post.delete({
    where: {
      id: id
    }
  })

  revalidatePath('/guest-book')
}

// export const weeklyCodingActivity = async () => {
//   const res = await fetch('https://wakatime.com/share/@Tanveer/018e5b22-78e4-40ad-9547-584697ca728a.json', {
//     cache: 'no-store'
//   })
//   return res.json() as Promise<Wakatime.WeeklyCodingActivity>
// }

// export const weeklyCodingLanguanges = async () => {
//   const res = await fetch('https://wakatime.com/share/@Tanveer/018e5b22-78e4-40ad-9547-584697ca728a.json', {
//     cache: 'no-store'
//   })
//   return res.json() as Promise<Wakatime.WeeklyCodingLanguanges>
// }

// export const weeklyCodeEditor = async () => {
//   const res = await fetch('https://wakatime.com/share/@Tanveer/018e5b22-78e4-40ad-9547-584697ca728a.json', {
//     cache: 'no-store'
//   })
//   return res.json() as Promise<Wakatime.WeeklyCodeEditor>
// }

// export const weeklyOperatingSystems = async () => {
//   const res = await fetch('https://wakatime.com/share/@Tanveer/018e5b22-78e4-40ad-9547-584697ca728a.json', {
//     cache: 'no-store'
//   })
//   return res.json() as Promise<Wakatime.WeeklyCodeEditor>
// }
