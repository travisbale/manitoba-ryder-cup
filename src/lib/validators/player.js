export default {
  validateTier(tier) {
    const tiers = ['white', 'blue', 'black', 'silver', 'gold'];

    return tiers.indexOf(tier) !== -1;
  },
};
