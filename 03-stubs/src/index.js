import Service from './service.js'

(async () => {
    const data = {
        username: `renato-${Date.now()}`,
        password: '123'
    }
    
    const service = new Service({
        filename: './users.json'
    })

    await service.create(data)
    const users = await service.read()
    console.log('users', users);
})();