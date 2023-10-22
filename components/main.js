import React from "react";

const Main = () => {
    return (
        <div className="max-w-4xl  mt-28 m-auto">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white text-center">
                Chat and Pay Now
            </h1>
            <p className="mb-6 text-lg font-normal  lg:text-xl sm:px-16  text-gray-400 text-center">
                Experience the power of decentralized ETH payment and chat with
                our web application. Enjoy undeleatable functionality and
                monitor your transactions with in real-time with{" "}
                <span className=" text-slate-300 font-semibold">
                    {" "}
                    CryptoApi
                </span>{" "}
                for ultimate security and convenience.
            </p>

            <p className="mb-6 text-lg font-normal  lg:text-xl sm:px-16  text-gray-400  ">
                <div className="mb-3">Please read the following information carefully:</div>
                <div className="mb-3">
                    Our website facilitates anonymous chats between individuals.
                    You can easily access your chat by using a unique chat
                    address. However, please be aware that if you lose your chat
                    address, neither you nor the other person will be able to
                    retrieve the chat.
                </div>
                <div>
                    To make full use of our system, you only need two things:
                </div>

                <ul className="mb-3">
                    <li>1- A browser with Metamask installed.</li>
                    <li>
                        2- A sufficient amount of Gorile ethers in your Metamask
                        account.
                    </li>
                </ul>

                <div >
                    On this website, you have the ability to perform three
                    actions:
                </div>
                
                    <ol className="mb-3">
                        <li>1- Create a personal chatbox for your own use.</li>
                        <li>
                            2- If you have a chat address, you can perform any
                            task if it belongs to you. However, if the chat
                            address belongs to someone else, you will only have
                            read access to the chat.
                        </li>
                        <li>
                            3- You can only send messages within your own chat.
                        </li>
                    </ol>
                
            </p>

            <a href="./chatOption">
                <button
                    type="button"
                    className="m-auto text-white flex bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg  px-5  text-center mb-2  py-3 text-base  "
                >
                    Start Now{" "}
                    <svg
                        className="w-5 h-5 ml-2 mt-1"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>{" "}
                </button>
            </a>
        </div>
    );
};

export default Main;
