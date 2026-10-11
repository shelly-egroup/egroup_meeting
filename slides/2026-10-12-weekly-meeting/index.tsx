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
  title: '2026 / 10 / 12 週會',
  description: 'AIOps、Info、DBS、沙盒與秋遊活動工作進度。',
  author: 'Shelly',
  createdAt: '2026-10-11T14:41:15.390Z',
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
      <span>2026 / 10 / 12 週會</span>
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
      <div style={{ fontSize: 110, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 10 / 12</div>
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

function Heading({ title, subtitle, href }: { title: string; subtitle: string; href?: string }) {
  return (
    <header style={{ marginTop: 24 }}>
      <h1 style={{
        fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)',
        ...heavy, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
      }}>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            title="查看方向與示範"
            style={{
              color: 'inherit', textDecorationLine: 'underline',
              textDecorationColor: c.gold, textDecorationThickness: 4,
              textUnderlineOffset: 10,
            }}
          >
            {title}
          </a>
        ) : title}
      </h1>
      <p style={{ margin: '14px 0 0', fontSize: 31, color: c.muted, lineHeight: 1.4, ...bold }}>{subtitle}</p>
    </header>
  );
}

function Label({ children, color = 'var(--osd-accent)' }: { children: ReactNode; color?: string }) {
  return <div style={{ color, fontSize: 30, ...heavy, lineHeight: 1.4 }}>{children}</div>;
}

function CompletedStatus({ large = false }: { large?: boolean }) {
  return (
    <span style={{
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

function PendingStatus() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '10px 18px', borderRadius: 999,
      background: c.goldSoft, color: '#A86F13',
      fontSize: 30, lineHeight: 1.2, whiteSpace: 'nowrap', ...heavy,
    }}>
      <span aria-hidden="true" style={{ fontSize: 23 }}>●</span>
      待解決
    </span>
  );
}

function ProgressBlock({ current, target = 100, compact = false }: { current: number; target?: number; compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginTop: compact ? 16 : 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: compact ? 26 : 30, color: c.muted, ...heavy }}>目前</span>
        <span style={{ fontSize: compact ? 66 : 82, lineHeight: 1, color: c.teal, ...heavy }}>
          {current}<span style={{ fontSize: compact ? 30 : 34 }}>%</span>
        </span>
      </div>
      <div style={{ textAlign: 'right', fontSize: compact ? 25 : 29, lineHeight: 1.5, color: c.muted, ...heavy }}>
        <div>本週預計 <strong style={{ color: 'var(--osd-accent)', fontSize: compact ? 31 : 38 }}>{target}%</strong></div>
        <div>預計完成 <strong style={{ color: c.navy, fontSize: compact ? 31 : 38 }}>10/16</strong></div>
      </div>
    </div>
  );
}

function PendingCard({ number, title, detail }: { number: string; title: string; detail: string }) {
  return (
    <article style={{
      height: 500, boxSizing: 'border-box', padding: '42px 48px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`,
      borderTop: `8px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: c.muted, fontSize: 28, ...heavy }}>{number}</span>
        <PendingStatus />
      </div>
      <div style={{ width: 60, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 40 }} />
      <h2 style={{ margin: '28px 0 0', fontSize: 54, lineHeight: 1.3, ...heavy }}>{title}</h2>
      <p style={{ margin: '22px 0 0', color: c.muted, fontSize: 31, lineHeight: 1.5, ...bold }}>{detail}</p>
    </article>
  );
}

const AIOps: Page = () => (
  <Frame name="AIOps">
    <Heading title="AIOps" subtitle="標籤套用與會員權限" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 46, marginTop: 66 }}>
      <PendingCard number="01" title="範本標籤套用改為可選" detail="釐清套用流程與預設狀態" />
      <PendingCard number="02" title="權限可查看的標籤" detail="僅顯示會員有讀取權限的標籤" />
    </div>
  </Frame>
);

function CompletedBanner({ title }: { title: string }) {
  return (
    <article style={{
      minHeight: 126, boxSizing: 'border-box', padding: '24px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 36,
      background: c.paper, borderLeft: `8px solid ${c.teal}`, borderRadius: 'var(--osd-radius)',
    }}>
      <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.3, ...heavy }}>{title}</h2>
      <CompletedStatus />
    </article>
  );
}

function ProgressCard({ number, title, detail, current }: { number: string; title: string; detail: string; current: number }) {
  return (
    <article style={{
      height: 360, boxSizing: 'border-box', padding: '30px 34px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`,
      borderLeft: `8px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: c.muted, fontSize: 26, ...heavy }}>{number}</span>
        <Label color={c.gold}>本週</Label>
      </div>
      <h2 style={{ margin: '18px 0 0', fontSize: 40, lineHeight: 1.3, ...heavy }}>{title}</h2>
      <p style={{ margin: '10px 0 0', color: c.muted, fontSize: 27, lineHeight: 1.4, ...bold }}>{detail}</p>
      <div style={{ marginTop: 'auto' }}>
        <ProgressBlock current={current} compact />
      </div>
    </article>
  );
}

const Info: Page = () => (
  <Frame name="Info">
    <Heading title="Info" subtitle="資料修復、常用釘選與欄位群組" />
    <div data-content style={{ marginTop: 36 }}>
      <CompletedBanner title="嘗試修復誤刪 CRM User" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 28 }}>
        <ProgressCard number="01" title="分享範本與過濾站釘選" detail="逐一釘選或取消常用項目" current={0} />
        <ProgressCard number="02" title="跨單位欄位群組" detail="移轉時保留欄位與群組的對應關係" current={70} />
      </div>
    </div>
  </Frame>
);

function TargetOnly() {
  return (
    <div style={{ marginTop: 'auto', textAlign: 'right', color: c.muted, fontSize: 32, lineHeight: 1.4, ...heavy }}>
      <div>本週預計 <strong style={{ color: 'var(--osd-accent)', fontSize: 46 }}>100%</strong></div>
      <div>預計完成 <strong style={{ color: c.navy, fontSize: 46 }}>10/16</strong></div>
    </div>
  );
}

const Dbs: Page = () => (
  <Frame name="DBS">
    <Heading title="DBS" subtitle="內容體驗與帳號功能" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 46, marginTop: 62 }}>
      <article style={{
        height: 530, boxSizing: 'border-box', padding: '42px 48px',
        display: 'flex', flexDirection: 'column',
        background: c.navy, color: c.paper, borderRadius: 'var(--osd-radius)',
      }}>
        <CompletedStatus large />
        <div style={{ width: 62, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 34 }} />
        <h2 style={{ margin: '28px 0 0', fontSize: 56, lineHeight: 1.25, ...heavy }}>知識與內容 UI / UX</h2>
        <p style={{ margin: '22px 0 0', color: c.light, fontSize: 31, lineHeight: 1.5, ...bold }}>
          看看文章、電子報、聽聽 Podcast、多多益善專欄及投稿分享入口，提高互動。
        </p>
      </article>
      <article style={{
        height: 530, boxSizing: 'border-box', padding: '42px 44px',
        display: 'flex', flexDirection: 'column',
        background: c.paper, border: `1px solid ${c.rule}`,
        borderTop: `8px solid ${c.gold}`, borderRadius: 'var(--osd-radius)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Label color={c.gold}>BUG 修復</Label>
          <Label color={c.gold}>本週</Label>
        </div>
        <div style={{ width: 60, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 42 }} />
        <h2 style={{ margin: '28px 0 0', fontSize: 58, lineHeight: 1.25, ...heavy }}>忘記密碼</h2>
        <TargetOnly />
      </article>
    </div>
  </Frame>
);

const Sandbox: Page = () => (
  <Frame name="沙盒">
    <Heading
      title="沙盒"
      subtitle="本週進度與待確認項目"
      href="https://egroup-meeting.vercel.app/s/2026-10-monthly-report?p=7"
    />
    <article data-content style={{
      height: 590, boxSizing: 'border-box', padding: '44px 54px',
      marginTop: 46, background: c.navy, color: c.paper,
      borderRadius: 'var(--osd-radius)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <Label color={c.light}>素菁沙盒</Label>
          <h2 style={{ margin: '12px 0 0', fontSize: 62, lineHeight: 1.2, ...heavy }}>預計完成　11 月底</h2>
        </div>
        <span style={{ padding: '10px 18px', borderRadius: 999, background: '#153F62', color: c.light, fontSize: 28, ...heavy }}>進行中</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 44 }}>
        <div style={{ borderTop: '1px solid #506F8A', paddingTop: 24 }}>
          <div style={{ color: c.light, fontSize: 30, ...heavy }}>目前</div>
          <div style={{ marginTop: 4, fontSize: 104, lineHeight: 1, ...heavy }}>10<span style={{ fontSize: 44 }}>%</span></div>
        </div>
        <div style={{ borderTop: '1px solid #506F8A', paddingTop: 24 }}>
          <div style={{ color: c.light, fontSize: 30, ...heavy }}>本週預計</div>
          <div style={{ marginTop: 4, color: '#E8B867', fontSize: 104, lineHeight: 1, ...heavy }}>20<span style={{ fontSize: 44 }}>%</span></div>
        </div>
      </div>
      <div style={{ height: 1, background: '#506F8A', margin: '30px 0 22px' }} />
      <Label color="#E8B867">需協助／釐清</Label>
      <div style={{ marginTop: 10, fontSize: 42, lineHeight: 1.3, ...heavy }}>LINE、沙盒 API（暫定）</div>
    </article>
  </Frame>
);

const AutumnOuting: Page = () => (
  <Frame name="秋遊活動與投票網頁">
    <Heading title="秋遊活動與投票網頁" subtitle="網站製作進度" />
    <article data-content style={{
      height: 530, boxSizing: 'border-box', padding: '54px 68px',
      marginTop: 64, background: c.paper, border: `1px solid ${c.rule}`,
      borderLeft: `10px solid ${c.teal}`, borderRadius: 'var(--osd-radius)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <CompletedStatus large />
      <div>
        <Label color={c.teal}>AUTUMN OUTING × VOTING</Label>
        <h2 style={{ margin: '18px 0 0', fontSize: 72, lineHeight: 1.18, ...heavy }}>活動與投票網頁完成</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 16 }}>
        <span style={{ color: c.muted, fontSize: 34, ...heavy }}>完成度</span>
        <strong style={{ color: c.teal, fontSize: 112, lineHeight: 1, ...heavy }}>100<span style={{ fontSize: 48 }}>%</span></strong>
      </div>
    </article>
  </Frame>
);

export default [Cover, AIOps, Info, Dbs, Sandbox, AutumnOuting] satisfies Page[];
