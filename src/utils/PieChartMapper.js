// Copyright (c) 2019 Sorint.lab S.p.A.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/* eslint-disable no-console */
import Colors from '@/utils/Colors';
import moment from 'moment';

/**
 * Maps array from backend to chart data.
 * @param {*} arr the array to map in form { label: '', data: '' }
 */
export function mapArrayToPieChartData(arr, mapVals) {
	let labelField = 'label';
	let dataField = 'data';

	if (Array.isArray(mapVals)) {
		labelField = mapVals[0];
		dataField = mapVals[1];
	}

	let labels = [];
	let data = [];

	arr.forEach(el => {
		if (el.hasOwnProperty(labelField) && el.hasOwnProperty(dataField)) {
			labels.push(el[labelField]);
			data.push(el[dataField]);
		} else {
			console.warn(
				`Received wrong input, object should have '${labelField}' and '${dataField}' fields. Skipping.`
			);
		}
	});

	const res = {
		labels: labels,
		datasets: [
			{
				backgroundColor: Object.values(Colors.pieChart),
				fill: true,
				data: data
			}
		]
	};

	return res;
}

/**
 * Maps array from backend to chart data.
 * @param {*} arr the array to map in form { label: '', data: '' }
 */
export function mapArrayToLineTimeChartData(arr, mapVals) {
	let labelField = 'label';
	let dataField = 'data';

	if (Array.isArray(mapVals)) {
		labelField = mapVals[0];
		dataField = mapVals[1];
	}

	let data = [];

	arr.forEach(el => {
		if (el.hasOwnProperty(labelField) && el.hasOwnProperty(dataField)) {
			data.push({
				x: moment(el[labelField]).format(), 
				y: el[dataField]
			})
		} else {
			console.warn(
				`Received wrong input, object should have '${labelField}' and '${dataField}' fields. Skipping.`
			);
		}
	});

	const res = {
		datasets: [
			{
				data: data,
				fill: false
			}
		]
	};

	return res;
}