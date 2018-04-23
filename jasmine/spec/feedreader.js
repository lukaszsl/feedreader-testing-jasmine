/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('have a URL definded', function() {
			for (feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBeFalsy();
			}
		});

		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		 it('have a name definded', function() {
			 for (feed of allFeeds) {
				 expect(feed.name).toBeDefined();
				 expect(feed.name).not.toBeFalsy();
			 }
		 });
	});


	describe('The menu', function() {

		const body = document.querySelector('body');

		/* A test that ensures the menu element is
		 * hidden by default.
		 */
		 it('is hidden by default', function() {
			 expect(body.classList.value).toContain('menu-hidden');
		 });

		 /* A test that ensures the menu changes
			* visibility when the menu icon is clicked. This test
			* should have two expectations: does the menu display when
			* clicked and does it hide when clicked again.
			*/
			it('changes visibility when the menu icon is clicked', function() {
				const menuIcon = document.querySelector('.menu-icon-link');

				menuIcon.click();
				expect(body.classList.value).not.toContain('menu-hidden');

				menuIcon.click();
				expect(body.classList.value).toContain('menu-hidden');
			});
	});


	describe('Initial Entries', function() {

		const container = document.querySelector('.feed');

		 beforeEach(function(done) {
			 loadFeed(0, function() {
				 done();
			 });
		 });

		 /* A test that ensures when the loadFeed
			* function is called and completes its work, there is at least
			* a single .entry element within the .feed container.
			*/
		 it('exist', function(done) {
			 expect(container.firstElementChild).toBeDefined();
			 done();
		 });
	});


	describe('New Feed Selection', function() {

		const headerTitle = document.querySelector('.header-title');
		let headerTitleA = undefined;
		let headerTitleB = undefined;

		beforeAll(function(done) {
			loadFeed(0, function() {
				headerTitleA = headerTitle.innerText;
				done();
			});

			loadFeed(1, function() {
				headerTitleB = headerTitle.innerText;
				done();
			});
		});

		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		 it('is loaded, content changes', function(done) {
			 expect(headerTitleA).not.toEqual(headerTitleB);
			 done();
		 });
	});
}());
