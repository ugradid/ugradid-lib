import * as createHash from 'create-hash'

/**
 * Computes the sha256 hash of the provided input
 * @param data - Data to be hashed
 * @example `sha256(Buffer.from('hello'))`
 * @ignore
 */

export function sha256(data: Buffer): Buffer {
    return createHash('sha256')
        .update(data)
        .digest()
}