/* WaveDivider — SVG organico tra sezioni.
   Decision: colore fill parametrico per adattarsi a sezioni alternate.
   flip=true inverte verticalmente per transizioni da scuro a chiaro. */
interface Props {
  fill?: string
  bgFill?: string
  flip?: boolean
  className?: string
}

export default function WaveDivider({
  fill = '#DA9100',
  bgFill = '#F5F0E1',
  flip = false,
  className = '',
}: Props) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'relative',
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        background: bgFill,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: 'clamp(40px, 5vw, 80px)' }}
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
