<template>
    <form @submit.prevent="onSubmit">
        <label for="name">Nombre completo</label>
        <input type="text" id="name" required :disabled="loading" v-model="name">

        <br>

        <label for="email">Email</label>
        <input type="email" id="email" required :disabled="loading" v-model="email">

        <br>

        <button type="submit" :disabled="loading">{{ loading ? 'Enviando...' : 'Enviar' }}</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const loading = ref(false)
const onSubmit = async () => {
    console.log('Enviado');
    loading.value = true;
    try {
        const response = await fetch(`https://${import.meta.env.PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${import.meta.env.PUBLIC_SANITY_DATASET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.PUBLIC_SANITY_TOKEN}`,
            },
            body: JSON.stringify({
                mutations: [
                    {
                        create: {
                            _type: 'lead', // Replace with your document type in Sanity
                            // Add other fields and their values as needed
                            name: name.value,
                            email: email.value,
                        },
                    },
                ],
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to create lead in Sanity');
        }

        const data = await response.json();
        alert('Envio exitoso.');
        name.value = '';
        email.value = '';
    } catch (error) {
        console.log('Error creating lead: ', error);
    }
    loading.value = false;
}
</script>