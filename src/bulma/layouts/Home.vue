<template>
    <section class="hero is-fullheight is-primary is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <core-home v-slot="{ loading, showQuote, quote, hide }">
                    <loader transparent
                        size="large"
                        color="#dbdbdb"
                        v-if="loading"/>
                    <div v-else-if="showQuote">
                        <fade enter="down"
                            leave="up">
                            <div class="subtitle is-1 inspiring">
                                {{ quote }}
                            </div>
                        </fade>
                        <fade enter="right"
                            leave="left">
                            <button class="button is-outlined"
                                v-focus
                                @click="hide">
                                {{ i18n('Enter the application') }}
                            </button>
                        </fade>
                    </div>
                </core-home>
            </div>
        </div>
    </section>
</template>

<script>
import { Fade } from '@liberu-ui/transitions';
import { focus } from '@liberu-ui/directives';
import Loader from '@liberu-ui/loader/bulma';
import CoreHome from '../../core/layouts/Home.vue';

export default {
    name: 'Home',

    components: { CoreHome, Fade, Loader },

    directives: { focus },

    inject: ['i18n'],
};
</script>

<style>
    .title.inspiring {
        font-weight: 100;
    }
</style>
