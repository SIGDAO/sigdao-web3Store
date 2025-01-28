import { AbstractBadgeRule } from './abstractBadgeRule'

export class FirstDonationBadgeRule extends AbstractBadgeRule {
    constructor() {
        super({
            name: 'First Donation',
            description: 'You got a voting',
            icon: 'first-donation.svg',
        })
    }

    test({ token, allTokens, block }) {
        const { donationCount } = token
        return donationCount > 0
    }
}
