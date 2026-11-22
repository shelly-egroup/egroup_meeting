import type { CSSProperties, ReactNode } from 'react';
import { useIsActivePage, useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#F7F2E7', text: '#0A3A67', accent: '#E45F50' },
  fonts: {
    display: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: { hero: 96, body: 36 },
  radius: 18,
};

export const meta: SlideMeta = {
  title: '2026 / 11 / 23 週會',
  description: '上週完成 INFO 與 DBS BUG 修正；本週預計 INFO、DBS、沙盒與 gooldays 進度。',
  author: 'Shelly',
  createdAt: '2026-11-23T08:00:00.000Z',
};

const c = {
  muted: '#738291',
  rule: '#D8D3C7',
  navy: '#0A3A67',
  navyLine: '#506F8A',
  paper: '#FFFDF8',
  light: '#C4D8E9',
  teal: '#158B83',
  tealSoft: '#DDEEEA',
  gold: '#D7A443',
  goldDeep: '#9A6810',
  goldBright: '#E8B867',
  goldSoft: '#F4E5B9',
  coral: '#E45F50',
  coralSoft: '#F8DDD6',
};

type Tone = { main: string; deep: string; soft: string; onNavy: string };
const tone = {
  aiops: { main: c.coral, deep: '#B8402F', soft: c.coralSoft, onNavy: '#F2A193' },
  info: { main: c.teal, deep: c.teal, soft: c.tealSoft, onNavy: c.light },
  dbs: { main: c.gold, deep: c.goldDeep, soft: c.goldSoft, onNavy: c.goldBright },
} satisfies Record<string, Tone>;

const heavy = { fontWeight: 900, fontVariationSettings: '"wght" 900' } as const;
const bold = { fontWeight: 850, fontVariationSettings: '"wght" 850' } as const;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

// Page enter: quiet 6px rise. Cover settles with a hair of blur.
export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 140, easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 220, delay: 80, easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// In-page motion. Only the instance the audience watches animates;
// thumbnails, overview and print render the settled state.
const motionCss = `
@keyframes w1123-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes w1123-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes w1123-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes w1123-pop { 0% { opacity: 0; transform: scale(0.82); } 65% { opacity: 1; transform: scale(1.06); } 100% { opacity: 1; transform: scale(1); } }
@property --w1123-n { syntax: '<integer>'; inherits: false; initial-value: 0; }
@keyframes w1123-count { from { --w1123-n: var(--w1123-from); } }
.w1123-count::after { content: counter(w1123); }
@keyframes w1123-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.8); } }
`;

function MotionStyles() {
  return <style>{motionCss}</style>;
}

function useMotion(name: 'rise' | 'fade' | 'grow' | 'pop', delay = 0, duration = 560): CSSProperties {
  const live = useIsActivePage();
  if (!live) return {};
  return { animation: `w1123-${name} ${duration}ms ${EASE_OUT} ${delay}ms both` };
}

// Counts from `from` to `to` on the CSS animation clock, so it stays in sync with the bar.
function CountUp({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) {
  const live = useIsActivePage();
  const style = {
    '--w1123-from': from,
    '--w1123-n': to,
    counterReset: 'w1123 var(--w1123-n)',
    animation: live ? `w1123-count 1100ms ${EASE_OUT} ${delay}ms both` : 'none',
  } as CSSProperties;
  return <span className="w1123-count" style={style} aria-label={String(to)} />;
}

function Footer() {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{
      position: 'absolute', bottom: 52, left: 110, right: 110,
      display: 'flex', justifyContent: 'space-between',
      fontSize: 24, color: c.muted, ...bold,
    }}>
      <span>2026 / 11 / 23 週會</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
}

function Frame({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section data-weekly-page={name} style={{
      width: '100%', height: '100%', position: 'relative',
      boxSizing: 'border-box', padding: '70px 110px 108px',
      background: 'var(--osd-bg)', color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)', fontWeight: 750,
      fontVariationSettings: '"wght" 750',
    }}>
      <MotionStyles />
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 26, ...bold, color: c.muted,
      }}>
        <span>本週工作進度</span>
        <span>Shelly</span>
      </div>
      {children}
      <Footer />
    </section>
  );
}

function Heading({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  const line = useMotion('grow', 60, 520);
  const titleIn = useMotion('rise', 0, 520);
  const subIn = useMotion('rise', 120, 520);
  return (
    <header style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 54, height: 7, borderRadius: 99, background: accent, transformOrigin: 'left', ...line }} />
        <span style={{ fontSize: 26, letterSpacing: '0.12em', color: accent, ...heavy }}>WEEKLY REPORT</span>
      </div>
      <h1 style={{
        margin: '10px 0 0', fontFamily: 'var(--osd-font-display)',
        fontSize: 76, lineHeight: 1.08, letterSpacing: '-0.025em', ...heavy, ...titleIn,
      }}>{title}</h1>
      <p style={{ margin: '7px 0 0', fontSize: 29, color: c.muted, lineHeight: 1.35, ...bold, ...subIn }}>{subtitle}</p>
    </header>
  );
}

function DoneBadge({ t, delay }: { t: Tone; delay: number }) {
  const pop = useMotion('pop', delay, 460);
  return (
    <span style={{
      flexShrink: 0, padding: '8px 16px', borderRadius: 999,
      background: t.soft, color: t.deep, fontSize: 22, ...heavy, ...pop,
    }}>✓ 完成</span>
  );
}

function DoneRow({ index, title, note, t, order, height = 118 }: {
  index: string; title: string; note?: string; t: Tone; order: number; height?: number;
}) {
  const delay = 260 + order * 90;
  const rise = useMotion('rise', delay);
  const tall = height >= 160;
  return (
    <article style={{
      height, boxSizing: 'border-box', padding: '0 34px 0 30px',
      display: 'grid', gridTemplateColumns: '68px 1fr auto', alignItems: 'center', gap: 22,
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 22,
      borderLeft: `8px solid ${t.main}`, ...rise,
    }}>
      <span style={{ color: t.main, fontSize: 34, ...heavy }}>{index}</span>
      <div>
        <h2 style={{ margin: 0, fontSize: tall ? 46 : 36, lineHeight: 1.2, ...heavy }}>{title}</h2>
        {note && <p style={{ margin: tall ? '12px 0 0' : '7px 0 0', color: c.muted, fontSize: tall ? 27 : 23, lineHeight: 1.35, ...bold }}>{note}</p>}
      </div>
      <DoneBadge t={t} delay={delay + 320} />
    </article>
  );
}

function ProgressBar({ current, target, t }: { current: number; target: number; t: Tone }) {
  const grow = useMotion('grow', 520, 1100);
  return (
    <div style={{ position: 'relative', height: 16, borderRadius: 99, background: 'rgba(10, 58, 103, 0.10)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, width: `${current}%`, background: t.deep }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${current}%`, width: `${target - current}%`,
        background: `repeating-linear-gradient(135deg, ${t.main} 0 10px, ${t.soft} 10px 18px)`,
        transformOrigin: 'left', ...grow,
      }} />
    </div>
  );
}

function ProgressAside({ current, target, due, t }: { current: number; target: number; due: string; t: Tone }) {
  const rise = useMotion('rise', 220);
  return (
    <aside style={{
      padding: '44px 46px 42px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      background: t.soft, borderRadius: 28, ...rise,
    }}>
      <span style={{ color: t.deep, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>目前</span>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <strong style={{ fontSize: 96, lineHeight: 1, ...heavy }}>{current}</strong>
        <span style={{ fontSize: 40, ...heavy }}>%</span>
      </div>
      <div style={{ margin: '34px 0 30px' }}>
        <ProgressBar current={current} target={target} t={t} />
      </div>
      <span style={{ color: t.deep, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>本週預計</span>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 12, color: t.deep }}>
        <strong style={{ fontSize: 96, lineHeight: 1, ...heavy }}><CountUp from={current} to={target} delay={520} /></strong>
        <span style={{ fontSize: 40, ...heavy }}>%</span>
      </div>
      <div style={{
        marginTop: 'auto', paddingTop: 22, borderTop: `2px solid ${t.main}33`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{ color: c.muted, fontSize: 25, ...bold }}>預計完成</span>
        <span style={{ fontSize: 36, ...heavy }}>{due}</span>
      </div>
    </aside>
  );
}

function LiveChip({ color }: { color: string }) {
  const live = useIsActivePage();
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '10px 20px', borderRadius: 999, background: '#153F62', color: c.light, fontSize: 25, ...heavy,
    }}>
      <span style={{
        width: 12, height: 12, borderRadius: 99, background: color,
        animation: live ? 'w1123-pulse 1.6s ease-in-out infinite' : 'none',
      }} />
      進行中
    </span>
  );
}

function BoardLink({ href, color }: { href: string; color: string }) {
  const rise = useMotion('rise', 420);
  const label = href.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      alignSelf: 'flex-start', marginTop: 34,
      padding: '14px 28px', borderRadius: 999, background: '#153F62',
      color, fontSize: 32, lineHeight: 1.2, textDecoration: 'none', ...heavy, ...rise,
    }}>
      {label} ↗
    </a>
  );
}

function ProgressBoard({ tag, title, t, done = false, link, children }: { tag: string; title?: string; t: Tone; done?: boolean; link?: string; children?: ReactNode }) {
  const rise = useMotion('rise', 160);
  return (
    <article style={{
      padding: '40px 54px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      background: c.navy, color: c.paper, borderRadius: 28, ...rise,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: t.onNavy, fontSize: 27, letterSpacing: '0.12em', ...heavy }}>{tag}</span>
        {done ? <DoneChip color={t.onNavy} /> : <LiveChip color={t.onNavy} />}
      </div>
      {title ? (<h2 style={{
        margin: children ? '22px 0 0' : 'auto 0 0',
        fontSize: children ? 64 : 104, lineHeight: 1.12, letterSpacing: '-0.01em', ...heavy,
      }}>{title}</h2>) : null}
      {children ?? <div style={{ width: 96, height: 8, marginTop: 30, borderRadius: 99, background: t.onNavy }} />}
      {link ? <BoardLink href={link} color={t.onNavy} /> : null}
    </article>
  );
}

function DoneChip({ color }: { color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '10px 20px', borderRadius: 999, background: '#153F62', color: c.paper, fontSize: 25, ...heavy,
    }}>
      <span style={{ color }}>✓</span>
      完成
    </span>
  );
}

function BoardItems({ children }: { children: ReactNode }) {
  return <div style={{ flex: 1, minHeight: 0, display: 'grid', gridAutoRows: 'minmax(0, 1fr)', marginTop: 24 }}>{children}</div>;
}

function BoardItem({ title, note, order, compact = false }: { title: string; note?: string; order: number; compact?: boolean }) {
  const rise = useMotion('rise', 380 + order * 140);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: `1px solid ${c.navyLine}`, ...rise }}>
      <div style={{ fontSize: compact ? 48 : 56, lineHeight: 1.25, ...heavy }}>{title}</div>
      {note ? <div style={{ marginTop: 10, color: c.light, fontSize: compact ? 28 : 32, lineHeight: 1.35, ...bold }}>{note}</div> : null}
    </div>
  );
}

function DoneAside({ t }: { t: Tone }) {
  const rise = useMotion('rise', 220);
  const grow = useMotion('grow', 520, 1100);
  const pop = useMotion('pop', 1500, 460);
  return (
    <aside style={{
      padding: '44px 46px 42px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      background: t.soft, borderRadius: 28, ...rise,
    }}>
      <span style={{ color: t.deep, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>目前</span>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 12, color: t.deep }}>
        <strong style={{ fontSize: 96, lineHeight: 1, ...heavy }}><CountUp from={0} to={100} delay={520} /></strong>
        <span style={{ fontSize: 40, ...heavy }}>%</span>
      </div>
      <div style={{ position: 'relative', height: 16, margin: '34px 0 30px', borderRadius: 99, background: 'rgba(10, 58, 103, 0.10)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: t.deep, transformOrigin: 'left', ...grow }} />
      </div>
      <span style={{ color: t.deep, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>狀態</span>
      <div style={{ marginTop: 8, color: t.deep, fontSize: 92, lineHeight: 1.05, transformOrigin: 'left center', ...heavy, ...pop }}>✓ 完成</div>
      <div style={{
        marginTop: 'auto', paddingTop: 22, borderTop: `2px solid ${t.main}33`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{ color: c.muted, fontSize: 25, ...bold }}>完成時間</span>
        <span style={{ fontSize: 36, ...heavy }}>上週</span>
      </div>
    </aside>
  );
}

const progressGrid: CSSProperties = {
  display: 'grid', gridTemplateColumns: '1.32fr 0.68fr',
  height: 620, gap: 26, marginTop: 32,
};

const Cover: Page = () => {
  const eyebrow = useMotion('fade', 0, 600);
  const line = useMotion('grow', 120, 600);
  const date = useMotion('rise', 140, 640);
  const title = useMotion('rise', 280, 640);
  const name = useMotion('rise', 440, 640);
  return (
    <section data-weekly-page="封面" style={{
      width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box',
      display: 'grid', placeItems: 'center', padding: 110,
      background: 'var(--osd-bg)', color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-display)',
    }}>
      <MotionStyles />
      <div style={{ position: 'absolute', top: 96, left: 110, display: 'flex', alignItems: 'center', gap: 18, ...eyebrow }}>
        <span style={{ width: 56, height: 7, borderRadius: 99, background: 'var(--osd-accent)', transformOrigin: 'left', ...line }} />
        <span style={{ fontSize: 28, letterSpacing: '0.1em', color: c.muted, ...heavy }}>WEEKLY REPORT</span>
      </div>
      <div data-content style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 108, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy, ...date }}>2026 / 11 / 23</div>
        <h1 style={{ fontSize: 150, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '26px 0 0', ...heavy, ...title }}>週會報告</h1>
        <div style={{ marginTop: 42, fontSize: 32, lineHeight: 1.2, letterSpacing: '0.12em', color: '#456882', ...heavy, ...name }}>Shelly</div>
      </div>
      <Footer />
    </section>
  );
};

Cover.transition = {
  duration: 280,
  exit: {
    duration: 160, easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280, delay: 100, easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

function DoneLine({ tag, title, note, order, t }: { tag: string; title: string; note: string; order: number; t: Tone }) {
  const rise = useMotion('rise', 380 + order * 120);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '120px 1fr 620px', alignItems: 'center', gap: 36,
      borderTop: `1px solid ${c.navyLine}`, ...rise,
    }}>
      <span style={{ color: t.onNavy, fontSize: 26, letterSpacing: '0.1em', ...heavy }}>{tag}</span>
      <span style={{ fontSize: 44, lineHeight: 1.2, ...heavy }}>{title}</span>
      <span style={{ color: c.light, fontSize: 27, lineHeight: 1.35, ...bold }}>{note}</span>
    </div>
  );
}

const LastWeek: Page = () => (
  <Frame name="上週完成">
    <Heading title="上週完成" subtitle="INFO · DBS" accent={tone.info.main} />
    <div style={{ display: 'grid', height: 620, marginTop: 32 }}>
      <ProgressBoard tag="上週完成" t={tone.info} done>
        <BoardItems>
          <DoneLine order={0} tag="INFO" t={tone.info} title="成員列表標籤篩選 BUG 修正" note="套用標籤篩選不再回傳 500 錯誤" />
          <DoneLine order={1} tag="INFO" t={tone.info} title="語音轉文字解碼失敗 BUG 修正" note="解碼失敗時自動改用驗證過的 FLAC 音檔重試" />
          <DoneLine order={2} tag="INFO" t={tone.info} title="事件 Excel 匯出 BUG 修正" note="支援含毫秒的日期，匯出失敗顯示正確訊息" />
          <DoneLine order={3} tag="INFO" t={tone.info} title="過濾站舊匯入紀錄讀取 BUG 修正" note="缺少統計欄位的舊紀錄可正常讀取" />
          <DoneLine order={4} tag="DBS" t={tone.dbs} title="上傳語音檔拖曳失敗 BUG 修正" note="Windows 經 USB 連線手機拖入音檔可正常上傳" />
        </BoardItems>
      </ProgressBoard>
    </div>
  </Frame>
);

function PlanLine({ tag, title, note, order, t }: { tag: string; title: string; note?: string; order: number; t: Tone }) {
  const rise = useMotion('rise', 380 + order * 140);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: `1px solid ${c.navyLine}`, ...rise }}>
      <span style={{ color: t.onNavy, fontSize: 26, letterSpacing: '0.1em', ...heavy }}>{tag}</span>
      <div style={{ marginTop: 8, fontSize: 54, lineHeight: 1.2, ...heavy }}>{title}</div>
      {note ? <div style={{ marginTop: 8, color: c.light, fontSize: 30, lineHeight: 1.35, ...bold }}>{note}</div> : null}
    </div>
  );
}

const ThisWeek: Page = () => (
  <Frame name="本週預計">
    <Heading title="本週預計" subtitle="INFO · DBS｜11 / 27" accent={tone.info.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="本週預計" t={tone.info}>
        <BoardItems>
          <PlanLine order={0} tag="INFO" t={tone.info} title="過濾站跨單位轉 User BUG 修正" note="修正部分資料未成功帶入" />
          <PlanLine order={1} tag="DBS" t={tone.dbs} title="問問 AI 網站導引" />
        </BoardItems>
      </ProgressBoard>
      <ProgressAside current={0} target={100} due="11 / 27" t={tone.info} />
    </div>
  </Frame>
);

const Sandbox: Page = () => (
  <Frame name="沙盒進度">
    <Heading title="沙盒" subtitle="預計完成｜11 月底" accent={tone.dbs.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="SANDBOX" title="素菁沙盒" t={tone.dbs} />
      <ProgressAside current={85} target={95} due="11 月底" t={tone.dbs} />
    </div>
  </Frame>
);

const Gooldays: Page = () => (
  <Frame name="gooldays 進度">
    <Heading title="gooldays" subtitle="本週預計完成｜11 / 27" accent={tone.dbs.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="GOOLDAYS" title="流程與介面設計" t={tone.dbs} link="https://dev.gooldays.com/" />
      <ProgressAside current={90} target={100} due="11 / 27" t={tone.dbs} />
    </div>
  </Frame>
);

export default [
  Cover,
  LastWeek,
  ThisWeek,
  Sandbox,
  Gooldays,
] satisfies Page[];
