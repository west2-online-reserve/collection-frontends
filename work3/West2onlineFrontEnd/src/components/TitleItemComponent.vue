<template>
    <el-button ref="buttonRef" v-click-outside="onClickOutside" :type="msg.type" :text="msg.textbutton" size="small">
        {{item.title }}
    </el-button>
    <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    :width="400"
    virtual-triggering
    >
        <!-- Title -->
        <el-row style="height: 40px;">
            <el-col :span="4" style="text-align: right; padding: 4px;">Title</el-col>
            <el-col :span="20">
                <el-input v-model="inputTitle" :placeholder="item.title" class="input-title">
                </el-input>
            </el-col>
        </el-row>
        <!-- Content -->
        <el-row style="height: 80px;">
            <el-col :span="4" style="text-align: right; padding:4px;">Content</el-col>
            <el-col :span="20">
                <el-input
                v-model="textarea"
                :rows="3"
                type="textarea"
                :placeholder="item.description"
                resize="none"
                class="text-area"
                />
            </el-col>
        </el-row>
        <!-- Tags -->
        <el-row>
            <el-col :span="4" style="text-align: right; padding: 4px;">Tags</el-col>
            <el-col :span="20">
                <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                style="margin: 2px;"
                >
                {{ tag }}
            </el-tag>
            <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + New Tag
            </el-button>
        </el-col>
    </el-row>
    <el-row justify="end" style="margin-top: 10px;">
        <el-button size="small" type="primary" style="width: 60px;" @click="editItem">Edit</el-button>
        <el-button size="small" type="danger" style="width: 60px;" @click="deleteItem">Delete</el-button>
        <el-button size="small" type="warning" style="width: 60px;" @click="resetText">Reset</el-button>
    </el-row>
    </el-popover>
</template>

<script setup lang="ts" name="TitleItem">
    import { ref, unref, reactive, nextTick } from 'vue';
    //interface
    import { type User} from '@/types/userManagement';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useTodoListStore } from '@/stores/todolistStore'
    //utils

    // ui
    import {ElMessage} from 'element-plus'
    import { ClickOutside as vClickOutside } from 'element-plus'
    import { ElInput } from 'element-plus'
import type { TodoItem } from '@/types/todoList';

    const { deleteTodoItem, updateTodoItem } = useTodoListStore()

     const props = defineProps(['msg', 'item'])

    // pop over
    const buttonRef = ref()
    const popoverRef = ref()

    const onClickOutside = () => {
        unref(popoverRef).popperRef?.delayHide?.()
    }

    // pop over content
    // title
    const inputTitle = ref('')

    // content
    const textarea = ref('')
    // tags
    const inputValue = ref('')
    const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()

    const handleClose = (tag: string) => {
      dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    }

    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        InputRef.value!.input!.focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
      }
      inputVisible.value = false
      inputValue.value = ''
    }

    const resetText = ()=> {
        inputTitle.value = '';
        textarea.value = ''
    }

    const editItem = ()=> {
        if(inputTitle.value != ''){
            (props.item as TodoItem).title = inputTitle.value as string
        }
        if(textarea.value != ''){
            (props.item as TodoItem).description = textarea.value as string
        }
        updateTodoItem(props.item)
        resetText()
    }

    const deleteItem = ()=> {
        deleteTodoItem(props.item.id)
    }
</script>

<style scoped>
    .input-title{
        --el-input-border-color: #cfe2ce;
    }
</style>