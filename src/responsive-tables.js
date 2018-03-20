

import debounce from 'lodash/debounce';

document.addEventListener('DOMContentLoaded', function() {
	let tables = document.querySelectorAll('.js-responsive-table');

	tables.forEach((table) => {
		new ResponsiveTable(table);
	});
});

class ResponsiveTable {
	constructor(table) {
		this.tableState = 'desktop';
		this.table = table;
		this.headers = table.querySelectorAll('thead th');
		this.body  = table.querySelectorAll('tbody > tr');
		this.desktopLayout = table.cloneNode(true);
		this.mobileLayout = null;
		this.breakpoint = this.table.dataset.breakpoint ? parseInt(this.table.dataset.breakpoint) : 600;

		// wrap table in a div
		this.wrapper = document.createElement('div');
		this.wrapper.classList = 'responsive-table responsive-table--desktop';
		this.table.parentNode.insertBefore(this.wrapper, this.table);
		this.wrapper.appendChild(this.table);

		window.addEventListener('resize', debounce(() => {
			this.checkScreenSize();
		}, 100));

		this.checkScreenSize();
	}

	checkScreenSize() {
		if (window.matchMedia('(max-width: ' + (this.breakpoint - 1) + 'px)').matches && this.tableState !== 'mobile') {
			this.mobileTable();
		}

		if (window.matchMedia('(min-width: ' + this.breakpoint + 'px)').matches && this.tableState !== 'desktop') {
			this.desktopTable();
		}
	}

	toggleWrapperClasses() {
		this.wrapper.classList.toggle('responsive-table--desktop');
		this.wrapper.classList.toggle('responsive-table--mobile');
	}

	desktopTable() {
		this.wrapper.replaceChild(this.desktopLayout, this.wrapper.firstChild);
		this.tableState = 'desktop';
		this.toggleWrapperClasses();
	}

	mobileTable() {
		if (this.mobileLayout) {
			this.wrapper.replaceChild(this.mobileLayout, this.wrapper.firstChild);
		} else {
			let rows = [];
			let headers = [];

			this.headers.forEach((header) => {
				headers.push(header);

				if (header.colSpan > 1) {
					for (let i = 0; i < (header.colSpan - 1); i++) {
						headers.push(null);
					}
				}
			});

			headers.forEach((header, index) => {
				rows.push(this.readRow(header, index));
			});

			this.buildTable(rows);
		}

		this.tableState = 'mobile';
		this.toggleWrapperClasses();
	}

	readRow(header, index) {
		let row = [
			header
		];

		this.body.forEach((desktopRow) => {
			row.push(desktopRow.children[index]);
		});

		return row;
	}

	buildTable(rows) {
		this.table.querySelector('thead').remove();
		let tbody = this.table.querySelector('tbody');

		rows.forEach((rowItems) => {
			tbody.appendChild(this.buildRow(rowItems));
		});

		this.table.appendChild(tbody);

		this.mobileLayout = this.table.cloneNode(true);
	}

	buildRow(rowItems) {
		let tr = document.createElement('tr');

		rowItems.forEach((item) => {
			if (item) {
				if (item.colSpan > 1) {
					item.rowSpan = item.colSpan;
					item.colSpan = 1;
				}
				tr.appendChild(item);
			}
		});

		return tr;
	}
}