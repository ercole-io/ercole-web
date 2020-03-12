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

import axios from "axios";
import now from "moment";
import moment from "moment";

function getHosts(cfg, pageNumber, filter, olderThan, sort) {
  const config = {
    url: "/hosts",
    method: "GET",
    params: {
      page: pageNumber - 1,
      size: 20,
      search: filter,
      mode: "summary",
      "older-than":
        olderThan == null
          ? ""
          : now()
              .subtract({ days: olderThan })
              .endOf("day")
              .format()
    }
  };

  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getHost(cfg, id) {
  const config = {
    url: "/hosts/" + id,
    method: "GET"
  };

  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      const host = res.data;
      return host;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getHostHistory(cfg, host, date) {
  const config = {
    url: "/hosts/" + host,
    method: "GET",
    params: {
      "older-than": moment(date).format()
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      if (res.status === 204) {
        return Promise.reject("No historical data");
      }
      const host = res.data;
      return host;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getAddms(cfg, filter, env) {
  const config = {
    method: "GET",
    url: "/addms",
    params: {
      search: filter,
      environment: env
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      const addms = res.data;
      return addms;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getSegmentAdvisors(cfg, filter, env) {
  const config = {
    method: "GET",
    url: "/segment-advisors",
    params: {
      search: filter,
      environment: env
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      const segmentAdvisors = res.data;
      return segmentAdvisors;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getPatchAdvisors(cfg, status, windowTime) {
  const config = {
    method: "GET",
    url: "/patch-advisors",
    params: {
      status: status,
      "window-time": windowTime
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      const patchAdvisors = res.data;
      return patchAdvisors;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function getEnviroments(cfg) {
  const config = {
    method: "GET",
    url: "/environments"
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      const envs = res.data;
      return envs;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function generateEx(cfg) {
  return axios
    .create(cfg)
    .request({
      url: "/hosts",
      method: "GET",
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.oracle.lms+vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Hosts.xlsm"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function generateExSimple(cfg) {
  return axios
    .create(cfg)
    .request({
      url: "/hosts",
      method: "GET",
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Hosts.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function generatePatchAdvisorExcel(cfg, status, windowTime) {
  return axios
    .create(cfg)
    .request({
      url: "/patch-advisors",
      method: "GET",
      responseType: "blob",
      params: {
        status: status,
        "window-time": windowTime
      },
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Patches.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function generateSegmentsExcel(cfg, filter, env) {
  return axios
    .create(cfg)
    .request({
      url: "/segment-advisors",
      method: "GET",
      responseType: "blob",
      params: {
        search: filter,
        environment: env
      },
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Segments.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function generateAddmExcel(cfg, filter, env) {
  return axios
    .create(cfg)
    .request({
      url: "/addms",
      method: "GET",
      responseType: "blob",
      params: {
        search: filter,
        environment: env
      },
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Addms.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function generateHypervisorsExcel(cfg, filter) {
  return axios
    .create(cfg)
    .request({
      url: "/clusters",
      method: "GET",
      responseType: "blob",
      params: {
        search: filter
      },
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Hypervisors.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
}

function dismiss(cfg, hostname) {
  return axios.create(cfg).request({
    url: "/hosts/" + hostname,
    method: "DELETE"
  });
}

function getDatabases(cfg, pageNumber, sort, filter, env) {
  const config = {
    url: "/databases",
    method: "GET",
    params: {
      page: pageNumber - 1,
      size: 50,
      // sort: sort,
      search: filter,
      environment: env
    }
  };

  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

function addTag(cfg, hostname, dbname, tag) {
  return axios.create(cfg).request({
    url: "/hosts/" + hostname + "/databases/" + dbname + "/tags",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: tag
  });
}

function deleteTag(cfg, hostname, dbname, tag) {
  return axios.create(cfg).request({
    url: "/hosts/" + hostname + "/databases/" + dbname + "/tags/" + tag,
    method: "DELETE"
  });
}

function clearLicense(cfg, hostname, dbname, licenseName) {
  return axios.create(cfg).request({
    url:
      "/hosts/" +
      hostname +
      "/databases/" +
      dbname +
      "/licenses/" +
      licenseName,
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    data: 0
  });
}

function recoverLicense(cfg, hostname, dbname, licenseName) {
  return axios.create(cfg).request({
    url:
      "/hosts/" +
      hostname +
      "/databases/" +
      dbname +
      "/license-modifiers/" +
      licenseName,
    method: "DELETE"
  });
}

export default {
  getHost,
  getHosts,
  getHostHistory,
  generateEx,
  generateExSimple,
  getAddms,
  getEnviroments,
  getSegmentAdvisors,
  getPatchAdvisors,
  generatePatchAdvisorExcel,
  generateSegmentsExcel,
  generateAddmExcel,
  generateHypervisorsExcel,
  dismiss,
  getDatabases,
  addTag,
  deleteTag,
  clearLicense,
  recoverLicense
};
