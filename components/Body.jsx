import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { useNotification } from "web3uikit"

export default function Body() {
    //Header.jsx passes up metamask info to MoralisProvider which then passes it down to all
    //components inside the provider tags
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const timeVaultAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [depositAmount, setDepositAmount] = useState(0)
    const [timeLocked, setTimeLocked] = useState(0)
    const [timeToAdd, setTimeToAdd] = useState(0)
    const dispatch = useNotification()
    var timeLeft

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

    const {runContractFunction: getDeposit} = useWeb3Contract({
        abi: abi,
        contractAddress: timeVaultAddress,
        functionName: "getDeposit",
        params: {}
    })

    const {runContractFunction: increaseTime} = useWeb3Contract({
        abi: abi,
        contractAddress: timeVaultAddress,
        functionName: "increaseTime",
        params: {timeToAdd}
    })

    const handleDepositSuccess = async function (tx){
        await tx.wait(1)
        handleNewDepositNotification(tx)
        setTimeLocked(Date.now() + 30000);
    }

    const handleWithdrawSuccess = async function (tx){
        await tx.wait(1)
        handleNewWithdrawNotification(tx)
    }

    const handleIncreaseTimeSuccess = async function (tx){
        await tx.wait(1)
        handleNewIncreaseTimeNotification(tx)
    }

    const handleError = async function (tx){
        handleErrorNotification(tx)
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

    const handleNewIncreaseTimeNotification = function () {
        dispatch({
            type: "success",
            message: "Time Increased!",
            title: "Notification",
            position: "topR",
            icon: "update"
        })
    }

    const handleErrorNotification = function () {
        dispatch({
            type: "error",
            message: "Please Retry.",
            title: "That Didn't Work :(",
            position: "topR",
            icon: "bell"
        })
    }

    const depositHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            var amount = document.getElementById("etherAmount").value
            setDepositAmount(amount * 1000000000000000000)
            await deposit({
                onSuccess: handleDepositSuccess,
                onError: handleError
            })
        }
    }

    const withdrawHandler = async (e) => {
        e.preventDefault()
        await withdraw({
            onSuccess: handleWithdrawSuccess,
            onError: handleError
        })
    }

    const getTimeHandler = async (e) => {
        e.preventDefault()
        timeLeft = ((timeLocked - Date.now()) / 1000)
        if(timeLeft < 0) timeLeft = 0;
        const timeDisplay = document.getElementById("timeleft")
        const changeTimeContent = (t) => {
            timeDisplay.textContent = `Time Left: ${t}`
        }
        changeTimeContent(timeLeft)
    }

    const getDepositHandler = async (e) => {
        e.preventDefault()
        var amount = await getDeposit()
        const depositDisplay = document.getElementById("recentdeposit")
        const changeDepositContent = (d) => {
            depositDisplay.textContent = `Recent Deposit Value: ${d}`
        }
        changeDepositContent(amount)
    }

    const increaseTimeHandler = async (e) => {
        e.preventDefault()
        setTimeToAdd(document.getElementById("timeAmount").value)
        await increaseTime({
            onSuccess: handleIncreaseTimeSuccess,
            onError: handleError
        })
        setTimeLocked(timeLocked + (timeToAdd * 1000))
    }

    return (
      <div className="bg-[#272627] text-white max-w-1500">
        <div className="flex justify-center">
            <div className="bg-[#383738] rounded-lg py-1 mt-5 shadow-2xl">
                <form>
                    <div className="mb-2 px-4">
                        <label className="text-xl">Deposit ETH </label>
                    </div>
                    <input 
                        className="bg-zinc-900 rounded-md px-2 py-2 w-96 ml-3 mr-3 mb-2  hover:ring-1 ring-slate-500"
                        type="number" 
                        placeholder="0.00 ether" 
                        step="0.0001" 
                        id="etherAmount"
                    />
                    <div>
                        <button 
                            className="bg-[#1159F4] rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-96 hover:bg-[#1954d3]"
                            onClick={depositHandler}>
                                Deposit
                        </button>
                    </div>
                </form>
                <button 
                    className="bg-[#FF7324] text-[#222222] rounded-md px-2 py-1 mx-3 my-2 hover:text-white hover:bg-[#F95B00] hover:scale-95 active:scale-90"
                    onClick={withdrawHandler}> 
                        Unlock Ether
                </button>
                <button 
                    className="bg-[#FF7324] text-[#222222] rounded-md px-2 py-1 mx-3 my-2 hover:text-white hover:bg-[#F95B00] hover:scale-95 active:scale-90"
                    onClick={getTimeHandler}>
                        Time Left
                </button>
                <button 
                    className="bg-[#FF7324] text-[#222222] rounded-md px-2 py-1 mx-3 my-2 hover:text-white hover:bg-[#F95B00] hover:scale-95 active:scale-90"
                    onClick={getDepositHandler}>
                    Amount Deposited
                </button>
            </div>
        </div>
        <div className="flex justify-center">
            <div className="bg-[#383738] rounded-lg py-1 mt-4 shadow-2xl">
                <form>
                    <div className="mb-2 px-4">
                        <label className="text-xl">Add Time</label>
                    </div>
                    <input 
                        className="bg-zinc-900 rounded-md px-2 py-2 w-96 ml-3 mr-3 mb-2 hover:ring-1 ring-slate-500"
                        type="number" 
                        placeholder="1 second" 
                        step="1" 
                        id="timeAmount"
                    />
                    <div>
                        <button 
                            className="bg-[#1159F4] rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-96 hover:bg-[#1954d3]"
                            onClick={increaseTimeHandler}>
                                Increase Time
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className="flex justify-center">
            <div className="bg-[#29293d] rounded-md mt-4 mb-4 shadow-2xl">
                <h2 className="text-xl px-2 pt-4 mb-2 w-64" id="timeleft">Time Left: </h2>
                <h2 className="text-xl px-2 pt-2 mb-2 w-64" id="recentdeposit">Recent Deposit Value: </h2>
            </div>
        </div>
        
      </div>
    )
}