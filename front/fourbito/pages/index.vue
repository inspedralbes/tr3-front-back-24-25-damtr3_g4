<template>
    <div class="min-h-screen bg-gray-900 text-white font-sans overflow-hidden relative">
        <!-- Fons de l'Estadi amb Superposició -->
        <div class="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
            style="background-image: url('/stadium.jpg');">
            <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <nav class="p-6 bg-gray-800/90 backdrop-blur-md fixed w-full z-50">
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

        <!-- Secció Hero -->
        <section class="flex items-center justify-center h-screen relative z-20">
            <div class="text-center px-4 animate-fade-in">
                <h1 class="text-6xl font-bold mb-6">Experimenta el millor <span class="text-yellow-400">Joc de Futbol 2D</span>
                </h1>
                <p class="text-xl mb-8 text-gray-300">Endinsa't en el món ple d'acció del futbol 2D. Competeix, estratègia i
                    guanya!</p>
                <a href="#download"
                    class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
                    Juga Ara
                </a>
            </div>
        </section>

        <!-- Secció de Característiques -->
        <section id="features" class="py-20 bg-gray-800/90 relative z-20">
            <div class="container mx-auto px-6">
                <h2 class="text-4xl font-bold text-center mb-12">Característiques</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300">
                        <div class="text-5xl mb-4">⚽</div>
                        <h3 class="text-2xl font-bold mb-4">Jugabilitat Realista</h3>
                        <p class="text-gray-300">Experimenta una mecànica de futbol 2D fluida i realista.</p>
                    </div>
                    <div class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300">
                        <div class="text-5xl mb-4">🏆</div>
                        <h3 class="text-2xl font-bold mb-4">Competeix Globalment</h3>
                        <p class="text-gray-300">Reta jugadors d’arreu del món en partits en temps real.</p>
                    </div>
                    <div class="text-center bg-gray-700/50 p-8 rounded-lg hover:bg-gray-700/70 transition duration-300">
                        <div class="text-5xl mb-4">🎮</div>
                        <h3 class="text-2xl font-bold mb-4">Controls Fàcils</h3>
                        <p class="text-gray-300">Controls intuïtius dissenyats tant per a jugadors ocasionals com competitius.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Secció de Crida a l'Acció -->
        <section id="download" class="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative z-20">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl font-bold mb-8">Preparat per Jugar?</h2>
                <p class="text-xl mb-8 text-gray-300">Uneix-te a la diversió i comença el teu viatge futbolístic avui mateix!
                </p>
                <a href="#"
                    class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
                    Descarrega Ara
                </a>
            </div>
        </section>

        <!-- Peu de pàgina -->
        <footer class="p-6 bg-gray-800/90 backdrop-blur-md text-center relative z-20">
            <p class="text-gray-400">© 2023 Joc de Futbol. Tots els drets reservats.</p>
        </footer>
    </div>
</template>

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