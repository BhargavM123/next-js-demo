import React, {useState ,useEffect} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styled from 'styled-components'
import { coins } from '../static/coins'
import Coin from './Coin'
import BalanceChart from './BalanceChart'
import { ThirdwebSDK } from '@3rdweb/sdk'

const Portfolio = ({thirdWebTokens, sanityTokens, walletAddress}) => {
    const [walletBalance, setWalletBalance] = useState(0)
    const tokenToUSD = {}

    console.log(walletAddress)
    console.log(thirdWebTokens[0])

    // thirdWebTokens[0]
    //  .getBalance(walletAddress)
    //  .then(balance => console.log(Number(balance.displayValue) * 3100))

    // thirdWebTokens[0].balanceOf(walletAddress).then(balance => console.log(Number(balance.displayValue) * 3100));
    

    // console.log(sanityTokens)

    

    for(const token of sanityTokens) {
        tokenToUSD[token.contractAddress] = Number(token.usdPrice)
    }
    // console.table(tokenToUSD)
   
    useEffect(() => {
        const calculateTotalBalance = async () => {
            const totalBalance = await Promise.all(
                thirdWebTokens.map(async token => {
                    const balance = await token.balanceOf(walletAddress)
                    return Number(balance.displayValue) * tokenToUSD[token.address]
                })
            )
            console.log(totalBalance, 'total balance')
            setWalletBalance(totalBalance.reduce((acc, curr) => acc + curr, 0))
        }
        return calculateTotalBalance()
    },[thirdWebTokens,sanityTokens])
    
    
  return (
    <Wrapper>
        <Content>
            <Chart>
                <div>
                    <Balance>
                        <BalanceTitle>Portfolio Balance</BalanceTitle>
                        <BalanceValue>
                            {'$'}
                            {walletBalance.toLocaleString()}
                            {/* 45000 */}
                        </BalanceValue>
                    </Balance>
                </div>
            </Chart>
        <BalanceChart />
        <PortfolioTable>
            <TableItem>
                <Title>Your Assets</Title>
            </TableItem>
            <Divider />
            <Table>
                <TableItem>
                    <TableRow>
                        <div style={{flex: 3}}>Name</div>
                        <div style={{flex: 2}}>Balance</div>
                        <div style={{flex: 1}}>Price</div>
                        <div style={{flex: 1}}>Allocations</div>
                        <div style={{flex: 0}}>
                            <BsThreeDotsVertical/></div>
                    </TableRow>
                </TableItem>
                <Divider />
                <div>{coins.map(coin => (
                    <div>
                        <Coin coin={coin} />
                        {/* <h2>{coin.name}</h2> */}
                        <Divider />
                    </div>
                ))}</div>
            </Table>
        </PortfolioTable>
        </Content>
    </Wrapper> 
  )
}

export default Portfolio

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 2rem 1rem;
`
const PortfolioTable = styled.div`
    margin-top: 1rem;
    border: 1px solid #282b2f;
`

const Table = styled.table`
    width: 100%;
`
const TableRow = styled.tr`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    & > th{
        text-align: left;
    }
`

const TableItem = styled.div`
    padding: 1rem 2rem;
`

const Divider = styled.div`
    border-between: 1px solid #282b2f;
`

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`
const Chart = styled.div`
    border: 1px solid #282b2f;
    padding: 1rem 2rem;
`
const Balance = styled.div`
`
const BalanceTitle = styled.div`
    color: #8a919e;
    font-size: 0.9rem;
`
const BalanceValue = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0.5rem 0;
`

