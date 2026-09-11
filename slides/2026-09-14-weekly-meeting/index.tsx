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
  title: '2026 / 09 / 14 週會',
  description: 'AIOps 修正、Info 進度、DBS 規劃與素菁沙盒。',
  author: 'Shelly',
  createdAt: '2026-09-11T06:45:53.608Z',
};

const c = {
  muted: '#738291',
  rule: '#D8D3C7',
  navy: '#0A3A67',
  cream: '#F7F2E7',
  paper: '#FFFDF8',
  light: '#C4D8E9',
  teal: '#158B83',
  tealSoft: '#DDEEEA',
  gold: '#D7A443',
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
      <span>2026 / 09 / 14 週會</span>
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
      <div style={{ fontSize: 110, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 09 / 14</div>
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

function TaskTarget({ stacked = false, inline = false }: { stacked?: boolean; inline?: boolean }) {
  return (
    <div data-task-target style={{
      display: 'flex', flexDirection: stacked ? 'column' : 'row',
      gap: stacked ? 4 : 30, marginTop: stacked || inline ? 0 : 22,
      fontSize: 30, lineHeight: 1.4, ...heavy,
    }}>
      <span style={{ whiteSpace: 'nowrap', color: c.muted }}>
        本週預計 <strong style={{ fontSize: 36, color: 'var(--osd-accent)', ...heavy }}>100%</strong>
      </span>
      <span style={{ whiteSpace: 'nowrap', color: c.muted }}>
        預計完成 <strong style={{ fontSize: 36, color: c.navy, ...heavy }}>9/18</strong>
      </span>
    </div>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 28 }}>
      <div>
        <h1 style={{
          fontSize: 'var(--osd-size-hero)', fontFamily: 'var(--osd-font-display)',
          ...heavy, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
        }}>{title}</h1>
        <p style={{ margin: '14px 0 0', fontSize: 31, color: c.muted, lineHeight: 1.4, ...bold }}>{subtitle}</p>
      </div>
    </header>
  );
}

function Label({ children, color = 'var(--osd-accent)' }: { children: ReactNode; color?: string }) {
  return <div style={{ color, fontSize: 32, ...heavy, lineHeight: 1.4 }}>{children}</div>;
}

function Issue({ product, children, detail }: { product: string; children: ReactNode; detail?: ReactNode }) {
  return (
    <article>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <Label>{product}</Label>
        <span style={{ width: 26, height: 2, background: c.rule }} />
        <Label color={c.muted}>已開 Issue</Label>
      </div>
      <h2 style={{ fontSize: 51, ...heavy, margin: '21px 0 0', lineHeight: 1.35 }}>{children}</h2>
      {detail && <p style={{ fontSize: 34, color: c.muted, margin: '14px 0 0', lineHeight: 1.45, ...bold }}>{detail}</p>}
      <TaskTarget />
    </article>
  );
}

const AIOps: Page = () => (
  <Frame name="AIOps">
    <Heading title="AIOps" subtitle="文章與表單修正" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '790px 1fr', columnGap: 90, marginTop: 52 }}>
      <article style={{
        height: 576, boxSizing: 'border-box', padding: '54px 60px',
        background: c.navy, color: c.paper, display: 'flex', flexDirection: 'column',
        borderRadius: 'var(--osd-radius)',
      }}>
        <Label color={c.light}>DBS 文章</Label>
        <div style={{ marginTop: 32 }}>
          <CompletedStatus large />
        </div>
        <div style={{ width: 64, height: 5, background: 'var(--osd-accent)', marginTop: 34 }} />
        <h2 style={{ fontSize: 48, lineHeight: 1.4, ...heavy, margin: '30px 0 0' }}>
          僅顯示特定<br />新知識庫文章標籤
        </h2>
      </article>
      <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Issue product="DBS">文章留言數</Issue>
        <div style={{ height: 1, background: c.rule, margin: '20px 0' }} />
        <Issue product="Info" detail="必填之生日須為有效日期">表單生日驗證</Issue>
      </div>
    </div>
  </Frame>
);

function CurrentProgress({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 'auto', paddingTop: 21 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 15 }}>
        <span style={{ fontSize: 32, color: c.muted, ...heavy }}>目前</span>
        <span style={{ fontSize: 86, lineHeight: 1.1, ...heavy, color: c.teal }}>
          {value}<span style={{ fontSize: 35 }}>%</span>
        </span>
      </div>
      <TaskTarget stacked />
    </div>
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

function InfoItem({ number, title, children, planned = false, completed = false }: {
  number: string; title: string; children: ReactNode; planned?: boolean; completed?: boolean;
}) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 22 }}>
      <div style={{ fontSize: 27, ...heavy, color: 'var(--osd-accent)', paddingTop: 10 }}>{number}</div>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <h2 style={{ margin: 0, fontSize: 46, ...heavy, lineHeight: 1.35 }}>{title}</h2>
          {planned && <Label color={c.gold}>本週</Label>}
          {completed && <CompletedStatus />}
        </div>
        {children}
      </div>
    </article>
  );
}

const Info: Page = () => (
  <Frame name="Info">
    <Heading title="Info" subtitle="分享、資料保護與事件功能" />
    <div data-content style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '45px 95px', marginTop: 64,
    }}>
      <InfoItem number="01" title="分享與訊息" completed>
        <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: '22px 0 0', color: c.muted, ...bold }}>
          分享、與我分享<br />批次簡訊／Email
        </p>
      </InfoItem>
      <InfoItem number="02" title="CRM 登入資料" completed>
        <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: '22px 0 0', color: c.muted, ...bold }}>
          避免登入資料<br />被洗成 NULL
        </p>
      </InfoItem>
      <div style={{ gridColumn: '1 / -1', height: 1, background: c.rule }} />
      <InfoItem number="03" title="通用 Tags 與轉介">
        <p style={{ fontSize: 32, lineHeight: 1.5, margin: '15px 0 0', color: c.muted, ...bold }}>
          通用 Tags／預設事件／轉介完成
        </p>
        <CurrentProgress value={97} />
      </InfoItem>
      <InfoItem number="04" title="事件儀表板" planned>
        <CurrentProgress value={80} />
      </InfoItem>
    </div>
  </Frame>
);

function DbsItem({ number, title, detail, planned = false, completed = false }: {
  number: string; title: string; detail?: string; planned?: boolean; completed?: boolean;
}) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '62px 1fr', gap: 22 }}>
      <div style={{ fontSize: 27, ...heavy, color: c.teal, paddingTop: 8 }}>{number}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <h2 style={{ fontSize: 43, margin: 0, ...heavy, lineHeight: 1.35 }}>{title}</h2>
          {completed && <CompletedStatus />}
          {planned && <Label color={c.gold}>本週</Label>}
        </div>
        {detail && <p style={{ fontSize: 33, color: c.muted, lineHeight: 1.5, margin: '13px 0 0', ...bold }}>{detail}</p>}
        {planned && <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 20, ...bold }}>
          <span style={{ color: c.muted, fontSize: 32, whiteSpace: 'nowrap', ...heavy }}>目前 0%</span>
          <TaskTarget inline />
        </div>}
      </div>
    </article>
  );
}

const DbsAndSandbox: Page = () => (
  <Frame name="DBS 與沙盒">
    <Heading title="DBS" subtitle="財務、文章功能與沙盒進度" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1030px 1fr', gap: 65, marginTop: 50 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 56, paddingTop: 14 }}>
        <DbsItem number="01" title="年月查詢、記帳圓餅圖" completed />
        <DbsItem number="02" title="財務工具" detail="月報 AI 解析 BUG" planned />
        <DbsItem number="03" title="文章排程與 AI 推薦" detail="呈現 AI 推薦功能" planned />
      </div>
      <aside style={{
        background: c.navy, color: c.paper, padding: '32px 44px',
        height: 590, boxSizing: 'border-box', borderRadius: 'var(--osd-radius)',
      }}>
        <Label color={c.light}>沙盒</Label>
        <h2 style={{ fontSize: 50, lineHeight: 1.3, margin: '14px 0 0', ...heavy }}>素菁沙盒</h2>
        <div style={{ marginTop: 20, color: c.light, fontSize: 32, ...heavy }}>預計完成　11 月底</div>
        <div style={{ marginTop: 25, fontSize: 32, color: c.light, ...heavy }}>本週預計</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 5 }}>
          <span style={{ fontSize: 102, ...heavy, lineHeight: 1.1 }}>10<span style={{ fontSize: 43 }}>%</span></span>
          <span style={{ color: c.light, fontSize: 32, ...heavy }}>目前 5%</span>
        </div>
        <div style={{ height: 1, background: '#506F8A', margin: '24px 0 20px' }} />
        <Label color="#E8B867">需協助／釐清</Label>
        <div style={{ fontSize: 39, lineHeight: 1.25, ...heavy, marginTop: 12 }}>認識沙盒</div>
      </aside>
    </div>
  </Frame>
);

export default [Cover, AIOps, Info, DbsAndSandbox] satisfies Page[];
