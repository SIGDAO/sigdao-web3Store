import { BurstValue } from '@burstjs/util'

export function calculateRankingPoints(token) {
    const { donationCount = '0', donationPlanck = '0' } = token
    const donated = Number.parseFloat(BurstValue.fromPlanck(donationPlanck).getBurst())
    const donations = Number.parseInt(donationCount, 10)
    const base = donated * donations
    return Math.round(Math.log(base === 0 ? 1 : base) * 100)
}
