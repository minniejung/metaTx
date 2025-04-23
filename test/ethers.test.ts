import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  relayer,
  user1,
  user2,
  forwarder,
  token,
  getBalance,
  encodeFunctionData,
  transfer,
  balanceOf,
  excute,
  excuteTransfer,
  excuteApproce,
} from '../utils/ethers';

describe('Metatx 검사 - excute를 통한 User1의 Gasless 적용', function () {
  beforeEach(async () => {
    const weiBalance = await balanceOf(user1.address);
    const convertedBalance = ethers.formatEther(weiBalance);
    if (Number(convertedBalance) < 1) {
      await transfer(user1.address, '1');
    }
  });

  it('excuteTransfer는 user1이 user2에게 Token을 전송하면서 가스비 소모가 없어야 합니다.', async function () {
    const prevUser2Balance = await balanceOf(user2.address);
    const prevUser1CoinBalance = await getBalance(user1.address);

    await excuteTransfer(user2.address, ethers.parseEther('1'));

    const afterUser1CoinBalance = await getBalance(user1.address);
    const currentUser2Balance = await balanceOf(user2.address);

    expect(currentUser2Balance).to.be.greaterThan(prevUser2Balance);
    expect(prevUser1CoinBalance).to.equal(afterUser1CoinBalance);
  });

  it('excuteApproce는 user1이 relayer에게 Token을 전송을 허가하면서 가스비 소모가 없어야 합니다.', async function () {
    this.retries(3);

    const weiBalance = await balanceOf(user1.address);
    const prevUser1CoinBalance = await getBalance(user1.address);

    await excuteApproce(relayer.address, weiBalance);

    const allowance = await token.allowance(user1.address, relayer.address);
    const afterUser1CoinBalance = await getBalance(user1.address);

    expect(weiBalance).to.equal(allowance);
    expect(prevUser1CoinBalance).to.equal(afterUser1CoinBalance);
  });
});
