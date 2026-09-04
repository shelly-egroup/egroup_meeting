import type { CSSProperties, ReactNode } from "react";
import type { DesignSystem, Page, SlideMeta } from "@open-slide/core";

const colors = {
  cream: "#F7F2E7",
  paper: "#FFFDF8",
  navy: "#0A3A67",
  ink: "#17344D",
  muted: "#738291",
  bug: "#E45F50",
  bugSoft: "#F7DED7",
  teal: "#158B83",
  tealSoft: "#DDEEEA",
  gold: "#D7A443",
  goldSoft: "#F3E7C8",
  line: "#D8D3C7",
};

const fontFamily = '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif';

export const meta: SlideMeta = {
  title: "2026 / 09 月會報告",
  description: "Shelly 的 2026 年 9 月工作成果、系統修正與本月規劃。",
  author: "Shelly",
  createdAt: "2026-09-04T07:10:08.057Z",
};

export const design: DesignSystem = {
  palette: {
    bg: colors.cream,
    text: colors.navy,
    accent: colors.bug,
  },
  fonts: {
    display: fontFamily,
    body: fontFamily,
  },
  typeScale: {
    hero: 176,
    body: 34,
  },
  radius: 18,
};

const base: CSSProperties = {
  width: 1920,
  height: 1080,
  position: "relative",
  overflow: "hidden",
  background: colors.cream,
  color: colors.ink,
  fontFamily,
  boxSizing: "border-box",
};

const pagePad: CSSProperties = {
  padding: "96px 126px 88px",
};

function Eyebrow({ children, color = colors.muted }: { children: ReactNode; color?: string }) {
  return (
    <div
      style={{
        color,
        fontSize: 32,
        fontWeight: 900,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Footer({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 126,
        bottom: 54,
        color: dark ? "#AFC1CE" : colors.muted,
        fontSize: 24,
        lineHeight: 1,
        fontWeight: 850,
        fontVariationSettings: '"wght" 850',
      }}
    >
      2026 / 09 月會
    </div>
  );
}

function Header({ section, title, accent }: { section: string; title: string; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <div>
        <Eyebrow color={accent}>{section}</Eyebrow>
        <h1
          style={{
            margin: "14px 0 0",
            color: colors.navy,
            fontSize: 66,
            lineHeight: 1.12,
            fontWeight: 900,
            letterSpacing: "-0.015em",
            fontVariationSettings: '"wght" 900',
          }}
        >
          {title}
        </h1>
      </div>
      <div style={{ width: 132, height: 9, borderRadius: 999, background: accent }} />
    </div>
  );
}

function SectionTag({ children, color, soft }: { children: ReactNode; color: string; soft: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "10px 18px 9px",
        background: soft,
        color,
        fontSize: 22,
        lineHeight: 1,
        fontWeight: 900,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </span>
  );
}

function Metric({ value, label, note, accent }: { value: string; label: string; note: string; accent: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, borderTop: `7px solid ${accent}`, paddingTop: 26 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ color: colors.navy, fontSize: 108, lineHeight: 0.95, fontWeight: 900 }}>{value}</span>
        <span style={{ color: accent, fontSize: 28, fontWeight: 900 }}>{label}</span>
      </div>
      <div style={{ marginTop: 18, color: colors.muted, fontSize: 27, lineHeight: 1.45, fontWeight: 600 }}>{note}</div>
    </div>
  );
}

function IssueRow({ no, children }: { no: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "92px 1fr",
        alignItems: "center",
        minHeight: 102,
        borderTop: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ color: colors.bug, fontSize: 24, fontWeight: 900, letterSpacing: "0.08em" }}>{no}</div>
      <div style={{ color: colors.ink, fontSize: 34, lineHeight: 1.3, fontWeight: 750 }}>{children}</div>
    </div>
  );
}

function ImprovementRow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, minHeight: 92, borderBottom: `1px solid ${colors.line}` }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: colors.tealSoft,
          color: colors.teal,
          fontSize: 20,
          fontWeight: 900,
        }}
      >
        {index}
      </div>
      <div style={{ fontSize: 31, lineHeight: 1.3, fontWeight: 750 }}>{children}</div>
    </div>
  );
}

function DbsBug({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, minHeight: 78, borderBottom: "1px solid rgba(255,255,255,.2)" }}>
      <div style={{ width: 11, height: 11, borderRadius: "50%", background: colors.bug }} />
      <div style={{ color: colors.paper, fontSize: 27, lineHeight: 1.28, fontWeight: 850, fontVariationSettings: '"wght" 850' }}>{children}</div>
    </div>
  );
}

function PlanRow({ no, title, note }: { no: string; title: string; note: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "116px 570px 1fr",
        alignItems: "center",
        minHeight: 178,
        borderTop: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ color: colors.gold, fontSize: 32, fontWeight: 900, letterSpacing: "0.08em" }}>{no}</div>
      <div style={{ color: colors.navy, fontSize: 40, lineHeight: 1.25, fontWeight: 900 }}>{title}</div>
      <div style={{ color: colors.muted, fontSize: 40, lineHeight: 1.3, fontWeight: 750, fontVariationSettings: '"wght" 750' }}>{note}</div>
    </div>
  );
}

function Cover() {
  return (
    <section style={{ ...base, display: "grid", placeItems: "center" }}>
      <div style={{ position: "absolute", left: 126, top: 96, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 56, height: 7, borderRadius: 99, background: colors.bug }} />
        <Eyebrow>MONTHLY REPORT</Eyebrow>
      </div>
      <div style={{ textAlign: "center", transform: "translateY(-4px)" }}>
        <div style={{ color: colors.navy, fontSize: 120, lineHeight: 1, fontWeight: 900, letterSpacing: "-0.015em", fontVariationSettings: '"wght" 900' }}>2026 / 09</div>
        <div style={{ marginTop: 28, color: colors.navy, fontSize: 152, lineHeight: 1.06, fontWeight: 900, letterSpacing: "-0.02em", fontVariationSettings: '"wght" 900' }}>月會報告</div>
        <div style={{ marginTop: 38, color: "#456882", fontSize: 32, lineHeight: 1, fontWeight: 900, letterSpacing: "0.18em" }}>Shelly</div>
      </div>
      <Footer />
    </section>
  );
}

function Overview() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="September at a glance" title="本月工作聚焦" accent={colors.navy} />
      <div style={{ display: "flex", gap: 72, marginTop: 116 }}>
        <Metric value="10" label="INFO" note="穩定性修正、報表改善與流程優化" accent={colors.bug} />
        <Metric value="05" label="DBS" note="三項修正、會員功能串接與標籤優化" accent={colors.teal} />
        <Metric value="03" label="NEXT" note="儀表板、規則通用化與功能對齊" accent={colors.gold} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 126,
          right: 126,
          bottom: 92,
          display: "flex",
          alignItems: "center",
          gap: 26,
          paddingTop: 30,
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <span style={{ color: colors.navy, fontSize: 25, fontWeight: 900 }}>本月主軸</span>
        <span style={{ color: colors.ink, fontSize: 34, lineHeight: 1.35, fontWeight: 750 }}>先穩定既有流程，再推進共用能力與功能對齊。</span>
      </div>
    </section>
  );
}

function InfoBugs() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="INFO · BUG" title="穩定性修正" accent={colors.bug} />
      <div style={{ display: "grid", gridTemplateColumns: "390px 1fr", gap: 84, marginTop: 72 }}>
        <div
          style={{
            height: 558,
            borderRadius: 24,
            background: colors.bug,
            color: colors.paper,
            padding: "48px 42px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "0.1em" }}>BUG</div>
            <div style={{ marginTop: 18, fontSize: 132, lineHeight: 0.92, fontWeight: 900 }}>05</div>
          </div>
          <div style={{ fontSize: 27, lineHeight: 1.5, fontWeight: 700 }}>涵蓋資料復原、通知、動態欄位與分享範本。</div>
        </div>
        <div>
          <IssueRow no="01">舊家庭財務輔導資料復原</IssueRow>
          <IssueRow no="02">分享範本填寫通知連結修正</IssueRow>
          <IssueRow no="03">動態欄位群組更新報錯修正</IssueRow>
          <IssueRow no="04">分享範本編輯器穩定化</IssueRow>
          <IssueRow no="05">過濾站檔案顯示與資料復原</IssueRow>
        </div>
      </div>
    </section>
  );
}

function InfoImprovements() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="INFO · FIX & IMPROVEMENT" title="報表功能修復與優化" accent={colors.teal} />
      <div style={{ display: "grid", gridTemplateColumns: "650px 1fr", gap: 88, marginTop: 78 }}>
        <div
          style={{
            height: 528,
            borderRadius: 24,
            background: colors.navy,
            color: colors.paper,
            padding: "50px 52px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SectionTag color={colors.navy} soft={colors.goldSoft}>修復 & 優化</SectionTag>
          <div>
            <div style={{ fontSize: 58, lineHeight: 1.15, fontWeight: 900 }}>報表功能</div>
            <div style={{ marginTop: 25, color: "#D5E0E9", fontSize: 29, lineHeight: 1.55, fontWeight: 600 }}>修正既有問題，並同步優化操作流程。</div>
          </div>
        </div>
        <div style={{ paddingTop: 2 }}>
          <SectionTag color={colors.teal} soft={colors.tealSoft}>優化 04</SectionTag>
          <div style={{ marginTop: 26 }}>
            <ImprovementRow index="1">過濾站軟刪除</ImprovementRow>
            <ImprovementRow index="2">單位過濾站模糊比對</ImprovementRow>
            <ImprovementRow index="3">Excel 移除自動換行</ImprovementRow>
            <ImprovementRow index="4">分享範本依欄位群組選取</ImprovementRow>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompactIssue({ no, children }: { no: string; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "58px 1fr", alignItems: "center", minHeight: 86, borderBottom: `1px solid ${colors.line}` }}>
      <span style={{ color: colors.bug, fontSize: 21, fontWeight: 900 }}>{no}</span>
      <span style={{ color: colors.ink, fontSize: 28, lineHeight: 1.3, fontWeight: 900, fontVariationSettings: '"wght" 850' }}>{children}</span>
    </div>
  );
}

function CompactImprovement({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, minHeight: 69, borderBottom: "1px solid rgba(10,58,103,.12)" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors.teal, flex: "0 0 auto" }} />
      <span style={{ color: colors.ink, fontSize: 27, lineHeight: 1.25, fontWeight: 850, fontVariationSettings: '"wght" 850' }}>{children}</span>
    </div>
  );
}

function InfoComplete() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="INFO" title="本月完成" accent={colors.bug} />
      <div style={{ display: "grid", gridTemplateColumns: ".93fr 1.07fr", gap: 34, marginTop: 58 }}>
        <div style={{ height: 625, display: "grid", gridTemplateRows: "260px 1fr", gap: 26 }}>
          <div
            style={{
              borderRadius: 24,
              background: colors.navy,
              color: colors.paper,
              padding: "30px 38px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 38, lineHeight: 1.1, fontWeight: 900, fontVariationSettings: '"wght" 900' }}>報表功能修復與優化</div>
              <SectionTag color={colors.navy} soft={colors.goldSoft}>報表</SectionTag>
            </div>
            <div style={{ color: "#D5E0E9", fontSize: 25, lineHeight: 1.35, fontWeight: 750 }}>報表可同時查看標籤群組及所屬標籤</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 112px", gap: 12, alignItems: "stretch" }}>
              <div style={{ border: "2px solid rgba(255,255,255,.45)", borderRadius: 13, padding: "12px 16px", fontSize: 23, fontWeight: 850 }}>標籤群組</div>
              <div style={{ borderRadius: 13, background: colors.paper, color: colors.navy, padding: "12px 16px", textAlign: "center", fontSize: 23, fontWeight: 900 }}>標籤</div>
            </div>
          </div>
          <div style={{ borderRadius: 24, background: colors.tealSoft, padding: "30px 38px 20px", boxSizing: "border-box" }}>
            <div style={{ color: colors.teal, fontSize: 25, fontWeight: 900, marginBottom: 8 }}>流程優化 · 04</div>
            <CompactImprovement>過濾站軟刪除</CompactImprovement>
            <CompactImprovement>單位過濾站模糊比對</CompactImprovement>
            <CompactImprovement>Excel 移除自動換行</CompactImprovement>
            <CompactImprovement>分享範本依欄位群組選取</CompactImprovement>
          </div>
        </div>
        <div
          style={{
            height: 625,
            borderRadius: 24,
            background: colors.paper,
            border: `2px solid ${colors.bugSoft}`,
            borderTop: `11px solid ${colors.bug}`,
            padding: "34px 42px 24px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ color: colors.navy, fontSize: 38, fontWeight: 900, fontVariationSettings: '"wght" 900' }}>BUG 修復</div>
            <SectionTag color={colors.bug} soft={colors.bugSoft}>04 項</SectionTag>
          </div>
          <CompactIssue no="01">分享範本填寫通知連結修正</CompactIssue>
          <CompactIssue no="02">動態欄位群組更新報錯修正</CompactIssue>
          <CompactIssue no="03">分享範本編輯器穩定化</CompactIssue>
          <CompactIssue no="04">過濾站檔案顯示與資料復原</CompactIssue>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function Dbs() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="DBS" title="穩定性與功能串接" accent={colors.teal} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34, marginTop: 72 }}>
        <div
          style={{
            height: 540,
            borderRadius: 24,
            background: colors.tealSoft,
            padding: "42px 48px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SectionTag color={colors.teal} soft={colors.paper}>FEATURE</SectionTag>
          <div>
            <div style={{ color: colors.navy, fontSize: 44, lineHeight: 1.18, fontWeight: 900 }}>會員前後端串接</div>
            <div style={{ marginTop: 16, color: colors.ink, fontSize: 25, lineHeight: 1.45, fontWeight: 750 }}>涵蓋記帳、月報、財務盤點、生活目標等核心流程</div>
          </div>
          <div style={{ borderTop: `2px solid rgba(10,58,103,.14)`, paddingTop: 20 }}>
            <div style={{ color: colors.teal, fontSize: 21, fontWeight: 900, letterSpacing: "0.08em" }}>功能</div>
            <div style={{ marginTop: 7, color: colors.navy, fontSize: 32, lineHeight: 1.2, fontWeight: 900 }}>建立快速登入帳號</div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "118px 1fr",
              alignItems: "center",
              gap: 22,
              minHeight: 90,
              borderRadius: 16,
              background: colors.paper,
              padding: "18px 24px",
              boxSizing: "border-box",
            }}
          >
            <span style={{ color: colors.teal, fontSize: 21, fontWeight: 900, letterSpacing: "0.08em" }}>優化</span>
            <span style={{ color: colors.navy, fontSize: 29, fontWeight: 850 }}>文章標籤系統</span>
          </div>
        </div>
        <div style={{ height: 540, borderRadius: 24, background: colors.navy, padding: "32px 46px 24px", boxSizing: "border-box" }}>
          <SectionTag color={colors.bug} soft={colors.bugSoft}>BUG 05</SectionTag>
          <div style={{ marginTop: 14 }}>
            <DbsBug>表單別名正確顯示</DbsBug>
            <DbsBug>財務健檢 fallback</DbsBug>
            <DbsBug>活動圖片即時更新（CDN）</DbsBug>
            <DbsBug>舊家庭財務輔導資料復原</DbsBug>
            <DbsBug>活動手機版排版修正</DbsBug>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function NextMonth() {
  return (
    <section style={{ ...base, ...pagePad }}>
      <Header section="INFO" title="本月預計" accent={colors.gold} />
      <div style={{ marginTop: 76 }}>
        <PlanRow no="01" title="事件儀表板" note="聚焦提醒、執行情況與單位視角。" />
        <PlanRow no="02" title="分享範本規則通用化" note="整合 Tags、預設事件與轉介流程。" />
        <PlanRow no="03" title="單位列表功能對齊" note="對齊個人列表的核心操作體驗。" />
      </div>
      <Footer />
    </section>
  );
}

function Sandbox() {
  return (
    <section style={{ ...base, background: colors.navy, color: colors.paper, display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 18, marginBottom: 34 }}>
          <div style={{ width: 62, height: 8, borderRadius: 99, background: colors.bug }} />
          <div style={{ width: 62, height: 8, borderRadius: 99, background: colors.teal }} />
          <div style={{ width: 62, height: 8, borderRadius: 99, background: colors.gold }} />
        </div>
        <div style={{ fontSize: 150, lineHeight: 1.02, fontWeight: 900, letterSpacing: "-0.02em", fontVariationSettings: '"wght" 900' }}>沙盒進度</div>
      </div>
      <Footer dark />
    </section>
  );
}

export const pages = [Cover, Dbs, InfoComplete, NextMonth, Sandbox] satisfies Page[];

export default pages;
