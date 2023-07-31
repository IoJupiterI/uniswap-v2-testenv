import { parseEther } from "ethers"
import hre from "hardhat"
import { waitTx } from "./common"

// Usage: RECIPIENT="0xabcd" yarn hardhat run ./scripts/send_ether.ts --network local
async function main() {
    const deployer = await hre.ethers.getNamedSigner("deployer")
    const r = process.env.RECIPIENT as string
    await waitTx(deployer.sendTransaction({
        to: r,
        value: parseEther("100")
    }), `Send 100 Ether to ${r}`)
}

main()