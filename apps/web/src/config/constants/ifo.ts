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
    name: 'SHDW',
    plannedStartTime: 1666872000,
    poolBasic: {
      raiseAmount: '750,000',
      distributionRatio: 0.25,
    },
    poolUnlimited: {
      raiseAmount: '$2,250,000',
      distributionRatio: 0.75,
    },
    currency: bscTokens.cake,
    token: bscTokens.mgp,
    campaignId: '511900000',
    articleUrl:
      'https://pancakeswap.finance/voting/proposal/0x5bbaee587df5b7e9b52e2b35f35f30afa08e15ab7098c73cb2503319c8d8ce44',
    tokenOfferingPrice: 0.3,
    version: 3.2,
    twitterUrl: 'https://twitter.com/shadowswap_xyz',
    description:
      'ShadowSwap is a one-stop decentralized trading protocol which utilizes the security, scalability, and decentralization of the Core blockchain, creating an open and safe marketplace for traders, liquidity providers, and developers.',
    
  },
  
]

export default ifos
