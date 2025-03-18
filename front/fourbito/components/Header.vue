<template>
    <nav class="p-6 bg-gray-800/95 backdrop-blur-md fixed w-full z-50">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo or Title -->
            <NuxtLink to="/" class="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition duration-300">
                Fourbitoo
            </NuxtLink>

            <!-- Navigation Links -->
            <div class="space-x-6 hidden md:flex">
                <NuxtLink to="/" class="hover:text-yellow-400 transition duration-300">Inici</NuxtLink>
                <a @click="navigateToAdmin" class="hover:text-yellow-400 transition duration-300 cursor-pointer">Configuració</a>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '~/stores/auth';

export default {
    name: 'Header',
    methods: {
        navigateToAdmin() {
            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                this.$router.push('/admin');
            } else {
                this.$router.push('/login');
            }
        }
    }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>