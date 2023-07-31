import { TransactionResponse } from "ethers";

export const waitTx = async (t: Promise<TransactionResponse>, i: string | undefined = undefined) => {
    const tx = await t;
    if (i) process.stdout.write(`${i} | tx: ${tx.hash} ...`);
    await tx.wait();
    if (i) process.stdout.write(` | Confirmed\n`);
}

export const now = () => Math.floor(Date.now() / 1000);