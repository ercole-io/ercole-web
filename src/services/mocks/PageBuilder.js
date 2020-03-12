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

export default class PageBuilder {
  constructor(size) {
    this.pageSize = size;
  }

  getTotalPages() {
    return Math.ceil(this.size / this.pageSize);
  }

  setSize(size) {
    this.size = size;
  }

  getPage(page, elements) {
    this.size = elements.length;

    return {
      first: page === 0,
      last: page === this.getTotalPages(),
      number: page,
      numberOfElements: this.getPageSize(),
      size: this.getPageSize(),
      sort: "",
      totalElements: this.getSize(),
      totalPages: this.getTotalPages(),
      content: elements.slice(this._startIndex(page), this._endIndex(page) + 1)
    };
  }

  _startIndex(page) {
    if (page === 0) {
      return 0;
    } else {
      return this.getPageSize() * page;
    }
  }

  _endIndex(page) {
    return this._startIndex(page) + this.getPageSize() - 1;
  }

  getSize() {
    return this.size;
  }

  getPageSize() {
    return this.pageSize;
  }
}
