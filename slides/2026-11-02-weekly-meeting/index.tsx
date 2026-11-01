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
  title: '2026 / 11 / 02 週會',
  description: 'INFO、DBS 與沙盒本週工作進度。',
  author: 'Shelly',
  createdAt: '2026-11-01T16:04:47.628Z',
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
    <header style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ width: 54, height: 7, borderRadius: 99, background: accent }} />
        <span style={{ fontSize: 26, letterSpacing: '0.12em', color: accent, ...heavy }}>WEEKLY REPORT</span>
      </div>
      <h1 style={{
        margin: '10px 0 0', fontFamily: 'var(--osd-font-display)',
        fontSize: 76, lineHeight: 1.08, letterSpacing: '-0.025em', ...heavy,
      }}>{title}</h1>
      <p style={{ margin: '7px 0 0', fontSize: 29, color: c.muted, lineHeight: 1.35, ...bold }}>{subtitle}</p>
    </header>
  );
}

function DoneBadge({ color = c.teal, soft = c.tealSoft }: { color?: string; soft?: string }) {
  return (
    <span style={{
      flexShrink: 0, padding: '7px 14px', borderRadius: 999,
      background: soft, color, fontSize: 21, ...heavy,
    }}>✓ 完成</span>
  );
}

function DataCard({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article style={{
      height: 168, boxSizing: 'border-box', padding: '24px 34px',
      display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 24,
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 22,
      borderLeft: `8px solid ${c.teal}`,
    }}>
      <span style={{ color: c.teal, fontSize: 36, ...heavy }}>{index}</span>
      <div>
        <h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.18, ...heavy }}>{title}</h2>
        <p style={{ margin: '10px 0 0', color: c.muted, fontSize: 24, lineHeight: 1.35, ...bold }}>{note}</p>
      </div>
      <DoneBadge />
    </article>
  );
}

function ShareCard({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article style={{
      height: 238, boxSizing: 'border-box', padding: '28px 32px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 22,
      borderTop: `7px solid ${c.teal}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ color: c.teal, fontSize: 24, letterSpacing: '0.08em', ...heavy }}>{index}</span>
        <DoneBadge />
      </div>
      <h2 style={{ margin: '14px 0 0', fontSize: 36, lineHeight: 1.22, ...heavy }}>{title}</h2>
      <p style={{ margin: '10px 0 0', color: c.muted, fontSize: 23, lineHeight: 1.38, ...bold }}>{note}</p>
    </article>
  );
}

function DbsFeatureCard({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <article style={{
      height: 400, boxSizing: 'border-box', padding: '38px 42px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 28,
      borderTop: `8px solid ${c.gold}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
        <span style={{ color: c.gold, fontSize: 26, letterSpacing: '0.08em', ...heavy }}>{index}</span>
        <DoneBadge color="#9A6810" soft={c.goldSoft} />
      </div>
      <h2 style={{ margin: '26px 0 0', fontSize: 48, lineHeight: 1.2, ...heavy }}>{title}</h2>
      <p style={{ margin: '18px 0 0', color: c.muted, fontSize: 26, lineHeight: 1.5, ...bold }}>{note}</p>
    </article>
  );
}

function DbsCompletedRow({ index, title }: { index: string; title: string }) {
  return (
    <article style={{
      gridColumn: '1 / -1', height: 154, boxSizing: 'border-box', padding: '28px 34px',
      display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 24,
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 22,
      borderLeft: `8px solid ${c.gold}`,
    }}>
      <span style={{ color: c.gold, fontSize: 36, ...heavy }}>{index}</span>
      <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.2, ...heavy }}>{title}</h2>
      <DoneBadge color="#9A6810" soft={c.goldSoft} />
    </article>
  );
}

function PlatformCard({ label, title, note }: { label: string; title: string; note: string }) {
  return (
    <article style={{
      height: 410, boxSizing: 'border-box', padding: '36px 40px',
      display: 'flex', flexDirection: 'column',
      background: c.paper, border: `1px solid ${c.rule}`, borderRadius: 28,
      borderTop: `8px solid ${c.teal}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
        <span style={{ color: c.teal, fontSize: 26, letterSpacing: '0.08em', ...heavy }}>{label}</span>
        <DoneBadge />
      </div>
      <h2 style={{ margin: '24px 0 0', fontSize: 48, lineHeight: 1.2, ...heavy }}>{title}</h2>
      <p style={{ margin: '16px 0 0', color: c.muted, fontSize: 26, lineHeight: 1.45, ...bold }}>{note}</p>
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
      <div style={{ fontSize: 108, lineHeight: 1.1, letterSpacing: '-0.015em', ...heavy }}>2026 / 11 / 02</div>
      <h1 style={{ fontSize: 150, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '26px 0 0', ...heavy }}>週會報告</h1>
      <div style={{ marginTop: 42, fontSize: 32, lineHeight: 1.2, letterSpacing: '0.12em', color: '#456882', ...heavy }}>Shelly</div>
    </div>
    <Footer />
  </section>
);

const InfoData: Page = () => (
  <Frame name="INFO 欄位與資料">
    <Heading title="Info" subtitle="本週完成｜欄位與資料" />
    <div style={{ display: 'grid', gap: 16, marginTop: 26 }}>
      <DataCard
        index="01"
        title="財務範本欄位 Bug 修正"
        note="收入欄位不再誤帶支出 ID；後端拒絕重複 ID，避免靜默覆蓋"
      />
      <DataCard
        index="02"
        title="Excel 匯入欄位對應"
        note="固定別名與動態欄位同名時，依明確型態正確寫入"
      />
      <DataCard
        index="03"
        title="動態單選欄位儲存"
        note="清除多選殘留限制，切換欄位類型後可正常儲存"
      />
    </div>
  </Frame>
);

const InfoSharing: Page = () => (
  <Frame name="INFO 分享與 CRM">
    <Heading title="Info" subtitle="本週完成｜分享、CRM 與介面" />
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 18, marginTop: 24,
    }}>
      <ShareCard
        index="01"
        title="分享範本附件三態，串接 DBS 諮詢"
        note="不顯示／必填／選填；DBS 諮詢同步套用顯示與送件規則"
      />
      <ShareCard
        index="02"
        title="分享範本置頂權限"
        note="移除不存在的額外權限限制，組織隔離仍保留"
      />
      <ShareCard
        index="03"
        title="分享編輯連結期限"
        note="套用客戶個別期限，並修正相對天數偶爾跨日"
      />
      <ShareCard
        index="04"
        title="CRM 填寫體驗"
        note="完成鍵盤填寫、手機日期時間與 Info 2.0 空白欄位修正"
      />
      <ShareCard
        index="05"
        title="Info 2.0 彈窗篩選"
        note="進階篩選顯示在彈窗上方，不再被遮住"
      />
    </div>
  </Frame>
);

const DbsCompleted: Page = () => (
  <Frame name="DBS 體驗與穩定">
    <Heading title="DBS" subtitle="本週完成｜體驗與穩定" accent={c.gold} />
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 24, marginTop: 32,
    }}>
      <DbsFeatureCard
        index="01"
        title="情境懶人包、快篩與頻道讀取"
        note="修正標題、摘要清單與視窗誤判；補載入逐字稿回饋，避免頻道詳情 500"
      />
      <DbsFeatureCard
        index="02"
        title="登入、註冊與驗證信"
        note="分離登入與聯絡信箱，修正 Google 回呼，支援重寄驗證信與錯誤恢復"
      />
      <DbsCompletedRow
        index="03"
        title="成果發表會入口與放映廳"
      />
    </div>
  </Frame>
);

const Platform: Page = () => (
  <Frame name="INFO 測試與相容性">
    <Heading title="Info" subtitle="本週完成｜測試與相容性" />
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 24, marginTop: 30,
    }}>
      <PlatformCard
        label="01"
        title="DEV 自動測試登入開關"
        note="DEV 開啟自動測試登入 API，支援測試環境流程"
      />
      <PlatformCard
        label="02"
        title="Release token 相容性回退"
        note="恢復跨瀏覽器 A → B → A 的舊 token 相容行為"
      />
    </div>
  </Frame>
);

const InfoFilterHistory: Page = () => (
  <Frame name="INFO 過濾站匯入歷史紀錄">
    <Heading title="Info" subtitle="過濾站匯入歷史紀錄｜11 / 06 預計完成" />
    <div style={{
      display: 'grid', gridTemplateColumns: '1.25fr 0.75fr',
      minHeight: 430, gap: 26, marginTop: 44,
    }}>
      <article style={{
        padding: '48px 54px', display: 'flex', flexDirection: 'column',
        background: c.navy, color: c.paper, borderRadius: 28,
      }}>
        <span style={{ color: c.light, fontSize: 27, letterSpacing: '0.12em', ...heavy }}>過濾站</span>
        <h2 style={{ margin: '30px 0 0', fontSize: 72, lineHeight: 1.15, ...heavy }}>匯入歷史紀錄</h2>
        <div style={{ marginTop: 'auto', color: c.light, fontSize: 25, ...heavy }}>本週</div>
      </article>
      <aside style={{
        padding: '44px 44px 40px', display: 'flex', flexDirection: 'column',
        background: c.tealSoft, borderRadius: 28,
      }}>
        <span style={{ color: c.teal, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>目前</span>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <strong style={{ fontSize: 78, lineHeight: 1, ...heavy }}>0</strong>
          <span style={{ fontSize: 36, ...heavy }}>%</span>
        </div>
        <div style={{ margin: '14px 0', height: 3, background: 'rgba(21, 139, 131, 0.22)' }} />
        <span style={{ color: c.teal, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>本週預計</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <strong style={{ color: c.teal, fontSize: 78, lineHeight: 1, ...heavy }}>100</strong>
          <span style={{ color: c.teal, fontSize: 36, ...heavy }}>%</span>
        </div>
      </aside>
    </div>
  </Frame>
);

const Sandbox: Page = () => (
  <Frame name="沙盒進度">
    <Heading title="沙盒" subtitle="目前 50%｜本週預計 70%" accent={c.gold} />
    <article style={{
      height: 590, marginTop: 46, padding: '44px 54px', boxSizing: 'border-box',
      background: c.navy, color: c.paper, borderRadius: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: c.light, fontSize: 27, letterSpacing: '0.08em', ...heavy }}>素菁沙盒</span>
          <h2 style={{ margin: '12px 0 0', fontSize: 56, lineHeight: 1.2, ...heavy }}>預計完成　11 / 06</h2>
        </div>
        <span style={{ padding: '10px 18px', borderRadius: 999, background: '#153F62', color: c.light, fontSize: 28, ...heavy }}>進行中</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 44 }}>
        <div style={{ borderTop: '1px solid #506F8A', paddingTop: 24 }}>
          <div style={{ color: c.light, fontSize: 30, ...heavy }}>目前</div>
          <div style={{ marginTop: 4, fontSize: 104, lineHeight: 1, ...heavy }}>50<span style={{ fontSize: 44 }}>%</span></div>
        </div>
        <div style={{ borderTop: '1px solid #506F8A', paddingTop: 24 }}>
          <div style={{ color: c.light, fontSize: 30, ...heavy }}>本週預計</div>
          <div style={{ marginTop: 4, color: '#E8B867', fontSize: 104, lineHeight: 1, ...heavy }}>70<span style={{ fontSize: 44 }}>%</span></div>
        </div>
      </div>
      <div style={{ height: 1, background: '#506F8A', margin: '30px 0 22px' }} />
      <span style={{ color: '#E8B867', fontSize: 26, letterSpacing: '0.1em', ...heavy }}>需協助／釐清</span>
      <div style={{ marginTop: 10, fontSize: 42, lineHeight: 1.3, ...heavy }}>麻煩學長協助建置部屬初始化精靈</div>
    </article>
  </Frame>
);

const Gooldays: Page = () => (
  <Frame name="gooldays 進度">
    <Heading title="gooldays" subtitle="流程與介面設計｜11 / 06 預計完成" accent={c.gold} />
    <div style={{
      display: 'grid', gridTemplateColumns: '1.25fr 0.75fr',
      minHeight: 430, gap: 26, marginTop: 44,
    }}>
      <article style={{
        padding: '48px 54px', display: 'flex', flexDirection: 'column',
        background: c.navy, color: c.paper, borderRadius: 28,
      }}>
        <span style={{ color: '#E8B867', fontSize: 27, letterSpacing: '0.12em', ...heavy }}>GOOLDAYS</span>
        <h2 style={{ margin: '30px 0 0', fontSize: 72, lineHeight: 1.15, ...heavy }}>流程與介面設計</h2>
        <div style={{ marginTop: 'auto', color: '#E8B867', fontSize: 25, ...heavy }}>本週</div>
      </article>
      <aside style={{
        padding: '44px 44px 40px', display: 'flex', flexDirection: 'column',
        background: c.goldSoft, borderRadius: 28,
      }}>
        <span style={{ color: '#9A6810', fontSize: 27, letterSpacing: '0.08em', ...heavy }}>目前</span>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <strong style={{ fontSize: 78, lineHeight: 1, ...heavy }}>25</strong>
          <span style={{ fontSize: 36, ...heavy }}>%</span>
        </div>
        <div style={{ margin: '14px 0', height: 3, background: 'rgba(154, 104, 16, 0.22)' }} />
        <span style={{ color: '#9A6810', fontSize: 27, letterSpacing: '0.08em', ...heavy }}>本週預計</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <strong style={{ color: '#9A6810', fontSize: 78, lineHeight: 1, ...heavy }}>50</strong>
          <span style={{ color: '#9A6810', fontSize: 36, ...heavy }}>%</span>
        </div>
      </aside>
    </div>
  </Frame>
);

export default [
  Cover,
  InfoData,
  InfoSharing,
  Platform,
  InfoFilterHistory,
  DbsCompleted,
  Sandbox,
  Gooldays,
] satisfies Page[];
