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
  title: '2026 / 09 / 21 週會',
  description: 'AIOps 修正、Info 進度、DBS 規劃與素菁沙盒。',
  author: 'Shelly',
  createdAt: '2026-09-20T16:31:44.160Z',
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
      <span>2026 / 09 / 21 週會</span>
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
      <div style={{ fontSize: 110, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 09 / 21</div>
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

function TaskTarget({ stacked = false, inline = false, targetDate = '9/24', target = 100 }: {
  stacked?: boolean; inline?: boolean; targetDate?: string; target?: number;
}) {
  return (
    <div data-task-target style={{
      display: 'flex', flexDirection: stacked ? 'column' : 'row',
      gap: stacked ? 4 : 30, marginTop: stacked || inline ? 0 : 22,
      fontSize: 30, lineHeight: 1.4, ...heavy,
    }}>
      <span style={{ whiteSpace: 'nowrap', color: c.muted }}>
        本週預計 <strong style={{ fontSize: 36, color: 'var(--osd-accent)', ...heavy }}>{target}%</strong>
      </span>
      <span style={{ whiteSpace: 'nowrap', color: c.muted }}>
        預計完成 <strong style={{ fontSize: 36, color: c.navy, ...heavy }}>{targetDate}</strong>
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

function Issue({ product, children, detail, completed = false, inProgress = false, deferred = false, compact = false, dark = false }: {
  product: string; children: ReactNode; detail?: ReactNode;
  completed?: boolean; inProgress?: boolean; deferred?: boolean; compact?: boolean; dark?: boolean;
}) {
  return (
    <article style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <Label color={dark ? c.light : 'var(--osd-accent)'}>{product}</Label>
        <span style={{ width: 26, height: 2, background: dark ? '#506F8A' : c.rule }} />
        <Label color={dark ? c.light : c.muted}>已開 Issue</Label>
      </div>
      {completed ? (
        <>
          <div style={{ marginTop: 30 }}><CompletedStatus large /></div>
          <div style={{ width: 60, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 30 }} />
          <h2 style={{ fontSize: compact ? 62 : 51, color: dark ? c.paper : 'var(--osd-text)', ...heavy, margin: '24px 0 0', lineHeight: 1.22 }}>{children}</h2>
          {detail && <p style={{ fontSize: compact ? 32 : 34, color: dark ? c.light : c.muted, margin: '16px 0 0', lineHeight: 1.4, ...bold }}>{detail}</p>}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 28 }}>
            <h2 style={{ fontSize: compact ? 62 : 51, color: dark ? c.paper : 'var(--osd-text)', ...heavy, margin: 0, lineHeight: 1.22 }}>{children}</h2>
            {inProgress && <Label color={c.gold}>本週</Label>}
            {deferred && <DeferredLabel />}
          </div>
          {detail && <p style={{ fontSize: compact ? 32 : 34, color: dark ? c.light : c.muted, margin: '16px 0 0', lineHeight: 1.4, ...bold }}>{detail}</p>}
          {inProgress ? (
            <>
              <div style={{ width: 60, height: 5, borderRadius: 99, background: 'var(--osd-accent)', marginTop: 28 }} />
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 30, marginTop: 24 }}>
                <InProgressStatus />
                <TaskTarget stacked />
              </div>
            </>
          ) : <TaskTarget />}
        </>
      )}
    </article>
  );
}

const AIOps: Page = () => (
  <Frame name="AIOps">
    <Heading title="AIOps" subtitle="文章與表單修正" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 72 }}>
      <AIOpsItem number="01" product="Info" title="表單生日驗證" detail="必填之生日須為有效日期" completed />
      <AIOpsItem number="02" product="DBS" title="文章留言數" detail="留言數統計與顯示調整" inProgress deferred />
    </div>
  </Frame>
);

function AIOpsItem({ number, product, title, detail, completed = false, inProgress = false, deferred = false }: {
  number: string; product: string; title: string; detail: string; completed?: boolean; inProgress?: boolean; deferred?: boolean;
}) {
  return (
    <article style={{
      display: 'grid', gridTemplateColumns: '82px 1fr', gap: 26,
      padding: '30px 42px', boxSizing: 'border-box',
      minHeight: 520,
      border: completed ? 'none' : `1px solid ${c.rule}`,
      borderLeft: `8px solid ${completed ? c.navy : c.gold}`,
      borderRadius: 'var(--osd-radius)', background: completed ? c.navy : c.paper,
    }}>
      <div style={{ fontSize: 38, color: completed ? c.light : c.gold, ...heavy, paddingTop: 8 }}>{number}</div>
      <Issue product={product} detail={detail} completed={completed} inProgress={inProgress} deferred={deferred} compact dark={completed}>
        {title}
      </Issue>
    </article>
  );
}

function InProgressStatus() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '12px 22px', borderRadius: 999,
      background: c.light, color: c.navy, whiteSpace: 'nowrap',
      fontSize: 30, lineHeight: 1.2, ...heavy,
    }}>
      <span aria-hidden="true" style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 30, height: 30, borderRadius: '50%',
        background: c.navy, color: c.light, fontSize: 17, letterSpacing: 1,
      }}>•••</span>
      進行中
    </span>
  );
}

function CurrentProgress({ value, label = '目前', target = 100 }: { value: number; label?: string; target?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 15 }}>
        <span style={{ fontSize: 32, color: c.muted, ...heavy }}>{label}</span>
        <span style={{ fontSize: 86, lineHeight: 1.1, ...heavy, color: c.teal }}>
          {value}<span style={{ fontSize: 35 }}>%</span>
        </span>
      </div>
      <TaskTarget stacked target={target} />
    </div>
  );
}

function DeferredLabel() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 42, height: 38, padding: '0 10px', boxSizing: 'border-box',
      borderRadius: 999, background: '#F4E5B9', color: '#A86F13',
      fontSize: 26, lineHeight: 1, ...heavy,
    }} aria-label="延期">
      延
    </span>
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

function InfoItem({ number, title, children, planned = false, completed = false, deferred = false }: {
  number: string; title: string; children: ReactNode;
  planned?: boolean; completed?: boolean; deferred?: boolean;
}) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 22 }}>
      <div style={{ fontSize: 27, ...heavy, color: 'var(--osd-accent)', paddingTop: 10 }}>{number}</div>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <h2 style={{ margin: 0, fontSize: 46, ...heavy, lineHeight: 1.35 }}>{title}</h2>
          {deferred && <DeferredLabel />}
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
    <Heading title="Info" subtitle="本週已完成與目前進度" />
    <div data-content style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '45px 95px', marginTop: 64,
    }}>
      <InfoItem number="01" title="事件儀表板" completed>
        <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: '22px 0 0', color: c.muted, ...bold }}>
          事件功能已完成
        </p>
      </InfoItem>
      <InfoItem number="02" title="分享範本" completed>
        <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: '22px 0 0', color: c.muted, ...bold }}>
          修正分享名稱不同步
        </p>
      </InfoItem>
      <InfoItem number="03" title="DB 還原" completed>
        <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: '22px 0 0', color: c.muted, ...bold }}>
          嘗試匯入合併 DB 還原
        </p>
      </InfoItem>
      <InfoItem number="04" title="通用 Tags 與轉介" deferred>
        <p style={{ fontSize: 32, lineHeight: 1.5, margin: '15px 0 0', color: c.muted, ...bold }}>
          通用 Tags／預設事件／轉介完成
        </p>
        <CurrentProgress value={98} />
      </InfoItem>
    </div>
  </Frame>
);

const InfoContinued: Page = () => (
  <Frame name="Info 續頁">
    <Heading title="Info" subtitle="09/24 前完成｜資料與表單修正" />
    <div data-content style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '68px 95px', marginTop: 82,
    }}>
      <InfoItem number="05" title="可以轉給別單位" planned>
        <p style={{ fontSize: 30, lineHeight: 1.5, margin: '15px 0 0', color: c.muted, ...bold }}>
          支援將案件轉交其他單位處理
        </p>
        <CurrentProgress value={0} target={85} />
      </InfoItem>
      <InfoItem number="06" title="CRM User 性別" planned>
        <p style={{ fontSize: 30, lineHeight: 1.5, margin: '15px 0 0', color: c.muted, ...bold }}>
          未存時介面空白／歷史記錄顯示女
        </p>
        <PlannedProgress />
      </InfoItem>
      <InfoItem number="07" title="表單本機儲存" planned>
        <p style={{ fontSize: 30, lineHeight: 1.5, margin: '15px 0 0', color: c.muted, ...bold }}>
          表單資料保留在本機
        </p>
        <PlannedProgress />
      </InfoItem>
    </div>
  </Frame>
);

function PlannedProgress() {
  return <CurrentProgress value={0} />;
}

function DbsItem({ number, title, detail, planned = false, completed = false, progress = 0, deferred = false }: {
  number: string; title: string; detail?: string;
  planned?: boolean; completed?: boolean; progress?: number; deferred?: boolean;
}) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '62px 1fr', gap: 22 }}>
      <div style={{ fontSize: 27, ...heavy, color: c.teal, paddingTop: 8 }}>{number}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <h2 style={{ fontSize: 43, margin: 0, ...heavy, lineHeight: 1.35 }}>{title}</h2>
          {completed && <CompletedStatus />}
          {deferred && <DeferredLabel />}
          {planned && !deferred && <Label color={c.gold}>本週</Label>}
        </div>
        {detail && <p style={{ fontSize: 33, color: c.muted, lineHeight: 1.5, margin: '13px 0 0', ...bold }}>{detail}</p>}
        {planned && <CurrentProgress value={progress} />}
      </div>
    </article>
  );
}

const DbsAndSandbox: Page = () => (
  <Frame name="DBS 與沙盒">
    <Heading title="DBS" subtitle="財務、文章功能與沙盒進度" />
    <div data-content style={{ display: 'grid', gridTemplateColumns: '1030px 1fr', gap: 65, marginTop: 50 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 56, paddingTop: 14 }}>
        <DbsItem number="01" title="文章排程與 AI 推薦" detail="呈現 AI 推薦功能" completed />
        <DbsItem number="02" title="財務工具" detail="月報 AI 解析 BUG" planned deferred progress={98} />
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
          <span style={{ fontSize: 92, ...heavy, lineHeight: 1.1 }}>待定</span>
          <span style={{ color: c.light, fontSize: 32, ...heavy }}>目前 5%</span>
        </div>
        <div style={{ height: 1, background: '#506F8A', margin: '24px 0 20px' }} />
        <Label color="#E8B867">需協助／釐清</Label>
        <div style={{ fontSize: 39, lineHeight: 1.25, ...heavy, marginTop: 12 }}>認識沙盒</div>
      </aside>
    </div>
  </Frame>
);

export default [Cover, AIOps, Info, InfoContinued, DbsAndSandbox] satisfies Page[];
