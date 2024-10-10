<template>
    <div :class="bem.b()">
        <Prev :currentPage="currentPage" @change="handlePage"/>
        <Pager :pageCount="realPageCount" :currentPage="currentPage" @change="handlePage"/>
        <Next :currentPage="currentPage" :pageCount="realPageCount" @change="handlePage"/>
        <Jumper :currentPage="currentPage" :pageCount="realPageCount" @change="handlePage"/>
        <el-select
        v-model="value" @change="handlePageSizeChange"
    >
      <el-option
        v-for="item in pageLabel"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
        <Total :total="total"/>
    </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import Prev from './Prev.vue'
import Next from './Next.vue'
import Pager from './Pager.vue';
import Jumper from './Jumper.vue';
import Total from './Total.vue';
import { useNamespace } from '../../hooks/use-namespace'
const bem = useNamespace('pagination')
defineOptions({
    name: 'zt-pagination'
})


const props = defineProps({
    pageSize: {
        type:Number,
    },
    //总条目数
    total: {
        type:Number
    },
    //总页数
    pageCount:{
        type:Number
    },
    pagerCount:{
        type:Number,
        default:7
    },
    pageSizes:{
        type:Array,
        default:()=>[10,20,30,40,50,100]
    },
    currentPage:{
        type:Number,
        default:1
    },
    defaultPageSize:{
        type:Number,
        default:10
    },
    defaultCurrentPage:{
        type:Number,
        default:1
    }
})
const value=ref(`${props.defaultPageSize}条/页`)
const pageLabel = computed(() => {
    return props.pageSizes.map(size => ({
        value: size,
        label: `${size}条/页`
    }))
})

const currentPage = ref(props.currentPage)
const pageSize = ref(props.defaultPageSize); 

const realPageCount = computed(() => {
    if (props.total) {
        return Math.ceil(props.total / pageSize.value);
    } else if (props.pageCount) {
        return props.pageCount;
    }
    return 0;
});

const handlePage = (newPage) => {
    currentPage.value = newPage;
};
const handlePageSizeChange = (newSize) => {
    pageSize.value = newSize; 
    if(currentPage.value>realPageCount.value){
        currentPage.value=realPageCount.value
    }
};
</script>

