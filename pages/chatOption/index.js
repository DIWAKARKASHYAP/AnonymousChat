import React, { useEffect } from "react";
import Nav from "../../components/nav";
import { ethers } from "ethers";

const ChatOption = () => {
    const [mAddress, setMAddress] = React.useState("");

    const metaMask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setMAddress(address);
    };


    useEffect(() => {
        metaMask();
    }, []);

    return (
        <>
            <Nav />

            <div className=" mt-20 bg-black">
                {/* <div className="heading text-6xl capitalize text-center ">start cheating</div> */}
                <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white">
                    {" "}
                    <span className="text-blue-500">
                        Start
                    </span>{" "}
                    chatting
                </h1>
                <div className=" bg-black flex items-center justify-center mt-16">
                    <a href={`./transaction?q=${mAddress}`}>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none  focus:ring-purple-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Transaction Data
                            </span>
                        </button>{" "}
                    </a>
                    <a href="./chatBox">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-green-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
                                Start Chat
                            </span>
                        </button>
                    </a>
                    <a href="./createchat">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Create Chat
                            </span>
                        </button>{" "}
                    </a>
                </div>
            </div>
        </>
    );
};

export default ChatOption;
