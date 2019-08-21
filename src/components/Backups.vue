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
   <div>
		<b-table bordered hover 
			show-empty
			empty-text="No backups."
			:items="backups"
			:fields="fields">
		</b-table>
	 </div>
</template>

<script>
export default {
	props: {
		backups: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			fields: [
				{ key: 'WeekDays', label: 'Day of the week' },
				{ key: 'Hour', label: 'Hour'},
				{ key: 'BackupType', label: 'Type'},
				{ key: 'AvgBckSize', label: 'Average backup size' },
				{ key: 'Retention', label: 'RMAN Retention' },
			]
		};
	}
};
</script>

<style scoped>
</style>
