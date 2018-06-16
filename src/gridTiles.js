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
    assets: assetsSmallResidential,
    resourceAttributes: {
      populationSpace: 2
    },
    conquerCounter: 2
  },
  {
    name: "tallResidential",
    displayName: "Tower blocks",
    assets: assetsTallResidential,
    resourceAttributes: {
      populationSpace: 5
    },
    conquerCounter: 3
  },
  {
    name: "factory",
    displayName: "Factory",
    assets: assetsFactory,
    resourceAttributes: {},
    conquerCounter: 3
  },
  {
    name: "supermarket",
    displayName: "Supermarket",
    assets: assetsSupermarket,
    resourceAttributes: {
      foodGrowth: 5
    },
    conquerCounter: 4
  },
  {
    name: "stadium",
    displayName: "Stadium",
    assets: assetsStadium,
    resourceAttributes: {
      populationSpace: 8
    },
    conquerCounter: 4
  },
  {
    name: "gasStation",
    displayName: "Petrol station",
    assets: assetsGasStation,
    resourceAttributes: {},
    conquerCounter: 2
  },
  {
    name: "mall",
    displayName: "Shopping mall",
    assets: assetsMall,
    resourceAttributes: {
      foodGrowth: 2
    },
    conquerCounter: 3
  }
];
