import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#080808',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontWeight: 800,
          fontSize: 18,
          color: '#BFFF00',
          letterSpacing: '-0.05em',
        }}
      >
        BG
      </div>
    ),
    { ...size }
  )
}
