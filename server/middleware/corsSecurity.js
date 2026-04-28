function validateAllowedOrigin(origin, allowedOrigins = []) {
  if (!origin) return true; // Server-to-server or curl
  if (allowedOrigins.includes('*')) return true;

  const normalizedOrigin = origin.toLowerCase().trim();
  return allowedOrigins.some(allowed => {
    const norm = allowed.toLowerCase().trim();
    if (norm === normalizedOrigin) return true;
    if (norm.startsWith('*.') && normalizedOrigin.endsWith(norm.slice(1))) return true;
    return false;
  });
}

module.exports = { validateAllowedOrigin };
