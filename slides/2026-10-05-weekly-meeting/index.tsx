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
  title: '2026 / 10 / 05 週會',
  description: 'AIOps、Info、DBS 與沙盒工作進度。',
  author: 'Shelly',
  createdAt: '2026-10-04T15:19:48.196Z',
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
      <span>2026 / 10 / 05 週會</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
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
      <div style={{ fontSize: 110, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 10 / 05</div>
      <h1 style={{ fontSize: 152, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '28px 0 0', ...heavy }}>週會報告</h1>
      <div style={{ marginTop: 38, fontSize: 34, lineHeight: 1.2, letterSpacing: '0.12em', color: '#456882', ...heavy }}>Shelly</div>
    </div>
    <Footer />
  </section>
);

function Frame({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section data-weekly-page={name} style={{
      width: '100%', height: '100%', position: 'relative',
      boxSizing: 'border-box', padding: '88px 110px 110px',
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

function CompletedStatus({ large = false }: { large?: boolean }) {
  return (
    <span data-completed-status style={{
      display: 'inline-flex', alignItems: 'center', gap: large ? 16 : 12,
      color: c.teal, background: c.tealSoft, borderRadius: 999,
      padding: large ? '14px 24px' : '8px 16px',
      whiteSpace: 'nowrap', lineHeight: 1.25, flexShrink: 0, ...heavy,
    }}>
      <span aria-hidden="true" style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: large ? 44 : 28, height: large ? 44 : 28,
        borderRadius: '50%', background: c.teal, color: c.paper,
        fontSize: large ? 30 : 20, fontFamily: 'system-ui, sans-serif',
      }}>✓</span>
      <span style={{ fontSize: large ? 42 : 30 }}>已完成</span>
      <span style={{ fontSize: large ? 54 : 36 }}>100%</span>
    </span>
  );
}

function Heading({ title, subtitle, completed = false }: { title: string; subtitle: string; completed?: boolean }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 24 }}>
      <div>
        <h1 style={{
          fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)',
          ...heavy, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
        }}>{title}</h1>
        <p style={{ margin: '14px 0 0', fontSize: 31, color: c.muted, lineHeight: 1.4, ...bold }}>{subtitle}</p>
      </div>
      {completed && <CompletedStatus large />}
    </header>
  );
}

function Label({ children, color = 'var(--osd-accent)' }: { children: ReactNode; color?: string }) {
  return <div style={{ color, fontSize: 30, ...heavy, lineHeight: 1.4 }}>{children}</div>;
}

function CompletedRow({ number, title }: { number: string; title: string }) {
  return (
    <article style={{
      minHeight: 116, boxSizing: 'border-box', padding: '22px 28px',
      display: 'grid', gridTemplateColumns: '58px 44px 1fr', alignItems: 'center', gap: 18,
      background: c.paper, border: `1px solid ${c.rule}`,
      borderLeft: `7px solid ${c.teal}`, borderRadius: 'var(--osd-radius)',
    }}>
      <span style={{ color: c.muted, fontSize: 25, ...heavy }}>{number}</span>
      <span aria-hidden="true" style={{
        width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center',
        background: c.tealSoft, color: c.teal, fontSize: 24, ...heavy,
      }}>✓</span>
      <h2 style={{ margin: 0, fontSize: 33, lineHeight: 1.35, ...heavy }}>{title}</h2>
    </article>
  );
}

const AIOpsCompleted: Page = () => (
  <Frame name="AIOps 已完成">
    <Heading title="AIOps" subtitle="7 項修正與強化完成" completed />
    <div data-content style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
      marginTop: 38,
    }}>
      <CompletedRow number="01" title="防止事件表欄位錯位" />
      <CompletedRow number="02" title="保護 ShareTemplate 分頁契約" />
      <CompletedRow number="03" title="DBS 文章留言總數" />
      <CompletedRow number="04" title="DBS 逐字稿視窗重開修復" />
      <CompletedRow number="05" title="DBS 顯示過期活動" />
      <CompletedRow number="06" title="DBS AI 搜尋文章另開分頁" />
      <CompletedRow number="07" title="DBS 文章 Email 分享" />
    </div>
  </Frame>
);

function ProgressSummary({ value, compact = false }: { value: number; compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginTop: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: 28, color: c.muted, ...heavy }}>目前</span>
        <span style={{ fontSize: compact ? 68 : 82, lineHeight: 1, color: c.teal, ...heavy }}>
          {value}<span style={{ fontSize: compact ? 30 : 34 }}>%</span>
        </span>
      </div>
      <div style={{ textAlign: 'right', fontSize: compact ? 25 : 28, lineHeight: 1.5, color: c.muted, ...heavy }}>
        <div>本週預計 <strong style={{ color: 'var(--osd-accent)', fontSize: compact ? 30 : 34 }}>100%</strong></div>
        <div>預計完成 <strong style={{ color: c.navy, fontSize: compact ? 30 : 34 }}>10/8</strong></div>
      </div>
    </div>
  );
}

function PlannedCard({ number, title, value = 0 }: { number: string; title: string; value?: number }) {
  return (
    <article style={{
      height: 520, boxSizing: 'border-box', padding: '34px 38px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`,
      borderTop: `8px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: c.muted, fontSize: 27, ...heavy }}>{number}</span>
        <span style={{
          padding: '8px 16px', borderRadius: 999, background: c.goldSoft,
          color: '#A86F13', fontSize: 27, lineHeight: 1.2, ...heavy,
        }}>本週</span>
      </div>
      <div style={{ width: 56, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 28 }} />
      <h2 style={{ margin: '24px 0 0', fontSize: 42, lineHeight: 1.35, ...heavy }}>{title}</h2>
      <div style={{ marginTop: 'auto' }}>
        <ProgressSummary value={value} compact />
      </div>
    </article>
  );
}

const AIOpsThisWeek: Page = () => (
  <Frame name="AIOps 本週">
    <Heading title="AIOps" subtitle="本週預計完成｜10 / 8" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30, marginTop: 58 }}>
      <PlannedCard number="01" title="動態欄位改用 columnId 更新" />
      <PlannedCard number="02" title="TAG 選項符合會員讀取權限" />
      <PlannedCard number="03" title="通知草稿 schema 缺失時維持批次清單" />
    </div>
  </Frame>
);

function InfoCompletedRow({ number, title, detail }: { number: string; title: string; detail?: string }) {
  return (
    <article style={{
      minHeight: 142, boxSizing: 'border-box', padding: '22px 28px',
      display: 'grid', gridTemplateColumns: '56px 1fr', gap: 18,
      background: c.paper, borderBottom: `1px solid ${c.rule}`,
    }}>
      <span style={{ color: 'var(--osd-accent)', fontSize: 26, paddingTop: 5, ...heavy }}>{number}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span aria-hidden="true" style={{ color: c.teal, fontSize: 31, lineHeight: 1.2, ...heavy }}>✓</span>
          <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.35, ...heavy }}>{title}</h2>
        </div>
        {detail && <p style={{ margin: '8px 0 0 45px', color: c.muted, fontSize: 27, lineHeight: 1.4, ...bold }}>{detail}</p>}
      </div>
    </article>
  );
}

const InfoCompleted: Page = () => (
  <Frame name="Info 已完成">
    <Heading title="Info" subtitle="事件、布告欄與搜尋修正完成" completed />
    <div data-content style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 72, rowGap: 10,
      marginTop: 36,
    }}>
      <InfoCompletedRow number="01" title="事件日期格式" detail="月／日統一補成兩位數" />
      <InfoCompletedRow number="02" title="建立事件成員按照設定且可為空" />
      <InfoCompletedRow number="03" title="DBS 事件按照填表姓名" detail="事件名稱按照個案姓名" />
      <InfoCompletedRow number="04" title="文章布告欄返回列表還原查詢位置" />
      <InfoCompletedRow number="05" title="無留言之事件也可匯出" detail="修正無留言時匯出為空的 BUG" />
      <InfoCompletedRow number="06" title="修正 Milvus 搜尋連線" />
    </div>
  </Frame>
);

function FocusCard({ number, title, value }: { number: string; title: string; value: number }) {
  return (
    <article style={{
      height: 500, boxSizing: 'border-box', padding: '42px 48px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`,
      borderLeft: `9px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: c.muted, fontSize: 28, ...heavy }}>{number}</span>
        <Label color={c.gold}>本週</Label>
      </div>
      <h2 style={{ margin: '42px 0 0', fontSize: 54, lineHeight: 1.3, ...heavy }}>{title}</h2>
      <div style={{ marginTop: 'auto' }}>
        <ProgressSummary value={value} />
      </div>
    </article>
  );
}

const InfoThisWeek: Page = () => (
  <Frame name="Info 本週">
    <Heading title="Info" subtitle="資料修復與跨單位分享" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 46, marginTop: 68 }}>
      <FocusCard number="01" title="嘗試修復誤刪 CRM User" value={0} />
      <FocusCard number="02" title="跨單位分享動態欄位" value={25} />
    </div>
  </Frame>
);

const DbsAndSandbox: Page = () => (
  <Frame name="DBS 與沙盒">
    <Heading title="DBS" subtitle="內容體驗與沙盒進度" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1030px 1fr', gap: 65, marginTop: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 6 }}>
        <article style={{
          minHeight: 186, boxSizing: 'border-box', padding: '28px 34px',
          display: 'grid', gridTemplateColumns: '62px 1fr', gap: 22,
          background: c.paper, borderLeft: `8px solid ${c.teal}`, borderRadius: 'var(--osd-radius)',
        }}>
          <span style={{ fontSize: 27, color: c.teal, paddingTop: 6, ...heavy }}>01</span>
          <div>
            <CompletedStatus />
            <h2 style={{ margin: '18px 0 0', fontSize: 46, lineHeight: 1.3, ...heavy }}>電子報排序</h2>
          </div>
        </article>
        <article style={{
          minHeight: 360, boxSizing: 'border-box', padding: '28px 34px',
          display: 'grid', gridTemplateColumns: '62px 1fr', gap: 22,
          background: c.paper, border: `1px solid ${c.rule}`,
          borderLeft: `8px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
        }}>
          <span style={{ fontSize: 27, color: c.gold, paddingTop: 6, ...heavy }}>02</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label color={c.gold}>本週</Label>
            <h2 style={{ margin: '12px 0 0', fontSize: 43, lineHeight: 1.3, ...heavy }}>優化知識與內容的 UI / UX</h2>
            <p style={{ margin: '10px 0 0', color: c.muted, fontSize: 29, lineHeight: 1.4, ...bold }}>
              文章、電子報、Podcast、專欄
            </p>
            <div style={{ marginTop: 'auto' }}>
              <ProgressSummary value={0} compact />
            </div>
          </div>
        </article>
      </div>
      <aside style={{
        background: c.navy, color: c.paper, padding: '32px 44px',
        height: 586, boxSizing: 'border-box', borderRadius: 'var(--osd-radius)',
      }}>
        <Label color={c.light}>沙盒</Label>
        <h2 style={{ fontSize: 50, lineHeight: 1.3, margin: '14px 0 0', ...heavy }}>素菁沙盒</h2>
        <div style={{ marginTop: 20, color: c.light, fontSize: 32, ...heavy }}>預計完成　12 月底</div>
        <div style={{ marginTop: 25, fontSize: 32, color: c.light, ...heavy }}>本週預計</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 5 }}>
          <span style={{ fontSize: 92, ...heavy, lineHeight: 1.1 }}>待定</span>
          <span style={{ color: c.light, fontSize: 32, ...heavy }}>目前 5%</span>
        </div>
        <div style={{ height: 1, background: '#506F8A', margin: '24px 0 20px' }} />
        <Label color="#E8B867">需協助／釐清</Label>
        <div style={{ fontSize: 39, lineHeight: 1.25, ...heavy, marginTop: 12 }}>認識沙盒、方向與示範</div>
      </aside>
    </div>
  </Frame>
);

const AutumnOutingWebsite: Page = () => (
  <Frame name="秋遊活動與投票網頁">
    <Heading title="秋遊活動與投票網頁" subtitle="網站製作進度" />
    <div data-content style={{
      height: 520, boxSizing: 'border-box', padding: '56px 72px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      marginTop: 68, background: c.paper, border: `1px solid ${c.rule}`,
      borderLeft: `10px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
    }}>
      <Label color={c.gold}>秋遊活動 × 投票網頁</Label>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontSize: 34, color: c.muted, ...heavy }}>目前</span>
          <strong style={{ fontSize: 156, lineHeight: 1.1, color: c.teal, ...heavy }}>
            90<span style={{ fontSize: 64 }}>%</span>
          </strong>
        </div>
        <div style={{ textAlign: 'right', paddingBottom: 15, fontSize: 34, lineHeight: 1.55, color: c.muted, ...heavy }}>
          <div>本週預計 <strong style={{ color: 'var(--osd-accent)', fontSize: 46 }}>100%</strong></div>
          <div>預計完成 <strong style={{ color: c.navy, fontSize: 46 }}>10/8</strong></div>
        </div>
      </div>
      <div style={{ height: 20, background: c.tealSoft, borderRadius: 999 }}>
        <div style={{ width: '90%', height: '100%', background: c.teal, borderRadius: 999 }} />
      </div>
    </div>
  </Frame>
);

export default [Cover, AIOpsCompleted, AIOpsThisWeek, InfoCompleted, InfoThisWeek, DbsAndSandbox, AutumnOutingWebsite] satisfies Page[];
