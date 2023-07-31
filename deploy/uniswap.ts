import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const deployer = await hre.ethers.getNamedSigner('deployer')
  const { deploy, execute } = hre.deployments;

  const factory = await deploy("UniswapV2Factory", {
    contract: "UniswapV2Factory",
    from: deployer.address,
    log: true,
    args: [deployer.address]
  });

  const router = await deploy("UniswapV2Router02", {
    contract: "UniswapV2Router02",
    from: deployer.address,
    log: true,
    args: [factory.address, await (await hre.ethers.getContract("WETH")).getAddress()]
  });

  return true;
}

func.tags = ['uniswap'];
func.id = "uniswap";
func.dependencies = ['weth']
export default func;
