
interface MeasureTimeConfig {
    maxTime?: number; 
}

/**
 * Decorador Factory que mide el tiempo de ejecución de un método, 
 * acepta un JSON de configuración.
 * * @param config Objeto de configuración que puede incluir maxTime (milisegundos).
 */
export function MeasureTime(config: MeasureTimeConfig = {}) {    
    const expectedMs = config.maxTime || 0;
    return function(
        target: Object, 
        propertyKey: string, 
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            const start = Date.now(); 
            let performanceTag = '';
            
            try {
                const result = originalMethod.apply(this, args);
                
                const logTime = (time: number, isAsync: boolean) => {
                    let log = `⏱️ Method '${propertyKey}')`;

                    if (expectedMs > 0 && time > expectedMs) {
                        performanceTag = ` [TIMEOUT] (> ${expectedMs}ms)`;
                    }

                    log += ` executed in ${time}ms${performanceTag}`;
                    console.log(log);
                };
                
                if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                    
                    return (result as Promise<any>).finally(() => {
                        const end = Date.now();
                        const executionTime = end - start;
                        logTime(executionTime, true);
                    });
                }
                
                const end = Date.now();
                const executionTime = end - start;
                logTime(executionTime, false);
                
                return result;

            } catch (error) {
                const end = Date.now();
                const executionTime = end - start;
                console.log(`Method '${propertyKey}' failed in ${executionTime}ms`);
                throw error;
            }
        };

        return descriptor;
    };
}