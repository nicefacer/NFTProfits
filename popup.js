const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", login);

async function login() {
  if (typeof web3 !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      // Account access has been granted
      console.log("MetaMask login successful!");
      // Fetch the NFT market data after login
      fetchData();
    } catch (error) {
      // Account access denied
      console.log(error);
    }
  } else {
    // MetaMask is not installed
    console.log("Please install MetaMask to use this feature.");
  }
}

document.getElementById("fetch-data").addEventListener("click", async () => {
  const response = await fetch("https://api.opensea.io/api/v1/stats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  fetchData();

  function fetchData() {
    const url = "https://api.nftmarketagg.com/markets";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const mostNewNFTs = getMostNewNFTs(data);
        const mostOldNFTs = getMostOldNFTs(data);
        const newestMinedNFTs = getNewestMinedNFTs(data);
        const lowestPricedNFTs = getLowestPricedNFTs(data);
        const sheddingPriceNFTs = getSheddingPriceNFTs(data);
        const raisingPriceVolumeNFTs = getRaisingPriceVolumeNFTs(data);

        // Do something with the filtered NFT data, such as displaying it in the popup
        console.log(mostNewNFTs);
        console.log(mostOldNFTs);
        console.log(newestMinedNFTs);
        console.log(lowestPricedNFTs);
        console.log(sheddingPriceNFTs);
        console.log(raisingPriceVolumeNFTs);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getMostNewNFTs(data) {
    // Filter the data to get the most new NFTs
    const mostNewNFTs = data.filter((nft) => nft.releaseDate === "most-new");
    return mostNewNFTs;
  }

  function getMostOldNFTs(data) {
    // Filter the data to get the most old NFTs
    const mostOldNFTs = data.filter((nft) => nft.releaseDate === "most-old");
    return mostOldNFTs;
  }

  function getNewestMinedNFTs(data) {
    // Filter the data to get the newest mined NFTs
    const newestMinedNFTs = data.filter(
      (nft) => nft.minedDate === "newest-mined"
    );
    return newestMinedNFTs;
  }

  function getLowestPricedNFTs(data) {
    // Filter the data to get the lowest priced NFTs
    const lowestPricedNFTs = data.filter(
      (nft) => nft.price === "lowest-priced"
    );
    return lowestPricedNFTs;
  }

  function getSheddingPriceNFTs(data) {
    // Filter the data to get the NFTs shedding prices
    const sheddingPriceNFTs = data.filter(
      (nft) => nft.priceChange === "shedding"
    );
    return sheddingPriceNFTs;
  }

  function getRaisingPriceVolumeNFTs(data) {
    // Filter the data to get the NFTs raising in price and volume
    const raisingPriceVolumeNFTs = data.filter(
      (nft) => nft.priceChange === "raising" && nft.volumeChange === "raising"
    );
    return raisingPriceVolumeNFTs;
  }

  const marketDataString = JSON.stringify(marketData, null, 2);
  document.getElementById(
    "market-data"
  ).innerHTML = `<pre>${marketDataString}</pre>`;
});
