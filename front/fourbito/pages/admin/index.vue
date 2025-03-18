<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center" style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/60"></div>
        </div>

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

        <section class="flex items-center justify-center h-screen relative z-20">
            <div class="text-center px-4 animate-fade-in w-full max-w-2xl">
                <h1 class="text-6xl font-bold mb-8 text-yellow-400">Configuració del Partit</h1>
                <div class="bg-gray-800/95 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-600">
                    <div class="mb-8">
                        <label for="matchDuration" class="block text-lg font-semibold mb-4 text-gray-200">Durada del Partit (minuts):</label>
                        <input type="number" id="matchDuration" v-model="matchDuration" class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" min="1" max="5" required />
                    </div>
                    <div class="mb-8">
                        <label for="goalsToWin" class="block text-lg font-semibold mb-4 text-gray-200">Gols per Guanyar:</label>
                        <div class="flex items-center space-x-4">
                            <input type="range" id="goalsToWin" v-model="goalsToWin" class="w-full range-slider" min="1" max="10" />
                            <span class="text-lg font-semibold text-gray-200">{{ goalsToWin }}</span>
                        </div>
                    </div>
                    <div class="mb-8">
                        <label class="block text-lg font-semibold mb-4 text-gray-200">Selecció de Jugador:</label>
                        <div class="grid grid-cols-2 gap-4">
                            <div v-for="(player, index) in players" :key="player.id" @click="selectPlayer(player.id)" :class="{'bg-gray-700 hover:bg-gray-600': selectedPlayer !== player.id, 'bg-yellow-400 text-gray-900': selectedPlayer === player.id, 'col-span-2': index === 2}" class="p-4 rounded-lg cursor-pointer transition duration-300 flex items-center justify-center">
                                <span class="text-lg font-semibold">{{ player.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="errorMessage" class="text-red-400 text-sm mb-4">{{ errorMessage }}</div>
                    <div v-if="successMessage" class="text-green-400 text-sm mb-4">{{ successMessage }}</div>
                    <div class="mt-8">
                        <button @click="saveSettings" class="w-1/2 mx-auto px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">Desar Configuració</button>
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
            matchDuration: 2,
            goalsToWin: 3,
            selectedPlayer: null,
            players: [
                { id: 3, name: 'Jugador 3' },
                { id: 4, name: 'Jugador 4' },
                { id: 5, name: 'Jugador 5' },
            ],
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        selectPlayer(playerId) {
            this.selectedPlayer = this.selectedPlayer === playerId ? null : playerId;
        },
        saveSettings() {
            this.errorMessage = '';
            this.successMessage = '';
            if (this.matchDuration < 1 || this.matchDuration > 5) {
                this.errorMessage = 'La durada del partit ha de ser entre 1 i 5 minuts.';
                return;
            }
            if (!this.selectedPlayer) {
                this.errorMessage = 'Selecciona un jugador.';
                return;
            }
            localStorage.setItem('matchSettings', JSON.stringify({
                matchDuration: this.matchDuration,
                goalsToWin: this.goalsToWin,
                selectedPlayer: this.selectedPlayer,
            }));
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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.range-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #4a5568;
    border-radius: 9999px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
}
.range-slider:hover { opacity: 1; }
.range-slider::-webkit-slider-runnable-track {
    height: 8px;
    background: #f6e05e;
    border-radius: 9999px;
}
.range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 2px solid #f6e05e;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
}
.range-slider:focus::-webkit-slider-thumb {
    outline: 2px solid #f6e05e;
    outline-offset: 2px;
}
</style>
