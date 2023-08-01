import { BASE_URL } from "@germla/config/constants";
import NodeCache from 'node-cache';
import { z } from 'zod';

const licenseKeySchema = z.string().uuid();

// 12 hours in seconds
const CACHE_TTL = 43200;

const cache = new NodeCache({
    stdTTL: CACHE_TTL
});

async function checkLicense() {
    let licenseKey = process.env.GERMLA_LICENSE_KEY;
    if (!licenseKey) return false;
    const res = await fetch(`${BASE_URL}/api/license?id=${licenseKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
    });
    const data = await res.json();
    cache.set(licenseKey, data);
    return data;
}