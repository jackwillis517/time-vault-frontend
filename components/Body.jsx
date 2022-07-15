import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { FaEthereum } from "react-icons/fa"
import { useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function Body() {
    //Header.jsx passes up metamask info to MoralisProvider which then passes it down to all
    //components inside the provider tags
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const timeVaultAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [depositAmount, setDepositAmount] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)
    const dispatch = useNotification()

    const {runContractFunction: deposit} = useWeb3Contract({
        abi: abi,
        contractAddress: timeVaultAddress,
        functionName: "deposit",
        params: {},
        msgValue: depositAmount,
    })

    const {runContractFunction: withdraw} = useWeb3Contract({
        abi: abi,
        contractAddress: timeVaultAddress,
        functionName: "withdraw",
        params: {}
    })

    const {runContractFunction: getTime} = useWeb3Contract({
        abi: abi,
        contracAddress: timeVaultAddress,
        functionName: "getTime",
        params: {}
    })

    const handleDepositSuccess = async function (tx){
        await tx.wait(1)
        handleNewDepositNotification(tx)
    }

    const handleWithdrawSuccess = async function (tx){
        await tx.wait(1)
        handleNewWithdrawNotification(tx)
    }

    const handleNewDepositNotification = function () {
        dispatch({
            type: "success",
            message: "Ether Deposited!",
            title: "Notification",
            position: "topR",
            icon: "check",
        })
    }

    const handleNewWithdrawNotification = function () {
        dispatch({
            type: "success",
            message: "Ether Withdrawn!",
            title: "Notification",
            position: "topR",
            icon: "eth",
        })
    }

    const depositHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            var amount = document.getElementById("etherAmount").value
            setDepositAmount(amount * 1000000000000000000)
            await deposit({
                onSuccess: handleDepositSuccess,
                onError: (error) => console.log(error)
            })
        }
    }

    const withdrawHandler = async (e) => {
        e.preventDefault()
        await withdraw({
            onSuccess: handleWithdrawSuccess,
            onError: (error) => console.log(error)
        })
    }

    const getTimeHandler = async (e) => {
        e.preventDefault()
        const time = await getTime()
        const formatTime = ethers.utils.formatEther(time)
        console.log(formatTime)
        setTimeLeft(formatTime)
    }

    return (
      <div>
        <h1>Keep Your Crypto Safe</h1>
        <form onSubmit={depositHandler}>
            <label>Deposit ETH <FaEthereum/></label>
            <div>
                <input type="number" placeholder="0.0000" step="0.0001" id="etherAmount"/>
            </div>
            <br/>
            <div>
                <button type="submit">Deposit</button>
            </div>
        </form>
        <button onClick={withdrawHandler}>Unlock Ether</button>
        <button onClick={getTimeHandler}>Time Left</button>
        <h2>Time Left: {timeLeft}</h2>
      </div>
    )
}