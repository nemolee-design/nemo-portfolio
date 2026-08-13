"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { id: "01", type: "APP / PRODUCT", title: "Luma Health", desc: "让健康管理变得更轻、更自然的移动体验", tone: "coral", year: "2025", meta: "策略 · UX · UI", mock: "app" },
  { id: "02", type: "WEB / INTERACTION", title: "Atelier No.7", desc: "为独立艺术空间打造的沉浸式数字展厅", tone: "blue", year: "2024", meta: "创意开发 · 动效", mock: "web" },
  { id: "03", type: "ART / EXPLORATION", title: "Soft Geometry", desc: "关于形状、触感与情绪的一组视觉实验", tone: "lime", year: "2024", meta: "绘画 · 视觉实验", mock: "art" },
  { id: "04", type: "APP / SERVICE", title: "Nomad Notes", desc: "为旅行者重新设计灵感收集与行程规划", tone: "violet", year: "2023", meta: "研究 · 产品设计", mock: "notes" },
];

function Visual({ mock }: { mock: string }) {
  if (mock === "app") return <div className="phones"><div className="phone"><i/><b>08:42</b><span className="orb"/><strong>今天感觉<br/>怎么样？</strong><small>记录此刻状态</small></div><div className="phone back"><i/><b>本周状态</b><div className="chart"/><small>平衡度 +18%</small></div></div>;
  if (mock === "web") return <div className="browser-mock"><div className="browser-bar"><i/><i/><i/></div><div className="web-art"><span>ATELIER</span><b>NO.7</b><em>Contemporary art<br/>in motion.</em></div></div>;
  if (mock === "art") return <div className="art-grid"><i/><i/><i/><i/></div>;
  return <div className="notes-mock"><div className="map-line"/><div className="note-card"><small>KYOTO · DAY 03</small><strong>在陌生城市里<br/>收集微小灵感</strong><span>12 places saved</span></div></div>;
}

export default function Home() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const root = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")), { threshold: .12 });
    root.current?.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; cursorRef.current?.classList.add("visible"); glowRef.current?.style.setProperty("--gx", `${tx}px`); glowRef.current?.style.setProperty("--gy", `${ty}px`); const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5; heroRef.current?.style.setProperty("--hero-x",`${nx}`); heroRef.current?.style.setProperty("--hero-y",`${ny}`); };
    const leave = () => cursorRef.current?.classList.remove("visible");
    const tick = () => { x += (tx-x)*.14; y += (ty-y)*.14; const angle=Math.atan2(ty-y,tx-x)*180/Math.PI; const distance=Math.min(115,Math.hypot(tx-x,ty-y)*1.35+25); if(cursorRef.current) cursorRef.current.style.transform=`translate3d(${tx}px,${ty}px,0)`; if(trailRef.current){trailRef.current.style.width=`${distance}px`;trailRef.current.style.transform=`translate3d(${x}px,${y}px,0) rotate(${angle}deg)`;} raf=requestAnimationFrame(tick); };
    window.addEventListener("pointermove", move); document.documentElement.addEventListener("mouseleave", leave); tick();
    return () => { observer.disconnect(); window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", leave); cancelAnimationFrame(raf); };
  }, []);
  const tilt = (e: React.PointerEvent<HTMLElement>) => { const el=e.currentTarget,r=el.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-12,ry=((e.clientX-r.left)/r.width-.5)*14;el.style.setProperty("--rx",`${rx}deg`);el.style.setProperty("--ry",`${ry}deg`);el.style.setProperty("--mx",`${e.clientX-r.left}px`);el.style.setProperty("--my",`${e.clientY-r.top}px`); };
  const untilt = (e: React.PointerEvent<HTMLElement>) => { e.currentTarget.style.setProperty("--rx","0deg");e.currentTarget.style.setProperty("--ry","0deg"); };
  return <main ref={root}>
    <div className="stars"/><div className="cursor-glow" ref={glowRef}/><div className="comet-tail" ref={trailRef}/><div className="planet-cursor" ref={cursorRef}><i/><span/></div>
    <header><a className="logo" href="#top">YI<span>·</span>DESIGN</a><nav><a href="#work">作品</a><a href="#about">关于</a><a href="mailto:hello@example.com">联系</a></nav><a className="available" href="mailto:hello@example.com"><i/> AVAILABLE FOR WORK</a></header>
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-kicker"><span>UI / UX & INTERACTION DESIGNER</span><span>BASED IN SHANGHAI · 2026</span></div>
      <h1><span className="line"><em>Designing</em> meaningful</span><span className="line offset">digital <i>experiences.</i></span></h1>
      <div className="hero-bottom"><p>你好，我是 <b>Yi</b>。一名专注于数字产品与交互体验的设计师，<br/>相信好的设计应该清晰、克制，也让人感到愉悦。</p><a href="#work" className="scroll">向下探索 <i>↓</i></a></div>
      <div className="float-shape"><span/><span/><span/></div>
    </section>
    <section className="work" id="work">
      <div className="section-head reveal"><div><small>01 / SELECTED WORK</small><h2>精选作品</h2></div></div>
      <div className="project-list">{projects.map((p) => <article className="project reveal" key={p.id} tabIndex={0} role="button" aria-label={`打开项目 ${p.title}`} onPointerMove={tilt} onPointerLeave={untilt} onClick={()=>setSelected(p)} onKeyDown={e=>{if(e.key==="Enter")setSelected(p)}}>
        <div className={`project-visual ${p.tone}`}><Visual mock={p.mock}/><span className="num">{p.id}</span></div>
        <div className="project-info"><div><small>{p.type}</small><h3>{p.title}</h3><p>{p.desc}</p></div><div className="project-meta"><span>{p.meta}</span><span>{p.year}</span><button aria-label={`查看 ${p.title}`}>↗</button></div></div>
      </article>)}</div>
    </section>
    <section className="about reveal" id="about"><div className="about-label"><small>02 / ABOUT ME</small><span className="portrait"><i>Y</i></span></div><div className="about-copy"><h2>在逻辑与感性之间，<br/>寻找设计的<em>恰好。</em></h2><p>我有 5 年数字产品设计经验，擅长从复杂问题中梳理清晰路径，并通过细腻的视觉和动效赋予产品温度。工作之外，我用绘画记录那些语言无法描述的感受。</p><div className="skills"><span>Product Design</span><span>Interaction</span><span>Visual Design</span><span>Prototyping</span><span>Illustration</span></div></div></section>
    <footer><div><small>有一个有趣的想法？</small><h2>LET'S MAKE<br/><i>SOMETHING</i> GREAT.</h2></div><a href="mailto:hello@example.com">HELLO@EXAMPLE.COM <b>↗</b></a><div className="footer-bottom"><span>© 2026 YI DESIGN</span><span>BEHANCE · DRIBBBLE · INSTAGRAM</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    {selected&&<div className="case-overlay" role="dialog" aria-modal="true" aria-label={selected.title}><button className="case-close" onClick={()=>setSelected(null)}>关闭 ×</button><div className="case-shell"><div className={`case-hero ${selected.tone}`}><Visual mock={selected.mock}/><span>{selected.id} / {selected.year}</span></div><div className="case-copy"><small>{selected.type}</small><h2>{selected.title}</h2><p>{selected.desc}</p><div className="case-facts"><span>角色<br/><b>{selected.meta}</b></span><span>周期<br/><b>8–12 周</b></span><span>成果<br/><b>体验提升 32%</b></span></div><h3>从问题出发，建立清晰而有温度的体验。</h3><p>这是项目详情页的首版结构。之后可以替换为真实的项目背景、研究过程、用户旅程、设计系统与最终成果，让每个案例成为完整的设计叙事。</p></div></div></div>}
  </main>;
}
