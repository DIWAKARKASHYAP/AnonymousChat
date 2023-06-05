import React, { useState } from "react";
import Nav from "../../components/nav";



// console.log(data.data.items)

export async function getServerSideProps(context) {
  
    // console.log(process.env.DB_HOST)

   const apiKey = process.env.API_KEY

// let options = {
//       "method": "GET",
//       "hostname": "rest.cryptoapis.io",
//       "path": "/v2/blockchain-data/ethereum/goerli/addresses/0xF248cA9408E60205fF2b167a27C112A40Dc9dd55/transactions",
//       "qs": {"context":"yourExampleString","limit":50,"offset":0},
//       "headers": {
//         "Content-Type": "application/json",
//         "X-API-Key": "33b2d073b8a2828c996e1aabdc694680bec64a2b"
//       }
//     };
const q = context.query.q.toString();
// console.log(context.query.q)
  const pureData = await fetch(`https://rest.cryptoapis.io/blockchain-data/ethereum/goerli/addresses/${q}/transactions?context=yourExampleString&limit=20&offset=0`, {
    "headers": {
      "Content-Type": "application/json",
      "X-API-Key": apiKey ,
    }
  })

  const treData = await pureData.json();

  return {
    props : {wholedata : treData ,}
  }
  console.log(pureData)

  }

const TransactionData = ({ wholedata }) => {
    // console.log(wholedata);
    const array = wholedata.data.items;

    return (
        <>
            <Nav />
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    From
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Recipient
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount (ETH)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Hash
                                    {/* </th>
                <th scope="col" className="px-6 py-3">
                    Action */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {array.map((res, index) => {
                                
                                if (index % 2 == 0) {
                                    return (
                                        <tr key={index} className=" border-b bg-gray-900 border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                                            >
                                                {res.senders[0].address}
                                            </th>
                                            <td className="px-6 py-4">
                                                {res.recipients[0].address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.recipients[0].amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.transactionId}
                                            </td>
                                        </tr>
                                    );
                                }else{
                                  return(
                                    <tr key={index} className="border-b bg-gray-800 border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                                            >
                                                {res.senders[0].address}
                                            </th>
                                            <td className="px-6 py-4">
                                                {res.recipients[0].address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.recipients[0].amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.transactionId}
                                            </td>
                                        </tr>
                                  )
                                }
                            })}
                     
                        </tbody>
                    </table>
                </div>

                {/* <button className='bg-white' onClick={trans}>data</button> */}
            </div>
        </>
    );
};

export default TransactionData;
