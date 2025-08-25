'use client'
import { useParams } from 'next/navigation'
import Fade from '@/components/Fade'
import AtomSpectrum from '@/components/lessons/AtomSpectrum'
import BandStructure from '@/components/lessons/BandStructure'

const titles: Record<string, string> = {
  'atom-spectrum': '원자 스펙트럼',
  'energy-band': '에너지띠',
  'em-wave': '전자기파',
}

export default function LessonPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const title = titles[slug] || '레슨'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <Fade routeKey={`lesson-${slug}`}>
          + {slug === 'atom-spectrum' && <AtomSpectrum />}
          {slug === 'energy-band' && <BandStructure />}
          {!(slug in titles) && (
            <div className="rounded-2xl border ...">
              <h2>{title}</h2>
              <p>해당 토픽의 데모는 곧 추가됩니다.</p>
            </div>
          )}
        </Fade>
      </main>
    </div>
  )
}
