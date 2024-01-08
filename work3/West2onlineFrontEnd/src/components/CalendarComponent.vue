<!-- To doListView.vue -->
<template> 
    <div class="container-calendar">

        <el-calendar ref="calendarRef">
            <template #header="{ date }">     
                <span class="label-month-year">{{ dateUtils.getMonthName(date) }}, {{ dateUtils.getYear(date) }}</span>
                <el-button-group style="width: 380px; margin:auto 0;">
                    <el-row > 
                        <el-col :span="2">
                            <el-button size="small" @click="selectDate('prev-year')" style="width: 90%;">
                                <el-icon><ArrowUpBold/></el-icon>
                            </el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button size="small" @click="selectDate('next-year')" style="width: 90%;">
                                <el-icon><ArrowDownBold/></el-icon>
                            </el-button>
                        </el-col>
                        
                        <el-col :span="12"></el-col>
                        <el-col :span="4">
                            <el-button size="small" @click="selectDate('today')" style="width: 90%;">Today</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button size="small" @click="selectDate('prev-month')" style="width: 90%;">
                                <el-icon><ArrowLeftBold/></el-icon>
                            </el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button size="small" @click="selectDate('next-month')" style="width: 90%;">
                                <el-icon><ArrowRightBold/></el-icon>
                            </el-button>
                        </el-col>
                    </el-row>
                </el-button-group>
            </template>
            <template #date-cell="{ data }">
                    <el-button link @click="setSelectedDate(data);">
                        {{ data.day.split('-').slice(2).join() }}
                    </el-button>
            </template>
        </el-calendar>
    </div>
</template>
    
<script setup lang="ts" name="Calendar"> 
    import { ref, } from 'vue';
    //interface
    // store
    import { useTodoListStore } from '@/stores/todolistStore'
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    import * as dateUtils from '@/utils/dateUtilities'
    // ui
    import type { CalendarDateType, CalendarInstance } from 'element-plus'
    
    // canlendar
    const { setSelectedDate, getSelectedDate } = useTodoListStore();

    const calendarRef = ref<CalendarInstance>();

    const selectDate = (val: CalendarDateType) => {
        if (!calendarRef.value) return
            calendarRef.value.selectDate(val)
            // console.log(calendarRef.value.selectDate(val))
    }

    const reloadPage = ()=>{
        window.location.reload();
    }



</script>

<style>
.el-calendar-table{
    border:1px solid #e4e4e4;

}
.el-calendar__header{
    padding-left:0;
    padding-right:0;
}
.el-calendar__body{
    padding:0 0 30px 0;

}

.el-calendar-table thead th{
    font-weight: bold;
    padding: 4px 0;
    user-select:none;
    /* margin: 10px 0; */
}
.el-calendar-table tr{
    font-weight: bold;
    /* padding: 4px 0; */
    margin: 10px 0;
}
.el-calendar-table .el-calendar-day{
    margin: 10px auto;
    text-align: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-calendar-table .el-calendar-day:hover{
    background-color: #456442;
    color: #FEFFFF;
}

.el-calendar-table td.is-selected{
    background-color: #fff;
}
.el-calendar-table td.is-selected>div{
    background-color: #456442;
    color: #FEFFFF;
}
.el-calendar-table td {
    border-style:none ;

}

.el-calendar-table tbody tr:nth-child(6){
    display: none;
}

</style>
<style scoped>
    .container-calendar{
        height: 427px;
    }
    .label-month-year{
        width: 210px;
        font-size: 24px;
        font-weight: bold;
        user-select:none
        /* line-height: 50px; */
    }
</style>