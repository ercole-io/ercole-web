<!--
Copyright (c) 2019 Sorint.lab S.p.A.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <div class="history-container">
        <div class="form-inline justify-content-end" v-if="showHistorySelect">
            Choose a date:
            <div class="input-group input-group-sm">
                <input type="date" class="form-control" aria-label="History" v-model="formData">
                <div class="input-group-append">
                    <span class="input-group-text">
                        <i class="fas fa-calendar"></i>
                    </span>
                </div>
            </div>

            <b-button type="button" variant="primary" size="sm" @click="submit(formData)">Submit</b-button>
            <b-button type="button" variant="danger" size="sm" @click="cancel()">Cancel</b-button>

        </div>
        <div class="form-inline justify-content-end" v-if="showHistoryView">
            viewing host informations at: {{ archived | date }} (
            <!-- <button class="btn btn-link p-0">cambia data</button>,&nbsp; -->
            <button class="btn btn-link p-0" @click="clear()">show current</button>)
        </div>
        <div class="form-inline justify-content-end" v-if="showCurrentView">
            last update: {{ updated | date }} (
            <button class="btn btn-link p-0" @click="showForm = true">history</button>)
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
	filters: {
		date: function(value) {
			return moment(value).format('DD-MM-YYYY HH:mm');
		}
	},
	props: {
		updated: {
			type: String,
			required: true
		},
		archived: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			formData: '',
			showForm: false
		};
	},
	methods: {
		cancel() {
			this.formData = '';
			this.showForm = false;
		},
		submit(formData) {
			this.showForm = false;
			this.$emit('update-date', formData);
		},
		clear() {
			this.formData = '';
			this.$emit('update-date', null);
		}
	},
	computed: {
		showCurrentView() {
			return !this.archived && !this.showForm;
		},
		showHistoryView() {
			return this.archived && !this.showForm;
		},
		showHistorySelect() {
			return this.showForm;
		}
	}
};
</script>

<style scoped>
.form-inline {
	min-height: 29px;
	padding: 5px;
}

.form-inline > * {
	margin: 0px 5px;
}

.form-inline > button {
	margin: 0px 0px;
}
</style>
