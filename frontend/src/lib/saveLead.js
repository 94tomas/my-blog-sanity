export async function saveLead() {
    // createSanityDocument();
    console.log('saving lead...');
    try {
        const response = await fetch(`https://<YOUR_PROJECT_ID>.api.sanity.io/v1/data/mutate/<YOUR_DATASET>`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer <YOUR_API_TOKEN>`,
            },
            body: JSON.stringify({
                mutations: [
                    {
                        create: {
                            // _type: 'your_document_type', // Replace with your document type in Sanity
                            _type: 'lead',
                            // Add other fields and their values as needed
                        },
                    },
                ],
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to create lead in Sanity');
        }

        const data = await response.json();
        console.log('Lead created: ', data);
    } catch (error) {
        console.log('Error creating lead: ', error);
    }
}