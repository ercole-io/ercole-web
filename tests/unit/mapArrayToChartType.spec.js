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

import { expect } from 'chai';
import { mapArrayToPieChartData } from '@/utils/PieChartMapper';

describe('no params', () => {
	const data = [
		{
			label: 'a',
			data: 1
		},
		{
			label: 'b',
			data: 2
		}
	];
	it('should return correct data', () => {
		const result = mapArrayToPieChartData(data);
		expect(result.labels).to.include('a');
		expect(result.labels).to.include('b');

		expect(result.datasets[0].data).to.include(1);
		expect(result.datasets[0].data).to.include(2);
	});
});

describe('with label/value params', () => {
	const data = [
		{
			pippo: 'a',
			pappo: 1
		},
		{
			pippo: 'b',
			pappo: 2
		}
	];
	it('should return correct data', () => {
		const result = mapArrayToPieChartData(data, ['pippo', 'pappo']);
		expect(result.labels).to.include('a');
		expect(result.labels).to.include('b');

		expect(result.datasets[0].data).to.include(1);
		expect(result.datasets[0].data).to.include(2);
	});
});

describe('with invalid label in options', () => {
	const data = [
		{
			pippo: 'a',
			pappo: 1
		},
		{
			wrong: 'b',
			pappo: 2
		}
	];
	it('should skip wrong value', () => {
		const result = mapArrayToPieChartData(data, ['pippo', 'pappo']);
		expect(result.labels.length).to.equal(1);
		expect(result.datasets[0].data.length).to.equal(1);
	});
});
describe('with invalid data in options', () => {
	const data = [
		{
			pippo: 'a',
			pappo: 1
		},
		{
			pippo: 'b',
			wrong: 2
		}
	];
	it('should skip wrong value', () => {
		const result = mapArrayToPieChartData(data, ['pippo', 'pappo']);
		expect(result.labels.length).to.equal(1);
		expect(result.datasets[0].data.length).to.equal(1);
	});
});

/**
 * {
				labels: ['Enterprise', 'Standard'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: Object.values(Colors.doughnutChart),
						data: [1000, 234]
					}
				]
			}
 */
