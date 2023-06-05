import React, { useState } from "react";

import { ethers } from "ethers";

import { Abi, byteCode } from "../../components/contract";

import Nav from "../../components/nav";

const CreateChat = () => {
    const [address, setAddress] = useState("");
    // console.log(address);

    let core = address;
    const deployContract = async () => {
        // console.log(core);

        const otherPersonAddress = core;
        const reply = await document.getElementById("errorMsg");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // console.log(await signer.getAddress());
        let reg = RegExp(/[0-9A-Fa-x]{42}/g);
        if (reg.test(otherPersonAddress) && address != otherPersonAddress) {
            reply.innerHTML = "";

            const newcontract = new ethers.ContractFactory(
                Abi,
                byteCode,
                signer
            );
            const deploy = await newcontract.deploy(otherPersonAddress);

            const transactionRecipt = await deploy.deployTransaction.wait();

            // console.log(transactionRecipt.contractAddress);

            reply.innerHTML = `Your chat address is ${transactionRecipt.contractAddress} `;


            document.getElementById("warning").style.display = "block";
        } else {
            reply.innerHTML = "please write the correct address";
        }
    };

    return (
        <>
            <Nav />
            <div className=" bg-black     h-screen w-full pt-16">
                <div className="  m-auto max-w-4xl sm:border-2 pt-6 p-4 sm:p-8 bg-slate-800 border-slate-600 bg-black/50 rounded-xl backdrop-blur text-white ">
                    {/* <div className=" text-5xl capitalize text-slate-100 font-semibold font-mono">create chat box  </div> */}
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight  md:text-4xl text-white">
                        Create chat box{" "}
                    </h1>
                    <div className=" text-slate-400 pt-4 mb-5">
                        To create a new ChatBox you have to simpally type the
                        address of second person which you want to chat and
                        confirm the transaction in metamask{" "}
                    </div>
                    <div className=" flex flex-wrap items-center justify-center mb-5 ">
              

                        <div className=" w-full flex items-center">
                            <label htmlFor="voice-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                   

                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    id="filled"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    type="text"
                                    
                                    className=" border text-sm rounded-lg   block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="write chat address of second person..."
                                    required
                                />
                            </div>
                            <button
                                onClick={deployContract}
                                className="flex justify-center items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg border border-blue-700  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            >
                                Create{" "}
                                <svg
                                    className="h-6 w-6 pt-1"
                                    aria-hidden="true"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 6v12m6-6H6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className=" text-white text-xl" id="errorMsg"></div>
                    <div
                        className=" text-red-600 bg-black p-4 rounded-md text-2xl hidden "
                        id="warning"
                    >
                        {" "}
                        warning , we are not responseable if you loose this
                        contract address{" "}
                    </div>
                    <div className=" text-slate-400 font-light">
                        *please wait atleast{" "}
                        <span className="text-white"> 30 sec </span> until
                        transaction is mine
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateChat;
