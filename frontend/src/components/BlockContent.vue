<template>
    <SanityBlocks :blocks="body" :serializers="serializers" />
</template>
<script>
// sanityBlock
import { SanityBlocks } from 'sanity-blocks-vue-component';
import { buildImage } from '../utils/buildImage';
import { h } from "vue";

export default {
    components: {
        SanityBlocks
    },
    data() {
        return {
            serializers: {
                types: {
                    image: (data) => {
                        return h("img", { src: `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID}/production/${buildImage(data.asset._ref)}` });
                    }
                }
            }
        };
    },
    props: ['body'],
};
</script>
<style scoped>
p {
    margin-bottom: 20px;
}
ul {
    list-style-type: disc;
    padding-left: 20px;
}
ul li {
    margin-bottom: 10px;
}
</style>
  