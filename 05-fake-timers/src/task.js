export default class Task {

    #tasks = new Set()

    save({ name, dueAt, fn}) {
        console.log(`task: ${name} at ${dueAt.toISOString()} seconds`);
        this.#tasks.add({name, dueAt, fn})
    }
    run(everyMs) {
        const interval = setInterval(() => {
            const now = new Date()
            if(this.#tasks.size === 0){
                console.log('tasks finished');
                clearInterval(interval)
                return
            }
            for (const task of this.#tasks) {
                if(task.dueAt <= now){
                    task.fn()
                    this.#tasks.delete(task)
                }
            }
        }, everyMs)
    }
}