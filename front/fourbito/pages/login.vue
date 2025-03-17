<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <!-- Background with Overlay -->
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
            style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/60"></div> <!-- Increased overlay darkness -->
        </div>

        <!-- Navigation Bar -->
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

        <!-- Login Section -->
        <section class="flex items-center justify-center h-screen relative z-20">
            <div class="text-center px-4 animate-fade-in w-full max-w-sm"> <!-- Reduced max-width -->
                <h1 class="text-3xl font-bold mb-6 text-yellow-400">Iniciar Sessió</h1> <!-- Smaller heading -->

                <!-- Login Form -->
                <div class="bg-gray-800/95 backdrop-blur-md p-6 rounded-lg shadow-2xl border border-gray-600">
                    <!-- Email Field -->
                    <div class="mb-4"> <!-- Reduced margin -->
                        <label for="email" class="block text-sm font-semibold mb-1 text-gray-200">Correu Electrònic:</label> <!-- Smaller label -->
                        <input type="email" id="email" v-model="email"
                            class="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Introdueix el teu correu" required /> <!-- Smaller input -->
                    </div>

                    <!-- Password Field -->
                    <div class="mb-4"> <!-- Reduced margin -->
                        <label for="password" class="block text-sm font-semibold mb-1 text-gray-200">Contrasenya:</label> <!-- Smaller label -->
                        <input type="password" id="password" v-model="password"
                            class="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Introdueix la contrasenya" required /> <!-- Smaller input -->
                    </div>

                    <!-- Error Message -->
                    <div v-if="errorMessage" class="text-red-400 text-xs mb-2"> <!-- Smaller text -->
                        {{ errorMessage }}
                    </div>

                    <!-- Success Message -->
                    <div v-if="successMessage" class="text-green-400 text-xs mb-2"> <!-- Smaller text -->
                        {{ successMessage }}
                    </div>

                    <!-- Login Button -->
                    <div class="mt-4"> <!-- Reduced margin -->
                        <button @click="login"
                            class="w-full px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            Iniciar Sessió
                        </button>
                    </div>

                    <!-- Signup Link -->
                    <div class="mt-3 text-sm text-gray-300"> <!-- Smaller text -->
                        No tens un compte? <NuxtLink to="/signup" class="text-yellow-400 hover:text-yellow-500">Registra't</NuxtLink>
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
            email: '', // Stores the email input
            password: '', // Stores the password input
            errorMessage: '', // Error message for validation
            successMessage: '', // Success message for confirmation
        };
    },
    methods: {
        login() {
            // Reset messages
            this.errorMessage = '';
            this.successMessage = '';

            // Basic validation
            if (!this.email || !this.password) {
                this.errorMessage = 'Si us plau, omple tots els camps.';
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.errorMessage = 'Si us plau, introdueix un correu electrònic vàlid.';
                return;
            }

            // Simulate login (replace with actual API call)
            if (this.email === 'usuari@example.com' && this.password === 'contrasenya') {
                this.successMessage = 'Sessió iniciada correctament!';
                // Redirect to another page or perform additional actions
            } else {
                this.errorMessage = 'Correu electrònic o contrasenya incorrectes.';
            }
        },
        validateEmail(email) {
            // Basic email validation regex
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