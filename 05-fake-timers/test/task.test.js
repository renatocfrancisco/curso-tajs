import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js';

describe('Task suite', () => {
    let _logMock
    let _task
    beforeEach(() => {
        _logMock = jest.spyOn(
            console,
            console.log.name
        ).mockImplementation()
        _task = new Task()
    })

    it('should only run tasks that are due without fake timers (slow)', async () => {
        const tasks = []
    })
});