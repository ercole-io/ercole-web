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

// returns all declared licenses from network
function getLicenses(cfg) {
  const config = {
    url: "/licenses",
    method: "GET",
    params: {
      full: false
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

// merge the two flows
function mergeLicenses(cfg) {
  return getLicenses(cfg);
}

function saveLicenses(cfg, licenses) {
  const config = {
    url: "/licenses",
    method: "PUT",
    data: licenses
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

// returns all hosts using a license
function getHostUsingLicense(cfg, lc) {
  const config = {
    url: "/licenses/" + lc,
    method: "GET",
    params: {
      license: lc
    }
  };

  return axios
    .create(cfg)
    .request(config)
    .then(res => {
      return res.data.Hosts;
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

export default {
  saveLicenses,
  mergeLicenses,
  getHostUsingLicense
};
