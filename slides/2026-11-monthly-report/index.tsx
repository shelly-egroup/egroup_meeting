import { useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import sandboxUser from './assets/sandbox-user.png';
import sandboxIT from './assets/sandbox-it.png';
import sandboxFlow from './assets/sandbox-flow.png';
import sandboxData from './assets/sandbox-data.png';
import hiddenMissionPoster from './assets/hidden-mission-poster.jpg';

const hiddenMissionVideo = new URL('./assets/hidden-mission-witness.mp4', import.meta.url).href;

const fontFamily = '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif';

const c = {
  paper: '#FFFDF8',
  navy: '#0A3A67',
  navyDeep: '#153F62',
  ink: '#17344D',
  muted: '#738291',
  light: '#C4D8E9',
  track: '#315A7B',
  coral: '#E45F50',
  coralSoft: '#F7DED7',
  teal: '#158B83',
  tealSoft: '#DDEEEA',
  gold: '#D7A443',
  goldBright: '#E8B867',
  goldDeep: '#9A6810',
  goldSoft: '#F3E7C8',
  line: '#D8D3C7',
};

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
  title: '2026 / 11 月會報告',
  description: '彙整 10/12、10/19、11/02 三次週會：INFO、DBS 本月完成，沙盒、gooldays 進度、本月預計與秋遊回顧。',
  author: 'Shelly',
  createdAt: '2026-11-03T14:48:11.307Z',
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: { duration: 140, easing: EASE_IN, keyframes: [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }] },
  enter: { duration: 200, delay: 80, easing: EASE_OUT, keyframes: [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};

const motionCss = `
@keyframes m11-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes m11-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes m11-blink { 0%, 100% { opacity: 1; } 50% { opacity: .15; } }
@keyframes m11-stamp { from { opacity: 0; transform: rotate(-10deg) scale(1.6); } to { opacity: 1; transform: rotate(-10deg) scale(1); } }
`;

function Motion() {
  return <style>{motionCss}</style>;
}

// Entrance animations only play on the page the audience is watching; thumbnails and snapshots render settled.
function useMotion(name: string, delay: number, duration = 560) {
  const active = useIsActivePage();
  return active ? { animation: `${name} ${duration}ms ${EASE_OUT} ${delay}ms both` } : {};
}

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

function PageNo() {
  const { current, total } = useSlidePageNumber();
  return <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>;
}

function Footer({ dark = false, pageNo = true }: { dark?: boolean; pageNo?: boolean }) {
  return (
    <div style={{ position: 'absolute', left: 126, right: 126, bottom: 54, display: 'flex', justifyContent: 'space-between', color: dark ? '#AFC1CE' : c.muted, fontSize: 24, lineHeight: 1, ...heavy }}>
      <span>2026 / 11 月會</span>
      {pageNo && <PageNo />}
    </div>
  );
}

function Header({ section, title, note, accent = c.coral }: { section: string; title: string; note?: string; accent?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <div style={{ color: accent, fontSize: 32, letterSpacing: '0.1em', ...heavy }}>{section}</div>
        <h1 style={{ margin: '14px 0 0', color: c.navy, fontSize: 66, lineHeight: 1.12, letterSpacing: '-0.015em', ...heavy }}>
          {title}
          {note && <span style={{ marginLeft: 22, color: c.muted, fontSize: 32, letterSpacing: 0, ...bold }}>{note}</span>}
        </h1>
      </div>
    </div>
  );
}

function Frame({ section, title, note, accent, children }: { section: string; title: string; note?: string; accent?: string; children: ReactNode }) {
  return (
    <section style={{ ...base, padding: '96px 126px 88px' }}>
      <Motion />
      <Header section={section} title={title} note={note} accent={accent} />
      {children}
      <Footer />
    </section>
  );
}

const Cover: Page = () => {
  const line = useMotion('m11-fade', 260, 600);
  const name = useMotion('m11-rise', 360, 600);
  return (
    <section style={{ ...base, display: 'grid', placeItems: 'center' }}>
      <Motion />
      <div style={{ position: 'absolute', left: 126, top: 96, display: 'flex', alignItems: 'center', gap: 16, ...line }}>
        <span style={{ width: 56, height: 7, borderRadius: 99, background: c.coral }} />
        <span style={{ color: c.muted, fontSize: 32, letterSpacing: '0.1em', ...heavy }}>MONTHLY REPORT</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: c.navy, fontSize: 120, lineHeight: 1, letterSpacing: '-0.015em', ...heavy }}>2026 / 11</div>
        <h1 style={{ margin: '28px 0 0', color: c.navy, fontSize: 152, lineHeight: 1.06, letterSpacing: '-0.02em', ...heavy }}>月會報告</h1>
        <div style={{ marginTop: 38, color: '#456882', fontSize: 32, letterSpacing: '0.18em', ...heavy, ...name }}>Shelly</div>
      </div>
      <Footer />
    </section>
  );
};

Cover.transition = {
  duration: 280,
  exit: { duration: 160, easing: EASE_IN, keyframes: [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }] },
  enter: { duration: 280, delay: 100, easing: EASE_OUT, keyframes: [{ opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' }, { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }] },
};

function DoneRow({ number, title, note, color, dark = false, delay, height = 84, large = false }: { number: string; title: string; note?: string; color: string; dark?: boolean; delay: number; height?: number; large?: boolean }) {
  const motion = useMotion('m11-rise', delay, 480);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: large ? '64px 1fr' : '58px 1fr', gap: 10, alignItems: 'center', minHeight: height, borderBottom: dark ? '1px solid rgba(255,255,255,.2)' : `1px solid ${c.line}`, ...motion }}>
      <span style={{ color: dark ? '#B9D3E4' : color, fontSize: large ? 26 : 23, ...heavy }}>{number}</span>
      <div>
        <div style={{ color: dark ? c.paper : c.navy, fontSize: large ? 35 : 31, lineHeight: 1.25, ...heavy }}>{title}</div>
        {note && <div style={{ color: dark ? c.light : c.muted, fontSize: large ? 25 : 22, lineHeight: 1.4, marginTop: large ? 8 : 4, ...bold }}>{note}</div>}
      </div>
    </div>
  );
}

function ColorCard({ label, labelColor, background, height, delay, dark = false, border, children }: { label: string; labelColor: string; background: string; height: number; delay: number; dark?: boolean; border?: string; children: ReactNode }) {
  const motion = useMotion('m11-rise', delay);
  return (
    <div style={{ height, borderRadius: 24, background, border: border ? `2px solid ${border}` : undefined, borderTop: border ? `10px solid ${labelColor}` : undefined, padding: '26px 36px', boxSizing: 'border-box', color: dark ? c.paper : c.ink, display: 'flex', flexDirection: 'column', ...motion }}>
      <div style={{ color: labelColor, fontSize: 28, letterSpacing: '0.08em', marginBottom: 6, ...heavy }}>{label}</div>
      {children}
    </div>
  );
}

function MiniItem({ number, title, note, color, delay }: { number: string; title: string; note: string; color: string; delay: number }) {
  const motion = useMotion('m11-rise', delay, 480);
  return (
    <div style={{ borderTop: `5px solid ${color}`, paddingTop: 12, ...motion }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ color, fontSize: 22, ...heavy }}>{number}</span>
        <span style={{ color: c.navy, fontSize: 28, lineHeight: 1.25, ...heavy }}>{title}</span>
      </div>
      <div style={{ color: c.muted, fontSize: 22, lineHeight: 1.35, marginTop: 6, ...bold }}>{note}</div>
    </div>
  );
}

const InfoCompleted: Page = () => (
  <Frame section="INFO" title="本月完成" accent={c.teal}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '450px 198px', gap: 20, height: 668, marginTop: 44 }}>
      <ColorCard label="分享範本" labelColor={c.light} background={c.navy} height={450} delay={120} dark>
        <DoneRow delay={240} number="01" color={c.teal} dark title="分享範本與過濾站釘選" note="逐一釘選或取消常用項目" />
        <DoneRow delay={300} number="02" color={c.teal} dark title="附件三態，串接 DBS 諮詢" note="不顯示／必填／選填，DBS 諮詢同步套用送件規則" />
        <DoneRow delay={360} number="03" color={c.teal} dark title="分享範本置頂權限" note="移除多餘的權限限制，保留組織隔離" />
        <DoneRow delay={420} number="04" color={c.teal} dark title="分享編輯連結期限" note="套用客戶個別期限，修正相對天數偶爾跨日" />
      </ColorCard>
      <ColorCard label="欄位與資料" labelColor={c.teal} background={c.tealSoft} height={450} delay={200}>
        <DoneRow delay={300} number="05" color={c.teal} title="跨單位欄位群組" note="移轉時保留欄位與群組的對應關係" />
        <DoneRow delay={360} number="06" color={c.teal} title="財務範本欄位 Bug 修正" note="收入不再誤帶支出 ID；後端拒絕重複 ID" />
        <DoneRow delay={420} number="07" color={c.teal} title="Excel 匯入欄位對應" note="固定別名與動態欄位同名時，依型態正確寫入" />
        <DoneRow delay={480} number="08" color={c.teal} title="動態單選欄位儲存" note="清除多選殘留限制，切換類型後可正常儲存" />
      </ColorCard>
      <ColorCard label="CRM／介面" labelColor={c.goldDeep} background={c.goldSoft} height={198} delay={280}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 8 }}>
          <MiniItem delay={500} number="09" color={c.gold} title="CRM 填寫體驗" note="鍵盤填寫、手機日期時間、空白欄位" />
          <MiniItem delay={560} number="10" color={c.gold} title="Info 2.0 彈窗篩選" note="進階篩選不再被彈窗遮住" />
        </div>
      </ColorCard>
      <ColorCard label="測試與相容性" labelColor={c.coral} background={c.paper} border={c.coralSoft} height={198} delay={340}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 2 }}>
          <MiniItem delay={560} number="11" color={c.coral} title="DEV 自動測試登入開關" note="支援測試環境流程" />
          <MiniItem delay={620} number="12" color={c.coral} title="Release token 相容回退" note="恢復跨瀏覽器舊 token 行為" />
        </div>
      </ColorCard>
    </div>
  </Frame>
);

const DbsCompleted: Page = () => (
  <Frame section="DBS" title="本月完成" accent={c.gold}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26, marginTop: 52 }}>
      <ColorCard label="UI / UX 改版" labelColor={c.goldBright} background={c.navy} height={660} delay={120} dark>
        <DoneRow large delay={260} height={186} number="01" color={c.gold} dark title="知識與內容 UI / UX" note="文章、電子報、Podcast、專欄與投稿入口" />
        <DoneRow large delay={330} height={186} number="02" color={c.gold} dark title="活動與課程 UI / UX" />
        <DoneRow large delay={400} height={186} number="03" color={c.gold} dark title="成果發表會入口與放映廳" />
      </ColorCard>
      <ColorCard label="知識庫" labelColor={c.teal} background={c.tealSoft} height={660} delay={200}>
        <DoneRow large delay={330} height={186} number="04" color={c.teal} title="知識庫文章" note="保留作者與閱讀次數，隱藏不可用的導讀" />
        <DoneRow large delay={400} height={186} number="05" color={c.teal} title="知識庫 AI 摘要" note="阻止 AI 失敗訊息被存成文章摘要" />
        <DoneRow large delay={470} height={186} number="06" color={c.teal} title="情境懶人包、快篩與頻道" note="修正摘要清單，避免頻道詳情 500" />
      </ColorCard>
      <ColorCard label="帳號與登入" labelColor={c.coral} background={c.paper} border={c.coralSoft} height={660} delay={280}>
        <DoneRow large delay={400} height={186} number="07" color={c.coral} title="登入、註冊與驗證信" note="分離登入與聯絡信箱、修正 Google 回呼、支援重寄驗證信" />
        <DoneRow large delay={470} height={186} number="08" color={c.coral} title="查詢帳號忘記密碼" />
      </ColorCard>
    </div>
  </Frame>
);

const SANDBOX_FILES_URL = 'https://egroup-sandbox-files.vercel.app/';

type Diagram = 'user' | 'it' | 'flow' | 'data';
const viewportWidth = 1668;
const viewportHeight = 748;
const diagramInfo = {
  user: { src: sandboxUser, label: '使用者視角', width: 2200, height: 1280, filename: '素菁沙盒初步概念-使用者.png' },
  it: { src: sandboxIT, label: 'IT 架構', width: 2200, height: 1240, filename: '素菁沙盒初步概念-IT.png' },
  flow: { src: sandboxFlow, label: '完整流程', width: 2200, height: 4700, filename: '沙盒流程.png' },
  data: { src: sandboxData, label: '資料整理', width: 3600, height: 2420, filename: '素菁資料整理_一張圖看懂.png' },
};

function DiagramButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} style={{ height: 54, padding: '0 23px', border: selected ? `2px solid ${c.gold}` : '2px solid #6E8AA4', borderRadius: 12, background: selected ? c.gold : 'transparent', color: selected ? c.navy : c.paper, fontFamily, fontSize: 23, ...heavy, cursor: 'pointer' }}>{children}</button>
  );
}

function DiagramControl({ onClick, children, disabled = false }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{ height: 54, minWidth: 54, padding: '0 17px', border: '2px solid #6E8AA4', borderRadius: 12, background: 'transparent', color: disabled ? '#6E8AA4' : c.paper, fontFamily, fontSize: 23, ...heavy, cursor: disabled ? 'default' : 'pointer' }}>{children}</button>
  );
}

const SandboxDiagram: Page = () => {
  const [diagram, setDiagram] = useState<Diagram>('data');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ clientX: number; clientY: number; panX: number; panY: number; renderScale: number } | null>(null);
  const reveal = useMotion('m11-rise', 160, 600);
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
      <Motion />
      <div style={{ position: 'absolute', top: 47, left: 126 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 15 }}>
          <span style={{ width: 44, height: 6, background: c.coral, borderRadius: 99 }} />
          <span style={{ width: 44, height: 6, background: c.teal, borderRadius: 99 }} />
          <span style={{ width: 44, height: 6, background: c.gold, borderRadius: 99 }} />
        </div>
        <h1 style={{ margin: 0, fontSize: 62, lineHeight: 1.1, ...heavy }}>素菁沙盒</h1>
      </div>
      <div style={{ position: 'absolute', top: 57, right: 126, display: 'flex', gap: 10 }}>
        <DiagramButton selected={diagram === 'user'} onClick={() => changeDiagram('user')}>使用者視角</DiagramButton>
        <DiagramButton selected={diagram === 'it'} onClick={() => changeDiagram('it')}>IT 架構</DiagramButton>
        <DiagramButton selected={diagram === 'flow'} onClick={() => changeDiagram('flow')}>完整流程</DiagramButton>
        <DiagramButton selected={diagram === 'data'} onClick={() => changeDiagram('data')}>資料整理</DiagramButton>
      </div>
      <div aria-label={`${current.label}概念圖，可放大與拖曳`} onDoubleClick={() => changeZoom(zoom === 1 ? 1.8 : 1)} onPointerDown={(event) => {
        if (zoom === 1) return;
        dragStart.current = { clientX: event.clientX, clientY: event.clientY, panX: pan.x, panY: pan.y, renderScale: event.currentTarget.getBoundingClientRect().width / viewportWidth };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
      }} onPointerMove={(event) => {
        if (!dragStart.current) return;
        const next = clampPan(dragStart.current.panX + (event.clientX - dragStart.current.clientX) / dragStart.current.renderScale, dragStart.current.panY + (event.clientY - dragStart.current.clientY) / dragStart.current.renderScale, zoom);
        setPan(next);
      }} onPointerUp={(event) => {
        dragStart.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        setDragging(false);
      }} onPointerCancel={() => { dragStart.current = null; setDragging(false); }} style={{ position: 'absolute', top: 164, left: 126, width: viewportWidth, height: viewportHeight, display: 'grid', placeItems: 'center', overflow: 'hidden', touchAction: 'none', cursor: zoom === 1 ? 'zoom-in' : dragging ? 'grabbing' : 'grab', ...reveal }}>
        <img src={current.src} alt={`${current.label}概念圖`} draggable={false} style={{ display: 'block', width: fittedWidth, height: fittedHeight, objectFit: 'contain', borderRadius: 14, boxShadow: '0 24px 70px rgba(0,0,0,.35)', transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transition: dragging ? 'none' : 'transform 180ms ease', userSelect: 'none' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 57, right: 126, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: c.light, fontSize: 22, marginRight: 14, ...bold }}>
          {diagram === 'data' ? (
            <a href={SANDBOX_FILES_URL} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>{current.label}</a>
          ) : current.label} · {Math.round(zoom * 100)}%
        </span>
        <DiagramControl onClick={() => changeZoom(zoom - 0.4)} disabled={zoom === 1}>−</DiagramControl>
        <DiagramControl onClick={() => changeZoom(zoom + 0.4)} disabled={zoom === 4}>＋</DiagramControl>
        <DiagramControl onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} disabled={zoom === 1}>適合畫面</DiagramControl>
        <a href={current.src} download={current.filename} style={{ height: 54, padding: '0 18px', borderRadius: 12, background: c.gold, color: c.navy, display: 'inline-flex', alignItems: 'center', fontSize: 23, textDecoration: 'none', ...heavy }}>下載圖片</a>
      </div>
      <Footer dark pageNo={false} />
    </section>
  );
};

const OUTING_SITE_URL = 'https://awesome-autumn-outing.vercel.app/';

const spy = {
  bg: '#070B14',
  panel: '#121C30',
  red: '#FF3B5C',
  blue: '#9DB8FF',
  text: '#EEF2FA',
  dim: '#B4BFD2',
  line: 'rgba(170, 186, 215, .34)',
};

function MissionCard({ no, label, title, delay, children }: { no: string; label: string; title: string; delay: number; children: ReactNode }) {
  const motion = useMotion('m11-rise', delay, 520);
  return (
    <article style={{ padding: '28px 32px', borderRadius: 18, background: spy.panel, border: `1px solid ${spy.line}`, ...motion }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: spy.blue, fontSize: 24, letterSpacing: '0.12em', ...heavy }}>{no} ／ {label}</span>
        <span style={{ padding: '5px 14px', borderRadius: 999, background: 'rgba(255,59,92,.14)', color: spy.red, fontSize: 20, letterSpacing: '0.08em', ...heavy }}>✓ 已完成</span>
      </div>
      <h2 style={{ margin: '14px 0 0', fontSize: 42, lineHeight: 1.2, ...heavy }}>{title}</h2>
      {children}
    </article>
  );
}

const AutumnOuting: Page = () => {
  const active = useIsActivePage();
  const title = useMotion('m11-rise', 140, 600);
  const phone = useMotion('m11-rise', 220, 700);
  const sign = useMotion('m11-fade', 1000, 600);
  return (
    <section style={{ ...base, background: spy.bg, color: spy.text, padding: '70px 126px 88px' }}>
      <Motion />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(900px 600px at 78% 40%, rgba(108,147,255,.16), transparent 70%), radial-gradient(700px 500px at 10% 100%, rgba(255,59,92,.12), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 2px, transparent 2px 5px)' }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 26, color: spy.dim, fontSize: 21, letterSpacing: '0.14em', ...heavy }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: spy.red }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: spy.red, animation: active ? 'm11-blink 1.2s steps(1) infinite' : undefined }} />REC
        </span>
        <span>PLAY HARD</span>
        <span>10.29 AUTUMN OUTING</span>
        <span style={{ marginLeft: 'auto', color: spy.red, letterSpacing: '0.08em', ...sign }}>本訊息將在 5 秒後自動銷毀</span>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 450px', gap: 90, marginTop: 34 }}>
        <div>
          <div style={title}>
            <div style={{ color: spy.red, fontSize: 26, letterSpacing: '0.16em', ...heavy }}>MISSION COMPLETE</div>
            <h1 style={{ margin: '14px 0 0', fontSize: 92, lineHeight: 1.08, letterSpacing: '-0.02em', ...heavy }}>秋遊特務｜<span style={{ color: spy.red }}>任務完成</span></h1>
            <p style={{ margin: '20px 0 0', color: spy.dim, fontSize: 31, lineHeight: 1.5, ...bold }}>10 / 29 秋遊圓滿落幕，謝謝每一位特務出勤。</p>
          </div>

          <div style={{ display: 'grid', gap: 20, marginTop: 40 }}>
            <MissionCard no="01" label="網站製作" title="秋遊特務網站" delay={320}>
              <p style={{ margin: '10px 0 0', color: spy.dim, fontSize: 26, lineHeight: 1.45, ...bold }}>預告片、活動介紹與投票整合在同一個網站，用特務主題揭開整場秋遊。</p>
              <a href={OUTING_SITE_URL} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 12, color: spy.blue, fontSize: 22, textDecoration: 'none', ...heavy }}>awesome-autumn-outing.vercel.app ↗</a>
            </MissionCard>
            <MissionCard no="02" label="隱藏任務" title="任務代號：目擊者" delay={440}>
              <p style={{ margin: '10px 0 0', color: spy.dim, fontSize: 26, lineHeight: 1.5, ...bold }}>從集合到下午茶潛伏蒐證，照片收進「目擊者檔案」、文字收進「目擊者語錄」。</p>
            </MissionCard>
          </div>
        </div>

        <div style={{ position: 'relative', ...phone }}>
          <div style={{ height: 820, borderRadius: 40, padding: 12, boxSizing: 'border-box', background: '#0E1524', border: `2px solid ${spy.line}`, boxShadow: '0 30px 90px rgba(0,0,0,.55), 0 0 0 1px rgba(108,147,255,.15)' }}>
            <video src={hiddenMissionVideo} poster={hiddenMissionPoster} controls playsInline preload="metadata" style={{ display: 'block', width: '100%', height: '100%', borderRadius: 30, background: '#000', objectFit: 'cover' }}>
              您的瀏覽器不支援影片播放。
            </video>
          </div>
          <div style={{ position: 'absolute', top: 40, left: -86, padding: '10px 18px', border: `4px solid ${spy.red}`, borderRadius: 8, color: spy.red, fontSize: 28, letterSpacing: '0.1em', background: 'rgba(7,11,20,.78)', transform: 'rotate(-10deg)', animation: active ? 'm11-stamp 420ms cubic-bezier(.2,.9,.3,1.2) 900ms both' : undefined, ...heavy }}>CASE CLOSED</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 126, right: 126, bottom: 54, display: 'flex', justifyContent: 'space-between', color: spy.dim, fontSize: 24, lineHeight: 1, ...heavy }}>
        <span>2026 / 11 月會</span>
        <PageNo />
      </div>
    </section>
  );
};

function PlanRow({ no, system, title, note, color, delay, groupStart = false, rollout = false }: { no: string; system: string; title: string; note: string; color: string; delay: number; groupStart?: boolean; rollout?: boolean }) {
  const motion = useMotion('m11-rise', delay, 480);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '84px 180px 500px 1fr', alignItems: 'center', minHeight: 80, borderTop: groupStart ? `3px solid ${color}` : `1px solid ${c.line}`, ...motion }}>
      <div style={{ color, fontSize: 28, letterSpacing: '0.08em', ...heavy }}>{no}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color }}>
        <span style={{ width: 8, height: 32, borderRadius: 99, background: color }} />
        <span style={{ fontSize: 24, letterSpacing: '0.04em', ...heavy }}>{system}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: c.navy, fontSize: 33, lineHeight: 1.22, ...heavy }}>{title}</span>
        {rollout && <span style={{ flexShrink: 0, padding: '4px 12px', borderRadius: 999, background: c.tealSoft, color: c.teal, fontSize: 20, ...heavy }}>陸續上線</span>}
      </div>
      <div style={{ color: c.muted, fontSize: 28, lineHeight: 1.35, ...bold }}>{note}</div>
    </div>
  );
}

const NextMonth: Page = () => (
  <Frame section="NEXT" title="本月預計" accent={c.coral}>
    <div style={{ marginTop: 44 }}>
      <PlanRow delay={120} no="01" system="INFO" color={c.teal} groupStart rollout title="過濾站匯入紀錄" note="保存每次匯入紀錄，並可查看逐筆內容。" />
      <PlanRow delay={170} no="02" system="INFO" color={c.teal} rollout title="客戶欄位歷史匯出" note="CRM 客戶欄位的異動歷史可匯出。" />
      <PlanRow delay={220} no="03" system="INFO" color={c.teal} title="分享範本封存" note="分享範本新增封存功能。" />
      <PlanRow delay={270} no="04" system="DBS" color={c.gold} groupStart rollout title="首頁「理線」改版" note="首頁改版，加入 Podcast RSS 彈窗。" />
      <PlanRow delay={320} no="05" system="沙盒" color={c.navy} groupStart title="馴錢師沙盒" note="課務 × 沙盒，從一句需求到一套教材。" />
      <PlanRow delay={370} no="06" system="gooldays" color={c.goldDeep} groupStart title="回憶美好時光" note="人人都能輕鬆做一支片，送給重要的人，也留給自己。" />
      <PlanRow delay={420} no="07" system="AI" color="#5C86AD" groupStart title="AI 同事驗收" note="依實際使用情境進行驗收，彙整需調整事項。" />
      <PlanRow delay={470} no="08" system="合作" color={c.coral} groupStart title="合作項目推進" note="好理家在、InfoCenter。" />
    </div>
  </Frame>
);

export default [
  Cover,
  InfoCompleted,
  DbsCompleted,
  AutumnOuting,
  SandboxDiagram,
  NextMonth,
] satisfies Page[];
