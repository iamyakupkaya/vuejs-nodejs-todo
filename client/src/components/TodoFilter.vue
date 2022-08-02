<template>
    <div class="todo-filter__container">
        <input placeholder="search..." v-model="search"/>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            search:""
        }
    }
}
</script>

<style>
.todo-filter__container{
    width:100%; 
    margin-top:90px; 
    margin-bottom:0px;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    
}
.todo-filter__container input{
    width:150px;
    border:2px solid red;
    border-radius:15px;
    transition:width 0.3s linear;
    margin-right:25px;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    color:black;
    font-weight:bold;


}
.todo-filter__container input:focus{
    width:250px;
    border:2px solid green;
    border-radius:15px;
    transition:width 0.3s linear;
}
</style>