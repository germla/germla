import { env } from "./env";

/**
 * Validates a Cloudflare captcha token
 * @param {string} token - The captcha token 
 * @returns {boolean} - Whether the token is valid or not
 */
export const validateCloudflareToken = async (token: string): Promise<boolean> => {
    const res = await fetch(env.CLOUDFLARE_VERIFY_ENDPOINT, {
        method: 'POST',
        body: `secret=${encodeURIComponent(env.CLOUDFLARE_VERIFY_TOKEN)}&response=${encodeURIComponent(token)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    
    const json = await res.json()
    return json.success
}