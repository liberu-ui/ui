<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <div class="level">
                <base-app-footer>
                    <template #default="{ meta }">
                        <div class="level-item">
                            <strong class="mr-1">
                                {{ meta.appName }} v{{ meta.version }}
                            </strong>
                            {{ i18n('built with') }}
                            <span class="icon has-text-danger">
                                <fa icon="heart"/>
                            </span>
                            <span class="ml-1">
                                +
                            </span>
                            <a href="https://vuejs.org"
                                target="_blank">
                                <img src="/images/vue-badge.png"
                                    :alt="i18n('Made with Vue')"
                                    width="28"
                                    height="28">
                            </a>
                            +
                            <a href="https://laravel.com"
                                class="ml-1"
                                target="_blank">
                                <img src="/images/laravel-badge.png"
                                    :alt="i18n('Made with Laravel')"
                                    width="28"
                                    height="28">
                            </a>
                            <span class="ml-1">
                                +
                            </span>
                            <a href="https://bulma.io"
                                target="_blank">
                                <img src="/images/bulma.svg"
                                    :alt="i18n('Made with Bulma')"
                                    width="28"
                                    height="28">
                            </a>
                        </div>
                    </template>
                </base-app-footer>
            </div>
            <div class="level">
                <div class="level-item">
                    <strong>{{ i18n('Backed by') }}:</strong>
                    <a href="https://earthlink.ro"
                        target="_blank">
                        <figure class="image earthlink">
                          <img src="/images/earthlink.svg">
                        </figure>
                    </a>
                </div>
            </div>
            <div>
                <a href="https://github.com/laravel-enso/enso"
                    target="_blank">
                    <span class="icon">
                        <fa :icon="['fab', 'github']"/>
                    </span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import BaseAppFooter from '../../core/components/AppFooter.vue';

library.add(faHeart, faGithub);

export default {
    name: 'AppFooter',

    components: { BaseAppFooter, Fa },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .footer {
        background: inherit;
        [dir='ltr'] & {
            margin-left: $sidebar-width;
            transition: margin-left .5s, width .5s;
        }
        [dir='rtl'] & {
            margin-right: $sidebar-width;
            transition: margin-right .5s, width .5s;
        }

        &.sidebar-collapsed {
            [dir='ltr'] & {
                margin-left: $sidebar-collapsed-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-collapsed-width;
            }
        }

        figure.image.earthlink {
            width: 112px;
            margin-left: 1em;
            margin-right: 1em;
        }
    }

    @media screen and (max-width: 1023px) {
        .footer {
            [dir='ltr'] & {
                margin-left: 0px;
            }
            [dir='rtl'] & {
                margin-right: 0px;
            }
        }
    }

</style>
