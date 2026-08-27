/* ============ 一周训练计划数据（周一 ~ 周日） ============ */

export interface Exercise {
  name: string
  equip: string
  sets: string
  /** 允许包含 <b> 标签，由组件以 v-html 渲染 */
  why: string
}

export interface MuscleGroup {
  name: string
  list: Exercise[]
}

export interface DayPlan {
  weekday: string
  title: string
  focus: string
  color: string
  /** 当日训练的肌群 id（对应 MUSCLE_META 的 key） */
  muscles: string[]
  groups: MuscleGroup[]
  cardio: string | null
}

export const WEEK: DayPlan[] = [
  {
    weekday: '周一',
    title: '推',
    focus: '胸大肌 + 三角肌前/中束 + 肱三头肌',
    color: '#2d6a4f',
    muscles: ['chest', 'delts', 'triceps'],
    groups: [
      {
        name: '胸大肌',
        list: [
          { name: '坐姿推胸机', equip: '推胸训练器', sets: '4组 × 8-12', why: '<b>胸大肌（中束为主）</b>——整体厚度，撑起正面轮廓' },
          { name: '上斜推胸机', equip: '上斜推胸器', sets: '4组 × 10', why: '<b>胸大肌上束</b>——改善锁骨下方塌陷，让胸更挺' },
          { name: '蝴蝶机夹胸', equip: '蝴蝶机', sets: '3组 × 12-15', why: '<b>胸大肌中缝</b>——挤压收缩，增加胸型立体度' }
        ]
      },
      {
        name: '三角肌（前束 + 中束）',
        list: [
          { name: '哑铃侧平举', equip: '哑铃', sets: '4组 × 12-15', why: '<b>三角肌中束</b>——肩宽的最关键动作' },
          { name: '器械肩推', equip: '肩推训练器', sets: '3组 × 10', why: '<b>三角肌前束 + 中束</b>——肩部整体围度与推举力量' }
        ]
      },
      {
        name: '肱三头肌',
        list: [
          { name: '绳索下压', equip: '龙门架', sets: '4组 × 12', why: '<b>肱三头肌外侧头</b>——占臂围约 70%，大臂围度关键' }
        ]
      }
    ],
    cardio: '🏃 训练后有氧 30 分钟（跑步机坡度走 / 椭圆机）'
  },
  {
    weekday: '周二',
    title: '拉',
    focus: '背阔肌 + 斜方肌中下束 + 三角肌后束 + 肱二头肌',
    color: '#1d4ed8',
    muscles: ['lats', 'midBack', 'traps', 'rearDelts', 'biceps', 'forearms'],
    groups: [
      {
        name: '背阔肌（背部宽度）',
        list: [
          { name: '高位下拉', equip: '高位下拉器', sets: '4组 × 10', why: '<b>背阔肌</b>——背部宽度，打造倒三角' },
          { name: '直臂下压', equip: '龙门架', sets: '3组 × 12', why: '<b>背阔肌下沿</b>——让背部线条延伸更长' }
        ]
      },
      {
        name: '中背（厚度）',
        list: [
          { name: '坐姿划船', equip: '坐姿划船机', sets: '4组 × 10', why: '<b>斜方肌中束 + 菱形肌</b>——中背厚度，改善圆肩体态' },
          { name: '胸托划船', equip: '胸托划船器', sets: '3组 × 12', why: '<b>斜方肌 + 中背</b>——胸部有支撑，刺激更孤立稳定' }
        ]
      },
      {
        name: '三角肌后束',
        list: [
          { name: '绳索面拉', equip: '龙门架', sets: '4组 × 15', why: '<b>三角肌后束 + 肩袖肌群</b>——纠正含胸，肩膀变立体' }
        ]
      },
      {
        name: '肱二头肌',
        list: [
          { name: '哑铃弯举', equip: '哑铃', sets: '4组 × 10', why: '<b>肱二头肌</b>——肌峰高度，维持现有强项' },
          { name: '锤式弯举', equip: '哑铃', sets: '3组 × 12', why: '<b>肱肌 + 肱桡肌（前臂）</b>——大臂侧面厚度' }
        ]
      }
    ],
    cardio: '🏃 训练后有氧 30 分钟'
  },
  {
    weekday: '周三',
    title: '腿 + 臀 + 腹',
    focus: '股四头肌 + 腘绳肌 + 臀部 + 腹直肌',
    color: '#b45309',
    muscles: ['quads', 'hams', 'glutes', 'abs'],
    groups: [
      {
        name: '股四头肌（大腿前侧）',
        list: [
          { name: '腿举', equip: '腿举机', sets: '4组 × 10', why: '<b>股四头肌整体</b>——下肢围度与基础力量' },
          { name: '腿屈伸', equip: '腿屈伸机', sets: '3组 × 12', why: '<b>股四头肌（股直肌为主）</b>——膝盖上方的线条分离度' }
        ]
      },
      {
        name: '腘绳肌（大腿后侧）',
        list: [
          { name: '俯卧腿弯举', equip: '腿弯举机', sets: '4组 × 12', why: '<b>腘绳肌</b>——平衡前后侧力量，预防膝盖伤病' }
        ]
      },
      {
        name: '臀部',
        list: [
          { name: '臀推', equip: '臀推机 / 史密斯机', sets: '4组 × 10', why: '<b>臀大肌</b>——提升臀线，增强核心与髋部稳定' },
          { name: '坐姿髋外展', equip: '髋外展机', sets: '3组 × 15', why: '<b>臀中肌</b>——改善臀部两侧凹陷，骨盆稳定' }
        ]
      },
      {
        name: '腹部',
        list: [
          { name: '卷腹', equip: '腹肌凳 / 瑜伽垫', sets: '3组', why: '<b>腹直肌上段</b>——上腹部线条' },
          { name: '悬垂举腿', equip: '单杠', sets: '3组', why: '<b>腹直肌下段</b>——小肚子区域，兼练握力' }
        ]
      }
    ],
    cardio: null
  },
  {
    weekday: '周四',
    title: '肩强化 + 胸补充',
    focus: '三角肌中束 / 后束 + 胸大肌（穿衣效果重点日）',
    color: '#7c3aed',
    muscles: ['delts', 'rearDelts', 'chest', 'abs'],
    groups: [
      {
        name: '三角肌中束（肩宽关键）',
        list: [
          { name: '哑铃侧平举', equip: '哑铃', sets: '5组', why: '<b>三角肌中束</b>——直接决定肩膀看起来多宽' },
          { name: '器械侧平举', equip: '侧平举训练器', sets: '4组', why: '<b>三角肌中束</b>——轨迹固定、持续张力，补足哑铃的稳定性缺口' }
        ]
      },
      {
        name: '三角肌后束',
        list: [
          { name: '反向飞鸟', equip: '蝴蝶机（反向）', sets: '4组', why: '<b>三角肌后束</b>——肩从侧面看更圆更饱满，改善含胸' }
        ]
      },
      {
        name: '胸大肌',
        list: [
          { name: '坐姿推胸', equip: '推胸训练器', sets: '3组', why: '<b>胸大肌整体</b>——本周第二次刺激，维持厚度增长' },
          { name: '蝴蝶机夹胸', equip: '蝴蝶机', sets: '3组', why: '<b>胸大肌中缝</b>——塑形收紧' }
        ]
      },
      {
        name: '腹部',
        list: [
          { name: '腹部组合（卷腹 + 转体）', equip: '腹肌凳 / 瑜伽垫', sets: '20 分钟', why: '<b>腹直肌 + 腹斜肌</b>——收紧腰腹，配合显腰细' }
        ]
      }
    ],
    cardio: '🏃 训练后有氧 30 分钟'
  },
  {
    weekday: '周五',
    title: '背 + 手臂',
    focus: '背阔肌 + 肱二头肌 + 肱三头肌',
    color: '#0e7490',
    muscles: ['lats', 'midBack', 'biceps', 'triceps'],
    groups: [
      {
        name: '背（背阔肌 + 中背）',
        list: [
          { name: '高位下拉', equip: '高位下拉器', sets: '4组', why: '<b>背阔肌</b>——宽度，本周第二次刺激' },
          { name: '坐姿划船', equip: '坐姿划船机', sets: '4组', why: '<b>斜方肌中束 + 菱形肌</b>——中背厚度' },
          { name: '单臂哑铃划船', equip: '哑铃 + 平凳', sets: '3组', why: '<b>背阔肌（单侧）</b>——拉伸幅度更大，左右均衡发展' }
        ]
      },
      {
        name: '肱二头肌',
        list: [
          { name: '弯举', equip: '杠铃 / 哑铃', sets: '3组', why: '<b>肱二头肌</b>——围度维持' }
        ]
      },
      {
        name: '肱三头肌',
        list: [
          { name: '绳索下压', equip: '龙门架', sets: '4组', why: '<b>肱三头肌外侧头</b>——臂围关键' },
          { name: '颈后臂屈伸', equip: '哑铃', sets: '3组', why: '<b>肱三头肌长头</b>——手臂后侧饱满度，撑袖口' }
        ]
      }
    ],
    cardio: null
  },
  {
    weekday: '周六',
    title: '腿 + 臀',
    focus: '股四头肌 / 腘绳肌 + 臀大肌 + 小腿三头肌（降低重量）',
    color: '#40916c',
    muscles: ['quads', 'hams', 'glutes', 'calves'],
    groups: [
      {
        name: '股四头肌（大腿前侧）',
        list: [
          { name: '腿举', equip: '腿举机', sets: '3组', why: '<b>股四头肌</b>——本周第二次刺激，重量低于周三' }
        ]
      },
      {
        name: '腘绳肌（大腿后侧）',
        list: [
          { name: '俯卧腿弯举', equip: '腿弯举机', sets: '3组', why: '<b>腘绳肌</b>——维持后侧链激活' }
        ]
      },
      {
        name: '臀部',
        list: [
          { name: '臀推', equip: '臀推机 / 史密斯机', sets: '3组', why: '<b>臀大肌</b>——第二次刺激，巩固臀线' }
        ]
      },
      {
        name: '小腿',
        list: [
          { name: '站姿提踵', equip: '提踵机 / 史密斯机', sets: '4组', why: '<b>小腿三头肌（腓肠肌 + 比目鱼肌）</b>——小腿围度与脚踝稳定' }
        ]
      }
    ],
    cardio: null
  },
  {
    weekday: '周日',
    title: '恢复日',
    focus: '主动恢复 · 低强度有氧 + 柔韧性',
    color: '#6b7280',
    muscles: ['chest', 'delts', 'rearDelts', 'abs'],
    groups: [
      {
        name: '主动恢复',
        list: [
          { name: '坡度快走', equip: '跑步机', sets: '40 分钟', why: '<b>低强度有氧</b>——促进恢复，不干扰肌肉合成' },
          { name: '全身拉伸', equip: '瑜伽垫 / 拉伸区', sets: '15-20 分钟', why: '<b>胸大肌、三角肌、髋屈肌</b>——放松紧张肌群，改善柔韧性' },
          { name: '轻重量面拉', equip: '龙门架', sets: '2-3组', why: '<b>肩袖肌群 + 三角肌后束</b>——肩关节养护，为下周推举做准备' },
          { name: '轻量腹部', equip: '瑜伽垫', sets: '适量', why: '<b>深层核心（腹横肌）</b>——低强度维持' }
        ]
      }
    ],
    cardio: null
  }
]

/* ============ 肌肉标注（视图 / 名称 / 引线位置） ============ */

export interface MuscleMeta {
  /** 展示在正面图还是背面图 */
  view: 'front' | 'back'
  name: string
  /** 文字起点 */
  x: number
  y: number
  /** 引线指向的目标点 */
  tx: number
  ty: number
  /** 文字在左侧还是右侧 */
  side: 'l' | 'r'
}

export const MUSCLE_META: Record<string, MuscleMeta> = {
  chest:     { view: 'front', name: '胸大肌',        x: 4,   y: 62,  tx: 104, ty: 86,  side: 'l' },
  delts:     { view: 'front', name: '三角肌前/中束', x: 256, y: 62,  tx: 172, ty: 80,  side: 'r' },
  abs:       { view: 'front', name: '腹直肌',        x: 4,   y: 150, tx: 116, ty: 134, side: 'l' },
  quads:     { view: 'front', name: '股四头肌',      x: 4,   y: 240, tx: 102, ty: 238, side: 'l' },
  biceps:    { view: 'front', name: '肱二头肌',      x: 256, y: 96,  tx: 184, ty: 118, side: 'r' },
  forearms:  { view: 'front', name: '前臂·肱桡肌',   x: 256, y: 182, tx: 198, ty: 176, side: 'r' },
  traps:     { view: 'back',  name: '斜方肌',        x: 4,   y: 54,  tx: 110, ty: 72,  side: 'l' },
  rearDelts: { view: 'back',  name: '三角肌后束',    x: 4,   y: 92,  tx: 90,  ty: 86,  side: 'l' },
  midBack:   { view: 'back',  name: '斜方肌中束',    x: 4,   y: 126, tx: 118, ty: 112, side: 'l' },
  lats:      { view: 'back',  name: '背阔肌',        x: 4,   y: 162, tx: 106, ty: 140, side: 'l' },
  glutes:    { view: 'back',  name: '臀大肌',        x: 4,   y: 192, tx: 112, ty: 182, side: 'l' },
  triceps:   { view: 'back',  name: '肱三头肌',      x: 256, y: 96,  tx: 184, ty: 120, side: 'r' },
  hams:      { view: 'back',  name: '腘绳肌',        x: 256, y: 238, tx: 144, ty: 238, side: 'r' },
  calves:    { view: 'back',  name: '小腿三头肌',    x: 256, y: 292, tx: 146, ty: 290, side: 'r' }
}
