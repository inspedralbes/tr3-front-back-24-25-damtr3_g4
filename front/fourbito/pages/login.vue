<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center" style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/60"></div>
        </div>

        <Header />

        <section class="flex items-center justify-center h-screen relative z-20 px-4">
            <div class="text-center w-full max-w-md animate-fade-in">
                <h1 class="text-4xl font-bold mb-8 text-yellow-400">Iniciar Sessió</h1>

                <div class="bg-gray-800/95 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-600">
                    <form @submit.prevent="login">
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

                        <button type="submit"
                            class="w-full px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            Iniciar Sessió
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth';
import { login as loginService } from '~/services/communicationManager';

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
        async login() {
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

            try {
                const response = await loginService(this.email, this.password);
                this.successMessage = 'Sessió iniciada correctament!';
                const authStore = useAuthStore();
                authStore.login();
                this.$router.push('/admin');
            } catch (error) {
                this.errorMessage = error.message || 'Correu electrònic o contrasenya incorrectes.';
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