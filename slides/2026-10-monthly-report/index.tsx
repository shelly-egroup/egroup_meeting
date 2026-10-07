import { useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import sandboxUser from './assets/sandbox-user.png';
import sandboxIT from './assets/sandbox-it.png';
import sandboxFlow from './assets/sandbox-flow.png';

const c = {
  cream: '#F7F2E7',
  paper: '#FFFDF8',
  navy: '#0A3A67',
  ink: '#17344D',
  muted: '#738291',
  coral: '#E45F50',
  coralSoft: '#F7DED7',
  teal: '#158B83',
  tealSoft: '#DDEEEA',
  gold: '#D7A443',
  goldSoft: '#F3E7C8',
  line: '#D8D3C7',
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
  title: '2026 / 10 月會報告',
  description: '週會成果去重、CRM User 復原、本月預計與素菁沙盒資料盤整。',
  author: 'Shelly',
  createdAt: '2026-10-07T09:31:50.462Z',
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
  return (
    <div style={{ position: 'absolute', left: 126, bottom: 54, color: dark ? '#AFC1CE' : c.muted, fontSize: 24, lineHeight: 1, ...heavy }}>
      2026 / 10 月會
    </div>
  );
}

function Header({ section, title, accent = c.coral }: { section: string; title: string; accent?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <div>
        <div style={{ color: accent, fontSize: 32, letterSpacing: '0.1em', ...heavy }}>{section}</div>
        <h1 style={{ margin: '14px 0 0', color: c.navy, fontSize: 66, lineHeight: 1.12, letterSpacing: '-0.015em', ...heavy }}>{title}</h1>
      </div>
      <div style={{ width: 132, height: 9, borderRadius: 999, background: accent }} />
    </div>
  );
}

function Frame({ section, title, accent, children }: { section: string; title: string; accent?: string; children: ReactNode }) {
  return (
    <section style={{ ...base, padding: '96px 126px 88px' }}>
      <Header section={section} title={title} accent={accent} />
      {children}
      <Footer />
    </section>
  );
}

function ResultRow({ number, children, dark = false, color = c.teal, compact = false }: { number: string; children: ReactNode; dark?: boolean; color?: string; compact?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: compact ? '55px 1fr' : '62px 1fr', gap: 10, alignItems: 'center', minHeight: compact ? 76 : 87, borderBottom: dark ? '1px solid rgba(255,255,255,.22)' : `1px solid ${c.line}` }}>
      <span style={{ color: dark ? '#B9D3E4' : color, fontSize: 23, ...heavy }}>{number}</span>
      <span style={{ color: dark ? c.paper : c.ink, fontSize: compact ? 28 : 31, lineHeight: 1.27, ...heavy }}>{children}</span>
    </div>
  );
}

function PlanRow({ no, system, title, note, groupStart = false }: { no: string; system: 'AIOps' | 'INFO' | 'DBS' | 'AI' | '合作'; title: string; note: string; groupStart?: boolean }) {
  const color = system === 'DBS' ? c.teal : system === 'INFO' ? c.gold : system === 'AIOps' ? c.coral : c.navy;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '88px 158px 535px 1fr', alignItems: 'center', minHeight: 145, borderTop: groupStart ? `3px solid ${color}` : `1px solid ${c.line}` }}>
      <div style={{ color, fontSize: 30, letterSpacing: '0.08em', ...heavy }}>{no}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color }}>
        <span style={{ width: 8, height: 34, borderRadius: 99, background: color }} />
        <span style={{ fontSize: 24, letterSpacing: '0.04em', ...heavy }}>{system}</span>
      </div>
      <div style={{ color: c.navy, fontSize: 35, lineHeight: 1.22, ...heavy }}>{title}</div>
      <div style={{ color: c.muted, fontSize: 30, lineHeight: 1.35, ...bold }}>{note}</div>
    </div>
  );
}

const Cover: Page = () => (
  <section style={{ ...base, display: 'grid', placeItems: 'center' }}>
    <div style={{ position: 'absolute', left: 126, top: 96, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ width: 56, height: 7, borderRadius: 99, background: c.coral }} />
      <span style={{ color: c.muted, fontSize: 32, letterSpacing: '0.1em', ...heavy }}>MONTHLY REPORT</span>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ color: c.navy, fontSize: 120, lineHeight: 1, letterSpacing: '-0.015em', ...heavy }}>2026 / 10</div>
      <h1 style={{ margin: '28px 0 0', color: c.navy, fontSize: 152, lineHeight: 1.06, letterSpacing: '-0.02em', ...heavy }}>月會報告</h1>
      <div style={{ marginTop: 38, color: '#456882', fontSize: 32, letterSpacing: '0.18em', ...heavy }}>Shelly</div>
    </div>
    <Footer />
  </section>
);

const AIOpsCompleted: Page = () => (
  <Frame section="AIOps" title="本月完成" accent={c.coral}>
    <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 34, marginTop: 58 }}>
      <div style={{ height: 640, borderRadius: 24, background: c.navy, padding: '38px 42px', boxSizing: 'border-box', color: c.paper }}>
        <div style={{ color: '#C4D8E9', fontSize: 27, letterSpacing: '0.08em', ...heavy }}>INFO／共用</div>
        <h2 style={{ margin: '18px 0 28px', fontSize: 42, ...heavy }}>資料與分頁穩定</h2>
        <ResultRow number="01" dark>防止事件表欄位錯位</ResultRow>
        <ResultRow number="02" dark>保護 ShareTemplate 分頁契約</ResultRow>
        <ResultRow number="03" dark>表單必填生日須為有效日期</ResultRow>
      </div>
      <div style={{ height: 640, borderRadius: 24, background: c.tealSoft, padding: '32px 40px', boxSizing: 'border-box' }}>
        <div style={{ color: c.teal, fontSize: 28, letterSpacing: '0.08em', marginBottom: 16, ...heavy }}>DBS 內容｜修正與互動</div>
        <ResultRow number="04" compact>文章留言總數統計與顯示</ResultRow>
        <ResultRow number="05" compact>逐字稿視窗重開修復</ResultRow>
        <ResultRow number="06" compact>顯示過期活動</ResultRow>
        <ResultRow number="07" compact>AI 搜尋文章另開分頁</ResultRow>
        <ResultRow number="08" compact>文章 Email 分享</ResultRow>
        <ResultRow number="09" compact>新知識庫文章僅顯示指定標籤</ResultRow>
      </div>
    </div>
  </Frame>
);

const DbsCompleted: Page = () => (
  <Frame section="DBS" title="本月完成" accent={c.teal}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, marginTop: 72 }}>
      <div style={{ height: 540, borderRadius: 24, background: c.tealSoft, padding: '42px 48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ color: c.teal, fontSize: 26, letterSpacing: '0.1em', ...heavy }}>FEATURE</div>
        <div>
          <h2 style={{ color: c.navy, fontSize: 52, lineHeight: 1.2, margin: 0, ...heavy }}>文章排程與 AI 推薦</h2>
          <p style={{ color: c.ink, fontSize: 29, lineHeight: 1.45, margin: '18px 0 0', ...bold }}>完成文章排程設定，並呈現 AI 推薦內容。</p>
        </div>
        <div style={{ borderTop: '2px solid rgba(10,58,103,.18)', paddingTop: 22 }}>
          <div style={{ color: c.teal, fontSize: 23, ...heavy }}>財務檢視</div>
          <div style={{ color: c.navy, fontSize: 36, marginTop: 10, ...heavy }}>年月查詢、記帳圓餅圖</div>
        </div>
      </div>
      <div style={{ height: 540, borderRadius: 24, background: c.navy, padding: '42px 48px', boxSizing: 'border-box', color: c.paper, display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#C4D8E9', fontSize: 26, letterSpacing: '0.1em', ...heavy }}>內容呈現</div>
        <div style={{ marginTop: 86, color: '#BCE5DC', fontSize: 29, ...heavy }}>已完成</div>
        <h2 style={{ fontSize: 68, lineHeight: 1.2, margin: '24px 0 0', ...heavy }}>電子報排序</h2>
        <div style={{ marginTop: 'auto', paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.25)', fontSize: 28, color: '#C4D8E9', ...bold }}>調整電子報列表的呈現順序</div>
      </div>
    </div>
  </Frame>
);

const InfoCompleted: Page = () => (
  <Frame section="INFO" title="本月完成" accent={c.coral}>
    <div style={{ display: 'grid', gridTemplateColumns: '.93fr 1.07fr', gap: 34, marginTop: 58 }}>
      <div style={{ display: 'grid', gridTemplateRows: '248px 392px', gap: 24 }}>
        <div style={{ borderRadius: 24, background: c.navy, color: c.paper, padding: '30px 38px', boxSizing: 'border-box' }}>
          <div style={{ color: '#C4D8E9', fontSize: 26, ...heavy }}>資料復原</div>
          <h2 style={{ fontSize: 51, lineHeight: 1.16, margin: '22px 0 0', ...heavy }}>CRM User 復原完成</h2>
          <p style={{ color: '#C4D8E9', fontSize: 27, lineHeight: 1.35, margin: '16px 0 0', ...bold }}>誤刪的主資料已復原，保留原使用者 ID。</p>
        </div>
        <div style={{ borderRadius: 24, background: c.tealSoft, padding: '22px 36px', boxSizing: 'border-box' }}>
          <div style={{ color: c.teal, fontSize: 28, marginBottom: 8, ...heavy }}>分享與資料保護</div>
          <ResultRow number="01" compact>分享、與我分享及批次簡訊／Email</ResultRow>
          <ResultRow number="02" compact>CRM 登入資料避免寫成 NULL</ResultRow>
          <ResultRow number="03" compact>分享範本名稱同步</ResultRow>
          <ResultRow number="04" compact>事件儀表板功能完成</ResultRow>
        </div>
      </div>
      <div style={{ height: 664, borderRadius: 24, background: c.paper, border: `2px solid ${c.coralSoft}`, borderTop: `11px solid ${c.coral}`, padding: '26px 38px', boxSizing: 'border-box' }}>
        <div style={{ color: c.navy, fontSize: 37, marginBottom: 12, ...heavy }}>事件與搜尋修正</div>
        <ResultRow number="01" color={c.coral} compact>事件日期的月／日統一補成兩位數</ResultRow>
        <ResultRow number="02" color={c.coral} compact>建立事件成員依設定，且可為空</ResultRow>
        <ResultRow number="03" color={c.coral} compact>DBS 事件依填表姓名；事件名採個案姓名</ResultRow>
        <ResultRow number="04" color={c.coral} compact>布告欄返回列表還原查詢位置</ResultRow>
        <ResultRow number="05" color={c.coral} compact>無留言事件也可匯出</ResultRow>
        <ResultRow number="06" color={c.coral} compact>Milvus 搜尋連線修正</ResultRow>
      </div>
    </div>
  </Frame>
);

const NextMonth: Page = () => (
  <Frame section="INFO × DBS" title="本月預計" accent={c.gold}>
    <div style={{ marginTop: 48 }}>
      <PlanRow no="01" system="INFO" title="分享範本與過濾站釘選" note="逐一釘選或取消常用項目；過濾站保留分享範本、Excel 匯入的來源分組。" groupStart />
      <PlanRow no="02" system="INFO" title="跨單位欄位群組" note="處理欄位群組跨單位移轉，保留欄位與群組的對應關係。" />
      <PlanRow no="03" system="DBS" title="知識與內容 UI / UX" note="看看文章、電子報、聽聽 Podcast、多多益善專欄及投稿分享入口，提高互動。" groupStart />
      <PlanRow no="04" system="AI" title="AI 同事驗收" note="依實際使用情境進行驗收，彙整需調整事項。" groupStart />
      <PlanRow no="05" system="合作" title="合作項目推進" note="好理家在、InfoCenter、芥菜種會。" />
    </div>
  </Frame>
);

function SandboxMetric({ value, unit, label, color }: { value: string; unit: string; label: string; color: string }) {
  return (
    <div style={{ borderTop: `8px solid ${color}`, paddingTop: 30 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <span style={{ color: c.navy, fontSize: 108, lineHeight: 1, ...heavy }}>{value}</span>
        <span style={{ color, fontSize: 35, ...heavy }}>{unit}</span>
      </div>
      <div style={{ color: c.ink, fontSize: 37, marginTop: 20, ...heavy }}>{label}</div>
    </div>
  );
}

const SandboxNumbers: Page = () => (
  <Frame section="素菁沙盒" title="資料盤整進度" accent={c.navy}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, marginTop: 84 }}>
      <span style={{ color: c.navy, fontSize: 160, lineHeight: 1, ...heavy }}>3,554</span>
      <span style={{ color: c.muted, fontSize: 39, ...heavy }}>份原始檔案</span>
    </div>
    <div style={{ color: c.ink, fontSize: 43, marginTop: 37, ...heavy }}>其中，整理出以下三類資料</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 70, marginTop: 66 }}>
      <SandboxMetric value="864" unit="份" label="教育訓練素材" color={c.coral} />
      <SandboxMetric value="35" unit="份" label="講綱資料" color={c.teal} />
      <SandboxMetric value="2" unit="項" label="申請指引" color={c.gold} />
    </div>
  </Frame>
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
    <button type="button" aria-pressed={selected} onClick={onClick} style={{ height: 54, padding: '0 23px', border: selected ? `2px solid ${c.gold}` : '2px solid #6E8AA4', borderRadius: 12, background: selected ? c.gold : 'transparent', color: selected ? c.navy : c.paper, fontFamily, fontSize: 23, ...heavy, cursor: 'pointer' }}>{children}</button>
  );
}

function DiagramControl({ onClick, children, disabled = false }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{ height: 54, minWidth: 54, padding: '0 17px', border: '2px solid #6E8AA4', borderRadius: 12, background: 'transparent', color: disabled ? '#6E8AA4' : c.paper, fontFamily, fontSize: 23, ...heavy, cursor: disabled ? 'default' : 'pointer' }}>{children}</button>
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
      }} onPointerCancel={() => { dragStart.current = null; setDragging(false); }} style={{ position: 'absolute', top: 164, left: 126, width: viewportWidth, height: viewportHeight, display: 'grid', placeItems: 'center', overflow: 'hidden', touchAction: 'none', cursor: zoom === 1 ? 'zoom-in' : dragging ? 'grabbing' : 'grab' }}>
        <img src={current.src} alt={`${current.label}概念圖`} draggable={false} style={{ display: 'block', width: fittedWidth, height: fittedHeight, objectFit: 'contain', borderRadius: 14, boxShadow: '0 24px 70px rgba(0,0,0,.35)', transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transition: dragging ? 'none' : 'transform 180ms ease', userSelect: 'none' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 57, right: 126, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#C4D8E9', fontSize: 22, marginRight: 14, ...bold }}>{current.label} · {Math.round(zoom * 100)}%</span>
        <DiagramControl onClick={() => changeZoom(zoom - 0.4)} disabled={zoom === 1}>−</DiagramControl>
        <DiagramControl onClick={() => changeZoom(zoom + 0.4)} disabled={zoom === 4}>＋</DiagramControl>
        <DiagramControl onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} disabled={zoom === 1}>適合畫面</DiagramControl>
        <a href={current.src} download={current.filename} style={{ height: 54, padding: '0 18px', borderRadius: 12, background: c.gold, color: c.navy, display: 'inline-flex', alignItems: 'center', fontSize: 23, textDecoration: 'none', ...heavy }}>下載圖片</a>
      </div>
      <Footer dark />
    </section>
  );
};

export default [Cover, AIOpsCompleted, DbsCompleted, InfoCompleted, NextMonth, SandboxNumbers, SandboxDiagram] satisfies Page[];
