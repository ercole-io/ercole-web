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
			empty-text="No segment advisors."
			:items="segmentAdvisors"
			:fields="fields"
			:sort-by="'Reclaimable'"
			:sort-desc="true">
		</b-table>
	 </div>
</template>

<script>
export default {
  props: {
    segmentAdvisors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fields: [
        {
          key: "Reclaimable",
          sortable: true
        },
        { key: "SegmentOwner" },
        { key: "SegmentName" },
        { key: "SegmentType" },
        { key: "PartitionName" },
        { key: "Recommendation" }
      ]
    };
  }
};
</script>

<style scoped>
</style>
