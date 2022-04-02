module.exports = function (lhs, rhs, epsilon) {
    if (epsilon === undefined) {
        epsilon = Math.pow(10, -14);
    }

    return Math.abs(lhs/rhs) - 1.0 < epsilon;
};
