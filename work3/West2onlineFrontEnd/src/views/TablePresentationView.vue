<!-- TablePresentationView.vue -->
<template> 
    <TablePresentation/>
</template>
    
<script setup lang="ts" name="TablePresentationView"> 
    import { ref, reactive } from 'vue';
    //interface
    // import { type User} from '@/types/UserManagement';
    // router
    import { useRouter } from 'vue-router';
    // store
    // import { useUserStore } from '@/stores/userStore2';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/UserManagement'
    //ui
    import {ElMessage} from 'element-plus'
    // components
    import TablePresentation from '@/components/TablePresentationComponent.vue'
    
    
    let router = useRouter();

    const { testInfo, addAccountToCollection, isAutoLogin} = useUserCollectionStore();
    
  
</script>
    
<style scoped>
    
</style>
    @/utils/userMangement@/stores/userCollectionStore