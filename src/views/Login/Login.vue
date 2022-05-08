<template>
    <div class="login">
        <LoginPanel />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from '@/views/Login/components/LoginPanel.vue'

export default defineComponent({
    name: 'Login',
    components: { LoginPanel },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    //background: url('../../assets/image/login-bg.svg');
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
</style>
