<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
            style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/60"></div>
        </div>

        <nav class="p-6 bg-gray-800/95 backdrop-blur-md fixed w-full z-50">
            <div class="container mx-auto flex justify-between items-center">
                <div class="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition duration-300">
                    Joc de Futbol
                </div>
                <div class="space-x-6 hidden md:flex">
                    <NuxtLink to="/" class="hover:text-yellow-400 transition duration-300">Inici</NuxtLink>
                    <NuxtLink to="/login" class="hover:text-yellow-400 transition duration-300">Iniciar Sessió</NuxtLink>
                </div>
            </div>
        </nav>

        <section class="flex items-center justify-center h-screen relative z-20">
            <div class="text-center px-4 animate-fade-in w-full max-w-md">
                <h1 class="text-4xl font-bold mb-8 text-yellow-400">Iniciar Sessió</h1>

                <div class="bg-gray-800/95 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-600">
                    <div class="mb-6">
                        <label for="email" class="block text-lg font-semibold mb-2 text-gray-200">Correu Electrònic:</label>
                        <input type="email" id="email" v-model="email"
                            class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Introdueix el teu correu" required />
                    </div>

                    <div class="mb-6">
                        <label for="password" class="block text-lg font-semibold mb-2 text-gray-200">Contrasenya:</label>
                        <input type="password" id="password" v-model="password"
                            class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Introdueix la contrasenya" required />
                    </div>

                    <div v-if="errorMessage" class="text-red-400 text-sm mb-4">
                        {{ errorMessage }}
                    </div>

                    <div v-if="successMessage" class="text-green-400 text-sm mb-4">
                        {{ successMessage }}
                    </div>

                    <div class="mt-6 flex justify-center"> <!-- Center the button -->
                        <button @click="login"
                            class="w-1/2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            Iniciar Sessió
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        login() {
            this.errorMessage = '';
            this.successMessage = '';

            if (!this.email || !this.password) {
                this.errorMessage = 'Si us plau, omple tots els camps.';
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.errorMessage = 'Si us plau, introdueix un correu electrònic vàlid.';
                return;
            }

            if (this.email === 'usuari@example.com' && this.password === 'contrasenya') {
                this.successMessage = 'Sessió iniciada correctament!';
            } else {
                this.errorMessage = 'Correu electrònic o contrasenya incorrectes.';
            }
        },
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
    },
};
</script>

<style scoped>
.animate-fade-in {
    animation: fade-in 1s ease-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>