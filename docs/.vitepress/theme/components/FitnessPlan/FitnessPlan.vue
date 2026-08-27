<template>
  <div class="fitness-app" :style="{ '--dc': current.color }">
    <div class="wrap">
      <header class="fit-header">
        <h1>一周训练计划</h1>
        <div class="tagline">把每一次训练，变成看得见的改变</div>
        <div class="date-line">{{ dateLine }}</div>
      </header>

      <!-- 今日横幅 -->
      <div class="today-banner">
        <div class="tb-left">
          <div class="tb-icon">💪</div>
          <div>
            <div class="tb-label">今日训练</div>
            <div class="tb-title">{{ today.weekday }} · {{ today.title }}</div>
          </div>
        </div>
        <div class="tb-focus">{{ today.focus }}</div>
      </div>

      <!-- 星期切换 -->
      <div class="week-tabs">
        <div
          v-for="(d, i) in WEEK"
          :key="d.weekday"
          class="w-tab"
          :class="{ active: i === selected }"
          :style="{ '--dc': d.color }"
          @click="selected = i"
        >
          <div class="wd">{{ d.weekday }}</div>
          <div class="wt">{{ d.title }}</div>
          <div v-if="i === todayIdx" class="today-dot">今天</div>
        </div>
      </div>

      <!-- 训练详情 -->
      <div :key="selected" class="detail">
        <div class="d-head">
          <h2>{{ current.weekday }} · <span>{{ current.title }}</span></h2>
        </div>
        <div class="d-focus">🎯 {{ current.focus }}</div>
        <table class="plan">
          <thead>
            <tr>
              <th class="c-name">动作</th>
              <th class="c-equip">器械</th>
              <th class="c-sets">组数 × 次数</th>
              <th>目标肌群 · 作用</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="g in current.groups" :key="g.name">
              <tr class="group-row">
                <td colspan="4" :style="{ color: current.color }">{{ g.name }}</td>
              </tr>
              <tr v-for="ex in g.list" :key="ex.name">
                <td class="ex-name">{{ ex.name }}</td>
                <td class="ex-equip">{{ ex.equip }}</td>
                <td class="ex-sets" :style="{ color: current.color }">{{ ex.sets }}</td>
                <td class="ex-why" v-html="ex.why" />
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="current.cardio" class="cardio-line">{{ current.cardio }}</div>
      </div>

      <!-- 人体肌肉图 -->
      <div class="body-map">
        <div class="bm-title">
          今日训练部位 · <b>{{ current.weekday }} {{ current.title }}</b>
        </div>
        <div class="bm-figures">
          <!-- 正面 -->
          <div class="bm-fig">
            <svg viewBox="0 0 260 360" aria-label="正面肌肉图">
              <!-- 身体轮廓 -->
              <circle cx="130" cy="32" r="16" class="base-fill" />
              <line x1="130" y1="46" x2="130" y2="60" class="base" stroke-width="20" />
              <line x1="130" y1="62" x2="130" y2="172" class="base" stroke-width="60" />
              <line x1="130" y1="166" x2="130" y2="184" class="base" stroke-width="52" />
              <line x1="96" y1="76" x2="58" y2="196" class="base" stroke-width="18" />
              <line x1="164" y1="76" x2="202" y2="196" class="base" stroke-width="18" />
              <line x1="118" y1="186" x2="112" y2="318" class="base" stroke-width="24" />
              <line x1="142" y1="186" x2="148" y2="318" class="base" stroke-width="24" />
              <ellipse cx="110" cy="328" rx="12" ry="6" class="base-fill" />
              <ellipse cx="150" cy="328" rx="12" ry="6" class="base-fill" />
              <!-- 肌群 -->
              <g class="muscle" :class="{ on: isOn('delts') }">
                <ellipse cx="88" cy="82" rx="14" ry="17" /><ellipse cx="172" cy="82" rx="14" ry="17" />
              </g>
              <g class="muscle" :class="{ on: isOn('chest') }">
                <path d="M128,70 C112,68 98,74 96,88 C95,100 106,106 128,106 Z" />
                <path d="M132,70 C148,68 162,74 164,88 C165,100 154,106 132,106 Z" />
              </g>
              <g class="muscle" :class="{ on: isOn('biceps') }">
                <ellipse cx="76" cy="124" rx="10" ry="21" /><ellipse cx="184" cy="124" rx="10" ry="21" />
              </g>
              <g class="muscle" :class="{ on: isOn('forearms') }">
                <ellipse cx="62" cy="172" rx="8" ry="22" /><ellipse cx="198" cy="172" rx="8" ry="22" />
              </g>
              <g class="muscle" :class="{ on: isOn('abs') }">
                <rect x="116" y="110" width="13" height="14" rx="3" /><rect x="131" y="110" width="13" height="14" rx="3" />
                <rect x="116" y="127" width="13" height="14" rx="3" /><rect x="131" y="127" width="13" height="14" rx="3" />
                <rect x="116" y="144" width="13" height="14" rx="3" /><rect x="131" y="144" width="13" height="14" rx="3" />
                <ellipse cx="106" cy="132" rx="5" ry="13" /><ellipse cx="154" cy="132" rx="5" ry="13" />
              </g>
              <g class="muscle" :class="{ on: isOn('quads') }">
                <ellipse cx="116" cy="238" rx="14" ry="40" /><ellipse cx="144" cy="238" rx="14" ry="40" />
              </g>
              <!-- 标注 -->
              <g
                v-for="(m, id) in frontLabels"
                :key="id"
                class="lbl"
                :class="{ on: isOn(String(id)) }"
              >
                <line :x1="lineX1(m)" :y1="m.y - 4" :x2="m.tx" :y2="m.ty" />
                <circle :cx="m.tx" :cy="m.ty" r="3.2" />
                <text :x="m.x" :y="m.y" :text-anchor="m.side === 'l' ? 'start' : 'end'">{{ m.name }}</text>
              </g>
            </svg>
            <div class="cap">正 面</div>
          </div>
          <!-- 背面 -->
          <div class="bm-fig">
            <svg viewBox="0 0 260 360" aria-label="背面肌肉图">
              <circle cx="130" cy="32" r="16" class="base-fill" />
              <line x1="130" y1="46" x2="130" y2="60" class="base" stroke-width="20" />
              <line x1="130" y1="62" x2="130" y2="172" class="base" stroke-width="60" />
              <line x1="130" y1="166" x2="130" y2="184" class="base" stroke-width="52" />
              <line x1="96" y1="76" x2="58" y2="196" class="base" stroke-width="18" />
              <line x1="164" y1="76" x2="202" y2="196" class="base" stroke-width="18" />
              <line x1="118" y1="186" x2="112" y2="318" class="base" stroke-width="24" />
              <line x1="142" y1="186" x2="148" y2="318" class="base" stroke-width="24" />
              <ellipse cx="110" cy="328" rx="12" ry="6" class="base-fill" />
              <ellipse cx="150" cy="328" rx="12" ry="6" class="base-fill" />
              <!-- 肌群 -->
              <g class="muscle" :class="{ on: isOn('traps') }">
                <path d="M118,50 L142,50 L166,74 L148,104 L130,94 L112,104 L94,74 Z" />
              </g>
              <g class="muscle" :class="{ on: isOn('rearDelts') }">
                <ellipse cx="88" cy="84" rx="14" ry="15" /><ellipse cx="172" cy="84" rx="14" ry="15" />
              </g>
              <g class="muscle" :class="{ on: isOn('lats') }">
                <path d="M114,102 C102,108 96,126 102,150 C107,166 118,170 126,158 L126,104 Z" />
                <path d="M146,102 C158,108 164,126 158,150 C153,166 142,170 134,158 L134,104 Z" />
              </g>
              <g class="muscle" :class="{ on: isOn('midBack') }">
                <path d="M130,98 L119,112 L130,128 L141,112 Z" />
              </g>
              <g class="muscle" :class="{ on: isOn('triceps') }">
                <ellipse cx="76" cy="124" rx="10" ry="21" /><ellipse cx="184" cy="124" rx="10" ry="21" />
              </g>
              <g class="muscle" :class="{ on: isOn('glutes') }">
                <ellipse cx="117" cy="182" rx="15" ry="14" /><ellipse cx="143" cy="182" rx="15" ry="14" />
              </g>
              <g class="muscle" :class="{ on: isOn('hams') }">
                <ellipse cx="116" cy="238" rx="13" ry="34" /><ellipse cx="144" cy="238" rx="13" ry="34" />
              </g>
              <g class="muscle" :class="{ on: isOn('calves') }">
                <ellipse cx="114" cy="292" rx="11" ry="24" /><ellipse cx="146" cy="292" rx="11" ry="24" />
              </g>
              <!-- 标注 -->
              <g
                v-for="(m, id) in backLabels"
                :key="id"
                class="lbl"
                :class="{ on: isOn(String(id)) }"
              >
                <line :x1="lineX1(m)" :y1="m.y - 4" :x2="m.tx" :y2="m.ty" />
                <circle :cx="m.tx" :cy="m.ty" r="3.2" />
                <text :x="m.x" :y="m.y" :text-anchor="m.side === 'l' ? 'start' : 'end'">{{ m.name }}</text>
              </g>
            </svg>
            <div class="cap">背 面</div>
          </div>
        </div>
      </div>

      <!-- 页脚感悟 -->
      <div class="footer-quote">
        <div class="divider" />
        <div class="q">“ 专注当下这一次训练，比想十次更有力量。 ”</div>
        <div>目标明确 · 极度专注 · 有效反馈 · 在拉伸区练习</div>
      </div>
    </div>

    <button class="print-btn" @click="handlePrint">🖨️ 打印</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { WEEK, MUSCLE_META } from './data'
import type { MuscleMeta } from './data'

/** 当前选中的星期（初始为周一，挂载后定位到今天，避免 SSG 水合不一致） */
const selected = ref(0)
/** 今天对应的下标（周一 = 0） */
const todayIdx = ref(0)
const dateStr = ref('')

onMounted(() => {
  const d = new Date()
  todayIdx.value = (d.getDay() + 6) % 7
  selected.value = todayIdx.value
  dateStr.value = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 · ${WEEK[todayIdx.value].weekday}`
})

const current = computed(() => WEEK[selected.value])
const today = computed(() => WEEK[todayIdx.value])
const dateLine = computed(() =>
  dateStr.value ? `${dateStr.value} · PUSH / PULL / LEGS + 肩强化循环` : ''
)

const frontLabels = computed(() => filterMeta('front'))
const backLabels = computed(() => filterMeta('back'))

function filterMeta(view: 'front' | 'back'): Record<string, MuscleMeta> {
  return Object.fromEntries(
    Object.entries(MUSCLE_META).filter(([, m]) => m.view === view)
  )
}

/** 某肌群是否在当日训练列表中 */
function isOn(id: string) {
  return current.value.muscles.includes(id)
}

/** 标注引线起点的 x 坐标（文字宽度和方向决定） */
function lineX1(m: MuscleMeta) {
  const w = m.name.length * 12.5
  return m.side === 'l' ? m.x + w + 6 : m.x - w - 6
}

function handlePrint() {
  window.print()
}
</script>

<style scoped>
/* ===== 浅色墨绿主题（与站点 brand 色一致），所有颜色走 CSS 变量便于 .dark 适配 ===== */
.fitness-app {
  --bg: #f6f6f7;
  --card: #ffffff;
  --card-border: #e3e3e6;
  --text: #3c3c43;
  --text-dim: #8a8f98;
  --ink: #1a3c2e;
  --green: #2d6a4f;
  --green-2: #40916c;
  --green-3: #52b788;
  --teal: #0e7490;
  --serif: 'Noto Serif SC', 'Source Han Serif CN', 'Songti SC', 'STSong', 'SimSun', serif;
  --h1-grad: linear-gradient(135deg, #1a3c2e, #2d6a4f, #52b788);
  /* SVG 描边（浅色为墨绿基调） */
  --stroke: rgba(26, 60, 46, 0.1);
  --stroke-fill: rgba(26, 60, 46, 0.08);
  --muscle-fill: rgba(26, 60, 46, 0.06);
  --muscle-stroke: rgba(26, 60, 46, 0.16);
  /* 表格 */
  --th-border: #e9e9ec;
  --td-border: #f0f0f2;
  --row-hover: #fafafa;
  --ex-name: #2b2b30;
  --ex-why: #6b7078;

  position: relative;
  overflow: hidden;
  margin: 24px 0 48px;
  border: 1px solid var(--card-border);
  border-radius: 18px;
  background: var(--bg);
  color: var(--text);
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

/* 极浅的墨绿氛围光晕（组件内，不影响全站） */
.fitness-app::before,
.fitness-app::after {
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: 0;
}
.fitness-app::before {
  width: 55%;
  padding-bottom: 55%;
  top: -18%;
  right: -10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(82, 183, 136, 0.12), transparent 65%);
}
.fitness-app::after {
  width: 45%;
  padding-bottom: 45%;
  bottom: -14%;
  left: -7%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 145, 108, 0.1), transparent 65%);
}

.wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding: 36px 22px 44px;
  position: relative;
  z-index: 1;
}

/* ===== 头部 ===== */
.fit-header {
  text-align: center;
  margin-bottom: 30px;
}
.fit-header h1 {
  font-family: var(--serif);
  font-size: clamp(30px, 5.5vw, 42px);
  font-weight: 600;
  letter-spacing: clamp(0.1em, 1.2vw, 0.18em);
  margin: 0;
  background: var(--h1-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.fit-header .tagline {
  font-family: var(--serif);
  margin-top: 12px;
  font-size: clamp(13px, 1.8vw, 15px);
  letter-spacing: clamp(0.18em, 2.5vw, 0.3em);
  color: var(--text-dim);
}
.fit-header .date-line {
  margin-top: 14px;
  color: var(--text-dim);
  font-size: 13px;
  letter-spacing: 1px;
  min-height: 20px;
}

/* ===== 今日横幅 ===== */
.today-banner {
  margin: 24px 0 30px;
  padding: 20px 26px;
  border-radius: 12px;
  background: var(--card);
  border: 1px solid rgba(45, 106, 79, 0.35);
  box-shadow: 0 2px 14px rgba(45, 106, 79, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.today-banner .tb-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.today-banner .tb-icon {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d6a4f, #40916c);
  font-size: 22px;
  box-shadow: 0 2px 10px rgba(45, 106, 79, 0.35);
}
.today-banner .tb-label {
  font-size: 12px;
  color: var(--green-2);
  letter-spacing: 3px;
  font-weight: 600;
}
.today-banner .tb-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 600;
  margin-top: 3px;
  color: var(--ink);
  letter-spacing: 0.05em;
}
.today-banner .tb-focus {
  font-size: 13px;
  color: var(--text-dim);
}

/* ===== 星期切换 ===== */
.week-tabs {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 9px;
  margin-bottom: 22px;
}
@media (max-width: 760px) {
  .week-tabs {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 480px) {
  .week-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
}
.w-tab {
  cursor: pointer;
  border-radius: 10px;
  padding: 13px 8px;
  text-align: center;
  position: relative;
  background: var(--card);
  border: 1px solid var(--card-border);
  transition: all 0.22s;
  user-select: none;
}
.w-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.1);
}
.w-tab .wd {
  font-size: 12px;
  color: var(--text-dim);
}
.w-tab .wt {
  font-size: 14px;
  font-weight: 700;
  margin-top: 4px;
}
.w-tab.active {
  border-color: var(--dc);
  background: color-mix(in srgb, var(--dc) 6%, #fff);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--dc) 22%, transparent);
}
.w-tab.active .wt {
  color: var(--dc);
}
.w-tab .today-dot {
  position: absolute;
  top: -8px;
  right: -5px;
  font-size: 10px;
  font-weight: 700;
  background: linear-gradient(135deg, #2d6a4f, #40916c);
  color: #fff;
  padding: 2px 9px;
  border-radius: 999px;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px rgba(45, 106, 79, 0.35);
}

/* ===== 当日详情 ===== */
.detail {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 26px;
  overflow-x: auto;
  animation: fadeIn 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.detail .d-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.detail h2 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.05em;
  margin: 0;
}
.detail h2 span {
  color: var(--dc);
}
.detail .d-focus {
  color: var(--text-dim);
  font-size: 13px;
  margin-bottom: 20px;
}

table.plan {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
table.plan th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--text-dim);
  border-bottom: 1px solid var(--th-border);
  white-space: nowrap;
}
th.c-name { width: 150px; }
th.c-equip { width: 150px; }
th.c-sets { width: 120px; }
table.plan td {
  padding: 12px;
  border-bottom: 1px solid var(--td-border);
  vertical-align: top;
}
table.plan tr:hover td {
  background: var(--row-hover);
}
td.ex-name {
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  color: var(--ex-name);
}
td.ex-equip {
  color: var(--teal);
  white-space: nowrap;
}
td.ex-sets {
  font-weight: 700;
  white-space: nowrap;
}
td.ex-why {
  color: var(--ex-why);
  line-height: 1.7;
}
td.ex-why :deep(b) {
  color: var(--ink);
  font-weight: 600;
}
.group-row td {
  padding-top: 18px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  border-bottom: none;
}
.cardio-line {
  margin-top: 16px;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 14px;
  background: rgba(8, 145, 178, 0.07);
  border: 1px dashed rgba(8, 145, 178, 0.4);
  color: var(--teal);
}

/* ===== 人体肌肉图 ===== */
.body-map {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 22px 18px 14px;
  margin-top: 22px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.body-map .bm-title {
  text-align: center;
  font-family: var(--serif);
  font-size: 15px;
  letter-spacing: 0.25em;
  color: var(--text-dim);
  margin-bottom: 10px;
}
.body-map .bm-title b {
  color: var(--dc);
  font-size: 16px;
  letter-spacing: 0.1em;
}
.bm-figures {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.bm-fig {
  text-align: center;
}
.bm-fig .cap {
  font-family: var(--serif);
  font-size: 13px;
  color: var(--text-dim);
  letter-spacing: 0.5em;
  margin-top: 4px;
  text-indent: 0.5em;
}
.bm-fig svg {
  width: 300px;
  max-width: 44vw;
  height: auto;
  display: block;
}
@media (max-width: 700px) {
  .bm-fig svg {
    width: 78vw;
  }
}

.base {
  stroke: var(--stroke);
  stroke-linecap: round;
  fill: none;
}
.base-fill {
  fill: var(--stroke-fill);
}
.muscle {
  fill: var(--muscle-fill);
  stroke: var(--muscle-stroke);
  stroke-width: 1;
  transition: all 0.3s;
}
.muscle.on {
  fill: var(--dc);
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 1.2;
  filter: drop-shadow(0 0 5px var(--dc));
}
.lbl text {
  font-size: 12px;
  font-weight: 700;
  fill: var(--dc);
}
.lbl line {
  stroke: var(--dc);
  stroke-width: 1;
  opacity: 0.55;
}
.lbl circle {
  fill: var(--dc);
}
.lbl {
  opacity: 0;
  transition: opacity 0.3s;
}
.lbl.on {
  opacity: 1;
}

/* ===== 页脚感悟 ===== */
.footer-quote {
  margin-top: 40px;
  text-align: center;
  font-family: var(--serif);
  color: var(--text-dim);
  font-size: 14px;
  letter-spacing: 0.12em;
  line-height: 2;
}
.footer-quote .q {
  color: var(--ink);
  font-size: 16px;
  letter-spacing: 0.18em;
}
.footer-quote .divider {
  width: 60px;
  height: 2px;
  margin: 0 auto 18px;
  background: linear-gradient(90deg, #2d6a4f, #52b788);
  border-radius: 2px;
}

/* ===== 打印按钮 ===== */
.print-btn {
  position: fixed;
  right: 24px;
  bottom: 24px; /* VitePress 回到顶部按钮在 bottom:96px，互不遮挡 */
  z-index: 10;
  padding: 11px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #2d6a4f, #40916c);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-family: inherit;
  box-shadow: 0 2px 14px rgba(45, 106, 79, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}
.print-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(45, 106, 79, 0.45);
}

/* ===== 响应式：平板 / 窄内容列（组件嵌在约 720px 的文档列内），压缩表格列宽 ===== */
@media (max-width: 900px) {
  th.c-name { width: 126px; }
  th.c-equip { width: 116px; }
  th.c-sets { width: 96px; }
}

/* ===== 响应式：手机端整体紧凑 + 表格转「动作卡片」 ===== */
@media (max-width: 640px) {
  .fitness-app {
    margin: 16px 0 32px;
    border-radius: 14px;
  }
  .wrap {
    padding: 22px 12px 32px;
  }
  .fit-header {
    margin-bottom: 22px;
  }
  .fit-header .date-line {
    margin-top: 10px;
    font-size: 12px;
  }
  .today-banner {
    margin: 16px 0 20px;
    padding: 14px 16px;
    gap: 8px;
  }
  .today-banner .tb-icon {
    width: 40px;
    height: 40px;
    font-size: 19px;
    border-radius: 8px;
  }
  .today-banner .tb-title {
    font-size: 18px;
  }
  .today-banner .tb-focus {
    font-size: 12px;
    flex-basis: 100%;
  }
  .detail {
    padding: 18px 14px;
  }
  .detail h2 {
    font-size: 20px;
  }
  .body-map {
    padding: 18px 12px 10px;
  }
  .bm-figures {
    gap: 14px;
  }
  .footer-quote {
    margin-top: 28px;
  }
  .print-btn {
    right: 16px;
    bottom: 16px;
    padding: 9px 18px;
    font-size: 13px;
  }

  /* 表格 → 动作卡片布局 */
  table.plan,
  table.plan tbody,
  table.plan tr,
  table.plan td {
    display: block;
  }
  table.plan thead {
    display: none;
  }
  table.plan tr:hover td {
    background: transparent;
  }
  /* 肌群分组标题 */
  tr.group-row td {
    padding: 16px 2px 6px;
    letter-spacing: 1.5px;
  }
  /* 单个动作 → 卡片（首行：动作名 + 组数胶囊） */
  table.plan tr:not(.group-row) {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    column-gap: 10px;
    row-gap: 5px;
    margin-top: 10px;
    padding: 12px 14px;
    background: color-mix(in srgb, var(--dc) 3%, var(--bg));
    border: 1px solid color-mix(in srgb, var(--dc) 12%, var(--td-border));
    border-radius: 10px;
    transition: border-color 0.2s;
  }
  table.plan tr:not(.group-row):hover {
    background: color-mix(in srgb, var(--dc) 6%, var(--bg));
    border-color: color-mix(in srgb, var(--dc) 25%, var(--td-border));
  }
  table.plan td {
    padding: 0;
    border-bottom: none;
    white-space: normal;
  }
  td.ex-name {
    grid-row: 1;
    grid-column: 1;
    font-size: 15px;
  }
  td.ex-sets {
    grid-row: 1;
    grid-column: 2;
    font-size: 12px;
    padding: 2px 9px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dc) 10%, transparent);
  }
  td.ex-equip {
    grid-column: 1 / -1;
    font-size: 12.5px;
  }
  td.ex-why {
    grid-column: 1 / -1;
    font-size: 13px;
    line-height: 1.65;
  }
}

@media print {
  .fitness-app {
    background: #fff;
    box-shadow: none;
  }
  .fitness-app::before,
  .fitness-app::after {
    content: none;
  }
  .print-btn,
  .week-tabs {
    display: none;
  }
  .today-banner,
  .detail,
  .body-map {
    box-shadow: none;
  }
  /* 打印恢复标准表格布局（覆盖移动端卡片化，节省纸张） */
  table.plan thead {
    display: table-header-group;
  }
  table.plan tbody tr {
    display: table-row;
  }
  table.plan td {
    display: table-cell;
    padding: 8px 10px;
    border-bottom: 1px solid #e5e5e5;
    white-space: normal;
  }
  table.plan td.ex-sets {
    padding: 8px 10px;
    border-radius: 0;
    background: none;
  }
}
</style>

<!-- 站点深色模式适配（.dark 在 html 上，scoped 选择器够不到，用全局块覆盖 CSS 变量） -->
<style>
.dark .fitness-app {
  --bg: #131512;
  --card: #1a1a17;
  --card-border: #2e2e2a;
  --text: #d6d6cf;
  --text-dim: #8a8a84;
  --ink: #a9d6c0;
  --green: #52b788;
  --green-2: #74c69d;
  --green-3: #95d5b2;
  --teal: #38bdf8;
  --h1-grad: linear-gradient(135deg, #74c69d, #52b788, #b7e4c7);
  --stroke: rgba(232, 232, 226, 0.1);
  --stroke-fill: rgba(232, 232, 226, 0.08);
  --muscle-fill: rgba(232, 232, 226, 0.05);
  --muscle-stroke: rgba(232, 232, 226, 0.15);
  --th-border: #2a2a26;
  --td-border: #232320;
  --row-hover: rgba(255, 255, 255, 0.03);
  --ex-name: #e8e8e2;
  --ex-why: #9a9a92;
}
.dark .fitness-app .w-tab.active {
  background: rgba(255, 255, 255, 0.06);
}
.dark .fitness-app .cardio-line {
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.35);
}
</style>
