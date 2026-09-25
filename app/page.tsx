"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, CloudSun, MapPin, Pause, Play, Sparkles } from "lucide-react";
import { event } from "./invitation-config";

function DragonBall({ small = false }: { small?: boolean }) {
  return <span aria-hidden="true" className={`dragon-ball ${small ? "small" : ""}`}><span>★ ★<br />★ ★</span></span>;
}
function Babies() {
  return <div className="babies">
    {/* INSERTE IMAGEN DE GOKU BEBÉ AQUÍ: cambie images.boy en invitation-config.ts */}
    <img src={event.images.boy} alt="Bebé estilo Goku con una Esfera del Dragón, sobre una nube voladora" width="220" height="220" />
    {/* INSERTE IMAGEN DE PAN BEBÉ AQUÍ: cambie images.girl en invitation-config.ts */}
    <img src={event.images.girl} alt="Bebé estilo Pan sentada sobre una nube voladora" width="220" height="220" />
  </div>;
}
function WhatsApp() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" width="20" height="20"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.7-4.8a8.5 8.5 0 1 1 15.8-4.4Z" /><path d="M8 7.5c-2 3 3.5 8.5 6.5 7l1-1.6-2.7-1.2-.9 1c-1.3-.6-2.3-1.6-2.8-2.8l1-.8-1.2-2.4Z" /></svg>;
}
function Rsvp({ who, phone }: { who: "mamá" | "papá"; phone: string }) {
  const [notice, setNotice] = useState(false);
  const label = `Confirmar con ${who}`;
  const cls = `pill ${who === "mamá" ? "pink" : "blue"}`;
  const number = phone.replace(/\D/g, "");
  return <div>{number ? <a className={cls} href={`https://wa.me/${number}?text=${encodeURIComponent(event.whatsappMessage)}`} target="_blank" rel="noopener noreferrer"><WhatsApp />{label}</a> : <button className={cls} onClick={() => setNotice(true)}><WhatsApp />{label}</button>}{notice && <p role="status" className="notice">El contacto de {who} estará disponible pronto.</p>}</div>;
}
function AudioPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  async function toggle() {
    if (!audio.current) return;
    if (playing) audio.current.pause();
    else { try { await audio.current.play(); setError(false); } catch { setError(true); } }
  }
  return <div className="audio-player"><p className="eyebrow">¡La espera está por terminar!</p><button className={`radar ${playing ? "playing" : ""}`} onClick={toggle} aria-label={playing ? "Pausar música" : "Reproducir música"} aria-pressed={playing}><span className="radar-sweep" />{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}<i /></button><span className="audio-label" role="status">{error ? "No se pudo cargar la música" : playing ? "Una melodía para nuestra aventura" : "Dale play a nuestra aventura"}</span><audio ref={audio} src={event.audio} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError(true); }} /></div>;
}
export default function Home() {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (phase !== "opening") return;
    const timer = window.setTimeout(() => { setPhase("open"); window.scrollTo(0, 0); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [phase]);
  useEffect(() => { if (phase === "open") heading.current?.focus({ preventScroll: true }); }, [phase]);
  return <main className="invitation-shell min-h-screen text-center"><div className="sky-decoration" aria-hidden="true"><span>✧</span><span>✦</span><span>✧</span><span>✧</span><span>✦</span><span>✧</span></div>
    {phase !== "open" ? <section className={`cover ${phase === "opening" ? "opening" : ""}`} aria-label="Abrir invitación"><div className="cover-top"><span className="tiny-stars" aria-hidden="true">✧ &nbsp; ✧ &nbsp; ✧</span><p className="eyebrow">Revelación de género</p><p className="intro-line">Una pequeña vida. Una gran aventura.</p></div><div className="cover-art"><Babies /><div className="envelope"><div className="envelope-letter">Nuestra aventura más bonita<DragonBall small /></div><div className="envelope-back" /><div className="envelope-front" /><div className="envelope-flap" /><button className="seal" aria-label="Abrir invitación de Ruben y Susana" disabled={phase === "opening"} onClick={() => setPhase("opening")}><DragonBall /></button></div></div><div className="open-caption"><span className="eyebrow pulse">Click para abrir</span><span className="caption-rule" /></div><div className="cover-signature"><p className="eyebrow">Con todo nuestro amor</p><h1>{event.parents}</h1><p className="cover-bottom">EL COMIENZO DE NUESTRA MEJOR HISTORIA</p></div><span className="corner-cloud left" aria-hidden="true" /><span className="corner-cloud right" aria-hidden="true" /></section> : <article className="main-invitation relative mx-auto max-w-2xl px-6 sm:px-12">
      <AudioPlayer /><section className="parents-section"><Babies /><span className="eyebrow">Nuestro pequeño universo crece</span><h1 ref={heading} tabIndex={-1}>{event.parents}</h1><div className="ornament" aria-hidden="true">— ✧ —</div><p className="message">Nuestro bebé está en camino... y su poder aumenta como en una transformación Saiyajin.<br /><strong>¿Niño o niña?</strong><br />¡Ven a revelarlo junto a nosotros!</p><ArrowDown className="mx-auto mt-8" size={19} strokeWidth={1} /></section>
      <section className="date-section" aria-label="Fecha y hora del evento"><p className="eyebrow">{event.dayLabel}</p><div className="date-row"><span>{event.month}</span><strong>{event.dayNumber}</strong><span>{event.time}</span></div><span className="tiny-stars" aria-hidden="true">✦</span></section>
      <section className="detail-section"><h2>Dirección</h2><p className="detail-copy">{event.address}</p><a className="pill blue mx-auto" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`} target="_blank" rel="noopener noreferrer"><MapPin size={19} />Ver mapa<CloudSun size={21} /></a></section>
      <section className="detail-section confirmation"><h2>Confirmación</h2><p className="detail-copy">Nos encantaría saber que nos acompañarás.<br />Permítenos preparar los detalles confirmando aquí.</p><div className="mx-auto grid max-w-xs gap-4"><Rsvp who="mamá" phone={event.momPhone} /><Rsvp who="papá" phone={event.dadPhone} /></div></section>
      <section className="gift-section"><div className="ornament" aria-hidden="true">— <Sparkles size={19} /> —</div><h2>¿Cuál es tu predicción?</h2><div className="grid grid-cols-2 gap-5"><div className="prediction boy"><p className="eyebrow">Si crees que será <strong>niño</strong></p>{/* INSERTE IMAGEN DE GOKU BEBÉ CON ESFERA AQUÍ */}<img src={event.images.boyGift} alt="Bebé Goku sosteniendo una Esfera del Dragón" width="220" height="220" loading="lazy" /><p className="gift-title">Trae pañales</p></div><div className="prediction girl"><p className="eyebrow">Si crees que será <strong>niña</strong></p>{/* INSERTE IMAGEN DE PAN BEBÉ SENTADA AQUÍ */}<img src={event.images.girlGift} alt="Bebé Pan sentada" width="220" height="220" loading="lazy" /><p className="gift-title">Trae útiles de aseo</p><p className="gift-note">Jabón, shampoo, aceites, cremas, toallas, etc.</p></div></div></section>
      <section className="dress-section"><DragonBall small /><p className="eyebrow font-semibold">Dress code: blanco</p><p className="detail-copy">Te invitamos a venir vestido/a con una prenda blanca para la revelación.</p></section><footer><h2>¡Te esperamos!</h2><p className="eyebrow">{event.parents}</p><span className="tiny-stars" aria-hidden="true">✧ &nbsp; ✦ &nbsp; ✧</span></footer>
    </article>}
  </main>;
}
