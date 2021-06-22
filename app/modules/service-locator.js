const argList = require('args-list')

module.exports = () => {
    const dependencies = {}
    const factories = {}
    const di = {
        factory,
        register,
        inject,
        get
    }

    function factory(name, factory) {
         factories[name] = factory;
    }

    function register(name, dependency) {
        dependencies[name] = dependency;
    }

    function inject(factory) {
        const args = argList(factory)
            .map(dependency => di.get(dependency));

        return factory.apply(null, args);
    }

    function get(name) {
        if (!dependencies[name]) {
            const factory = factories[name];
            dependencies[name] = factory && di.inject(factory);
            
            if (!dependencies[name]) {
                throw new Error('No existe este módulo en el CDI');
            }
        }
        return dependencies[name];
    }

    return di;
}