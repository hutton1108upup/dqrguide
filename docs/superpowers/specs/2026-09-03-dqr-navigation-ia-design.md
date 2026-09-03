# dungeonquestrebornguide.wiki 单行导航与页面信息架构设计

日期：2026-09-03
状态：已在对话中批准方案 A，等待书面规格复核

## 1. 背景与问题

当前站点为 28 个公开页面提供两层常驻导航：顶部主导航包含 7 个页面链接，第二行 `GuideNav` 持续展示 3 个逻辑内容仓和 22 个页面链接。第二行的 7 个链接与主导航重复，且在 1060px 容器内与完整站名和 212px 搜索框争夺宽度。

这套实现保证了全部公开页面可达，但把内部站点地图直接展示成了永久 UI，带来以下问题：

- 桌面首屏被两条导航占用，站名在可用宽度不足时被截断。
- `Field notes`、`Database`、`Build & decisions` 是内部组织语言，不是玩家最常用的找路词。
- 移动端同时存在汉堡菜单和横向滚动的第二导航，两套入口结构不一致。
- 同一个页面在全局导航出现两次，增加扫描成本而没有增加新的找路价值。

## 2. 目标

- 将全站导航收敛为一条 64px 左右的 sticky Header。
- 桌面端保留 6 个清晰一级入口和持续可见的搜索入口。
- 用点击展开的下拉面板承载二级页面，不常驻占用页面高度。
- 移动端使用一个统一抽屉和 accordion 展示同一套信息架构。
- 保证 25 个非 trust 页面都能从全局导航到达，3 个 trust 页面从页脚到达。
- 保持现有 URL、canonical、发布状态、索引策略、内容与 sitemap 不变。

## 3. 非目标

- 不新增、删除或重命名页面 URL。
- 不改变 `published + noindex` 的内容治理规则。
- 不重写首页或内页内容。
- 不引入新的导航组件库或更换视觉体系。
- 不进行部署、推送或 Cloudflare 发布。

## 4. 当前页面结构

当前 28 个公开页面按用户任务重新归类如下。这里的归类用于导航，不改变路由注册表中的 `kind` 或 `contentType`。

### 首页

- `/` — 首页与搜索起点，Indexable

### 起步与通用攻略

- `/beginner-guide/`
- `/differences/`

### 地牢

- `/dungeons/`
- `/dungeons/northern-lands/`
- `/dungeons/winter-outpost/`

### 装备与能力数据库

- `/drops/`
- `/spells/`
- `/weapons/`
- `/armor/`
- `/cosmetics/`

### Build 与选择

- `/builds/`
- `/builds/mage/`
- `/builds/warrior/`
- `/builds/tank/`
- `/builds/healer/`
- `/tier-list/`
- `/spell-tier-list/`
- `/gamepasses/`

### 状态、社区与安全

- `/codes/` — Indexable
- `/updates/`
- `/trello/` — Indexable
- `/discord/`
- `/trading/`
- `/scripts-macros/`

### Trust 与站务

- `/source-policy/`
- `/privacy/`
- `/contact/`

除明确标记 Indexable 的三个页面外，其余页面保持当前公开 noindex 状态。

## 5. 推荐信息架构

桌面 Header 顺序：

```text
Logo | Dungeons v | Gear v | Builds v | Guides v | Codes | Updates | Search
```

除首页入口外，每个内容页面在当前视口的全局导航中只出现一次。桌面由 Logo 承担首页入口；移动抽屉额外显示一个明确的 Home 链接，方便抽屉内返回首页。

### Dungeons

- Dungeons Overview → `/dungeons/`
- Northern Lands → `/dungeons/northern-lands/`
- Winter Outpost → `/dungeons/winter-outpost/`

### Gear

- Drops → `/drops/`
- Spells & Skills → `/spells/`
- Weapons → `/weapons/`
- Armor → `/armor/`
- Cosmetics → `/cosmetics/`

### Builds

- Builds Overview → `/builds/`
- Tier List → `/tier-list/`
- Spell Tier List → `/spell-tier-list/`
- Mage Build → `/builds/mage/`
- Warrior Build → `/builds/warrior/`
- Tank Build → `/builds/tank/`
- Healer Build → `/builds/healer/`
- Gamepasses → `/gamepasses/`

### Guides

- Beginner Guide → `/beginner-guide/`
- Reborn vs Original → `/differences/`
- Trading Guide → `/trading/`
- Trello Status → `/trello/`
- Discord Status → `/discord/`
- Scripts & Macros Safety → `/scripts-macros/`

### 直接入口

- Codes → `/codes/`
- Updates → `/updates/`
- Logo → `/`
- Source Policy、Privacy、Contact 继续由页脚承载。

## 6. 桌面交互

- `Dungeons`、`Gear`、`Builds`、`Guides` 是可点击的 disclosure 按钮，不依赖 hover。
- 点击一级分类打开对应面板；打开新面板时关闭旧面板。
- 点击外部、按 `Escape`、选择菜单链接或发生路由变化时关闭面板。
- 按钮设置 `aria-expanded` 与 `aria-controls`，面板使用具名导航区域。
- 当前路径对应的一级分类和二级链接显示 active 状态。
- 菜单项保持普通链接语义，支持 Tab、Enter 和浏览器原生行为。
- 下拉面板覆盖在正文上方，不推动页面内容，不改变 sticky Header 高度。

## 7. 响应式行为

### 宽桌面

- Header 使用独立的宽容器，最大宽度约 1280–1320px；正文继续保持 1060px。
- 展示完整站名、全部一级入口以及带文字和快捷键提示的搜索框。

### 中等桌面与平板横屏

- 在 Header 开始拥挤前将搜索按钮压缩为 42px 图标。
- 一级导航仍保持可见，不截断站名，不允许水平滚动。

### 880px 及以下

- 隐藏桌面导航，显示搜索图标和汉堡按钮。
- 汉堡打开右侧或顶部对齐的导航抽屉。
- 四个分类使用 accordion；Home、Codes 与 Updates 使用直接链接。
- 抽屉包含与桌面相同的全部 25 个非 trust 页面入口。
- 移除现有第二导航的横向滚动区域。

## 8. 视觉方向

- 保留当前深蓝、金色和蓝色强调色，不重新设计品牌。
- Header 保持克制的单层深色表面和细边框。
- 下拉面板使用现有 surface、border、hover token，避免引入新的装饰语言。
- 菜单标题、说明和 active 状态应清楚，但不加入图片、营销卡或复杂控件。
- Header 下方直接进入 Hero 或页面面包屑，删除永久第二行带来的空耗。

## 9. 组件与数据边界

### `src/components/site-nav.ts`

- 成为全局导航的单一数据源。
- 导出分类菜单、直接链接以及按运行环境过滤后的结构。
- 所有链接继续通过 `getPageByPath` 和 `isPageAvailable` 过滤。

### `src/components/desktop-nav.tsx`

- 新增客户端桌面 disclosure 导航组件。
- 负责打开状态、关闭行为、active 状态与无障碍属性。

### `src/components/mobile-nav.tsx`

- 从仅渲染 7 个直接链接改为渲染完整分类结构。
- 保持点击链接后关闭，并补充 accordion 交互。

### `src/components/site-header.tsx`

- 使用新的桌面导航。
- 删除 `GuideNav` 渲染。

### `src/components/guide-nav.tsx`

- 在完成迁移且无引用后删除，避免两套导航数据继续漂移。

### `app/globals.css`

- 删除 `.guide-nav*` 样式。
- 增加单行 Header、下拉面板、active 状态、移动抽屉与中间断点样式。

## 10. SEO 与可发现性

- 此改版不改变页面的索引状态、canonical、metadata、JSON-LD 或 sitemap。
- 每个非 trust 页面至少保留一个全局导航入口，并继续保留首页任务入口、面包屑、Related Pages 与站内搜索。
- Trust 页面继续在页脚中提供稳定入口。
- 不为了导航简洁而隐藏公开 noindex 页面，也不把 noindex 页面提升为 indexable。

## 11. 测试与验收

### 组件测试

- 导航数据在 production 环境覆盖全部 25 个非 trust 页面且无重复路径。
- 桌面分类可以点击展开，打开一个分类会关闭另一个。
- `Escape` 和点击外部关闭菜单。
- 选择链接后关闭菜单。
- active 一级分类与 active 二级链接正确。
- 移动菜单包含相同页面集合，accordion 可展开，并在选择链接后关闭。

### 浏览器验收

- 1440px：单行 Header，Logo 不截断，完整搜索可见。
- 1024px：单行 Header，搜索切换为图标，无水平溢出。
- 375px：统一移动菜单，无第二导航，无横向溢出。
- 首页、`/dungeons/`、`/weapons/`、`/builds/mage/`、`/codes/`、`/source-policy/` 正常访问。
- 搜索、桌面下拉、移动 accordion、面包屑、Related Pages 和页脚链接均可用。
- 浏览器控制台无错误。

### 项目验证

- 运行导航相关 Vitest。
- 运行 `npm.cmd run typecheck`、`npm.cmd run lint`、`npm.cmd run build`。
- 最终运行项目已有的 `npm.cmd run verify`，并提供本地审查链接。

## 12. 调研依据

- DQRWiki：单行 Header，6 个一级栏目和搜索。
- Dungeon Quest Reborn Wiki：Codes 直达，其他一级分类点击展开。
- Game8 Elden Ring Wiki：详细目录进入侧栏 Guide Index，而不是第二条常驻顶栏。
- BG3 Wiki：侧栏承载深层导航，顶部只保留工具与搜索。
- Zelda Dungeon：少量顶层分类，庞大目录按需展开。
- Nielsen Norman Group：桌面显示清晰一级导航，复杂二级结构使用 click-activated menu 或 mega menu，同一选项只出现一次。
