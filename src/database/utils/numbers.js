function formatNumber(number) {
  const numberFixed = Number(number).toLocaleString().replace(',', '.');
  return numberFixed;
}

export default formatNumber;
