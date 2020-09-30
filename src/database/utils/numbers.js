function formatNumber(value) {
  const numberFixed = Number(value).toLocaleString().replace(',', '.');
  return numberFixed;
}

export default formatNumber;
