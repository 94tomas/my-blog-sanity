<template>
    <div class="wrap-form">
        <form @submit.prevent="onSubmit">
            <div class="field">
                <label for="name">Nombre completo</label>
                <input type="text" id="name" required :disabled="loading" v-model="name">
            </div>

            <div class="field">
                <label for="email">Email</label>
                <input type="email" id="email" required :disabled="loading" v-model="email">
            </div>

            <div class="field">
                <label for="message">Mensaje</label>
                <textarea id="message" required :disabled="loading" v-model="message"></textarea>
            </div>

            <button type="submit" :disabled="loading">{{ loading ? 'Enviando...' : 'Enviar' }}</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const message = ref('')
const loading = ref(false)
const onSubmit = async () => {
    // console.log('Enviado');
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
                            message: message.value,
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

<style scoped>
.wrap-form {
    max-width: 500px;
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
form {
    width: 100%;
}
label {
    display: block;
    margin-bottom: 0px;
    font-weight: bold;
    color: #333;
    font-size: 14px;
}
input, textarea {
    display: block;
    width: 100%;
    margin-bottom: 0px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.field {
    margin-bottom: 15px;
    width: 100%;
}
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
}
</style>