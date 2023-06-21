<h1>Playwright Sample Project</h1>
<br>
<p>This project demos simple playwright functionality on the test website
    http://zero.webappsecurity.com/index.html<br>
    It performs several web testing functions and is done in a POM model.<br>
    All test files can be viewed under the tests folder, and all page object files
    can be found in the page-objects folder.<br></p>
<hr>
<h2>Usage</h2>
<p>Use the following script to run every end2end test: `npm run e2eTest`<br>
    That runs the command: playwright test --config=e2e.config.ts --project=Chromium<br>
    To run every api test, use: `npm run apiTest`<br>
    And to run Every visual regression test, use: `npm run visualTest`<br><br>
    To run every single test, use: `npm run cTest` (or fTest or wTest to test chromium,firefox, and webkit browsers)<br>
    Check package.json for a list of all scripts.<br>
    </p>
<hr>
<h2>Requirements</h2>
<p>The following packages were used:
<ul>
<li>Node JS</li>
<li>Playwright - npm install @playwright/test</li>
<li>Playwright browsers - npx playwright install</li>
</ul></p>
