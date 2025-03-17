<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <!-- Fons de l'Estadi amb Superposició -->
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
            style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/60"></div> <!-- Increased overlay darkness -->
        </div>

        <!-- Barra de navegació -->
        <nav class="p-6 bg-gray-800/95 backdrop-blur-md fixed w-full z-50">
            <div class="container mx-auto flex justify-between items-center">
                <div class="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition duration-300">
                    Joc de Futbol
                </div>
                <div class="space-x-6 hidden md:flex">
                    <NuxtLink to="/" class="hover:text-yellow-400 transition duration-300">Inici</NuxtLink>
                    <NuxtLink to="/admin" class="hover:text-yellow-400 transition duration-300">Configuració</NuxtLink>
                </div>
            </div>
        </nav>

        <!-- Secció de Configuració -->
        <section class="flex items-center justify-center h-screen relative z-20">
            <div class="text-center px-4 animate-fade-in w-full max-w-2xl">
                <h1 class="text-6xl font-bold mb-8 text-yellow-400">Configuració del Partit</h1>

                <!-- Formulari de Configuració -->
                <div class="bg-gray-800/95 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-600">
                    <!-- Increased border contrast -->
                    <!-- Durada del Partit -->
                    <div class="mb-8">
                        <label for="matchDuration" class="block text-lg font-semibold mb-4 text-gray-200">Durada del
                            Partit (minuts):</label> <!-- Lighter text for better contrast -->
                        <input type="number" id="matchDuration" v-model="matchDuration"
                            class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            min="1" max="5" required />
                    </div>

                    <!-- Nombre de Gols per Guanyar -->
                    <div class="mb-8">
                        <label for="goalsToWin" class="block text-lg font-semibold mb-4 text-gray-200">Gols per
                            Guanyar:</label> <!-- Lighter text for better contrast -->
                        <div class="flex items-center space-x-4">
                            <input type="range" id="goalsToWin" v-model="goalsToWin"
                                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                min="1" max="10" />
                            <span class="text-lg font-semibold text-gray-200">{{ goalsToWin }}</span>
                            <!-- Lighter text for better contrast -->
                        </div>
                    </div>

                    <!-- Selecció de Jugadors -->
                    <div class="mb-8">
                        <label for="playerSelection" class="block text-lg font-semibold mb-4 text-gray-200">Selecció de
                            Jugador:</label> <!-- Updated label to reflect single selection -->
                        <div class="grid grid-cols-2 gap-4">
                            <div v-for="(player, index) in players" :key="player.id" @click="selectPlayer(player.id)"
                                :class="{
                                    'bg-gray-700 hover:bg-gray-600': selectedPlayer !== player.id,
                                    'bg-yellow-400 text-gray-900': selectedPlayer === player.id,
                                    'col-span-2': index === 2, // Make the third button larger
                                }"
                                class="p-4 rounded-lg cursor-pointer transition duration-300 flex items-center justify-center">
                                <span class="text-lg font-semibold">{{ player.name }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Missatge de Validació -->
                    <div v-if="errorMessage" class="text-red-400 text-sm mb-4">
                        {{ errorMessage }}
                    </div>

                    <!-- Missatge de Confirmació -->
                    <!-- Missatge de Confirmació -->
                    <div v-if="successMessage" class="text-green-400 text-sm mb-4">
                        {{ successMessage }}
                    </div>

                    <div class="mt-8">
                        <button @click="saveSettings"
                            class="w-1/2 mx-auto px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            Desar Configuració
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
            matchDuration: 2, // Default value set to 2 minutes
            goalsToWin: 3, // Default value set to 3 goals
            selectedPlayer: null, // Store the ID of the selected player
            players: [
                { id: 3, name: 'Jugador 3' },
                { id: 4, name: 'Jugador 4' },
                { id: 5, name: 'Jugador 5' },
            ],
            errorMessage: '', // Error message for validation
            successMessage: '', // Success message for confirmation
        };
    },
    methods: {
        selectPlayer(playerId) {
            if (this.selectedPlayer === playerId) {
                // Deselect if the same player is clicked again
                this.selectedPlayer = null;
            } else {
                // Select the new player
                this.selectedPlayer = playerId;
            }
        },
        saveSettings() {
            // Reset both messages
            this.errorMessage = '';
            this.successMessage = '';

            // Validate settings before saving
            if (this.matchDuration < 1 || this.matchDuration > 5) {
                this.errorMessage = 'La durada del partit ha de ser entre 1 i 5 minuts.';
                return;
            }

            if (!this.selectedPlayer) {
                this.errorMessage = 'Selecciona un jugador.';
                return;
            }

            // Save settings (e.g., to local storage, an API, or a state management system)
            const settings = {
                matchDuration: this.matchDuration,
                goalsToWin: this.goalsToWin,
                selectedPlayer: this.selectedPlayer, // Save the selected player ID
            };

            // Example: Save to local storage
            localStorage.setItem('matchSettings', JSON.stringify(settings));

            // Show success message
            this.successMessage = 'Configuració desada correctament!';
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

/* Custom range slider styles */
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
    height: 8px;
    background: #4a5568;
    /* Gray-700 */
    border-radius: 9999px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #f6e05e;
    /* Yellow-400 */
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
}

input[type="range"]:focus::-webkit-slider-thumb {
    outline: 2px solid #f6e05e;
    /* Yellow-400 */
    outline-offset: 2px;
}
</style>