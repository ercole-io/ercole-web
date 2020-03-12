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
import moment from "moment";

function getNewAlerts(cfg, page, severity, filter, startdate, enddate) {
  if (startdate != null) {
    startdate = moment(startdate)
      .startOf("day")
      .format();
  }
  if (enddate != null) {
    enddate = moment(enddate)
      .endOf("day")
      .format();
  }
  const config = {
    url: "/alerts",
    method: "GET",
    params: {
      page: page - 1,
      size: 20,
      severity: severity,
      "sort-by": "Date",
      "sort-desc": true,
      search: filter,
      from: startdate,
      to: enddate,
      status: "NEW"
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      Promise.reject(err);
    });
}

function getAlerts(cfg, page, severity, filter, startdate, enddate) {
  if (startdate != null) {
    startdate = moment(startdate)
      .startOf("day")
      .format();
  }
  if (enddate != null) {
    enddate = moment(enddate)
      .endOf("day")
      .format();
  }
  const config = {
    url: "/alerts",
    method: "GET",
    params: {
      page: page - 1,
      size: 20,
      severity: severity,
      "sort-by": "Date",
      "sort-desc": true,
      search: filter,
      from: startdate,
      to: enddate
    }
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      Promise.reject(err);
    });
}

function updateAlert(cfg, id) {
  const config = {
    url: "/alerts/" + id,
    method: "DELETE"
  };
  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      this.$noty.error("Unable to update alerts status");
      Promise.reject(err);
    });
}

export default {
  getAlerts,
  updateAlert,
  getNewAlerts
};
