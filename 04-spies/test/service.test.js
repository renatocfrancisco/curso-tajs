import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'

describe('Service Test Suite', () => {
    let _service
    const filename = 'testfile.ndjson'
    const mocked_hash_pwd = 'hashed'
    describe('#create - spies', () => {
        beforeEach(() => {
            jest.spyOn(
                crypto,
                crypto.createHash.name
            ).mockReturnValue({
                update: jest.fn().mockReturnThis(),
                digest: jest.fn().mockReturnValue(mocked_hash_pwd)
            })

            jest.spyOn(
                fs,
                fs.appendFile.name
            ).mockResolvedValue()
            _service = new Service({
                filename
            })
        })

        it('should call appendFile with correct params', async () => {
            const expectedCreatedAt = new Date().toISOString()
            jest.spyOn(
                Date.prototype,
                Date.prototype.toISOString.name
            ).mockReturnValue(expectedCreatedAt)

            const input = {
                username: 'user1',
                password: 'pass'
            }
            await _service.create(input)
            expect(crypto.createHash).toHaveBeenCalledWith('sha256')

            const hash = crypto.createHash('sha256')
            expect(hash.update).toHaveBeenCalledWith(input.password)
            expect(hash.digest).toHaveBeenCalledWith('hex')

            const expected = JSON.stringify({
                ...input,
                createdAt: expectedCreatedAt,
                password: mocked_hash_pwd
            }).concat('\n')

            expect(fs.appendFile).toHaveBeenCalledWith(
                filename,
                expected
            )
        });

    });

});