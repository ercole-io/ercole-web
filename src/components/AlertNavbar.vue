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
	<b-nav-item-dropdown variant="link" right no-caret>
		<template slot="button-content">
			<i class="fas fa-bell fa-lg"></i>
			<span id="alert-badge" v-show="badgeVisible" class="badge badge-pill badge-danger">
				{{ badgeNumber }}
			</span>
		</template>
		<b-dropdown-header>Notifications</b-dropdown-header>
		<b-dropdown-item v-for="n in notifications" :key="n.id" :to="{ name : 'alerts' }">
			<div class="media">
				<Severity :value="n.severity" size="lg" class="align-self-center"></Severity>
				<div class="media-body">
					<h6 class="mt-0">{{n.code}}</h6>
					<small>{{n.description | truncate }}</small>
				</div>
			</div>
		</b-dropdown-item>
		<b-dropdown-divider></b-dropdown-divider>
		<b-dropdown-item :to="{ name : 'alerts' }">
			<small class="text-muted">
				{{ otherNotificationsText }}
			</small>
		</b-dropdown-item>
	</b-nav-item-dropdown>
</template>

<script>
import Severity from '@/components/Severity';

export default {
	components: {
		Severity
	},
	created() {
		this.$store.dispatch('loadNotifications');
	},
	computed: {
		badgeVisible() {
			return this.$store.getters.notifications.length > 0;
		},
		badgeNumber() {
			let value = this.$store.getters.totalNotifications;
			if (value > 99) {
				return '99+';
			}
			return value;
		},
		notifications() {
			return this.$store.getters.notifications.slice(0, 5);
		},
		otherNotificationsText() {
			const length = this.$store.getters.totalNotifications;
			if (length === 0) {
				return 'No notifications.';
			}
			const displayLength = Math.max(length - 5, 0);
			let text = '';
			if (displayLength > 0) {
				text = `View all notifications (more ${displayLength})`;
			} else {
				text = `View notifications`;
			}
			return text;
		}
	}
};
</script>

<style scoped>
#alert-badge {
	position: absolute;
	top: 0;
	right: 0;
}

.media > div {
	padding: 0 1.5rem 0 0px;
}

.media .media-body {
	padding-right: 10px;
}

.dropdown-item.active,
.dropdown-item:active {
	background-color: unset;
	color: unset;
}
</style>
