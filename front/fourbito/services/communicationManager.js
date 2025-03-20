const URL = import.meta.env.VITE_URL_BACK;

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

export async function login(email, password) {
    try {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
}

export async function register(username, email, password) {
    try {
        const response = await fetch(`${URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al registrar el usuario');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al registrar el usuario');
    }
}

export async function getUsers() {
    try {
        const response = await fetch(`${URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener los usuarios');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al obtener los usuarios');
    }
}

export async function getUserById(id) {
    try {
        const response = await fetch(`${URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener el usuario');
        }

        return data;
    } catch (error) {
        throw new Error(error.message || 'Error al obtener el usuario');
    }
}

export async function deleteUserById(id) {
    try {
        const response = await fetch(`${URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Error al eliminar el usuario');
        }

        return;
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar el usuario');
    }
}