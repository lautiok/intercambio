const loginAttempts: Record<string, { attempts: number; firstAttempt: number }> = {};
const BLOCK_TIME = 5 * 60 * 1000; 
const MAX_ATTEMPTS = 5;

export const checkLoginAttempts = (ip: string): { blocked: boolean; minutesLeft?: number } => {
  const now = Date.now();

  if (loginAttempts[ip]) {
    const { attempts, firstAttempt } = loginAttempts[ip];

    if (attempts >= MAX_ATTEMPTS && now - firstAttempt < BLOCK_TIME) {
      const minutesLeft = Math.ceil((BLOCK_TIME - (now - firstAttempt)) / 1000 / 60);
      return { blocked: true, minutesLeft };
    }

    if (now - firstAttempt >= BLOCK_TIME) {
      resetLoginAttempts(ip);
    }
  } else {
    resetLoginAttempts(ip);
  }

  return { blocked: false };
};

export const increaseLoginAttempts = (ip: string) => {
  if (loginAttempts[ip]) {
    loginAttempts[ip].attempts++;
  } else {
    resetLoginAttempts(ip);
  }
};

export const resetLoginAttempts = (ip: string) => {
  loginAttempts[ip] = { attempts: 0, firstAttempt: Date.now() };
};

export const clearLoginAttempts = (ip: string) => {
  delete loginAttempts[ip];
};
