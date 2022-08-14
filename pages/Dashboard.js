import React, {useState ,useEffect} from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ThirdwebSDK } from '@3rdweb/sdk'
import {ethers} from 'ethers'

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
      process.env.NEXT_PUBLIC_METAMASK_KEY,
      ethers.getDefaultProvider(
          'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      )
  )
)

const Dashboard = ({address}) => {
  const [sanityTokens, setSanityTokens] = useState([])
  const [thirdWebTokens, setThirdWebTokens] = useState([])
  useEffect(() => {
    const getSanityandThirdWedTokens = async() => {
        
            const coins = await fetch("https://i92on72n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%0A%7D")
            
            const SanityTokens = (await coins.json()).result;
            // console.log(tempSanityTokens)
            setSanityTokens(SanityTokens)

            setThirdWebTokens(
                SanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
            ) 
        
        
    }

    return getSanityandThirdWedTokens();  
  },[])

  // console.log('Sanity TOkens : ', sanityTokens)
  // console.log('ThirdWEb tokens : ', thirdWebTokens)
  return (
      <Wrapper>
          <Sidebar />
          <MainContainer>
                <Header 
                walletAddress={address} 
                sanityTokens={sanityTokens} 
                thirdWebTokens={thirdWebTokens}
                />
                <Main 
                walletAddress={address} 
                sanityTokens={sanityTokens} 
                thirdWebTokens={thirdWebTokens}
                />
          </MainContainer>      
      </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow-x: hidden;
  align-items: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
`

const MainContainer = styled.div`
  flex: 1;
`