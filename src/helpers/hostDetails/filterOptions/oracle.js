import {
  stringSearch,
  licensesFilter,
} from '@/helpers/hostDetails/hostDetailsHelpers.js'

// Oracle Filter Options
const filterOptionsOracle = [
  {
    name: 'Database Name',
    value: 'name',
    disabled: (selectedKeys) => {
      return selectedKeys.length === 1 && selectedKeys.includes('name')
        ? true
        : false
    },
    level: 1,
    filter: (db, search) => {
      return stringSearch(db.name, search)
    },
  },
  {
    name: 'Info',
    value: 'info',
    level: 1,
    group: 'info',
  },
  {
    name: 'DB Name',
    value: 'dbName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.name, search)
    },
  },
  {
    name: 'Status',
    value: 'status',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.status, search)
    },
  },
  {
    name: 'Role',
    value: 'role',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.role, search)
    },
  },
  {
    name: 'Db ID',
    value: 'dbID',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbID, search)
    },
  },
  {
    name: 'Unique Name',
    value: 'uniqueName',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.uniqueName, search)
    },
  },
  {
    name: 'Archive Log',
    value: 'archivelog',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.archivelog, search)
    },
  },
  {
    name: 'Block Size',
    value: 'blockSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.blockSize, search)
    },
  },
  {
    name: 'Charset',
    value: 'charset',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.charset, search)
    },
  },
  {
    name: 'N Charset',
    value: 'nCharset',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.nCharset, search)
    },
  },
  {
    name: 'Memory Target',
    value: 'memoryTarget',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.memoryTarget, search)
    },
  },
  {
    name: 'PGA Target',
    value: 'pgaTarget',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.pgaTarget, search)
    },
  },
  {
    name: 'SGA MaxSize',
    value: 'sgaMaxSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.sgaMaxSize, search)
    },
  },
  {
    name: 'SGA Target',
    value: 'sgaTarget',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.sgaMaxSize, search)
    },
  },
  {
    name: 'Db Time',
    value: 'dbTime',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dbTime, search)
    },
  },
  {
    name: 'Elapsed',
    value: 'elapsed',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.elapsed, search)
    },
  },
  {
    name: 'Thread Used',
    value: 'work',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.work, search)
    },
  },
  {
    name: 'CPU Count',
    value: 'cpuCount',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.cpuCount, search)
    },
  },
  {
    name: 'Allocable',
    value: 'allocable',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.allocable, search)
    },
  },
  {
    name: 'DataFile Size',
    value: 'datafileSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.datafileSize, search)
    },
  },
  {
    name: 'Segments Size',
    value: 'segmentsSize',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.segmentsSize, search)
    },
  },
  {
    name: 'ASM',
    value: 'asm',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.asm, search)
    },
  },
  {
    name: 'Data Guard',
    value: 'dataguard',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.dataguard, search)
    },
  },
  {
    name: 'Platform',
    value: 'platform',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.platform, search)
    },
  },
  {
    name: 'Version',
    value: 'version',
    level: 2,
    group: 'info',
    filter: (db, search) => {
      return stringSearch(db.version, search)
    },
  },
  {
    name: 'Pluggable DBs',
    value: 'pdbs',
    level: 1,
    filter: (db, search) => pdbsFilter(db.pdbs, search),
  },
  {
    name: 'Licenses',
    value: 'licenses',
    level: 1,
    filter: (db, search) => licensesFilter(db.licenses, search),
  },
  {
    name: 'DB Grants',
    value: 'dbGrants',
    level: 1,
    filter: (db, search) => dbGrantsFilter(db.dbGrants, search),
  },
  {
    name: 'Options',
    value: 'options',
    level: 1,
    filter: (db, search) => optionsFilter(db.options, search),
  },
  {
    name: 'Tablespaces',
    value: 'tablespaces',
    level: 1,
    filter: (db, search) => tablespacesFilter(db.tablespaces, search),
  },
  {
    name: 'Schemas',
    value: 'schemas',
    level: 1,
    filter: (db, search) => schemasFilter(db.schemas, search),
  },
  {
    name: 'Patches',
    value: 'patches',
    level: 1,
    filter: (db, search) => patchesFilter(db.patches, search),
  },
  {
    name: 'PSU',
    value: 'psus',
    level: 1,
    filter: (db, search) => psusFilter(db.psus, search),
  },
  {
    name: 'ADDM',
    value: 'addms',
    level: 1,
    filter: (db, search) => addmsFilter(db.addms, search),
  },
  {
    name: 'Segment Advisors',
    value: 'segmentAdvisors',
    level: 1,
    filter: (db, search) => segmentAdvisorsFilter(db.segmentAdvisors, search),
  },
  {
    name: 'Backups',
    value: 'backups',
    level: 1,
    filter: (db, search) => backupsFilter(db.backups, search),
  },
  {
    name: 'Services',
    value: 'services',
    level: 1,
    filter: (db, search) => servicesFilter(db.services, search),
  },
]

const pdbsFilter = (db, search) => {
  return (
    db.filter((pdb) => {
      const searchName = stringSearch(pdb.pdbName, search)
      const searchSchemas = pdb.pdbSchemas.filter((schema) =>
        stringSearch(schema.user, search)
      )
      const searchStatus = stringSearch(pdb.pdbStatus, search)
      const searchTablespaces = pdb.pdbTablespaces.filter((tablespace) => {
        return (
          stringSearch(tablespace.name, search) ||
          stringSearch(tablespace.status, search) ||
          stringSearch(tablespace.used, search) ||
          stringSearch(tablespace.usedPerc, search) ||
          stringSearch(tablespace.total, search) ||
          stringSearch(tablespace.maxSize, search)
        )
      })
      const searchGrantdba = pdb.pdbGrantDba.filter((grant) => {
        return (
          stringSearch(grant.grantee, search) ||
          stringSearch(grant.defaultRole, search) ||
          stringSearch(grant.adminOption, search)
        )
      })

      return (
        searchName ||
        searchSchemas ||
        searchStatus ||
        searchTablespaces ||
        searchGrantdba
      )
    }).length > 0
  )
}

const dbGrantsFilter = (db, search) => {
  return (
    db.filter((grant) => {
      const searchGrantee = stringSearch(grant.grantee, search)
      const searchAdminOption = stringSearch(grant.adminOption, search)
      const searchDefaultRole = stringSearch(grant.defaultRole, search)

      return searchGrantee || searchAdminOption || searchDefaultRole
    }).length > 0
  )
}

const optionsFilter = (db, search) => {
  return (
    db.filter((opt) => {
      const searchCurrentlyUsed = stringSearch(opt.currentlyUsed, search)
      const searchDetectedUsages = stringSearch(opt.detectedUsages, search)
      const searchExtraFeatureInfo = stringSearch(opt.extraFeatureInfo, search)
      const searchFeature = stringSearch(opt.feature, search)
      const searchFirstUsageDate = stringSearch(opt.firstUsageDate, search)
      const searchLastUsageDate = stringSearch(opt.lastUsageDate, search)
      const searchProduct = stringSearch(opt.product, search)

      return (
        searchCurrentlyUsed ||
        searchDetectedUsages ||
        searchExtraFeatureInfo ||
        searchFeature ||
        searchFirstUsageDate ||
        searchLastUsageDate ||
        searchProduct
      )
    }).length > 0
  )
}

const tablespacesFilter = (db, search) => {
  return (
    db.filter((tbs) => {
      const searchmaxSize = stringSearch(tbs.maxSize, search)
      const searchname = stringSearch(tbs.name, search)
      const searchstatus = stringSearch(tbs.status, search)
      const searchtotal = stringSearch(tbs.total, search)
      const searchused = stringSearch(tbs.used, search)
      const searchusedPerc = stringSearch(tbs.usedPerc, search)

      return (
        searchmaxSize ||
        searchname ||
        searchstatus ||
        searchtotal ||
        searchused ||
        searchusedPerc
      )
    }).length > 0
  )
}

const schemasFilter = (db, search) => {
  return (
    db.filter((schema) => {
      const searchmaxindexes = stringSearch(schema.maxindexes, search)
      const searchlob = stringSearch(schema.lob, search)
      const searchtables = stringSearch(schema.tables, search)
      const searchtotal = stringSearch(schema.total, search)
      const searchuser = stringSearch(schema.user, search)

      return (
        searchmaxindexes ||
        searchlob ||
        searchtables ||
        searchtotal ||
        searchuser
      )
    }).length > 0
  )
}

const patchesFilter = (db, search) => {
  return (
    db.filter((patch) => {
      const searchaction = stringSearch(patch.action, search)
      const searchdate = stringSearch(patch.date, search)
      const searchdescription = stringSearch(patch.description, search)
      const searchpatchID = stringSearch(patch.patchID, search)
      const searchversion = stringSearch(patch.version, search)

      return (
        searchaction ||
        searchdate ||
        searchdescription ||
        searchpatchID ||
        searchversion
      )
    }).length > 0
  )
}

const psusFilter = (db, search) => {
  return (
    db.filter((patch) => {
      const searchdescription = stringSearch(patch.description, search)
      const searchdate = stringSearch(patch.date, search)

      return searchdescription || searchdate
    }).length > 0
  )
}

const addmsFilter = (db, search) => {
  return (
    db.filter((addm) => {
      const searchaction = stringSearch(addm.action, search)
      const searchbenefit = stringSearch(addm.benefit, search)
      const searchfinding = stringSearch(addm.finding, search)
      const searchrecommendation = stringSearch(addm.recommendation, search)

      return (
        searchaction || searchbenefit || searchfinding || searchrecommendation
      )
    }).length > 0
  )
}

const segmentAdvisorsFilter = (db, search) => {
  return (
    db.filter((seg) => {
      const searchreclaimable = stringSearch(seg.reclaimable, search)
      const searchsegmentName = stringSearch(seg.segmentName, search)
      const searchsegmentOwner = stringSearch(seg.segmentOwner, search)
      const searchsegmentType = stringSearch(seg.segmentType, search)
      const searchpartitionName = stringSearch(seg.partitionName, search)
      const searchrecommendation = stringSearch(seg.recommendation, search)

      return (
        searchreclaimable ||
        searchsegmentName ||
        searchsegmentOwner ||
        searchsegmentType ||
        searchpartitionName ||
        searchrecommendation
      )
    }).length > 0
  )
}

const backupsFilter = (db, search) => {
  return (
    db.filter((backup) => {
      const searchweekDays = stringSearch(backup.weekDays, search)
      const searchhour = stringSearch(backup.hour, search)
      const searchbackupType = stringSearch(backup.backupType, search)
      const searchavgBckSize = stringSearch(backup.avgBckSize, search)
      const searchretention = stringSearch(backup.retention, search)

      return (
        searchweekDays ||
        searchhour ||
        searchbackupType ||
        searchavgBckSize ||
        searchretention
      )
    }).length > 0
  )
}

const servicesFilter = (db, search) => {
  return (
    db.filter((service) => {
      const searchname = stringSearch(service.name, search)
      const searchcreationDate = stringSearch(service.creationDate, search)
      const searchenabled = stringSearch(service.enabled, search)

      return searchname || searchcreationDate || searchenabled
    }).length > 0
  )
}

export { filterOptionsOracle }
