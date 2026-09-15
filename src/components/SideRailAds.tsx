import { siteConfig } from "@/config/site";
import { AdFrame } from "@/components/AdFrame";

/**
 * 左右浮动竖幅广告位（扬哥 2026-09-11 定标，对齐同行站布局）：
 * - 左侧 160x300 / 右侧 160x600（Adsterra 同站同尺寸限一单元），sticky，全程可见（超长页用户滚动到哪广告都在）
 * - 仅大屏渲染（窄屏隐藏，不挤内容）
 * - ads.sideRail 留空 = 完全不渲染，用户零感知（无广告时不显示空框）
 * 2026-09-15 自 game-database-wiki 移植到本骨架（halloween 站两侧无广告槽事故）。
 */
export function SideRailAds() {
  // 2026-09-15 左右独立广告单元：sideRailLeft/sideRailRight 各填一个 Adsterra unit（独立 key=独立竞价/创意/统计）；
  // 旧写法只填 sideRail 时左右共用同单元——同屏创意会相同（StS2/halloween 实测），新配置一律用 Left/Right。
  const ads = siteConfig.ads;
  const left = ads?.sideRailLeft ?? ads?.sideRail;
  const right = ads?.sideRailRight ?? ads?.sideRail;
  if (!left && !right) return null;
  return (
    <>
      {left && (
        <div className="pointer-events-auto fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
          <AdFrame code={left} width={160} height={300} label="Side rail advertisement (left)" />
        </div>
      )}
      {right && (
        <div className="pointer-events-auto fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
          <AdFrame code={right} width={160} height={600} label="Side rail advertisement (right)" />
        </div>
      )}
    </>
  );
}
