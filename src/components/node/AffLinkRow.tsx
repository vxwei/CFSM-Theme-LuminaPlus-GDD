import type { KeyboardEvent, MouseEvent } from "react";

/**
 * 服务器卡片里的购买链接行：后台给节点填了购买链接才渲染，没填不留空行。
 * 文案固定为「购买链接」，不在这里拼商家名。
 *
 * 点链接不能跳进节点详情页：卡片视图里链接在 header/标签行之外，另加
 * data-detail-click="off" 与 stopPropagation 双保险；列表视图整行就是一个
 * Link，不能再嵌 <a>，所以用 span + 手动 window.open。
 */
export function AffLinkRow({
  affLink,
  withinLink = false,
  className = "node-aff-link-row",
}: {
  affLink?: string | null;
  withinLink?: boolean;
  className?: string;
}) {
  if (!affLink) return null;

  if (withinLink) {
    const open = (e: MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      if ("preventDefault" in e) e.preventDefault();
      window.open(affLink, "_blank", "noopener,noreferrer");
    };
    return (
      <span
        className="node-list-aff-link"
        data-detail-click="off"
        role="link"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open(e);
        }}
      >
        购买链接
      </span>
    );
  }

  return (
    <div className={className} data-detail-click="off">
      <a
        href={affLink}
        target="_blank"
        rel="sponsored nofollow noopener"
        onClick={(e) => e.stopPropagation()}
      >
        购买链接
      </a>
    </div>
  );
}
