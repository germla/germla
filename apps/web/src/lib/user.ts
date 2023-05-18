import { hashPassword } from "@/lib/hash";

export const forgotPassword = async (email: string, captchaToken: string) => {
  try {
    const res = await fetch("/api/v1/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, captchaToken }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw Error(json.message);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};

export const signUp = async (name: string, email: string, password: string, token: string) => {
  try {
    const res = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, token }),
    });
    if (res.status !== 201) {
      const json = await res.json();
      throw Error(json.message);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};

export const resetPassword = async (password: string, token: string, captchaToken: string) => {
  const hashedPassword = await hashPassword(password);
  try {
    const res = await fetch("/api/v1/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: hashedPassword, token, captchaToken }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw Error(json.error);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};

export const reSendVerificationEmail = async (email: string, captchaToken: string) => {
  try {
    const res = await fetch("/api/v1/users/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, captchaToken }),
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw Error(json.error);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};
