import DanceDataFlowHero from './DanceDataFlowHero.jsx'
import KaplanMeierHero from './KaplanMeierHero.jsx'
import SqlFunnelHero from './SqlFunnelHero.jsx'
import OnlineLearningHero from './OnlineLearningHero.jsx'
import KakaoDidHero from './KakaoDidHero.jsx'
import TiktokSignalHero from './TiktokSignalHero.jsx'

// Custom SVG heroes keyed by the `detail.hero` id on a project. Shared by the
// project detail page (full hero) and the data overview card (as a thumbnail).
export const heroes = {
  danceDataFlow: DanceDataFlowHero,
  kaplanMeier: KaplanMeierHero,
  sqlFunnel: SqlFunnelHero,
  onlineLearning: OnlineLearningHero,
  kakaoDid: KakaoDidHero,
  tiktokSignal: TiktokSignalHero,
}
