import assetsSmallResidential from "./tileAssets/smallResidential";
import assetsTallResidential from "./tileAssets/tallResidential";
import assetsFactory from "./tileAssets/factory";
import assetsSupermarket from "./tileAssets/supermarket";
import assetsStadium from "./tileAssets/stadium";
import assetsGasStation from "./tileAssets/gasStation";
import assetsMall from "./tileAssets/mall";

export default [
  {
    name: "smallResidential",
    displayName: "Small houses",
    assets: assetsSmallResidential
  },
  {
    name: "tallResidential",
    displayName: "Tower blocks",
    assets: assetsTallResidential
  },
  {
    name: "factory",
    displayName: "Factory",
    assets: assetsFactory
  },
  {
    name: "supermarket",
    displayName: "Supermarket",
    assets: assetsSupermarket
  },
  {
    name: "stadium",
    displayName: "Stadium",
    assets: assetsStadium
  },
  {
    name: "gasStation",
    displayName: "Petrol station",
    assets: assetsGasStation
  },
  {
    name: "mall",
    displayName: "Shopping mall",
    assets: assetsMall
  }
];
