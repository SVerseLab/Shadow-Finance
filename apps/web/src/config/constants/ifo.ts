import { ERC20Token, ChainId } from '@pancakeswap/sdk'
import { bscTokens } from '@pancakeswap/tokens'
import { CAKE_BNB_LP_MAINNET } from './lp'
import { Ifo } from './types'

export const cakeBnbLpToken = new ERC20Token(ChainId.BSC, CAKE_BNB_LP_MAINNET, 18, 'CAKE-BNB LP')

const ifos: Ifo[] = [
  {
    id: 'mge',
    address: '0x814aAa4cfe50b3acE4aA1387dDc466b2f38681dd',
    isActive: true,
    name: 'MGP',
    plannedStartTime: 1666872000,
    poolUnlimited: {
      raiseAmount: '$437,500',
      distributionRatio: 0.25,
    },
    poolBasic: {
      raiseAmount: '$1,312,500',
      distributionRatio: 0.75,
    },
    currency: bscTokens.cake,
    token: bscTokens.mgp,
    campaignId: '511900000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/0x5bbaee587df5b7e9b52e2b35f35f30afa08e15ab7098c73cb2503319c8d8ce44',
    tokenOfferingPrice: 0.025,
    version: 3.2,
    twitterUrl: 'https://twitter.com/magpiexyz_io',
    description:
      'ShadowSwap is a one-stop decentralized trading protocol which utilizes the security, scalability, and decentralization of the Core blockchain, creating an open and safe marketplace for traders, liquidity providers, and developers.',
    vestingTitle:
      'Earn $MGP by converting $WOM and providing liquidities; Lock $MGP to share revenue and receive bribes.',
  },
  
]

export default ifos
