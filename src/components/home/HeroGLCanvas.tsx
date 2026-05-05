'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uResolution;
varying vec2  vUv;

vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy  -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m = max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m = m*m; m = m*m;
  vec3 x  = 2.*fract(p*C.www)-1.;
  vec3 h  = abs(x)-.5;
  vec3 ox = floor(x+.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x *x0.x  + h.x *x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.*dot(m,g);
}

void main(){
  vec2 uv = vUv;
  float ar = uResolution.x / uResolution.y;

  // aspect-corrected space centred at 0
  vec2 pos = (uv - .5) * vec2(ar, 1.);

  float t = uTime * .1;

  // layered simplex noise
  float n1 = snoise(pos * 1.4 + vec2(t*.6, t*.25));
  float n2 = snoise(pos * 2.6 + vec2(-t*.45, t*.8) + n1*.28);
  float n3 = snoise(pos * 5.2 + vec2(t*.28, -t*.55) + n2*.18);
  float noise = (n1*.5 + n2*.3 + n3*.2) * .5 + .5;

  // corner glow (top-right) — primary
  vec2 corner1 = vec2(ar*.5, -.5);
  float cDist1 = length(pos - corner1);
  float cGlow1 = smoothstep(1.2, 0., cDist1) * .24;

  // ambient glow (bottom-left) — secondary, cooler
  vec2 corner2 = vec2(-ar*.48, .42);
  float cDist2 = length(pos - corner2);
  float cGlow2 = smoothstep(.75, 0., cDist2) * .09;

  // mouse glow
  vec2 mWorld = uMouse * vec2(ar*.5, .5);
  float mDist  = length(pos - mWorld);
  float mGlow  = smoothstep(.72, 0., mDist) * .28;

  // combine
  float alpha = noise * .08 + cGlow1 + cGlow2 + mGlow;
  alpha = clamp(alpha, 0., .34);

  vec3 lime = vec3(.749, 1., 0.);
  vec3 col  = mix(vec3(.031), lime, alpha);

  gl_FragColor = vec4(col, 1.);
}
`

export default function HeroGLCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    // scene / camera
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // fullscreen quad
    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime:       { value: 0 },
        uMouse:      { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) },
      },
    })
    scene.add(new THREE.Mesh(geo, mat))

    // mouse tracking
    const targetMouse = new THREE.Vector2(0, 0)
    const smoothMouse = new THREE.Vector2(0, 0)

    const onMove = (e: MouseEvent) => {
      targetMouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // resize
    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight)
      mat.uniforms.uResolution.value.set(el.clientWidth, el.clientHeight)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(el)

    // render loop
    const clock = new THREE.Clock()
    let rafId = 0

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      mat.uniforms.uTime.value = clock.getElapsedTime()
      // smooth mouse lerp
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.06
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.06
      mat.uniforms.uMouse.value.copy(smoothMouse)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      renderer.dispose()
      mat.dispose()
      geo.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
