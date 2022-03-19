<template>
    <!-- Modal -->
    <div id="modal-overflow" ref="modal" uk-modal>
        <div class="uk-modal-dialog">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <div class="uk-modal-header">
                <h2 class="uk-modal-title">Verify Information</h2>
            </div>

            <div class="uk-modal-body" uk-overflow-auto>
                <p>Patient Name:&ensp; <b>{{this.data.patient_name}}</b></p>
                <p>Patient Age:&ensp;<b>{{this.data.age}}</b></p>
                <p>Patient Gender:&ensp;<b>{{this.data.gender}}</b></p>
                <p>Date Of Diagnosis:&ensp;<b>{{this.data.date}}</b></p>
                <p>Diagnosis Of&ensp;<b>{{this.data.facility.name}}</b></p>
                <p>Reffered By&ensp;<b>{{this.data.doctor.name}}</b></p>
                <p>Cut&ensp;<b>{{this.data.cut}}</b></p>
                <p>Profit&ensp;<b>{{this.data.profit}}</b></p>
            </div>

            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                <button class="uk-button uk-button-primary" type="button">Save</button>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:null,       
    }
}
</script>