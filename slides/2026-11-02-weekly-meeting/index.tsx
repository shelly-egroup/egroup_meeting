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
  title: '2026 / 11 / 02 週會',
  description: 'AIOps、INFO、DBS、沙盒與 gooldays 本週工作進度。',
  author: 'Shelly',
  createdAt: '2026-11-01T16:04:47.628Z',
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
@keyframes w1102-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes w1102-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes w1102-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes w1102-pop { 0% { opacity: 0; transform: scale(0.82); } 65% { opacity: 1; transform: scale(1.06); } 100% { opacity: 1; transform: scale(1); } }
@property --w1102-n { syntax: '<integer>'; inherits: false; initial-value: 0; }
@keyframes w1102-count { from { --w1102-n: var(--w1102-from); } }
.w1102-count::after { content: counter(w1102); }
@keyframes w1102-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.8); } }
`;

function MotionStyles() {
  return <style>{motionCss}</style>;
}

function useMotion(name: 'rise' | 'fade' | 'grow' | 'pop', delay = 0, duration = 560): CSSProperties {
  const live = useIsActivePage();
  if (!live) return {};
  return { animation: `w1102-${name} ${duration}ms ${EASE_OUT} ${delay}ms both` };
}

// Counts from `from` to `to` on the CSS animation clock, so it stays in sync with the bar.
function CountUp({ from, to, delay = 0 }: { from: number; to: number; delay?: number }) {
  const live = useIsActivePage();
  const style = {
    '--w1102-from': from,
    '--w1102-n': to,
    counterReset: 'w1102 var(--w1102-n)',
    animation: live ? `w1102-count 1100ms ${EASE_OUT} ${delay}ms both` : 'none',
  } as CSSProperties;
  return <span className="w1102-count" style={style} aria-label={String(to)} />;
}

function Footer() {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{
      position: 'absolute', bottom: 52, left: 110, right: 110,
      display: 'flex', justifyContent: 'space-between',
      fontSize: 24, color: c.muted, ...bold,
    }}>
      <span>2026 / 11 / 02 週會</span>
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
        animation: live ? 'w1102-pulse 1.6s ease-in-out infinite' : 'none',
      }} />
      進行中
    </span>
  );
}

function ProgressBoard({ tag, title, t, children }: { tag: string; title: string; t: Tone; children?: ReactNode }) {
  const rise = useMotion('rise', 160);
  return (
    <article style={{
      padding: '46px 54px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      background: c.navy, color: c.paper, borderRadius: 28, ...rise,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: t.onNavy, fontSize: 27, letterSpacing: '0.12em', ...heavy }}>{tag}</span>
        <LiveChip color={t.onNavy} />
      </div>
      <h2 style={{
        margin: children ? '22px 0 0' : 'auto 0 0',
        fontSize: children ? 64 : 104, lineHeight: 1.12, letterSpacing: '-0.01em', ...heavy,
      }}>{title}</h2>
      {children ?? <div style={{ width: 96, height: 8, marginTop: 30, borderRadius: 99, background: t.onNavy }} />}
    </article>
  );
}

function PrItem({ repo, pr, title, note, t, order }: {
  repo: string; pr: string; title: string; note: string; t: Tone; order: number;
}) {
  const rise = useMotion('rise', 380 + order * 140);
  return (
    <div style={{ paddingTop: 22, borderTop: `1px solid ${c.navyLine}`, ...rise }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, ...heavy }}>
        <span style={{ color: t.onNavy, letterSpacing: '0.04em' }}>{repo}</span>
        <span style={{ padding: '3px 12px', borderRadius: 99, background: '#153F62', color: c.light }}>PR {pr}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 38, lineHeight: 1.25, ...heavy }}>{title}</div>
      <div style={{ marginTop: 6, color: c.light, fontSize: 23, lineHeight: 1.35, ...bold }}>{note}</div>
    </div>
  );
}

function BoardNote({ label, text, t }: { label: string; text: string; t: Tone }) {
  const rise = useMotion('rise', 420);
  return (
    <div style={{ marginTop: 'auto', paddingTop: 26, borderTop: `1px solid ${c.navyLine}`, ...rise }}>
      <span style={{ color: t.onNavy, fontSize: 25, letterSpacing: '0.1em', ...heavy }}>{label}</span>
      <div style={{ marginTop: 10, fontSize: 40, lineHeight: 1.3, ...heavy }}>{text}</div>
    </div>
  );
}

const progressGrid: CSSProperties = {
  display: 'grid', gridTemplateColumns: '1.32fr 0.68fr',
  height: 590, gap: 26, marginTop: 40,
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
        <div style={{ fontSize: 108, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy, ...date }}>2026 / 11 / 02</div>
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

const AIOps: Page = () => (
  <Frame name="AIOps 本週">
    <Heading title="AIOps" subtitle="本週預計完成｜11 / 06" accent={tone.aiops.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="AIOPS" title="本週 2 項修正" t={tone.aiops}>
        <div style={{ display: 'grid', gap: 24, marginTop: 30 }}>
          <PrItem
            repo="infocenter-backend"
            pr="#7086"
            title="篩選 TAG 選項依會員讀取權限"
            note="會員、個案、夥伴、事件、文章、布告欄一致套用授權"
            t={tone.aiops}
            order={0}
          />
          <PrItem
            repo="infocenter-client"
            pr="#10356"
            title="個案群組展開狀態與搜尋定位"
            note="重整、排序後保留展開；搜尋命中收合欄位自動展開定位"
            t={tone.aiops}
            order={1}
          />
        </div>
      </ProgressBoard>
      <ProgressAside current={0} target={100} due="11 / 06" t={tone.aiops} />
    </div>
  </Frame>
);

const InfoData: Page = () => (
  <Frame name="INFO 欄位、資料與相容性">
    <Heading title="Info" subtitle="本週完成｜欄位、資料與相容性" accent={tone.info.main} />
    <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
      <DoneRow
        index="01"
        title="財務範本欄位 Bug 修正"
        note="收入欄位不再誤帶支出 ID；後端拒絕重複 ID，避免靜默覆蓋"
        t={tone.info}
        order={0}
      />
      <DoneRow
        index="02"
        title="Excel 匯入欄位對應"
        note="固定別名與動態欄位同名時，依明確型態正確寫入"
        t={tone.info}
        order={1}
      />
      <DoneRow
        index="03"
        title="動態單選欄位儲存"
        note="清除多選殘留限制，切換欄位類型後可正常儲存"
        t={tone.info}
        order={2}
      />
      <DoneRow
        index="04"
        title="DEV 自動測試登入開關"
        note="DEV 開啟自動測試登入 API，支援測試環境流程"
        t={tone.info}
        order={3}
      />
      <DoneRow
        index="05"
        title="Release token 相容性回退"
        note="恢復跨瀏覽器 A → B → A 的舊 token 相容行為"
        t={tone.info}
        order={4}
      />
    </div>
  </Frame>
);

const InfoSharing: Page = () => (
  <Frame name="INFO 分享與 CRM">
    <Heading title="Info" subtitle="本週完成｜分享、CRM 與介面" accent={tone.info.main} />
    <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
      <DoneRow
        index="01"
        title="分享範本附件三態，串接 DBS 諮詢"
        note="不顯示／必填／選填；DBS 諮詢同步套用顯示與送件規則"
        t={tone.info}
        order={0}
      />
      <DoneRow
        index="02"
        title="分享範本置頂權限"
        note="移除不存在的額外權限限制，組織隔離仍保留"
        t={tone.info}
        order={1}
      />
      <DoneRow
        index="03"
        title="分享編輯連結期限"
        note="套用客戶個別期限，並修正相對天數偶爾跨日"
        t={tone.info}
        order={2}
      />
      <DoneRow
        index="04"
        title="CRM 填寫體驗"
        note="完成鍵盤填寫、手機日期時間與 Info 2.0 空白欄位修正"
        t={tone.info}
        order={3}
      />
      <DoneRow
        index="05"
        title="Info 2.0 彈窗篩選"
        note="進階篩選顯示在彈窗上方，不再被遮住"
        t={tone.info}
        order={4}
      />
    </div>
  </Frame>
);

const InfoFilterHistory: Page = () => (
  <Frame name="INFO 過濾站匯入歷史紀錄">
    <Heading title="Info" subtitle="本週預計完成｜11 / 06" accent={tone.info.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="過濾站" title="匯入歷史紀錄" t={tone.info} />
      <ProgressAside current={0} target={100} due="11 / 06" t={tone.info} />
    </div>
  </Frame>
);

const DbsCompleted: Page = () => (
  <Frame name="DBS 體驗與穩定">
    <Heading title="DBS" subtitle="本週完成｜體驗與穩定" accent={tone.dbs.main} />
    <div style={{ display: 'grid', gap: 22, marginTop: 34 }}>
      <DoneRow
        index="01"
        title="情境懶人包、快篩與頻道讀取"
        note="修正標題、摘要清單與視窗誤判；補載入逐字稿回饋，避免頻道詳情 500"
        t={tone.dbs}
        order={0}
        height={170}
      />
      <DoneRow
        index="02"
        title="登入、註冊與驗證信"
        note="分離登入與聯絡信箱，修正 Google 回呼，支援重寄驗證信與錯誤恢復"
        t={tone.dbs}
        order={1}
        height={170}
      />
      <DoneRow
        index="03"
        title="成果發表會入口與放映廳"
        t={tone.dbs}
        order={2}
        height={170}
      />
    </div>
  </Frame>
);

const Sandbox: Page = () => (
  <Frame name="沙盒進度">
    <Heading title="沙盒" subtitle="預計完成｜11 月中" accent={tone.dbs.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="SANDBOX" title="素菁沙盒" t={tone.dbs}>
        <BoardNote label="需協助／釐清" text="麻煩學長協助建置部屬初始化精靈" t={tone.dbs} />
      </ProgressBoard>
      <ProgressAside current={50} target={70} due="11 月中" t={tone.dbs} />
    </div>
  </Frame>
);

const Gooldays: Page = () => (
  <Frame name="gooldays 進度">
    <Heading title="gooldays" subtitle="預計完成｜11 月中" accent={tone.dbs.main} />
    <div style={progressGrid}>
      <ProgressBoard tag="GOOLDAYS" title="流程與介面設計" t={tone.dbs} />
      <ProgressAside current={25} target={50} due="11 月中" t={tone.dbs} />
    </div>
  </Frame>
);

export default [
  Cover,
  AIOps,
  InfoData,
  InfoSharing,
  InfoFilterHistory,
  DbsCompleted,
  Sandbox,
  Gooldays,
] satisfies Page[];
