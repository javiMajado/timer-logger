# ⏱️ time-logger

Un decorador de TypeScript/JavaScript simple y potente para medir y registrar el tiempo de ejecución de cualquier método de clase. Ahora, con soporte para definir un tiempo esperado y advertir sobre tiempos altos.

---

## 🚀 Instalación

Instala el paquete usando **npm** o **yarn**:

```bash
npm install time-logger
yarn add time-logger
```

✨ Uso

Simplemente importa el decorador MeasureTime y aplícalo a cualquier método de tu clase, síncrono o asíncrono.

Nueva Forma de Uso (Decorador Factory)

El decorador debe ser llamado como una función @MeasureTime() y acepta un objeto de configuración opcional para personalizar su comportamiento.

Uso	Descripción
@MeasureTime()	Uso por defecto. Mide el tiempo y lo registra.
@MeasureTime({ maxTime: N })	Mide el tiempo y añade una advertencia si el tiempo de ejecución supera N milisegundos.
💻 Ejemplo de Código
import { MeasureTime } from 'time-logger'; 

class DataProcessor {

    // 1. Método BÁSICO (Uso por defecto: No hay límite de tiempo)
    @MeasureTime()
    public calculateExpensiveData(iterations: number): number {
        console.log("Iniciando cálculo...");
        let sum = 0;
        for (let i = 0; i < iterations * 1000000; i++) {
            sum += Math.sqrt(i);
        }
        return sum;
    }

    // 2. Método con LÍMITE DE TIEMPO (Tiempo excedido)
    @MeasureTime({ maxTime: 100 }) // Advertencia si dura más de 100ms
    public async fetchRemoteData(url: string): Promise<any> {
        // Simulación de una llamada a API
        await new Promise(resolve => setTimeout(resolve, 350)); // (Duración > 100ms)
        return { data: `Datos cargados de ${url}` };
    }
}

const processor = new DataProcessor();

// Ejecución
processor.calculateExpensiveData(50); 
processor.fetchRemoteData("https://api.ejemplo.com/usuarios"); 

⚙️ Propiedades de Configuración

El decorador acepta un objeto de configuración (MeasureTimeConfig) para un control más detallado.

Propiedad	Tipo	Descripción	Por Defecto
maxTime	number	Si se proporciona, el log mostrará [TIMEOUT] si el tiempo de ejecución es mayor que este valor en milisegundos.	0 (Deshabilitado)
📄 Salida en Consola

Al ejecutar el código, el tag de advertencia se añade automáticamente cuando se supera el maxTime:

Iniciando cálculo...
⏱️ Método 'calculateExpensiveData' executed in 258ms
Iniciando espera...
Espera terminada.
⏱️ Método 'fetchRemoteData' executed in 353ms [TIMEOUT] (> 100ms)

🛠️ Compatibilidad

Este paquete está diseñado para funcionar perfectamente en:

TypeScript (con la opción experimentalDecorators: true activada en tsconfig.json).

JavaScript moderno (ESM) en entornos Node.js o Bundlers.

🤝 Contribuciones

¡Las contribuciones son bienvenidas!
Si encuentras un bug o tienes una idea para una mejora, por favor abre un issue o envía un Pull Request.

📜 Licencia

Distribuido bajo la Licencia ISC.