# Responsive tables

A simple script to change the layout of tables when they reach a certain breakpoint. Each desktop column becomes a row on mobile with the breakpoint able to be set on a table-by-table basis via a data attribute.

Your tables should follow the following format, use an (optional) `caption` for the title, column headers `th` tags should be wrapped in a `thead` and the data in a `tbody` tag. It can handle `colspans` in the headers converting them to `rowspans` on mobile.

Simply give your table a `js-responsive-table` class.

###Example

	<table class="table js-responsive-table">
		<caption>This is a really interesting table</caption>
		<thead>
			<tr>
				<th>Column 1</th>
				<th>Another column</th>
				<th>More details</th>
				<th colspan="2">Colspan column</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Row 1</td>
				<td>Great content</td>
				<td>123,544,865</td>
				<td>One part of the colspan</td>
				<td>Colspan 2</td>
				<td>Edit</td>
			</tr>
			<tr>
				<td>Row 2</td>
				<td>Really interesting text</td>
				<td>543,434,654</td>
				<td>Another item</td>
				<td>Part 2</td>
				<td>Edit</td>
			</tr>
			<tr>
				<td>Row 3</td>
				<td>This one is pretty dull</td>
				<td>23,54,766</td>
				<td>Another thing</td>
				<td>Last part</td>
				<td>Edit</td>
			</tr>
		</tbody>
	</table>

### Custom breakpoints
By default the tables will break at 600 pixels, to change this add a `data-breakpoint` attribute to the table specifying the pixel width to transform the table.

	<table class="table js-responsive-table" data-breakpoint="1000">
		<caption>This is a really interesting table</caption>
		<thead>
			<tr>
				<th>Column 1</th>
				<th>Another column</th>
				<th>More details</th>
				<th colspan="2">Colspan column</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Row 1</td>
				<td>Great content</td>
				<td>123,544,865</td>
				<td>One part of the colspan</td>
				<td>Colspan 2</td>
				<td>Edit</td>
			</tr>
		</tbody>
	</table>
	
### Styling breakpoints
When the responsive tables are initialised they get wrapped in a div with the class `.responsive-table`. They also either have a `.responsive-table--desktop` or `.responsive-table--mobile` class depending on the state.

There is an example sass file showing how to add zebra strips to the tables and handle basic overflowing content on smaller mobile screens.