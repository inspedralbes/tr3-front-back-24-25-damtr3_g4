const URL = 'http://localhost:4000';

export async function saveMatchConfig(config) {
    try {
        const response = await fetch(`${URL}/saveMatchConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al guardar la configuración');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al guardar la configuración');
    }
}

export async function getMatchConfig() {
    try {
        const response = await fetch(`${URL}/getMatchConfig`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener la configuración');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al obtener la configuración');
    }
}