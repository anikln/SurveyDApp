var Survey = artifacts.require("./Survey.sol");

module.exports = function(deployer) {
  deployer.deploy(Survey, ["0x68C5875c53a31a1D8a4446Be57ed857B8aF65030","0x9f5C13b52f8aeb268e6B32F80E4A10463116c625"]);
};

