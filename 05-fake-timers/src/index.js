import Task from "./task.js";

const oneSecond = 1000
function runInXSecond(seconds = 1000){
    return new Date(Date.now() + seconds)
}

const task = new Task()
task.save({
    name: 'task1',
    dueAt: runInXSecond(),
    fn: () => console.log('task1 exec')
})

task.save({
    name: 'task2',
    dueAt: runInXSecond(oneSecond * 2),
    fn: () => console.log('task2 exec')
})

task.save({
    name: 'task3',
    dueAt: runInXSecond(oneSecond * 3),
    fn: () => console.log('task3 exec')
})

task.run(oneSecond)