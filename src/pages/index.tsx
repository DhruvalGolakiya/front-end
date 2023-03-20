import { BrowserProvider, Contract } from "ethers";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { ethers } from "ethers";

export default function Home() {
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [account, setAccount] = useState<any>(null);
  const [payers, setPayers] = useState<string[]>([]);
  const [highestPayer, setHighestPayer] = useState("");
  const [value, setValue] = useState<any>();
  console.log(highestPayer);
  const [contract, setContract] = useState<any>();
  const loadBlockchain = async () => {
    const provider = new BrowserProvider(window.ethereum);
    setProvider(provider);
    const WalletProvider = new BrowserProvider(window.ethereum);
    const signer = await WalletProvider.getSigner();
    setSigner(signer);
    const myContract = new Contract(
      config[31337].contract.address,
      [
        {
          inputs: [],
          name: "pay",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllPayers",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAllPayersByPayment",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getHighestPayer",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "payer",
              type: "address",
            },
          ],
          name: "getPayment",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "highestPayer",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "highestPayment",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "payers",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "payments",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      signer
    );
    setContract(myContract);
    console.log(myContract);
  };
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    setAccount(account);
  };

  const payToContract = async () => {
    const tx = await contract.pay({ value: ethers.parseEther(value) });
    console.log(tx);
  };

  const getPayers = async () => {
    const payers = await contract.getAllPayers();
    setPayers(payers);
  };

  const getHighestPayers = async () => {
    const payer = await contract.getHighestPayer();
    setHighestPayer(payer);
  };
  useEffect(() => {
    loadBlockchain();
  }, []);
  return (
    <>
      <div className="flex  justify-end items-center container">
        <div>
          {account == null ? (
            <button
              className="flex text-center items-center rounded-[16px] justify-center p-4 bg-[#4949ff] text-[white]  mt-[50px]"
              onClick={() => {
                connectHandler();
              }}
            >
              connect wallet
            </button>
          ) : (
            <div className="flex text-center items-center rounded-[16px] justify-center p-4 bg-[#4949ff] text-[white]  mt-[50px]">
              {account}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => {
            payToContract();
          }}
        >
          Pay
        </button>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div
          className="text-[rem] cursor-pointer"
          onClick={() => {
            getHighestPayers();
          }}
        >
          HighestPayer : {highestPayer}
        </div>
        <button
          onClick={() => {
            getPayers();
          }}
        >
          PayerList
        </button>
        <div>
          {payers.map((data: any) => {
            return <div>{data}</div>;
          })}
        </div>
      </div>
    </>
  );
}
