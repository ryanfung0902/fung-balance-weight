import { useEffect, useMemo, useState } from 'react'
import apple from './assets/weight/蘋果.png'
import football from './assets/weight/足球.png'
import basketball from './assets/weight/籃球.png'
import backpack from './assets/weight/書包.png'
import bottle from './assets/weight/水樽-clean.png'
import dictionary from './assets/weight/字典.png'
import pencilCase from './assets/weight/文具盒.png'
import stapler from './assets/weight/訂書機.png'
import calculator from './assets/weight/計數機.png'
import cleanBanana from './assets/weight/香蕉-clean.png'
import robot from './assets/weight/玩具機械人.png'
import riceBag from './assets/weight/米袋.png'
import watermelon from './assets/weight/西瓜.png'
import detergent from './assets/weight/洗衣液.png'
import paperReam from './assets/weight/A4紙.png'
import riceCrackers from './assets/weight/米餅小包.png'
import chocolate from './assets/weight/朱古力.png'
import glueStick from './assets/weight/膠水棒.png'
import tissuePack from './assets/weight/紙巾小包.png'
import mandarin from './assets/weight/小柑.png'
import kiwi from './assets/weight/奇異果.png'
import biscuitPacket from './assets/weight/餅乾小包.png'
import eraser from './assets/weight/膠擦.png'
import correctionTape from './assets/weight/改錯帶.png'
import stickyNotes from './assets/weight/便利貼.png'
import scissors from './assets/weight/剪刀.png'
import staplesBox from './assets/weight/釘書釘小盒.png'
import travelSoap from './assets/weight/旅行皂.png'
import sponge from './assets/weight/海綿.png'
import batteries from './assets/weight/電池兩粒.png'
import toothbrush from './assets/weight/旅行牙刷.png'
import toothpaste from './assets/weight/旅行牙膏.png'

type Category = '食品' | '文具' | '日用品'
type Item = { id: string; name: string; category: Category; grams: number; image: string }
type Unit = 'g' | 'kg'

const items: Item[] = [
  { id: 'rice-crackers', name: '小包米餅', category: '食品', grams: 60, image: riceCrackers },
  { id: 'chocolate', name: '朱古力', category: '食品', grams: 40, image: chocolate },
  { id: 'mandarin', name: '小柑', category: '食品', grams: 80, image: mandarin },
  { id: 'kiwi', name: '奇異果', category: '食品', grams: 80, image: kiwi },
  { id: 'biscuit-packet', name: '餅乾小包', category: '食品', grams: 40, image: biscuitPacket },
  { id: 'apple', name: '蘋果', category: '食品', grams: 200, image: apple },
  { id: 'banana', name: '香蕉', category: '食品', grams: 100, image: cleanBanana },
  { id: 'rice-bag', name: '米袋', category: '食品', grams: 1000, image: riceBag },
  { id: 'watermelon', name: '西瓜', category: '食品', grams: 1500, image: watermelon },
  { id: 'dictionary', name: '字典', category: '文具', grams: 700, image: dictionary },
  { id: 'backpack', name: '書包', category: '文具', grams: 800, image: backpack },
  { id: 'pencil-case', name: '文具盒', category: '文具', grams: 300, image: pencilCase },
  { id: 'stapler', name: '訂書機', category: '文具', grams: 200, image: stapler },
  { id: 'calculator', name: '計數機', category: '文具', grams: 200, image: calculator },
  { id: 'glue-stick', name: '膠水棒', category: '文具', grams: 40, image: glueStick },
  { id: 'eraser', name: '膠擦', category: '文具', grams: 20, image: eraser },
  { id: 'correction-tape', name: '改錯帶', category: '文具', grams: 20, image: correctionTape },
  { id: 'sticky-notes', name: '便利貼', category: '文具', grams: 80, image: stickyNotes },
  { id: 'scissors', name: '剪刀', category: '文具', grams: 60, image: scissors },
  { id: 'staples-box', name: '釘書釘小盒', category: '文具', grams: 40, image: staplesBox },
  { id: 'paper-ream', name: '一包 A4 紙', category: '文具', grams: 2500, image: paperReam },
  { id: 'tissues', name: '小包紙巾', category: '日用品', grams: 60, image: tissuePack },
  { id: 'travel-soap', name: '旅行皂', category: '日用品', grams: 80, image: travelSoap },
  { id: 'sponge', name: '海綿', category: '日用品', grams: 20, image: sponge },
  { id: 'batteries', name: '兩粒電池', category: '日用品', grams: 40, image: batteries },
  { id: 'toothbrush', name: '旅行牙刷', category: '日用品', grams: 20, image: toothbrush },
  { id: 'toothpaste', name: '旅行牙膏', category: '日用品', grams: 60, image: toothpaste },
  { id: 'bottle', name: '水樽', category: '日用品', grams: 600, image: bottle },
  { id: 'robot', name: '玩具機械人', category: '日用品', grams: 400, image: robot },
  { id: 'football', name: '足球', category: '日用品', grams: 400, image: football },
  { id: 'basketball', name: '籃球', category: '日用品', grams: 600, image: basketball },
  { id: 'detergent', name: '洗衣液', category: '日用品', grams: 2500, image: detergent },
]

const categories: Category[] = ['食品', '文具', '日用品']
const capacities = [100, 800, 1000, 4000] as const
const divisionOptions = [2, 5, 10] as const
const majorStepFor = (capacity: number) => capacity === 100 ? 20 : capacity === 4000 ? 1000 : 200
const formatNumber = (grams: number, unit: Unit) => unit === 'g' ? grams.toLocaleString('zh-HK') : Number((grams / 1000).toFixed(3)).toString()

export default function WeightScale({ onBack }: { onBack?: () => void } = {}) {
  const [capacity, setCapacity] = useState(1000)
  const [divisions, setDivisions] = useState(5)
  const [unit, setUnit] = useState<Unit>('g')
  const [category, setCategory] = useState<Category>('食品')
  const [onPan, setOnPan] = useState<Item[]>([])
  const [pendingPlacement, setPendingPlacement] = useState<Item[]>([])
  const [placingItem, setPlacingItem] = useState<Item | null>(null)
  const [showWeight, setShowWeight] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [checkingPassword, setCheckingPassword] = useState(false)
  const [studentAnswer, setStudentAnswer] = useState('')
  const [answerFeedback, setAnswerFeedback] = useState('')
  const [hintStep, setHintStep] = useState(0)

  const total = onPan.reduce((sum, item) => sum + item.grams, 0)
  const ratio = Math.min(total / capacity, 1)
  const majorStep = majorStepFor(capacity)
  const gramsPerTick = majorStep / divisions
  const tickCount = capacity / gramsPerTick
  const visibleItems = useMemo(() => items.filter((item) => item.category === category).sort((a, b) => {
    const aFits = a.grams <= capacity
    const bFits = b.grams <= capacity
    return aFits === bFits ? b.grams - a.grams : aFits ? -1 : 1
  }), [category, capacity])
  const groupedOnPan = useMemo(() => items.map((item) => ({ item, count: onPan.filter((placed) => placed.id === item.id).length })).filter((group) => group.count > 0), [onPan])
  const capacityLabel = capacity === 4000 ? '4 kg' : `${capacity.toLocaleString('zh-HK')} g`
  const scaleValueLabel = (grams: number) => formatNumber(grams, unit)
  // The maximum and zero share the twelve-o'clock tick; their labels are stacked below it.
  const dialStartAngle = -90
  const dialSweepAngle = 360

  useEffect(() => {
    if (placingItem || pendingPlacement.length === 0) return
    setPlacingItem(pendingPlacement[0])
    setPendingPlacement((current) => current.slice(1))
  }, [placingItem, pendingPlacement])

  useEffect(() => {
    if (!placingItem) return
    const timer = window.setTimeout(() => {
      setOnPan((current) => [...current, placingItem])
      setPlacingItem(null)
    }, 1100)
    return () => window.clearTimeout(timer)
  }, [placingItem])

  const resetExercise = () => { setStudentAnswer(''); setAnswerFeedback(''); setHintStep(0) }
  const selectCapacity = (value: number) => { setCapacity(value); setShowWeight(false); resetExercise() }
  const selectDivisions = (value: number) => { setDivisions(value); resetExercise() }
  const selectUnit = (value: Unit) => { setUnit(value); resetExercise() }

  const addItem = (item: Item) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setOnPan((current) => [...current, item])
    else setPendingPlacement((current) => [...current, item])
    setShowWeight(false)
    resetExercise()
  }
  const removeItem = (index: number) => {
    setOnPan((current) => current.filter((_, itemIndex) => itemIndex !== index))
    setShowWeight(false)
    resetExercise()
  }
  const clearPan = () => { setPendingPlacement([]); setPlacingItem(null); setOnPan([]); setShowWeight(false); resetExercise() }
  const valueLabel = (grams: number) => `${formatNumber(grams, unit)} ${unit}`
  const displayReading = total > capacity ? '超出量程' : valueLabel(total)
  const readingExplanation = () => {
    if (total === capacity) return `指針指向十二點嘅最高刻度，即 ${valueLabel(capacity)}。`
    if (total % majorStep === 0) return `指針正對 ${valueLabel(total)} 嘅大刻度。`
    const previousMajor = Math.floor(total / majorStep) * majorStep
    const smallSteps = (total - previousMajor) / gramsPerTick
    if (Number.isInteger(smallSteps)) return `指針指住 ${valueLabel(previousMajor)} 後嘅第 ${smallSteps} 小格。每小格係 ${valueLabel(gramsPerTick)}，所以 ${valueLabel(previousMajor)} + ${smallSteps} × ${valueLabel(gramsPerTick)} = ${valueLabel(total)}。`
    const lowerTick = Math.floor(total / gramsPerTick) * gramsPerTick
    return `指針喺 ${valueLabel(lowerTick)} 同 ${valueLabel(lowerTick + gramsPerTick)} 兩格之間，今次模擬嘅重量係 ${valueLabel(total)}。`
  }
  const correctAnswerSentence = onPan.length === 1
    ? `${onPan[0].name}重 ${valueLabel(total)}。`
    : `磅上 ${onPan.length} 件物件共重 ${valueLabel(total)}。`
  const checkAnswer = () => {
    const trimmed = studentAnswer.trim()
    if (onPan.length === 0) { setAnswerFeedback('請先放一件物品上磅。'); return }
    if (total > capacity) { setAnswerFeedback('已超出量程，請選擇較大的磅。'); return }
    if (!/^\d+(?:\.\d{1,3})?$/.test(trimmed)) { setAnswerFeedback('請輸入有效重量；公斤最多用三位小數。'); return }
    const enteredGrams = Number(trimmed) * (unit === 'kg' ? 1000 : 1)
    setAnswerFeedback(Math.abs(enteredGrams - total) < 0.001 ? '答啱喇' : '再睇清楚大刻度同每一小格，再試一次。')
  }
  const pressAnswerKey = (key: string) => {
    if (key === '確定') { checkAnswer(); return }
    setAnswerFeedback('')
    if (key === '清除') { setStudentAnswer(''); return }
    if (key === '←') { setStudentAnswer((answer) => answer.slice(0, -1)); return }
    setStudentAnswer((answer) => key === '.' && answer.includes('.') ? answer : `${answer}${key}`)
  }
  const unlockReading = async () => {
    if (!password) { setPasswordError('請輸入教師密碼。'); return }
    setCheckingPassword(true)
    setPasswordError('')
    try {
      const response = await fetch('/api/teacher/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      if (response.status === 401) throw new Error('教師密碼不正確。')
      if (response.status !== 204) throw new Error('教師密碼驗證服務暫時未啟用。')
      setShowWeight(true)
      setPasswordOpen(false)
      setPassword('')
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : '暫時未能驗證，請稍後再試。')
    } finally { setCheckingPassword(false) }
  }

  const tickValues = Array.from({ length: tickCount }, (_, index) => index * gramsPerTick)
  const tickElements = tickValues.map((grams, index) => {
    const angle = (dialStartAngle + (grams / capacity) * dialSweepAngle) * Math.PI / 180
    const major = index % divisions === 0
    const middle = divisions === 10 && index % 5 === 0
    const guide = index === divisions
    const outer = 176
    const inner = major ? 151 : middle ? 158 : 166
    const x1 = 200 + Math.cos(angle) * outer
    const y1 = 200 + Math.sin(angle) * outer
    const x2 = 200 + Math.cos(angle) * inner
    const y2 = 200 + Math.sin(angle) * inner
    const labelRadius = 132
    const labelText = scaleValueLabel(Math.round(grams))
    const labelX = 200 + Math.cos(angle) * labelRadius
    const labelY = 200 + Math.sin(angle) * labelRadius + 5
    const tickClass = `scale-tick${major ? ' scale-tick--major' : middle ? ' scale-tick--medium' : ''}${guide ? ' scale-tick--guide' : ''}`
    const labelClass = `scale-mark-label scale-mark-label--major${guide ? ' scale-mark-label--guide' : ''}`
    return <g key={index}><line x1={x1} y1={y1} x2={x2} y2={y2} className={tickClass} />{major && <text x={labelX} y={labelY} className={labelClass}>{labelText}</text>}</g>
  })
  const needleRotation = ratio * dialSweepAngle

  return <section className="scale-view">
    {onBack && <button className="back-button" onClick={onBack}>← 返回</button>}
    <h1 className="visually-hidden">磅一磅！街市指針磅重量模擬</h1>
    <div className="scale-layout">


      <div className="scale-main">
        <div className="scale-controls">
          <div className="scale-control-group" role="group" aria-label="選擇磅的最大重量">最多重量 <span>{capacityLabel}</span><div className="segmented capacity-segmented">{capacities.map((value) => <button key={value} type="button" aria-pressed={capacity === value} className={capacity === value ? 'segment segment--active' : 'segment'} onClick={() => selectCapacity(value)}>最多 {value === 4000 ? '4 kg' : `${value} g`}</button>)}</div></div>
          <div className="scale-control-group" role="group" aria-label="相鄰大刻度之間的分格">刻度分格 <span>每格 {valueLabel(gramsPerTick)}</span><div className="segmented division-segmented">{divisionOptions.map((value) => <button key={value} type="button" aria-pressed={divisions === value} className={divisions === value ? 'segment segment--active' : 'segment'} onClick={() => selectDivisions(value)}><span className="mini-ticks" aria-hidden="true">{Array.from({ length: value + 1 }, (_, index) => <i key={index} />)}</span>分 {value} 小格</button>)}</div></div>
          <div className="scale-control-group" role="group" aria-label="刻度單位">刻度單位 <div className="segmented"><button type="button" aria-pressed={unit === 'g'} className={unit === 'g' ? 'segment segment--active' : 'segment'} onClick={() => selectUnit('g')}>克（g）</button><button type="button" aria-pressed={unit === 'kg'} className={unit === 'kg' ? 'segment segment--active' : 'segment'} onClick={() => selectUnit('kg')}>公斤（kg）</button></div></div>
        </div>

        <div className="scale-workspace"><div className="scale-stage"><div className="market-scale-scene">
          <svg className="market-scale-illustration" viewBox="0 0 620 645" role="img" aria-label="珊瑚色托盤、蒂芙尼藍色機身的插畫風格指針磅">
            <defs>
              <linearGradient id="illustration-scale-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4fc4bd" /><stop offset="1" stopColor="#269b9a" /></linearGradient>
              <linearGradient id="illustration-scale-tray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fb8d6e" /><stop offset="1" stopColor="#f06951" /></linearGradient>
            </defs>
            <path d="M226 136h168v72H226z" fill="url(#illustration-scale-body)" />
            <path d="M250 151h120v42H250z" fill="#e2f8e7" />
            <path d="M294 180v-19q0-8 8-8h16q8 0 8 8v19" fill="#2fa6a2" />
            <path d="M192 475h236v62q0 18 14 26l21 15q8 6 8 18H149q0-12 8-18l21-15q14-8 14-26z" fill="url(#illustration-scale-body)" />
            <circle cx="310" cy="365" r="202" fill="url(#illustration-scale-body)" />
            <circle cx="310" cy="365" r="185" fill="#fffbed" stroke="#168b8d" strokeWidth="8" />
            <path d="M117 83h386q8 0 7 8-6 49-56 61H166q-50-12-56-61-1-8 7-8z" fill="url(#illustration-scale-tray)" />
            <path d="M122 88h376" stroke="#ffb093" strokeWidth="3" strokeLinecap="round" opacity=".7" />
            <path d="M154 592h43v11h-43zm269 0h43v11h-43z" fill="#227e7d" />
          </svg>
          <div className="market-pan" aria-label="秤盤：已放上磅的物品">
            {onPan.length === 0 ? (placingItem ? null : <span className="pan-placeholder">選物件放上磅</span>) : <div className={`pan-items pan-items--${groupedOnPan.length === 1 ? 'single' : groupedOnPan.length <= 3 ? 'few' : 'many'}`}>{groupedOnPan.map(({ item, count }) => <button className="pan-item" key={item.id} onClick={() => removeItem(onPan.findIndex((placed) => placed.id === item.id))} title={`移走一件${item.name}`} aria-label={`${item.name}${count}件，按一下移走一件`}><img src={item.image} alt={item.name} />{count > 1 && <span className="pan-item-count">×{count}</span>}<i>×</i></button>)}</div>}
          </div>
          {placingItem && <div className="placement-animation" role="status" aria-label={`正在把${placingItem.name}放上磅`}>
            <img className="placement-object" src={placingItem.image} alt="" />
            <svg className="placement-hand" viewBox="0 0 230 160" aria-hidden="true">
              <path d="M230 37h-64v66h64z" fill="#41aca9" />
              <path d="M184 42c-16-5-30-3-47 5L71 75c-12 5-16 15-11 24 5 9 15 10 25 5l38-18-29 30c-7 8-5 18 2 23 8 6 18 3 25-5l32-34c10-10 18-13 33-13h18V47z" fill="#efb88d" stroke="#a96d58" strokeWidth="3" strokeLinejoin="round" />
              <path d="m70 78 52-23m-39 42 52-28m-39 47 45-37" fill="none" stroke="#c88c6e" strokeWidth="3" strokeLinecap="round" />
              <path d="M171 39h59v67h-59z" fill="#2d999b" />
              <path d="M174 40v65" stroke="#176e73" strokeWidth="4" />
            </svg>
          </div>}
          <svg className="market-dial" viewBox="0 0 400 400" role="img" data-grams-per-tick={gramsPerTick} data-needle-degrees={needleRotation} aria-label={`街市指針磅刻度，最大重量${capacityLabel}，相鄰大刻度分${divisions}小格，每小格${valueLabel(gramsPerTick)}`}><circle cx="200" cy="200" r="179" className="market-dial-ring" /><g className="needle-group" style={{ transform: `rotate(${needleRotation}deg)` }}><line x1="200" y1="200" x2="200" y2="58" className="dial-needle" /></g>{tickElements}<text x="200" y="105" className="scale-mark-label scale-mark-label--major scale-mark-label--maximum">{scaleValueLabel(capacity)}</text><text x="200" y="230" className="market-dial-unit">{unit}</text><text x="200" y="251" className="market-dial-capacity">最多 {capacityLabel}</text><circle cx="200" cy="200" r="9" className="dial-hub" /></svg>
        </div>

        <div className="scale-actions"><div className="pan-summary"><b>磅上物品：{onPan.length} 件</b><span>總重 {showWeight ? displayReading : '已隱藏'}</span></div><div className="action-buttons"><button className="secondary-button" onClick={clearPan} disabled={onPan.length === 0 && !placingItem && pendingPlacement.length === 0}>清空磅盤</button><button className="primary-button" onClick={() => { if (showWeight) setShowWeight(false); setPasswordOpen(true); setPasswordError('') }}>🔒 直接讀重量</button></div></div>
        {total > capacity && <p className="range-warning" role="status">物品總重超出磅的量程，請換用較大量程的磅。</p>}
        {total === capacity && total > 0 && <p className="range-warning" role="status">物品剛好達到量程上限，指針會回到十二點方向的最高刻度。</p>}
        {total > 0 && total < capacity && total % gramsPerTick !== 0 && <p className="range-warning" role="status">指針在兩條刻度線之間；可選較細的分格，讀得更準確。</p>}
        <p className="scale-note">物品重量為教學模擬數值，同一件物品換磅後重量不變。相鄰大刻度相差 {valueLabel(majorStep)}，分 {divisions} 小格，每小格代表 {valueLabel(gramsPerTick)}。</p>
        </div><aside className="answer-panel" aria-labelledby="answer-title"><p className="eyebrow">學看磅</p><h2 id="answer-title">物件嘅重量？</h2><p>望清楚指針，輸入磅上物件的總重量。</p><label htmlFor="student-weight-answer">重量（{unit === 'g' ? '克' : '公斤'}）</label><div className="answer-input-row"><input id="student-weight-answer" type="text" inputMode="decimal" autoComplete="off" value={studentAnswer} onChange={(event) => { setStudentAnswer(event.target.value); setAnswerFeedback('') }} onKeyDown={(event) => { if (event.key === 'Enter') checkAnswer() }} placeholder="輸入讀數" /><strong>{unit}</strong></div><div className="answer-keypad" aria-label="輸入重量的數字鍵盤">{['7', '8', '9', '←', '4', '5', '6', '清除', '1', '2', '3', '確定', '.', '0'].map((key) => <button key={key} type="button" className={key === '確定' ? 'keypad-confirm' : ''} onClick={() => pressAnswerKey(key)} aria-label={key === '←' ? '刪除最後一字' : key}>{key}</button>)}</div><button className="hint-button" type="button" onClick={() => setHintStep((step) => Math.min(step + 1, 3))}>讀磅提示 {hintStep > 0 ? `${hintStep}/3` : ''}</button>{hintStep > 0 && <div className="hint-content" role="status">{hintStep === 1 ? `由 0 到下一個大刻度，相差 ${valueLabel(majorStep)}。` : hintStep === 2 ? `中間分成 ${divisions} 小格，所以每小格是 ${valueLabel(gramsPerTick)}。` : '從 0 起數指針經過的大刻度及小格，再把重量加起來。'}</div>}{answerFeedback && (answerFeedback.startsWith('答啱') ? <div className="answer-review" role="status"><strong>✓ 答對了！{correctAnswerSentence}</strong><p>{readingExplanation()}</p></div> : <p className="answer-feedback" role="status">{answerFeedback}</p>)}</aside></div>
      </div>
      <aside className="object-picker">
        <div className="category-tabs" role="tablist" aria-label="物品類別">{categories.map((name) => <button key={name} role="tab" aria-selected={category === name} className={category === name ? 'category-tab category-tab--active' : 'category-tab'} onClick={() => setCategory(name)}>{name}</button>)}</div>
        <p className="picker-tip">按一下圖片放上一件；重複按可增加數量，按磅盤上的物品可移走一件。物件太重時，試換較大量程的磅。</p>
        <div className="object-grid">{visibleItems.map((item) => <button key={item.id} type="button" className="object-card" onClick={() => addItem(item)} aria-label={`把一件${item.name}放上磅`}>
          <img src={item.image} alt="" />
          <b>{item.name}</b>
          <span className="object-card-hint">按一下放上磅</span>
        </button>)}</div>
      </aside>
    </div>

    {passwordOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPasswordOpen(false) }}><section className="teacher-password-modal" role="dialog" aria-modal="true" aria-labelledby="password-title"><button className="modal-close" onClick={() => setPasswordOpen(false)} aria-label="關閉">×</button><p className="eyebrow">教師功能</p><h2 id="password-title">輸入教師密碼</h2><p>核對後會顯示磅上的重量。</p><label htmlFor="scale-teacher-password">教師密碼</label><input id="scale-teacher-password" type="password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void unlockReading() }} placeholder="請輸入教師密碼" />{passwordError && <p className="error-text" role="alert">{passwordError}</p>}<button className="primary-button" onClick={() => void unlockReading()} disabled={checkingPassword}>{checkingPassword ? '驗證中……' : '顯示重量'}</button></section></div>}
  </section>
}
