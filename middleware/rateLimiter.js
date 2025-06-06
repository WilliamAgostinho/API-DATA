const attempts = new Map();

const MAX_ATTEMPTS = 5;
const BLOCK_TIME_MS = 2 * 60 * 1000;

module.exports = function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const attemptsByIP = new Map();

  if (!attempts.has(ip)) {
    attempts.set(ip, []);
  }

  let logs = attempts
    .get(ip)
    .filter((timestamp) => now - timestamp < BLOCK_TIME_MS);

  if (logs.length >= MAX_ATTEMPTS) {
    return res.status(429).json({
      mensagem: "Muitas tentativas. Tente novamente mais tarde.",
    });
  }

  logs.push(now);
  attempts.set(ip, logs);

  next();
};
