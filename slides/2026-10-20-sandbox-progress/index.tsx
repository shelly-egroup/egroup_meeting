import { useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import sandboxUser from './assets/sandbox-user.png';
import sandboxIT from './assets/sandbox-it.png';
import sandboxFlow from './assets/sandbox-flow.png';
import sandboxVideoPoster from './assets/course-sandbox-video-poster.png';

const sandboxPlanVideo = new URL('./assets/course-sandbox-presentation-v3.mp4', import.meta.url).href;
const sandboxProcessVideo = new URL('./assets/sandbox-process.mp4', import.meta.url).href;
const sandboxRolesVideo = new URL('./assets/sandbox-roles.mp4', import.meta.url).href;

const c = {
  cream: '#F7F2E7',
  paper: '#FFFDF8',
  navy: '#0A3A67',
  ink: '#17344D',
  muted: '#738291',
  rule: '#D8D3C7',
  light: '#C4D8E9',
  coral: '#E45F50',
  teal: '#158B83',
  gold: '#D7A443',
};

const fontFamily = '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif';
const heavy = { fontWeight: 900, fontVariationSettings: '"wght" 900' } as const;
const bold = { fontWeight: 750, fontVariationSettings: '"wght" 750' } as const;

export const design: DesignSystem = {
  palette: { bg: '#F7F2E7', text: '#0A3A67', accent: '#E45F50' },
  fonts: {
    display: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: { hero: 112, body: 36 },
  radius: 18,
};

export const meta: SlideMeta = {
  title: '2026 / 10 / 20 沙盒進度',
  description: '素菁沙盒流程概念圖，以及預計、流程與角色影片展示。',
  author: 'Shelly',
  createdAt: '2026-10-19T23:35:18.623Z',
};

const base: CSSProperties = {
  width: 1920,
  height: 1080,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: 'var(--osd-bg)',
  color: c.ink,
  fontFamily: 'var(--osd-font-body)',
};

function Footer({ dark = false }: { dark?: boolean }) {
  const { current, total } = useSlidePageNumber();
  return (
    <>
      <div style={{ position: 'absolute', left: 126, bottom: 48, color: dark ? '#AFC1CE' : c.muted, fontSize: 23, lineHeight: 1, ...heavy }}>
        2026 / 10 / 20 沙盒進度
      </div>
      <div style={{ position: 'absolute', right: 126, bottom: 48, color: dark ? '#AFC1CE' : c.muted, fontSize: 23, lineHeight: 1, ...heavy }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </>
  );
}

const Cover: Page = () => (
  <section style={{ ...base, display: 'grid', placeItems: 'center' }}>
    <div style={{ position: 'absolute', left: 126, top: 92, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 44, height: 7, borderRadius: 99, background: c.coral }} />
      <span style={{ width: 44, height: 7, borderRadius: 99, background: c.teal }} />
      <span style={{ width: 44, height: 7, borderRadius: 99, background: c.gold }} />
      <span style={{ marginLeft: 10, color: c.muted, fontSize: 29, letterSpacing: '0.12em', ...heavy }}>SANDBOX PROGRESS</span>
    </div>

    <div style={{ textAlign: 'center', marginTop: -18 }}>
      <div style={{ color: c.navy, fontSize: 78, lineHeight: 1, letterSpacing: '0.03em', ...heavy }}>2026 / 10 / 20</div>
      <h1 style={{ margin: '32px 0 0', color: c.navy, fontSize: 174, lineHeight: 1, letterSpacing: '-0.035em', ...heavy }}>沙盒進度</h1>
      <div style={{ marginTop: 50, color: '#456882', fontSize: 30, letterSpacing: '0.16em', ...heavy }}>Shelly</div>
    </div>

    <Footer />
  </section>
);

const SandboxProgress: Page = () => (
  <section style={{
    ...base,
    padding: '78px 110px 108px',
    background: 'var(--osd-bg)',
    color: 'var(--osd-text)',
    fontWeight: 750,
    fontVariationSettings: '"wght" 750',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, color: c.muted, ...bold }}>
      <span>本週工作進度</span>
      <span>Shelly</span>
    </div>

    <header style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 54, height: 7, borderRadius: 99, background: c.gold }} />
        <span style={{ fontSize: 26, letterSpacing: '0.12em', color: c.gold, ...heavy }}>WEEKLY REPORT</span>
      </div>
      <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--osd-font-display)', fontSize: 84, lineHeight: 1.08, letterSpacing: '-0.025em', ...heavy }}>沙盒</h1>
      <p style={{ margin: '10px 0 0', fontSize: 30, color: c.muted, lineHeight: 1.35, ...bold }}>目前 30%｜本週預計 55%</p>
    </header>

    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 26, marginTop: 36 }}>
      <article style={{ minHeight: 428, padding: '40px 48px', boxSizing: 'border-box', background: c.navy, color: c.paper, borderRadius: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 28 }}>
          <div>
            <span style={{ color: c.light, fontSize: 25, letterSpacing: '0.08em', ...heavy }}>素菁沙盒</span>
            <h2 style={{ margin: '8px 0 0', fontSize: 39, lineHeight: 1.25, ...heavy }}>預計完成　10 月底至 11 月初</h2>
          </div>
          <span style={{ padding: '9px 17px', borderRadius: 999, background: '#153F62', color: c.light, fontSize: 25, ...heavy }}>進行中</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 1fr', alignItems: 'center', gap: 20, marginTop: 24 }}>
          <div>
            <span style={{ color: c.light, fontSize: 26, letterSpacing: '0.08em', ...heavy }}>目前</span>
            <div style={{ marginTop: 8, fontSize: 88, lineHeight: 1, ...heavy }}>30<span style={{ fontSize: 38 }}>%</span></div>
          </div>
          <div style={{ color: '#E8B867', fontSize: 54, textAlign: 'center', ...heavy }}>→</div>
          <div>
            <span style={{ color: '#E8B867', fontSize: 26, letterSpacing: '0.08em', ...heavy }}>本週預計</span>
            <div style={{ marginTop: 8, color: '#E8B867', fontSize: 88, lineHeight: 1, ...heavy }}>55<span style={{ fontSize: 38 }}>%</span></div>
          </div>
        </div>
        <div style={{ height: 12, marginTop: 22, overflow: 'hidden', borderRadius: 99, background: '#315A7B' }}>
          <div style={{ width: '55%', height: '100%', background: c.gold }} />
        </div>
      </article>

      <aside style={{
        minHeight: 428,
        padding: '40px 42px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        background: c.paper,
        border: `1px solid ${c.rule}`,
        borderRadius: 28,
      }}>
        <span style={{ color: c.gold, fontSize: 26, letterSpacing: '0.1em', ...heavy }}>需協助／釐清</span>
        <h2 style={{ margin: '24px 0 0', fontSize: 54, lineHeight: 1.25, ...heavy }}>確認外部進入平台</h2>
      </aside>
    </div>

    <Footer />
  </section>
);

type Diagram = 'user' | 'it' | 'flow';
const viewportWidth = 1668;
const viewportHeight = 748;
const diagramInfo = {
  user: { src: sandboxUser, label: '使用者視角', width: 2200, height: 1280, filename: '素菁沙盒初步概念-使用者.png' },
  it: { src: sandboxIT, label: 'IT 架構', width: 2200, height: 1240, filename: '素菁沙盒初步概念-IT.png' },
  flow: { src: sandboxFlow, label: '完整流程', width: 2200, height: 4700, filename: '沙盒流程.png' },
};

function DiagramButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{
        height: 54,
        padding: '0 23px',
        border: selected ? `2px solid ${c.gold}` : '2px solid #6E8AA4',
        borderRadius: 12,
        background: selected ? c.gold : 'transparent',
        color: selected ? c.navy : c.paper,
        fontFamily,
        fontSize: 23,
        ...heavy,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function DiagramControl({ onClick, children, disabled = false }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 54,
        minWidth: 54,
        padding: '0 17px',
        border: '2px solid #6E8AA4',
        borderRadius: 12,
        background: 'transparent',
        color: disabled ? '#6E8AA4' : c.paper,
        fontFamily,
        fontSize: 23,
        ...heavy,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

const SandboxDiagram: Page = () => {
  const [diagram, setDiagram] = useState<Diagram>('user');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ clientX: number; clientY: number; panX: number; panY: number; renderScale: number } | null>(null);
  const current = diagramInfo[diagram];
  const fit = Math.min(viewportWidth / current.width, viewportHeight / current.height);
  const fittedWidth = current.width * fit;
  const fittedHeight = current.height * fit;

  const clampPan = (x: number, y: number, nextZoom: number) => {
    const maxX = Math.max(0, (fittedWidth * nextZoom - viewportWidth) / 2);
    const maxY = Math.max(0, (fittedHeight * nextZoom - viewportHeight) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };

  const changeDiagram = (next: Diagram) => {
    setDiagram(next);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const changeZoom = (next: number) => {
    const value = Math.max(1, Math.min(4, Math.round(next * 10) / 10));
    setZoom(value);
    setPan((old) => clampPan(old.x, old.y, value));
  };

  return (
    <section style={{ ...base, background: c.navy, color: c.paper }}>
      <div style={{ position: 'absolute', top: 47, left: 126 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 15 }}>
          <span style={{ width: 44, height: 6, background: c.coral, borderRadius: 99 }} />
          <span style={{ width: 44, height: 6, background: c.teal, borderRadius: 99 }} />
          <span style={{ width: 44, height: 6, background: c.gold, borderRadius: 99 }} />
        </div>
        <h1 style={{ margin: 0, fontSize: 62, lineHeight: 1.1, ...heavy }}>素菁沙盒｜流程概念圖</h1>
      </div>
      <div style={{ position: 'absolute', top: 57, right: 126, display: 'flex', gap: 10 }}>
        <DiagramButton selected={diagram === 'user'} onClick={() => changeDiagram('user')}>使用者視角</DiagramButton>
        <DiagramButton selected={diagram === 'it'} onClick={() => changeDiagram('it')}>IT 架構</DiagramButton>
        <DiagramButton selected={diagram === 'flow'} onClick={() => changeDiagram('flow')}>完整流程</DiagramButton>
      </div>
      <div
        aria-label={`${current.label}概念圖，可放大與拖曳`}
        onDoubleClick={() => changeZoom(zoom === 1 ? 1.8 : 1)}
        onPointerDown={(event) => {
          if (zoom === 1) return;
          dragStart.current = {
            clientX: event.clientX,
            clientY: event.clientY,
            panX: pan.x,
            panY: pan.y,
            renderScale: event.currentTarget.getBoundingClientRect().width / viewportWidth,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (!dragStart.current) return;
          const next = clampPan(
            dragStart.current.panX + (event.clientX - dragStart.current.clientX) / dragStart.current.renderScale,
            dragStart.current.panY + (event.clientY - dragStart.current.clientY) / dragStart.current.renderScale,
            zoom,
          );
          setPan(next);
        }}
        onPointerUp={(event) => {
          dragStart.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        onPointerCancel={() => {
          dragStart.current = null;
          setDragging(false);
        }}
        style={{
          position: 'absolute',
          top: 164,
          left: 126,
          width: viewportWidth,
          height: viewportHeight,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          touchAction: 'none',
          cursor: zoom === 1 ? 'zoom-in' : dragging ? 'grabbing' : 'grab',
        }}
      >
        <img
          src={current.src}
          alt={`${current.label}概念圖`}
          draggable={false}
          style={{
            display: 'block',
            width: fittedWidth,
            height: fittedHeight,
            objectFit: 'contain',
            borderRadius: 14,
            boxShadow: '0 24px 70px rgba(0,0,0,.35)',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: dragging ? 'none' : 'transform 180ms ease',
            userSelect: 'none',
          }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 57, right: 126, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#C4D8E9', fontSize: 22, marginRight: 14, ...bold }}>{current.label} · {Math.round(zoom * 100)}%</span>
        <DiagramControl onClick={() => changeZoom(zoom - 0.4)} disabled={zoom === 1}>−</DiagramControl>
        <DiagramControl onClick={() => changeZoom(zoom + 0.4)} disabled={zoom === 4}>＋</DiagramControl>
        <DiagramControl onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} disabled={zoom === 1}>適合畫面</DiagramControl>
        <a
          href={current.src}
          download={current.filename}
          style={{
            height: 54,
            padding: '0 18px',
            borderRadius: 12,
            background: c.gold,
            color: c.navy,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 23,
            textDecoration: 'none',
            ...heavy,
          }}
        >
          下載圖片
        </a>
      </div>
      <Footer dark />
    </section>
  );
};

type VideoKey = 'plan' | 'process' | 'roles';

function VideoTab({ selected, label, note, onClick }: { selected: boolean; label: string; note: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{
        width: 188,
        height: 68,
        padding: '0 20px',
        border: selected ? `2px solid ${c.gold}` : '2px solid #52718B',
        borderRadius: 15,
        background: selected ? c.gold : '#103F67',
        color: selected ? c.navy : c.paper,
        fontFamily,
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{ display: 'block', fontSize: 25, lineHeight: 1.05, ...heavy }}>{label}</span>
      <span style={{ display: 'block', marginTop: 5, color: selected ? '#36536B' : '#AFC9DB', fontSize: 15, lineHeight: 1, ...bold }}>{note}</span>
    </button>
  );
}

const SandboxVideos: Page = () => {
  const [video, setVideo] = useState<VideoKey>('plan');
  const info = video === 'plan'
    ? {
      src: sandboxPlanVideo,
      title: '課務 × 沙盒｜DEMO 示意影片',
      summary: '預計成果與整體操作情境',
      poster: sandboxVideoPoster,
    }
    : video === 'process'
      ? {
        src: sandboxProcessVideo,
        title: '一套流程｜串起完整操作',
        summary: '從進入平台到完成任務的操作流程',
        poster: undefined,
      }
      : {
        src: sandboxRolesVideo,
        title: '分角色｜看見不同視角',
        summary: '依角色呈現各自的任務與操作畫面',
        poster: undefined,
      };

  return (
    <section style={{ ...base, background: c.navy, color: c.paper, padding: '58px 126px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 50 }}>
        <div style={{ minWidth: 700 }}>
          <div style={{ color: c.gold, fontSize: 24, letterSpacing: '0.12em', ...heavy }}>10 / 20 SANDBOX PROGRESS</div>
          <h1 style={{ margin: '10px 0 0', fontSize: 56, lineHeight: 1.08, letterSpacing: '-0.02em', ...heavy }}>{info.title}</h1>
          <p style={{ margin: '10px 0 0', color: '#AFC9DB', fontSize: 24, lineHeight: 1.25, ...bold }}>{info.summary}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingTop: 10 }}>
          <VideoTab selected={video === 'plan'} label="預計" note="整體示意" onClick={() => setVideo('plan')} />
          <VideoTab selected={video === 'process'} label="流程" note="一套流程" onClick={() => setVideo('process')} />
          <VideoTab selected={video === 'roles'} label="角色" note="分角色" onClick={() => setVideo('roles')} />
        </div>
      </div>

      <div style={{ marginTop: 24, height: 770, borderRadius: 26, background: '#071D31', border: '2px solid #3D607C', padding: 12, boxSizing: 'border-box', boxShadow: '0 28px 80px rgba(0,0,0,.28)' }}>
        <video
          key={video}
          src={info.src}
          poster={info.poster}
          controls
          playsInline
          preload="metadata"
          onPlay={(event) => {
            event.currentTarget.removeAttribute('poster');
            event.currentTarget.style.background = '#05080B';
          }}
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 16, background: c.cream, objectFit: 'contain' }}
        >
          您的瀏覽器不支援影片播放。
        </video>
      </div>

      <Footer dark />
    </section>
  );
};

export default [Cover, SandboxProgress, SandboxDiagram, SandboxVideos] satisfies Page[];
