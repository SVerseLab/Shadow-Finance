import { BigNumber } from '@ethersproject/bignumber'
import { Pool } from '@pancakeswap/uikit'
import { SerializedWrappedToken } from '@pancakeswap/token-lists'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { bscTokens } from '@pancakeswap/tokens'
import { PoolCategory } from './types'

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto SHDW</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake SHDW</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible SHDW</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
 
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  {
    sousId: 0,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.cake,
    contractAddress: {
      97: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
      56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '10',
    isFinished: false,
  },
  {
    sousId: 304,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.xcad,
    contractAddress: {
      56: '0x68Cc90351a79A4c10078FE021bE430b7a12aaA09',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.1102',
    version: 3,
  },
  {
    sousId: 303,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.mgp,
    contractAddress: {
      56: '0x365F744c8b7608253697cA2Ed561537B65a3438B',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '6.944',
    version: 3,
  },
  {
    sousId: 302,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.wmx,
    contractAddress: {
      56: '0xaEd58Af2c98dbF05d26B3E5b3cc809fc70D203ce',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.5787',
    version: 3,
  },
  {
    sousId: 301,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.krs,
    contractAddress: {
      56: '0x067F926EB8f2a95f260327B01C29B2034A785029',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '4.96',
    version: 3,
  },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [
  {
    sousId: 299,
    stakingToken: bscTokens.cake,
    earningToken: bscTokens.co,
    contractAddress: {
      56: '0x31736A52bBdda4eaf0117B17736306Bbecb711ca',
      97: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '4.6296',
    version: 3,
  },
  
].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export default [...livePools, ...finishedPools] as Pool.SerializedPoolConfig<SerializedWrappedToken>[]
