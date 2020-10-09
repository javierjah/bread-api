function createPurchaseMissingParamsMessage(body) {
  const email = !body.email ? 'email' : '';
  const amount = !body.amount ? 'amount' : '';
  const deliveryDate = !body.deliveryDate ? 'deliveryDate' : '';
  const clientName = !body.clientName ? 'clientName' : '';
  const address = !body.address ? 'address' : '';
  const phone = !body.phone ? 'phone' : '';
  const paymentType = !body.paymentType ? 'paymentType' : '';
  const products = !body.products || !body.products.length === 0 ? 'products' : '';
  const deliveryCost = !body.deliveryCost === undefined ? 'deliveryCost' : '';

  const missingParamsFilter = [
    email,
    amount,
    deliveryDate,
    clientName,
    address,
    phone,
    paymentType,
    products,
    deliveryCost,
  ].filter(i => i !== '');

  const missingParams = missingParamsFilter.join(', ');

  return `Missing following params: ${missingParams}`;
}

export default createPurchaseMissingParamsMessage;
