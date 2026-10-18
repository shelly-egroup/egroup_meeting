import type { ReactNode } from 'react';
import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

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
  title: '2026 / 10 / 19 週會',
  description: 'INFO、DBS 與沙盒本週工作進度。',
  author: 'Shelly',
  createdAt: '2026-10-18T15:35:31.656Z',
};

const c = {
  muted: '#738291',
  rule: '#D8D3C7',
  navy: '#0A3A67',
  paper: '#FFFDF8',
  light: '#C4D8E9',
  teal: '#158B83',
  tealSoft: '#DDEEEA',
  gold: '#D7A443',
  goldSoft: '#F4E5B9',
};

const heavy = { fontWeight: 900, fontVariationSettings: '"wght" 900' } as const;
const bold = { fontWeight: 850, fontVariationSettings: '"wght" 850' } as const;

function Footer() {
  const { current, total } = useSlidePageNumber();
  return (
    <footer style={{
      position: 'absolute', bottom: 52, left: 110, right: 110,
      display: 'flex', justifyContent: 'space-between',
      fontSize: 24, color: c.muted, ...bold,
    }}>
      <span>2026 / 10 / 19 週會</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
}

function Frame({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section data-weekly-page={name} style={{
      width: '100%', height: '100%', position: 'relative',
      boxSizing: 'border-box', padding: '78px 110px 108px',
      background: 'var(--osd-bg)', color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)', fontWeight: 750,
      fontVariationSettings: '"wght" 750',
    }}>
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

function Heading({ title, subtitle, accent = c.teal }: { title: string; subtitle: string; accent?: string }) {
  return (
    <header style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 54, height: 7, borderRadius: 99, background: accent }} />
        <span style={{ fontSize: 26, letterSpacing: '0.12em', color: accent, ...heavy }}>WEEKLY REPORT</span>
      </div>
      <h1 style={{
        margin: '14px 0 0', fontFamily: 'var(--osd-font-display)',
        fontSize: 84, lineHeight: 1.08, letterSpacing: '-0.025em', ...heavy,
      }}>{title}</h1>
      <p style={{ margin: '10px 0 0', fontSize: 30, color: c.muted, lineHeight: 1.35, ...bold }}>{subtitle}</p>
    </header>
  );
}

function CompletedStatus({ color = c.teal }: { color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{
        display: 'grid', placeItems: 'center', width: 44, height: 44,
        borderRadius: 999, background: color, color: 'white', fontSize: 28, ...heavy,
      }}>✓</span>
      <span style={{ color, fontSize: 28, letterSpacing: '0.04em', ...heavy }}>100% 完成</span>
    </div>
  );
}

function InfoCompletedCard({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article style={{
      height: 222, boxSizing: 'border-box', padding: '34px 42px',
      display: 'grid', gridTemplateColumns: '82px 1fr auto', alignItems: 'center', gap: 28,
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 24,
      borderLeft: `9px solid ${c.teal}`,
    }}>
      <div style={{ color: c.teal, fontSize: 46, ...heavy }}>{index}</div>
      <div>
        <h2 style={{ margin: 0, fontSize: 50, lineHeight: 1.18, ...heavy }}>{title}</h2>
        <p style={{ margin: '13px 0 0', color: c.muted, fontSize: 28, lineHeight: 1.35, ...bold }}>{note}</p>
      </div>
      <CompletedStatus />
    </article>
  );
}

function GoalCard({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article style={{
      height: 360, boxSizing: 'border-box', padding: '30px 34px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 24,
      boxShadow: '0 14px 36px rgba(10, 58, 103, 0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: c.teal, fontSize: 26, letterSpacing: '0.08em', ...heavy }}>{index}</span>
        <span style={{
          padding: '8px 16px', borderRadius: 999, background: c.tealSoft,
          color: c.teal, fontSize: 23, ...heavy,
        }}>本週</span>
      </div>
      <h2 style={{ margin: '22px 0 0', fontSize: 42, lineHeight: 1.25, ...heavy }}>{title}</h2>
      <p style={{ margin: '12px 0 0', color: c.muted, fontSize: 26, lineHeight: 1.4, ...bold }}>{note}</p>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18,
        marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${c.rule}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 23, color: c.muted, ...heavy }}>目前</span>
          <span style={{ fontSize: 60, lineHeight: 1, color: c.teal, ...heavy }}>
            0<span style={{ fontSize: 28 }}>%</span>
          </span>
        </div>
        <div style={{ textAlign: 'right', fontSize: 21, lineHeight: 1.55, color: c.muted, ...heavy }}>
          <div>本週預計 <strong style={{ color: 'var(--osd-accent)', fontSize: 30 }}>100%</strong></div>
          <div>預計完成 <strong style={{ color: c.navy, fontSize: 30 }}>10/23</strong></div>
        </div>
      </div>
    </article>
  );
}

function DbsCompletedCard({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <article style={{
      minHeight: 224, boxSizing: 'border-box', padding: '30px 34px',
      display: 'grid', gridTemplateColumns: '62px 1fr', gap: 22,
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 22,
      borderTop: `7px solid ${c.gold}`,
    }}>
      <span style={{ color: c.gold, fontSize: 34, ...heavy }}>{index}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
          <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1.25, ...heavy }}>{title}</h2>
          <span style={{
            flexShrink: 0, padding: '7px 14px', borderRadius: 999,
            background: c.goldSoft, color: '#9A6810', fontSize: 21, ...heavy,
          }}>✓ 100% 完成</span>
        </div>
        {note ? (
          <p style={{ margin: '14px 0 0', color: c.muted, fontSize: 25, lineHeight: 1.4, ...bold }}>{note}</p>
        ) : null}
      </div>
    </article>
  );
}

const Cover: Page = () => (
  <section data-weekly-page="封面" style={{
    width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box',
    display: 'grid', placeItems: 'center', padding: 110,
    background: 'var(--osd-bg)', color: 'var(--osd-text)',
    fontFamily: 'var(--osd-font-display)',
  }}>
    <div style={{ position: 'absolute', top: 96, left: 110, display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ width: 56, height: 7, borderRadius: 99, background: 'var(--osd-accent)' }} />
      <span style={{ fontSize: 28, letterSpacing: '0.1em', color: c.muted, ...heavy }}>WEEKLY REPORT</span>
    </div>
    <div data-content style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 110, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 10 / 19</div>
      <h1 style={{ fontSize: 152, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '28px 0 0', ...heavy }}>週會報告</h1>
      <div style={{ marginTop: 38, fontSize: 34, lineHeight: 1.2, letterSpacing: '0.12em', color: '#456882', ...heavy }}>Shelly</div>
    </div>
    <Footer />
  </section>
);

const InfoCompleted: Page = () => (
  <Frame name="INFO 已完成">
    <Heading title="Info" subtitle="本週完成｜常用釘選與欄位群組" />
    <div style={{ display: 'grid', gap: 22, marginTop: 36 }}>
      <InfoCompletedCard
        index="01"
        title="分享範本與過濾站釘選"
        note="逐一釘選或取消常用項目"
      />
      <InfoCompletedCard
        index="02"
        title="跨單位欄位群組"
        note="移轉時保留欄位與群組的對應關係"
      />
    </div>
  </Frame>
);

const InfoThisWeek: Page = () => (
  <Frame name="INFO 本週">
    <Heading title="Info" subtitle="功能修正與匯入對應｜10 / 23 預計完成" />
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 22, marginTop: 38,
    }}>
      <GoalCard
        index="01 / FILTER"
        title="批次編輯動態欄位"
        note="修復無法使用進階篩選"
      />
      <GoalCard
        index="02 / FILE"
        title="分享範本檔案必填設定"
        note="檔案是否必填可依範本選擇"
      />
      <GoalCard
        index="03 / IMPORT"
        title="跨單位個案匯入"
        note="匯入時先根據欄位 ID 對應"
      />
    </div>
  </Frame>
);

const DbsCompleted: Page = () => (
  <Frame name="DBS 已完成">
    <Heading title="DBS" subtitle="本週完成｜帳號、知識庫與活動課程" accent={c.gold} />
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 20, marginTop: 32,
    }}>
      <DbsCompletedCard
        index="01"
        title="查詢帳號忘記密碼"
      />
      <DbsCompletedCard
        index="02"
        title="知識庫文章"
        note="保留文章作者與閱讀次數、隱藏不可用的文章導讀"
      />
      <DbsCompletedCard
        index="03"
        title="知識庫 AI 摘要"
        note="阻止 AI 失敗訊息被存成文章摘要"
      />
      <DbsCompletedCard
        index="04"
        title="活動與課程 UI / UX"
      />
    </div>
  </Frame>
);

const DbsThisWeek: Page = () => (
  <Frame name="DBS 本週">
    <Heading title="DBS" subtitle="登入問題修復｜10 / 23 預計完成" accent={c.gold} />
    <div style={{
      display: 'grid', gridTemplateColumns: '1.25fr 0.75fr',
      minHeight: 430, gap: 26, marginTop: 44,
    }}>
      <article style={{
        padding: '48px 54px', display: 'flex', flexDirection: 'column',
        background: c.navy, color: c.paper, borderRadius: 28,
      }}>
        <span style={{ color: '#E8B867', fontSize: 27, letterSpacing: '0.12em', ...heavy }}>BUG 修復</span>
        <h2 style={{ margin: '30px 0 0', fontSize: 72, lineHeight: 1.15, ...heavy }}>帳號無法登入</h2>
        <div style={{ marginTop: 'auto', color: '#E8B867', fontSize: 25, ...heavy }}>本週</div>
      </article>
      <aside style={{
        padding: '44px 44px 40px', display: 'flex', flexDirection: 'column',
        background: c.goldSoft, borderRadius: 28,
      }}>
        <span style={{ color: '#9A6810', fontSize: 27, letterSpacing: '0.08em', ...heavy }}>目前</span>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <strong style={{ fontSize: 78, lineHeight: 1, ...heavy }}>0</strong>
          <span style={{ fontSize: 36, ...heavy }}>%</span>
        </div>
        <div style={{ margin: '14px 0', height: 3, background: 'rgba(154, 104, 16, 0.22)' }} />
        <span style={{ color: '#9A6810', fontSize: 27, letterSpacing: '0.08em', ...heavy }}>10 / 23 預計</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <strong style={{ color: '#9A6810', fontSize: 78, lineHeight: 1, ...heavy }}>100</strong>
          <span style={{ color: '#9A6810', fontSize: 36, ...heavy }}>%</span>
        </div>
      </aside>
    </div>
  </Frame>
);

const Sandbox: Page = () => (
  <Frame name="沙盒進度">
    <Heading title="沙盒" subtitle="目前 30%｜本週預計 55%" accent={c.gold} />
    <div style={{
      display: 'grid', gridTemplateColumns: '1.2fr 0.8fr',
      gap: 26, marginTop: 36,
    }}>
      <article style={{
        minHeight: 428, padding: '40px 48px', boxSizing: 'border-box',
        background: c.navy, color: c.paper, borderRadius: 28,
      }}>
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
        minHeight: 428, padding: '40px 42px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
        background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 28,
      }}>
        <span style={{ color: c.gold, fontSize: 26, letterSpacing: '0.1em', ...heavy }}>需協助／釐清</span>
        <h2 style={{ margin: '24px 0 0', fontSize: 54, lineHeight: 1.25, ...heavy }}>確認外部進入平台</h2>
      </aside>
    </div>
  </Frame>
);

export default [
  Cover,
  InfoCompleted,
  InfoThisWeek,
  DbsCompleted,
  DbsThisWeek,
  Sandbox,
] satisfies Page[];
