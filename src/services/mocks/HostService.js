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

/* eslint-disable no-unused-vars */
import PageBuilder from './PageBuilder.js';

var hostsData = [
	{
		id: 67,
		hostname: 'srota 67',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 68,
		hostname: 'apopa 68',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 69,
		hostname: 'cfranzelli 69',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},

	{
		id: 70,
		hostname: 'srota 70',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 71,
		hostname: 'apopa 71',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 72,
		hostname: 'cfranzelli 72',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 73,
		hostname: 'srota 73',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 74,
		hostname: 'apopa 74',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},

	{
		id: 75,
		hostname: 'cfranzelli 75',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 76,
		hostname: 'srota 76',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 77,
		hostname: 'apopa 77',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 78,
		hostname: 'cfranzelli 78',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 79,
		hostname: 'srota 79',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},

	{
		id: 80,
		hostname: 'apopa 80',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 81,
		hostname: 'cfranzelli 81',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 82,
		hostname: 'srota 82',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 83,
		hostname: 'apopa 83',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	{
		id: 84,
		hostname: 'cfranzelli 84',
		environment: 'PROD',
		location: 'Germany',
		databases: 'XE',
		schemas: 'SIP HR',
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	}
];

function getHosts(page) {
	const pb = new PageBuilder(5);

	return Promise.resolve(pb.getPage(page - 1, hostsData));
}

var host = {
	id: 67,
	hostname: 'srota',
	environment: 'PROD',
	location: 'Germany',
	databases: 'XE',
	schemas: 'SIP HR',
	extraInfo: {
		Databases: [
			{
				Platform: 'Linux x86 64-bit',
				MemoryTarget: '1',
				Licenses: null,
				Name: 'XE',
				Version: '11.2.0.2.0 Standard Edition',
				Work: 'N/A',
				Features: null,
				ASM: false,
				Patches: null,
				Status: 'OPEN',
				Dataguard: false,
				Tablespaces: [
					{
						Status: 'ONLINE',
						UsedPerc: '1.84',
						Used: '604.5625',
						Total: '640',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'SYSAUX'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.01',
						Used: '2.5',
						Total: '25',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'UNDOTBS1'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.00',
						Used: '0',
						Total: '30',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'TBS_SIP'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '58.61',
						Used: '351.6875',
						Total: '360',
						Database: 'XE',
						MaxSize: '600',
						Name: 'SYSTEM'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.01',
						Used: '1.5625',
						Total: '100',
						Database: 'XE',
						MaxSize: '11264',
						Name: 'USERS'
					}
				],
				SGATarget: '0',
				SGAMaxSize: '1',
				Charset: 'AL32UTF8',
				Schemas: [
					{
						User: 'SIP',
						Total: 0,
						Database: 'XE',
						Tables: 0,
						Indexes: 0,
						LOB: 0
					},
					{
						User: 'HR',
						Total: 2,
						Database: 'XE',
						Tables: 0,
						Indexes: 1,
						LOB: 0
					}
				],
				Allocated: '108',
				Archivelog: 'NOARCHIVELOG',
				PGATarget: '0',
				Used: '1',
				CPUCount: '4',
				Elapsed: '0',
				DBTime: '0',
				BlockSize: '8192',
				UniqueName: 'XE',
				NCharset: 'AL16UTF16'
			}
		],
		Filesystems: [
			{
				UsedPerc: '59%',
				Used: '28G',
				Size: '50G',
				FsType: 'ext4',
				Available: '20G',
				Filesystem: '/dev/mapper/fedora-root',
				MountedOn: '/'
			},
			{
				UsedPerc: '19%',
				Used: '170M',
				Size: '976M',
				FsType: 'ext4',
				Available: '740M',
				Filesystem: '/dev/sda2',
				MountedOn: '/boot'
			},
			{
				UsedPerc: '6%',
				Used: '11M',
				Size: '200M',
				FsType: 'vfat',
				Available: '189M',
				Filesystem: '/dev/sda1',
				MountedOn: '/boot/efi'
			},
			{
				UsedPerc: '0%',
				Used: '0',
				Size: '7.8G',
				FsType: 'devtmpfs',
				Available: '7.8G',
				Filesystem: 'devtmpfs',
				MountedOn: '/dev'
			},
			{
				UsedPerc: '10%',
				Used: '735M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.1G',
				Filesystem: 'tmpfs',
				MountedOn: '/dev/shm'
			},
			{
				UsedPerc: '82%',
				Used: '132G',
				Size: '171G',
				FsType: 'ext4',
				Available: '31G',
				Filesystem: '/dev/mapper/fedora-home',
				MountedOn: '/home'
			},
			{
				UsedPerc: '1%',
				Used: '2.2M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/run'
			},
			{
				UsedPerc: '1%',
				Used: '96K',
				Size: '1.6G',
				FsType: 'tmpfs',
				Available: '1.6G',
				Filesystem: 'tmpfs',
				MountedOn: '/run/user/1000'
			},
			{
				UsedPerc: '1%',
				Used: '12K',
				Size: '1.6G',
				FsType: 'tmpfs',
				Available: '1.6G',
				Filesystem: 'tmpfs',
				MountedOn: '/run/user/42'
			},
			{
				UsedPerc: '0%',
				Used: '0',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/sys/fs/cgroup'
			},
			{
				UsedPerc: '1%',
				Used: '20M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/tmp'
			}
		]
	},
	hostInfo: {
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Hostname: 'srota',
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		Environment: 'AMBIENTE',
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	updated: '2018-05-02T14:58:45.000+0000'
};

var historicalHost = {
	id: 67,
	hostname: 'srota',
	environment: 'PROD',
	location: 'Germany',
	databases: 'XE',
	schemas: 'SIP HR',
	extraInfo: {
		Databases: [
			{
				Platform: 'Linux x86 64-bit',
				MemoryTarget: '1',
				Licenses: null,
				Name: 'XE',
				Version: '11.2.0.2.0 Standard Edition',
				Work: 'N/A',
				Features: null,
				ASM: false,
				Patches: null,
				Status: 'OPEN',
				Dataguard: false,
				Tablespaces: [
					{
						Status: 'ONLINE',
						UsedPerc: '1.84',
						Used: '604.5625',
						Total: '640',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'SYSAUX'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.01',
						Used: '2.5',
						Total: '25',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'UNDOTBS1'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.00',
						Used: '0',
						Total: '30',
						Database: 'XE',
						MaxSize: '32767.9844',
						Name: 'TBS_SIP'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '58.61',
						Used: '351.6875',
						Total: '360',
						Database: 'XE',
						MaxSize: '600',
						Name: 'SYSTEM'
					},
					{
						Status: 'ONLINE',
						UsedPerc: '0.01',
						Used: '1.5625',
						Total: '100',
						Database: 'XE',
						MaxSize: '11264',
						Name: 'USERS'
					}
				],
				SGATarget: '0',
				SGAMaxSize: '1',
				Charset: 'AL32UTF8',
				Schemas: [
					{
						User: 'SIP',
						Total: 0,
						Database: 'XE',
						Tables: 0,
						Indexes: 0,
						LOB: 0
					},
					{
						User: 'HR',
						Total: 2,
						Database: 'XE',
						Tables: 0,
						Indexes: 1,
						LOB: 0
					}
				],
				Allocated: '108',
				Archivelog: 'NOARCHIVELOG',
				PGATarget: '0',
				Used: '1',
				CPUCount: '4',
				Elapsed: '0',
				DBTime: '0',
				BlockSize: '8192',
				UniqueName: 'XE',
				NCharset: 'AL16UTF16'
			}
		],
		Filesystems: [
			{
				UsedPerc: '59%',
				Used: '28G',
				Size: '50G',
				FsType: 'ext4',
				Available: '20G',
				Filesystem: '/dev/mapper/fedora-root',
				MountedOn: '/'
			},
			{
				UsedPerc: '19%',
				Used: '170M',
				Size: '976M',
				FsType: 'ext4',
				Available: '740M',
				Filesystem: '/dev/sda2',
				MountedOn: '/boot'
			},
			{
				UsedPerc: '6%',
				Used: '11M',
				Size: '200M',
				FsType: 'vfat',
				Available: '189M',
				Filesystem: '/dev/sda1',
				MountedOn: '/boot/efi'
			},
			{
				UsedPerc: '0%',
				Used: '0',
				Size: '7.8G',
				FsType: 'devtmpfs',
				Available: '7.8G',
				Filesystem: 'devtmpfs',
				MountedOn: '/dev'
			},
			{
				UsedPerc: '10%',
				Used: '735M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.1G',
				Filesystem: 'tmpfs',
				MountedOn: '/dev/shm'
			},
			{
				UsedPerc: '82%',
				Used: '132G',
				Size: '171G',
				FsType: 'ext4',
				Available: '31G',
				Filesystem: '/dev/mapper/fedora-home',
				MountedOn: '/home'
			},
			{
				UsedPerc: '1%',
				Used: '2.2M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/run'
			},
			{
				UsedPerc: '1%',
				Used: '96K',
				Size: '1.6G',
				FsType: 'tmpfs',
				Available: '1.6G',
				Filesystem: 'tmpfs',
				MountedOn: '/run/user/1000'
			},
			{
				UsedPerc: '1%',
				Used: '12K',
				Size: '1.6G',
				FsType: 'tmpfs',
				Available: '1.6G',
				Filesystem: 'tmpfs',
				MountedOn: '/run/user/42'
			},
			{
				UsedPerc: '0%',
				Used: '0',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/sys/fs/cgroup'
			},
			{
				UsedPerc: '1%',
				Used: '20M',
				Size: '7.8G',
				FsType: 'tmpfs',
				Available: '7.8G',
				Filesystem: 'tmpfs',
				MountedOn: '/tmp'
			}
		]
	},
	hostInfo: {
		OS: 'Fedora release 27 (Twenty Seven)',
		SunCluster: false,
		Hostname: 'srota',
		Virtual: false,
		Type: 'PH',
		VeritasCluster: false,
		Environment: 'AMBIENTE',
		CPUThreads: 4,
		SwapTotal: 7,
		CPUCores: 2,
		Kernel: '4.16.5-200.fc27.x86_64',
		Socket: 1,
		MemoryTotal: 15,
		OracleCluster: false,
		CPUModel: 'Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz'
	},
	updated: '2018-05-02T14:58:45.000+0000',
	archived: '2018-05-03T14:58:45.000+0000'
};

function getHost(id) {
	return Promise.resolve(host);
}

function getHostHistory(host, date) {
	return Promise.resolve(historicalHost);
}

export default {
	getHost,
	getHosts,
	getHostHistory
};
