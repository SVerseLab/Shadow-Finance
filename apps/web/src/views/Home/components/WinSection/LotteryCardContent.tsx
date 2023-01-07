import { Flex, Text, Button, NextLinkFromReactRouter, ArrowForwardIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'

const StyledLink = styled(NextLinkFromReactRouter)`
  width: 100%;
`

const LotteryCardContent = () => {
  const { t } = useTranslation()

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <Text color="white" bold fontSize="24px">
          {t('Shadow Puppets NFTs')}
        </Text>

        <Text color="white" mb="40px">
          {t(
            'Shadow Pandas NFTs (SPN) are generated sets of 3D,unique, rare, immutable, digital Shadow figures. Which can help to grow your Defi finances and comes in limited supply, with series of utilities such as access to private IFO token sales, Staking for persive income and more utilities lurking in the shadows. Shadow Pandas will start the NFT Defi Season on Core Network',
          )}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <StyledLink to="/NotFound" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Learn More')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink>
      </Flex>
    </>
  )
}

export default LotteryCardContent
