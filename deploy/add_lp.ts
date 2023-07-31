import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers, parseEther } from "ethers";

const now = () => Math.floor(Date.now() / 1000);

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = await hre.ethers.getNamedSigner('deployer')
  const { deploy, execute, get } = hre.deployments;

  const usdc = await deploy("USDC", {
    contract: "MockERC20",
    log: true,
    from: deployer.address,
    args: ["USDC", "USD Coin", parseEther("100000")]
  })

  const weth = await get("WETH")

  const router = await get("UniswapV2Router02")

  await execute("WETH", { from: deployer.address, log: true, value: parseEther("100").toString() }, "deposit")
  await execute("WETH", { from: deployer.address, log: true }, "approve", router.address, ethers.MaxUint256)
  await execute("USDC", { from: deployer.address, log: true }, "approve", router.address, ethers.MaxUint256)

  await execute("UniswapV2Router02", { from: deployer.address, log: true }, "addLiquidity",
    weth.address,
    usdc.address,
    parseEther("100").toString(),
    parseEther("10000").toString(),
    "0",
    "0",
    deployer.address,
    now() + 30
  )

  return true;
}

func.tags = ['add_lp'];
func.id = "add_lp";
func.dependencies = ["uniswap"]
export default func;
