// border-radius: 50% 50% 50% 50% / 50% 25% 100% 100%;
async function initLoading(element) {
  while (true) {
    let params = getBorderRadiusValues();
    element.style.cssText = `border-radius: ${params};`;
    await sleep(15000);
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getBorderRadiusValues() {
  function getFourParams() {
    let values = Array(4).fill(Math.floor(Math.random() * 100) + 40);
    let out = "";
    values.forEach((val) => {
      out += ` ${val}%`;
    });
    return out;
  }
  let firstParams = getFourParams();
  let secondParams = getFourParams();
  return `${firstParams} / ${secondParams}`;
}
