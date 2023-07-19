import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { Abi } from "../../components/contract";
import Nav from "../../components/nav";

import ErrorMessage from "../../components/ErrorMessage";
import TxList from "../../components/TxList";

// Your chat address is 0x2d85c588C5F1193C8e6c6b2349c174Cd1B57DA1b

const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        ethers.utils.getAddress(addr);
        const tx = await signer.sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(ether),
        });
        // console.log(signer);

        // console.log({ ether, addr });
        // console.log("tx", tx);
        setTxs([tx]);
    } catch (err) {
        setError(err.message);
    }
};

const ChatBox = () => {
    const [hidden, setHidden] = useState("hidden");

    const [topFormHide, setTopFormHide] = useState("");

    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        setError();
        await startPayment({
            setError,
            setTxs,
            ether: data.get("ether"),
            addr: data.get("addr"),
        });
    };

    const [Instance, setInatance] = useState();
    const [MessageCount, setMessageCount] = useState();
    const [Address, setAddress] = useState();

    // console.log(Address);

    const getData = async () => {
        document.getElementById("message").innerHTML = "";

        const chatAddress =
            document.getElementById("chatAddress").value || Address;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        let reg = RegExp(/[0-9A-Fa-x]{42}/g);
        if (reg.test(chatAddress)) {
            setAddress(chatAddress);

            try {
                const contractInstance = new ethers.Contract(
                    chatAddress,
                    Abi,
                    signer
                );

                setInatance(await contractInstance);

                const address = await contractInstance.data();

                document.getElementById("afterContent").style.display = "block";

                document.getElementById("addressTwo").innerHTML = chatAddress;

                const numberOfMessages =
                    await contractInstance.arrayMessageLength();

                let numberOfMessagesInt =
                    (await ethers.utils.formatEther(numberOfMessages)) * 10e17;

                // console.log(numberOfMessagesInt);
                setMessageCount(numberOfMessagesInt);

                setTopFormHide("hidden");
                document.getElementById("errorMsg").innerHTML = " ";

                for (let i = 0; i < numberOfMessagesInt; i++) {
                    const message = await contractInstance.allMessages(i);

                    if (address[0] === (await signer.getAddress())) {
                        document.getElementById("addressOne").innerHTML = address[1];

                        document.getElementById("recipientAddress").value = address[1];

                        if (message.slice(-1) === "1") {
                            document.getElementById(
                                "message"
                            ).innerHTML += `<div id="messageTwo"  > ${message.slice(0,-1)} </div>`;
                        } else {
                            document.getElementById(
                                "message"
                            ).innerHTML += `<div id="messageOne"  > ${message.slice(0,-1)} </div>`;
                        }
                    } else if (address[1] === (await signer.getAddress())) {
                        document.getElementById("addressOne").innerHTML = address[0];
                        document.getElementById("recipientAddress").value = address[0];

                        if (message.slice(-1) === "2") {
                            document.getElementById("message").innerHTML += `<div id="messageTwo"  > ${message.slice(0,-1)} </div>`;
                        } else {
                            document.getElementById("message").innerHTML += `<div id="messageOne"  > ${message.slice(0,-1)} </div>`;
                        }
                    }
                }
            } catch (error) {
                document.getElementById("errorMsg").innerHTML =
                    "Your chat address is wrong please check your chat address";
                // console.log("catchError");
                document.getElementById("afterContent").style.display = "none";

                // console.log(error);
            }
        } else {
            document.getElementById("errorMsg").innerHTML =
                "please write the correct Chat Address  ";
        }
    };

    const send = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const message = document.getElementById("messageInput").value;

        let recipt = await Instance.messageInput(message);

        document.getElementById("messageInput").value = "";
        let runGetData = await recipt.wait();

        // console.log(runGetData);

        if (runGetData) {
            // console.log("hellow");
            checkUpdate();
        }
    };

    const checkUpdate = async () => {
        const numberLength = await Instance.arrayMessageLength();
        const number = (await ethers.utils.formatEther(numberLength)) * 10e17;
        // console.log("interval");
        if (MessageCount !== number) {
            await getData();
        }
    };

    const payNow = () => {
        if (hidden == "hidden") {
            setHidden("");
        } else {
            setHidden("hidden");
        }
    };

    return (
        <>
            <Nav />
            <div className=" bg-black      w-full pt-16 m-0 pb-5  ">
                <div className=" m-auto max-w-4xl sm:border-2 pt-6 p-4 sm:p-8 bg-gray-800 border-slate-600 bg-black/50 rounded-lg backdrop-blur text-white ">
                    <h2 className="none text-4xl font-bold text-white mb-4">
                        Join Chat
                    </h2>
                    {/* <div>0x2d85c588C5F1193C8e6c6b2349c174Cd1B57DA1b</div> */}
                    <div
                        id="chatAddressInput"
                        className={`  flex  ${topFormHide}`}
                    >
                        <div className="flex w-full items-center">
                            <div className="relative w-full">
                                <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-slate-400"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="chatAddress"
                                    className=" border   text-sm rounded-lg   block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Write Your Chat Address"
                                    required
                                />
                            </div>
                            <button
                                onClick={getData}
                                className="p-2.5 ml-2 text-sm font-medium text-white  rounded-lg border border-blue-700  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                START
                            </button>
                        </div>
                    </div>
                    <div id="errorMsg"></div>

                    <div id="afterContent" className=" hidden text-black">
                        <div className=" text-slate-500">
                            Please write message carefully because after you
                            send the message no one can delete it{" "}
                        </div>
                        <div
                            id="addresses"
                            className="  text-white md:flex relative mb-2"
                        >
                            <div className="bg-blue-200 text-blue-700   p-2 mt-4 rounded-md inline-block  border-2 border-blue-500">
                                <span className=" text-xs font-light font-serif ">
                                    Second Person Address
                                </span>
                                <div id="addressOne" className=" text-sm"></div>
                            </div>
                            <div className="bg-blue-700 text-blue-200 border-blue-500 p-2 mt-4 rounded-md  absolute right-0 border-2 ">
                                <span className=" text-xs font-light font-serif ">
                                    Chat Address
                                </span>
                                <div id="addressTwo" className=" text-sm"></div>
                            </div>
                        </div>
                        <div
                            id="message"
                            className=" mt-20 md:mt-2 flex flex-col "
                        ></div>
                        <div className="  mt-2">
                            <textarea
                                id="messageInput"
                                rows="4"
                                className="block p-2.5 w-full text-sm   rounded-lg border  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your thoughts here..."
                            ></textarea>

                            <div className=" flex justify-between">
                                <button
                                    type="button"
                                    onClick={payNow}
                                    className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 mr-2 mb-2"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2 -ml-1 text-[#626890]"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fab"
                                        data-icon="ethereum"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                                        ></path>
                                    </svg>
                                    Pay with Ethereum
                                </button>
                                <button
                                    variant="contained"
                                    onClick={send}
                                    type="button"
                                    className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 m-1 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                >
                                    Send
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 ml-2 -mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            <form
                                className={`m-4 ${hidden}`}
                                id="ethForm"
                                onSubmit={handleSubmit}
                            >
                                <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-slate-700">
                                    <main className="mt-4 p-4">
                                        <h1 className="text-xl font-semibold text-gray-400 text-center">
                                            Send ETH payment
                                        </h1>
                                        <div className="">
                                            <div className="my-3">
                                                <label className=" text-slate-300 ">
                                                    To :
                                                </label>
                                                <input
                                                    type="text"
                                                    name="addr"
                                                    className="input h-7 border-2 px-2 rounded-md border-gray-500 bg-slate-600 text-white block w-full focus:ring focus:outline-none"
                                                    placeholder="Recipient Address"
                                                    id="recipientAddress"
                                                />
                                            </div>
                                            <div className="my-3">
                                                <label className="text-slate-300 ">
                                                    Amount:
                                                </label>

                                                <input
                                                    name="ether"
                                                    type="text"
                                                    className="input h-7 border-2 px-2 rounded-md border-gray-500 bg-slate-600 text-white block w-full focus:ring focus:outline-none"
                                                    placeholder="Amount in ETH"
                                                />
                                            </div>
                                        </div>
                                    </main>
                                    <footer className="p-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary bg-black border-2 rounded-2xl border-slate-400 text-slate-400 hover:text-blue-400 hover:border-blue-300 submit-button focus:ring focus:outline-none w-full"
                                        >
                                            Pay Now
                                        </button>

                                        <ErrorMessage
                                            className="text-red-400"
                                            message={error}
                                        />
                                        <TxList
                                            className="text-slate-400"
                                            txs={txs}
                                        />
                                    </footer>
                                </div>
                            </form>
                        </div>
                        <div className="text-slate-400 mt-4">
                            {" "}
                            if you not see any update then please run in 30
                            second after send message then please run Refresh
                        </div>

                        <button
                            onClick={checkUpdate}
                            type="button"
                            className="text-white mt-2   focus:ring-4 focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        >
                            REFRESH
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;
