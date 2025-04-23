import { ethers } from 'ethers';
import {
  abi as forwarderAbi,
  address as forwarderAddress,
} from '../abis/MyForwarder.json';
import {
  abi as tokenAbi,
  address as tokenAddress,
} from '../abis/MyMetaToken.json';

const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY || '';
const user1PrivateKey = process.env.USER1_PRIVATE_KEY || '';
const user2PrivateKey = process.env.USER2_PRIVATE_KEY || '';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

// token & forwarder를 배포하고, 가스비를 대납할 계정
// 초기 토큰은 relayer가 가지고 있습니다.
export const relayer = new ethers.Wallet(relayerPrivateKey, provider);
// 사용자1의 계정
export const user1 = new ethers.Wallet(user1PrivateKey, provider);
// 사용자2의 계정
export const user2 = new ethers.Wallet(user2PrivateKey, provider);

// forwarder 컨트랙트
export const forwarder = new ethers.Contract(
  forwarderAddress,
  forwarderAbi,
  relayer
);
// token 컨트랙트
export const token = new ethers.Contract(tokenAddress, tokenAbi, relayer);

// 코인 잔액 확인용
export const getBalance = async (address: string) => {
  try {
    return await provider.getBalance(address);
  } catch (error) {
    console.error('Error in getBalance:', error);
  }
};

// Data 필드에 담길 컨트랙트 실행 요청 함수 => 바이트 값
export const encodeFunctionData = (functionName: string, args: any[]) => {
  return token.interface.encodeFunctionData(functionName, [...args]);
};

// 초기 Relayer가 가지고 있는 토큰 전송용(user1에 token이 없을 때 사용하세요)
export const transfer = async (recipient: string, amount: string) => {
  try {
    const transfer = await token.transfer(recipient, ethers.parseEther(amount));
    await transfer.wait();
  } catch (error) {
    console.error('Error in allowance:', error);
  }
};

// 토큰 잔액 확인용
export const balanceOf = async (address: string) => {
  try {
    return await token.balanceOf(address);
  } catch (error) {
    console.error('Error in getBalance:', error);
  }
};

// 위의 코드는 수정하지 않습니다.

export const excute = async (encodeFunctionData: string) => {
  try {
    /*
        Todo: excute 함수를 완성시킵니다. 

        다음의 요소를 고려해주세요.
        - excute는 from(user1)의 요청을 excute합니다.(gasless 수혜자 - user1)
        - meta-transaction이 적용된 Recipient(최종 컨트랙트)는 token 입니다.
        - 인자로 들어오는 encodeFunctionData는 함수 encodeFunctionData를 실행한 값을 넣어주세요.
        - 이 함수의 return 값은 없어도 괜찮습니다. 다만, excute를 실행시켜주세요.
        - ethers의 wait() 함수를 사용하여 컨트랙트 호출을 완료해주시기 바랍니다.(공식문서 검색)
    */
  } catch (error) {
    console.error('Error in excute:', error);
  }
};

export const excuteTransfer = async (to: string, value: bigint) => {
  try {
    // Todo: 구현한 excute를 사용하여 token 컨트랙트의 transfer(to, value)를 gasless로 실행합니다. encodeFunctionData를 이용해주시기 바랍니다.
  } catch (error) {
    console.error('Error in excuteTransfer:', error);
  }
};

export const excuteApprove = async (spender: string, value: bigint) => {
  try {
    // Todo: 구현한 excute를 사용하여 token 컨트랙트의 approve(spender, value)를 gasless로 실행합니다. encodeFunctionData를 이용해주시기 바랍니다.
  } catch (error) {
    console.error('Error in tranferFrom:', error);
  }
};
